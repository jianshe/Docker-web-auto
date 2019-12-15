"use strict";
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const News = app.model.define(
    "news",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: "用户id" },
      title: { type: STRING(30), comment: "公司新闻标题" },
      content: { type: TEXT, comment: "公司新闻内容" },
      views: { type: INTEGER, defaultValue: 0 }
    },
    {
      paranoid: true,
      underscored: false
    }
  );
  // News.associate = function() {
  //   app.model.News.belongsTo(app.model.User, { as: 'news', foreignKey: 'id' });
  // };
  News.sync();
  return News;
};
