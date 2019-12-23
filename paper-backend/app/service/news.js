"use strict";

const Service = require("egg").Service;

class News extends Service {
  async getLatestNews(pageIndex = 1, pageSize = 10,userId, title) {
    let limit = pageSize; // 每页显示条数
    let offset = (pageIndex - 1) * pageSize;
    const news = await this.getNews(limit, offset,userId, title);
    return news;
  }
  // 获取产品
  async getNews(limit = 10, offset = 0, title = "") {
    const { ctx } = this;
    const query = {
      order: [["createdAt", "DESC"]],
      limit,
      offset
    };
    let where = {};
    if (title) {
      where.title = title;
    }
    query.where = where;
    const news = await ctx.model.News.findAll(query);
    const count = await this.getNewsCount(); // 获取公司新闻总数
    return { count, news };
  }
  async create({ userId, title = "", content = "" }) {
    const { ctx } = this;
    const newsRecord = await ctx.model.News.create({
      userId,
      title,
      content
    });
    return newsRecord;
  }
  async getNewsCount() {
    const { ctx } = this;
    const count = await ctx.model.News.count();
    return count;
  }
  async findById(id) {
    const { ctx } = this;
    const companyNew = await ctx.model.News.findById(id);
    return companyNew;
  }
  async findByPk(userId) {
    const { ctx } = this;
    const news = await ctx.model.News.findByPk(userId);
    return news;
  }
}
module.exports = News;
