'use strict';

const Controller = require('egg').Controller;

const queryRule = {
  page: {
    // 页码
    type: 'int',
    convertType: 'int',
    default: 1,
    required: true,
  },
  limit: {
    // 一页数据量
    type: 'int',
    convertType: 'int',
    default: 10,
    required: true,
  },
  productTypeId: {
    // 产品类型
    type: 'int',
    convertType: 'int',
    default: 1,
    required: true,
  }
};
class Products extends Controller {
  // 获取总的产品数
  async getTotalProductList() {
    const { ctx } = this;
    let result = []
      // 查询总的产品
    result = await ctx.service.products.getTotalProducts();
    
    ctx.helper.$success(result);
  }

   // 获取总的产品数
   async index() {
    const { ctx } = this;
    ctx.validate(queryRule, ctx.query); // 参数校验
    const { page, limit,productTypeId } = ctx.query;
    let result = { count: 0, products: [] };
      // 查询最新添加的产品
    result = await ctx.service.products.getLatestProducts(page, limit, productTypeId);
    ctx.helper.$success(result);
  }
  // 创建帖子
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        productTypeId: {
          type: 'int',
          default: 1,
          required: true,
        },
        userId: {
          type: 'int',
          default: 1,
          required: true,
        }
      },
      ctx.request.body
    );
    const result = await ctx.service.products.create(ctx.request.body);
    ctx.helper.$success(result);
  }

    // 删除公司产品
    async destroy() {
      const { ctx } = this;
      const id = ctx.helper.toInt(ctx.query.id);
      const username = ctx.query.username;
      const product = await ctx.service.products.findById(id);
      if (!product) {
        const { Product_NOT_FOUND } = this.config.errors;
        ctx.helper.$fail(Product_NOT_FOUND.code, Product_NOT_FOUND.msg);
        return;
      }
      // 判断用户是否有权进行此操作
      const user = await ctx.service.users.findOne(username);
      if (user.id !== product.userId) {
        const { NO_RIGHTS_OPERATION } = this.config.errors;
        ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
        return;
      }
      await product.destroy();
      ctx.helper.$success('删除成功');
    }
}
module.exports = Products;
