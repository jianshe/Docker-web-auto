"use strict";

const Controller = require("egg").Controller;

const queryRule = {
  page: {
    // 页码
    type: "int",
    convertType: "int",
    default: 1,
    required: true
  },
  limit: {
    // 一页数据量
    type: "int",
    convertType: "int",
    default: 10,
    required: true
  }
};
class News extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate(queryRule, ctx.query); // 参数校验
    const { page, limit, title } = ctx.query;
    let result = { count: 0, news: [] };
    result = await ctx.service.news.getLatestNews(page, limit, title);
    ctx.helper.$success(result);
  }
  // 创建公司新闻
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        title: {
          type: "string",
          required: true,
          max: 40
        },
        content: {
          type: "string",
          required: true
        }
      },
      ctx.request.body
    );
    const user = await ctx.service.users.findOne(ctx.request.body.username);
    const newsObj = {};
    Object.assign(newsObj, ctx.request.body, { userId: user.id });
    const news = await ctx.service.news.create(newsObj);
    ctx.helper.$success(news);
  }
  // 获取某一新闻
  async findById() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const companyNew = await ctx.service.news.findById(id);
    if (!companyNew) {
      const { NEWS_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(NEWS_NOT_FOUND.code, NEWS_NOT_FOUND.msg);
      return;
    }
    ctx.helper.$success(companyNew);
  }
  // 更新公司新闻
  async update() {
    const { ctx } = this;
    ctx.validate(
      {
        title: {
          type: "string",
          required: false,
          max: 40
        },
        content: {
          type: "string",
          required: false
        }
      },
      ctx.request.body
    );
    const id = ctx.helper.toInt(ctx.request.body.id);
    const username = ctx.request.body.username;
    const news = await ctx.service.news.findById(id);
    if (!news) {
      const { NEWS_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(NEWS_NOT_FOUND.code, NEWS_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.users.findOne(username);
    if (user.id !== news.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await news.update(ctx.request.body);
    ctx.helper.$success(news);
  }
  //更新新闻浏览数
  async updateViews() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.request.body.id);
    const news = await ctx.service.news.findById(id);
    if (!news) {
      const { NEWS_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(NEWS_NOT_FOUND.code, NEWS_NOT_FOUND.msg);
      return;
    }
    let views = news.views;
    ctx.request.body.views = views + 1
    await news.update(ctx.request.body);
    ctx.helper.$success(news);
  }
  // 删除公司新闻
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const username = ctx.query.username;
    const news = await ctx.service.news.findById(id);
    if (!news) {
      const { NEWS_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(NEWS_NOT_FOUND.code, NEWS_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.users.findOne(username);
    if (user.id !== news.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await news.destroy();
    ctx.helper.$success("删除成功");
  }
}
module.exports = News;
