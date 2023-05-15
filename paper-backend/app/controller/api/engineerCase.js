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
class EngineerCase extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate(queryRule, ctx.query); // 参数校验
    const { page, limit } = ctx.query;
    let result = { count: 0, engineerCase: [] };
    result = await ctx.service.engineerCase.getLatestEngineerCase(
      page,
      limit
    );
    ctx.helper.$success(result);
  }
  // 创建工程案例
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        userId: {
          type: "int",
          convertType: "int",
          default: 0,
          required: true
        }
      },
      ctx.request.body
    );
    console.log(ctx.request.body)
    const result = await ctx.service.engineerCase.create(ctx.request.body);
    ctx.helper.$success(result);
  }
  // 通过工程案例id查找工程案例相关信息
  async findById() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const engineerCase = await ctx.service.engineerCase.findById(id);
    if (!engineerCase) {
      const { ENGINEERCASE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(ENGINEERCASE_NOT_FOUND.code, ENGINEERCASE_NOT_FOUND.msg);
      return;
    }
    ctx.helper.$success(engineerCase);
  }
   // 更新工程案例
  async updateEngineer() {
    const { ctx } = this;
    ctx.validate(
      {
        userId: {
          type: "int",
          convertType: "int",
          default: 0,
          required: true
        }
      },
      ctx.request.body
    );
    const id = ctx.helper.toInt(ctx.request.body.id);
    const engineerCase = await ctx.service.engineerCase.findById(id);
    if (!engineerCase) {
      const { ENGINEERCASE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(ENGINEERCASE_NOT_FOUND.code, ENGINEERCASE_NOT_FOUND.msg);
      return;
    }
    await engineerCase.update(ctx.request.body);
    ctx.helper.$success(engineerCase);
  }
  // 删除工程案例
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const username = ctx.query.username;
    const engineerCase = await ctx.service.engineerCase.findById(id);
    if (!engineerCase) {
      const { ENGINEERCASE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(ENGINEERCASE_NOT_FOUND.code, ENGINEERCASE_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.users.findOne(username);
    if (user.id !== engineerCase.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await engineerCase.destroy();
    ctx.helper.$success("删除成功");
  }
}
module.exports = EngineerCase;
