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
class Knowledge extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate(queryRule, ctx.query); // 参数校验
    const { page, limit, title } = ctx.query;
    let result = { count: 0, knowledges: [] };
    result = await ctx.service.knowledge.getLatestKnowledge(
      page,
      limit,
      title
    );
    ctx.helper.$success(result);
  }
  // 创建行业知识
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
    const newKowledge = {};
    Object.assign(newKowledge, ctx.request.body, { userId: user.id });
    const knowledge = await ctx.service.knowledge.create(newKowledge);
    ctx.helper.$success(knowledge);
  }
  // 获取某一行业知识
  async findById() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const knowledge = await ctx.service.knowledge.findById(id);
    if (!knowledge) {
      const { KNOWLEDEG_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(KNOWLEDEG_NOT_FOUND.code, KNOWLEDEG_NOT_FOUND.msg);
      return;
    }
    ctx.helper.$success(knowledge);
  }
  //更新行业知识浏览数
  async updateViews() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.request.body.id);
    const knowledge = await ctx.service.knowledge.findById(id);
    if (!knowledge) {
      const { KNOWLEDEG_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(KNOWLEDEG_NOT_FOUND.code, KNOWLEDEG_NOT_FOUND.msg);
      return;
    }
    let views = knowledge.views;
    ctx.request.body.views = views + 1
    await knowledge.update(ctx.request.body);
    ctx.helper.$success(knowledge);
  }
  // 更新行业知识
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
    const knowledge = await ctx.service.knowledge.findById(id);
    if (!knowledge) {
      const { KNOWLEDEG_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(KNOWLEDEG_NOT_FOUND.code, KNOWLEDEG_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.users.findOne(username);
    if (user.id !== knowledge.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await knowledge.update(ctx.request.body);
    ctx.helper.$success(knowledge);
  }
  // 删除行业知识
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const username = ctx.query.username;
    const knowledge = await ctx.service.knowledge.findById(id);
    if (!knowledge) {
      const { KNOWLEDEG_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(KNOWLEDEG_NOT_FOUND.code, KNOWLEDEG_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.users.findOne(username);
    if (user.id !== knowledge.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await knowledge.destroy();
    ctx.helper.$success("删除成功");
  }
}
module.exports = Knowledge;
