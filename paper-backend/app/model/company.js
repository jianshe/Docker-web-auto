'use strict';
const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Company = app.model.define(
    'company',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), comment: '公司名' },
      info: { type: STRING, comment: '公司介绍' },
      regNum: { type: STRING, comment: '公司经营注册号' },
      address: { type: STRING, comment: '公司地址' },
      property: { type: STRING, comment: '企业性质' },
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
  Company.sync();
  return Company;
};
