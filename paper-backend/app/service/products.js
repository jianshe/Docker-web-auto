'use strict'

const Service = require('egg').Service
class Products extends Service {
  async getTotalProducts() {
    const { ctx } = this
    const productTypeInfos = await ctx.model.ProductTypes.findAll()
    const productInfos = await this.getProductInfo(productTypeInfos)
    return productInfos
  }
  async getProducts(pageIndex = 1, pageSize = 10, productTypeId) {
    let limit = pageSize // 每页显示条数
    let offset = (pageIndex - 1) * pageSize
    const products = await this.getProductsByLimit(offset, limit, productTypeId)
    return products
  }
  async getLatestProducts(pageIndex = 1, pageSize = 10, productTypeId) {
    let limit = pageSize // 每页显示条数
    let offset = (pageIndex - 1) * pageSize
    const products = await this.getProductsByLimit(offset, limit, productTypeId)
    return products
  }
  async getProductInfo(productTypeInfos) {
    const newArr = []
    if (productTypeInfos && productTypeInfos.length > 0) {
      const promises = productTypeInfos.map(async (productTypeInfo, idx) => {
        const obj = {}
        const productTypeId = productTypeInfo.id
        obj.typeId = productTypeInfo.id
        obj.type = productTypeInfo.type
        await this.getProducts(productTypeId).then((res) => {
          obj.count = res.count
          obj.products = res.products
          newArr.push(obj)
        })
      })
      await Promise.all(promises)
    }
    return newArr
  }
  // 分页获取产品数量
  async getProductsByLimit(offset = 0, limit = 10, productTypeId = 1) {
    const { ctx } = this
    let query = {
      order: [['created_at', 'DESC']],
      limit,
      offset,
    }
    if (productTypeId !== -1) {
      query.where = {
        productTypeId,
      }
    }
    const count = await ctx.model.Products.count(query)
    const products = await ctx.model.Products.findAll(query)
    return { count, products }
  }
  // 获取产品数量
  async getProducts(productTypeId = 1) {
    const { ctx } = this
    const query = {
      where: {
        productTypeId,
      },
      order: [['created_at', 'DESC']],
    }
    const count = await ctx.model.Products.count(query)
    const products = await ctx.model.Products.findAll(query)
    return { count, products }
  }
  async create({ productTypeId,content, userId = '', files = [] }) {
    const { ctx } = this
    const productModel = {
      userId: userId,
      productTypeId: productTypeId,
      content: content
    }
    if (files && files.length > 0) {
      const fileSavePromise = files.map(async (file, idx) => {
        productModel.title = file.value
        productModel.url = file.name
        await ctx.model.Products.create(productModel)
        await Promise.all(fileSavePromise)
      })
    }
    return 'save success'
  }
  async findById(id) {
    const { ctx } = this
    const product = await ctx.model.Products.findById(id)
    return product
  }
}
module.exports = Products
