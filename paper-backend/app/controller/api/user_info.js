'use strict';

const Controller = require('egg').Controller;

class UserInfo extends Controller {
  // 获取用户信息
  async getUserInfo() {
    const { ctx } = this;
    const userInfoInstance = await ctx.service.userInfo.findOne(ctx.username);
    if (!userInfoInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    ctx.helper.$success(userInfoInstance);
  }
}

module.exports = UserInfo;
