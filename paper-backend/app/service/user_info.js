'use strict';

const Service = require('egg').Service;

class UserInfo extends Service {
  async findOne(username) {
    const { ctx } = this;
    const userInstance = await ctx.model.UserInfo.findOne({
      where: {
        username
      },
    });
    return userInstance;
  }
  async findById(id) {
    const { ctx } = this;
    const userInstance = await ctx.model.UserInfo.findById(id);
    return userInstance;
  }
}

module.exports = UserInfo;
