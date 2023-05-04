"use strict";
const dayjs = require("dayjs");
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define(
    "user",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      role: { type: STRING, comment: "用户角色" },
      username: { type: STRING, comment: "用户名" },
      password: { type: STRING, comment: "用户密码" },
     
    },
    {
      timestamps: false
    }
  );
  // User.sync({force: true})
  User.sync();
  return User;
};
