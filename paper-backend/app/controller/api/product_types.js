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
class ProductTypes extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate(queryRule, ctx.query); // 参数校验
    const { page, limit, type } = ctx.query;
    let result = { count: 0, productTypes: [] };
    result = await ctx.service.productTypes.getLatestProductTypes(
      page,
      limit,
      type
    );
    ctx.helper.$success(result);
  }

  async getTotal() {
    const { ctx } = this;
    let result = { count: 0, productTypes: [] };
    result = await ctx.service.productTypes.getTotalTypes();
    ctx.helper.$success(result);
  }
  // 创建产品类型
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        type: {
          type: "string",
          required: true,
          max: 40
        },
        desc: {
          type: "string",
          required: true
        }
      },
      ctx.request.body
    );
    const productType = await ctx.service.productTypes.create(ctx.request.body);
    ctx.helper.$success(productType);
  }
  // 更新产品类型
  async update() {
    const { ctx } = this;
    ctx.validate(
      {
        type: {
          type: "string",
          required: true,
          max: 40
        },
        desc: {
          type: "string",
          required: true
        }
      },
      ctx.request.body
    );
    const id = ctx.helper.toInt(ctx.request.body.id);
    const productType = await ctx.service.productTypes.findById(id);
    if (!productType) {
      const { PRODUCTTYPE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(PRODUCTTYPE_NOT_FOUND.code, PRODUCTTYPE_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    await productType.update(ctx.request.body);
    ctx.helper.$success(productType);
  }

  // 通过产品类型id，查找该产品
  async findById() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const productType = await ctx.service.productTypes.findById(id);
    if (!productType) {
      const { PRODUCTTYPE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(PRODUCTTYPE_NOT_FOUND.code, PRODUCTTYPE_NOT_FOUND.msg);
      return;
    }
    ctx.helper.$success(productType);
  }
  // 删除产品类型
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.query.id);
    const productType = await ctx.service.productTypes.findById(id);
    if (!productType) {
      const { PRODUCTTYPE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(PRODUCTTYPE_NOT_FOUND.code, PRODUCTTYPE_NOT_FOUND.msg);
      return;
    }
    await productType.destroy();
    ctx.helper.$success("删除成功");
  }
}
module.exports = ProductTypes;
