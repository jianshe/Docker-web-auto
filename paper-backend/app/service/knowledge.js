"use strict";

const Service = require("egg").Service;

class Knowledge extends Service {
  async getLatestKnowledge(pageIndex = 1, pageSize = 10, title) {
    let limit = pageSize; // 每页显示条数
    let offset = (pageIndex - 1) * pageSize;
    const knowledges = await this.getKnowledges(limit, offset, title);
    return knowledges;
  }
  // 获取产品
  async getKnowledges(limit = 10, offset = 0, title = "") {
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
    const knowledges = await ctx.model.Knowledge.findAll(query);
    const count = await this.getKnowledgesCount(); // 获取行业知识总数
    return { count, knowledges };
  }
  async create({ userId, title = "", content = "" }) {
    const { ctx } = this;
    const knowledgeRecord = await ctx.model.Knowledge.create({
      userId,
      title,
      content
    });
    return knowledgeRecord;
  }
  async getKnowledgesCount() {
    const { ctx } = this;
    const count = await ctx.model.Knowledge.count();
    return count;
  }
  async findById(id) {
    const { ctx } = this;
    const knowledge = await ctx.model.Knowledge.findById(id);
    return knowledge;
  }
  async findByPk(userId) {
    const { ctx } = this;
    const knowledge = await ctx.model.Knowledge.findByPk(userId);
    return knowledge;
  }
}
module.exports = Knowledge;
