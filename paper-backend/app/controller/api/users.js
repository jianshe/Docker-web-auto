'use strict';

const Controller = require('egg').Controller;

const rule = {
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'password',
    required: true,
    min: 6,
    max: 20,
  }
};
class Users extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    ctx.validate(
      {
        username: rule.username,
        password: rule.password,
      },
      ctx.request.body
    );
    const { username, password } = ctx.request.body;
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.findOne(username);
    if (!userInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    if (userInstance.password === pwdHash) {
      // 登录成功
      // 生成auth_token
      const auth_token = ctx.helper.generateToken(
        { username: userInstance.username },
        this.config.loginTokenTime
      );
      // 将auth_token设置到Cookie中
      ctx.cookies.set('auth_token', auth_token, {
        maxAge: this.config.loginTokenTime * 1000,
        path: '/',
        domain: app.config.sso.domain,
        httpOnly: false,
        signed: false,
      });
      // 将auth_token存入Redis中，获取的键为用户账号username,并设置一定的有效期
      await app.redis.setex(userInstance.username, this.config.loginTokenTime, auth_token);
      ctx.helper.$success({
        auth_token,
        expires: this.config.loginTokenTime,
      });
    } else {
      // 登录失败
      const { PASSWORD_ERROR } = this.config.errors;
      ctx.helper.$fail(PASSWORD_ERROR.code, PASSWORD_ERROR.code.msg);
      return;
    }
  }
  // 退出登录
  async logout() {
    const { ctx, app } = this;
    // 删除username对应的auth_token
    await app.redis.del(ctx.username);
    ctx.helper.$success();
  }

  // 获取用户登录状态，经过中间件auth_token_check判断
  async info() {
    const { ctx } = this;
    const user = await ctx.service.users.findOne(ctx.username);
    ctx.helper.$success({
      username: ctx.username,
      roles: user.role,
      userId: user.id,
      isLogin: true
    });
  }

  // 注册
  async signup() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
        code: rule.code,
        password: rule.password,
      },
      ctx.request.body
    );
    const { email, code, password } = ctx.request.body;
    // 从redis获取验证码
    const codeInRedis = await app.redis.get(`code:${email}`);

    if (code !== codeInRedis) {
      const { CODE_VALIDATE_FAILED } = this.config.errors;
      ctx.helper.$fail(CODE_VALIDATE_FAILED.code, CODE_VALIDATE_FAILED.code.msg);
      return;
    }
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.create({ email, password: pwdHash });
    const userInfo = {
      id: userInstance.id,
      email: userInstance.email,
      role: 1,
      graduated: 1,
    };
    const userInfoInstance = await ctx.service.userInfos.createOrUpdate(userInfo);
    ctx.helper.$success(userInfoInstance);
  }

  // 发送验证码
  async sendCode() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
      },
      ctx.request.body
    );
    const { email } = ctx.request.body;
    const code = ctx.helper.generateCode();
    // 设置验证码，过期时间为3分钟
    await app.redis.setex(`code:${email}`, 5 * 60, code);
    await ctx.service.email.sendCodeEmail(email, code);
    ctx.helper.$success();
  }

  // 验证验证码，用于更新密码时验证
  async validateCodeInPwd() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
        code: rule.code,
      },
      ctx.request.body
    );
    const { email, code } = ctx.request.body;
    // 从redis获取验证码
    const codeInRedis = await app.redis.get(`code:${email}`);
    if (code === codeInRedis) {
      const codeTicket = ctx.helper.uuid();
      // 设置凭证与email的关联,过期时间为10分钟
      await app.redis.setex(`ticket-email:${codeTicket}`, 10 * 60, email);
      ctx.helper.$success(
        {
          ticket: codeTicket,
        },
        '验证码验证成功'
      );
    } else {
      const { CODE_VALIDATE_FAILED } = this.config.errors;
      ctx.helper.$fail(CODE_VALIDATE_FAILED.code, CODE_VALIDATE_FAILED.code.msg);
    }
  }

  // 更新密码
  async updatePwd() {
    const { ctx, app } = this;
    ctx.validate(
      {
        password: rule.password,
        ticket: rule.ticket,
      },
      ctx.request.body
    );
    const { password, ticket } = ctx.request.body;
    const email = await app.redis.get(`ticket-email:${ticket}`);
    if (!email) {
      const { TICKET_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(TICKET_NOT_FOUND.code, TICKET_NOT_FOUND.msg);
      return;
    } else if (email === 'isUsed') {
      const { TICKET_IS_USED } = this.config.errors;
      ctx.helper.$fail(TICKET_IS_USED.code, TICKET_IS_USED.msg);
      return;
    }
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.findOne(email);
    if (!userInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    await userInstance.update({ password: pwdHash });
    // 设置凭证已使用
    await app.redis.set(`ticket-email:${ticket}`, 'isUsed');
    ctx.helper.$success(userInstance);
  }

  // 创建校友用户（或者称毕业生）
  async createAlumniUser() {
    const { ctx } = this;
    ctx.validate(
      {
        email: rule.email,
        password: rule.password,
      },
      ctx.request.body
    );
    const { email, password } = ctx.request.body;

    const userInfoInstance = await ctx.service.userInfos.findOne(ctx.user_email);
    // 只有学校管理员和超级管理员才能创建校友用户
    if (userInfoInstance.role === 6 || userInfoInstance.role === 8) {
      // 对密码进行hash处理
      const pwdHash = ctx.helper.cryptPwd(password);
      // 创建校友用户
      const userInstance = await ctx.service.users.create({ email, password: pwdHash });
      const userInfo = {
        id: userInstance.id,
        email: userInstance.email,
        role: 1,
      };
      const alumni = await ctx.service.userInfos.createOrUpdate(userInfo);
      ctx.helper.$success(alumni);
      return;
    }
    // 非学校管理员和超级管理员都返回无权操作
    const { NO_RIGHTS_OPERATION } = this.config.errors;
    ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
  }

  // 创建企业用户
  async createCompanyUser() {
    const { ctx } = this;
    ctx.validate(
      {
        email: rule.email,
        password: rule.password,
      },
      ctx.request.body
    );
    const { email, password } = ctx.request.body;

    const userInfoInstance = await ctx.service.userInfos.findOne(ctx.user_email);
    // 只有企业管理员和超级管理员才能创建企业用户
    if (userInfoInstance.role === 7 || userInfoInstance.role === 8) {
      // 对密码进行hash处理
      const pwdHash = ctx.helper.cryptPwd(password);
      // 创建企业用户
      const userInstance = await ctx.service.users.create({ email, password: pwdHash });
      const userInfo = {
        id: userInstance.id,
        email: userInstance.email,
        role: 4,
      };
      const companyUser = await ctx.service.userInfos.createOrUpdate(userInfo);
      ctx.helper.$success(companyUser);
      return;
    }
    // 非企业管理员和超级管理员都返回无权操作
    const { NO_RIGHTS_OPERATION } = this.config.errors;
    ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
  }
}

module.exports = Users;
