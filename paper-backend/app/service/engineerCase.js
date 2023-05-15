"use strict";

const Service = require("egg").Service;

class EngineerCase extends Service {
  async getLatestEngineerCase(pageIndex = 1, pageSize = 10) {
    let limit = pageSize; // 每页显示条数
    let offset = (pageIndex - 1) * pageSize;
    const engineerCase = await this.getEngineerCase(limit, offset);
    return engineerCase;
  }
  // 获取工程案例
  async getEngineerCase(limit = 10, offset = 0,userId) {
    const { ctx } = this;
    const query = {
      order: [["createdAt", "DESC"]],
      limit,
      offset
    };
    // let where = {};
    // if (userId) {
    //   where.userId = userId;
    // }
    // query.where = where;
    const engineerCase = await ctx.model.EngineerCase.findAll(query);
    const count = await this.getEngineerCaseCount(); // 获取工程案例总数
    return { count, engineerCase };
  }
  async create({ userId, files,content}) {
    const { ctx } = this;
    const engineerCaseModel = {
      userId: userId,
      content: content
    };
    console.log('content',content)
    if (files && files.length > 0) {
      const fileSavePromise = files.map(async (file) => {
        engineerCaseModel.title = file.value;
        engineerCaseModel.url = file.name;
        await ctx.model.EngineerCase.create(engineerCaseModel);
        await Promise.all(fileSavePromise);
      });
    }
    return "save success";
  }
  async getEngineerCaseCount() {
    const { ctx } = this;
    const count = await ctx.model.EngineerCase.count();
    return count;
  }
  async findById(id) {
    const { ctx } = this;
    const engineerCase = await ctx.model.EngineerCase.findById(id);
    return engineerCase;
  }
  async findByPk(userId) {
    const { ctx } = this;
    const engineerCase = await ctx.model.EngineerCase.findByPk(userId);
    return engineerCase;
  }
}
module.exports = EngineerCase;
