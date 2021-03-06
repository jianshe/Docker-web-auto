'use strict';

const Service = require('egg').Service;

class Users extends Service {
  async create(user) {
    const { ctx, app } = this;
    const [ userInstance, isNew ] = await ctx.model.User.findOrCreate({
      where: {
        username: user.username,
      },
      defaults: user,
    });
    if (!isNew) {
      const { USER_EXIST } = app.config.errors;
      const err = new Error();
      Object.assign(err, USER_EXIST);
      throw err;
    }
    return userInstance;
  }
  async findOne(username) {
    const { ctx } = this;
    const userInstance = await ctx.model.User.findOne({
      where: {
        username,
      },
    });
    return userInstance;
  }
  async findById(id) {
    const { ctx } = this;
    const userInstance = await ctx.model.User.findById(id);
    return userInstance;
  }
}

module.exports = Users;
