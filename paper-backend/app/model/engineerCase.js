'use strict';

const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const EngineerCase = app.model.define(
    'engineerCase',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: "用户id" },
      title: { type: STRING, comment: '产品标题' },
      content: { type: TEXT, comment: '工程案例内容'},
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
  EngineerCase.sync();
  return EngineerCase;
};
