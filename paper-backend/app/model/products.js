'use strict';

const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const Products = app.model.define(
    'products',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      productTypeId: { type: INTEGER, comment: '产品类型id' },
      userId: { type: INTEGER, comment: "用户id" },
      title: { type: STRING, comment: '产品标题' },
      content: { type: TEXT, comment: '产品描述' },
      url: { type: TEXT, comment: '产品服务器下载地址' },
      createdAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('createdAt')).valueOf();
        },
      },
      updatedAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('updatedAt')).valueOf();
        },
      },
      deletedAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('deletedAt')).valueOf();
        },
      },
    }
  );
  Products.sync();
  return Products;
};
