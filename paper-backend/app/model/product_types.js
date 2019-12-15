'use strict';

const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT,DATE } = app.Sequelize;
  const ProductTypes = app.model.define(
    'product_types',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: { type: STRING, comment: '产品类型' },
      desc: { type: TEXT, comment: '产品描述' },
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
    },
    {
      paranoid: true,
      underscored: false,
    }
  );
  ProductTypes.sync();
  return ProductTypes;
};
