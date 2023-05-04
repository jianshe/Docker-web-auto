"use strict";
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Knowledge = app.model.define(
    "knowledge",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: "用户id" },
      title: { type: STRING(30), comment: "知识标题" },
      content: { type: TEXT, comment: "知识内容" },
      views: { type: INTEGER, defaultValue: 0 }
    },
    {
      paranoid: true,
      underscored: false
    }
  );
  // Knowledge.associate = function() {
  //   app.model.Knowledge.belongsTo(app.model.User, { as: 'knowledge', foreignKey: 'id' });
  // };
  Knowledge.sync();
  return Knowledge;
};
