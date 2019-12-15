"use strict";

const Service = require("egg").Service;

class ProductTypes extends Service {
  async getLatestProductTypes(pageIndex = 1, pageSize = 10,type) {
    let limit = pageSize; // 每页显示条数
    let offset = (pageIndex - 1) * pageSize;
    const productTypes = await this.getProductTypes(limit, offset,type);
    return { productTypes };
  }
  /** 获取所有产品类型，不分页 **/
  async getTotalTypes() {
    const { ctx } = this;
    const productTypes = await ctx.model.ProductTypes.findAll();
    const query = {
      order: [[ 'createdAt', 'DESC' ]],
    };
    const count = await ctx.model.ProductTypes.count(query);
    return { count, productTypes };
  }
  // 获取产品
  async getProductTypes(limit = 10, offset = 0,type = "") {
    const { ctx } = this;
    const query = {
      order: [["updatedAt", "DESC"]],
      limit,
      offset
    };
    let where = {};
    if (type) {
      where.type = type;
    }
    query.where = where;
    const productTypes = await ctx.model.ProductTypes.findAll(query);
    const count = await this.getProductTypesCount(type); // 获取产品类型总数
    return { count, productTypes };
  }
  async create({ type = "", desc = "" }) {
    const { ctx } = this;
    const productTypesRecord = await ctx.model.ProductTypes.create({
      type,
      desc
    });
    return productTypesRecord;
  }
  async getProductTypesCount(type) {
    const { ctx } = this;
    const query = {
      where: {
        type
      },
      order: [[ 'createdAt', 'DESC' ]],
    };
    const count = await ctx.model.ProductTypes.count(query);
    return count;
  }
  async findById(id) {
    const { ctx } = this;
    const productType = await ctx.model.ProductTypes.findById(id);
    return productType;
  }
  async findByPk(userId) {
    const { ctx } = this;
    const productType = await ctx.model.ProductTypes.findByPk(userId);
    return productType;
  }
}
module.exports = ProductTypes;
