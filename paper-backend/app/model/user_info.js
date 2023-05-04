'use strict';
const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const UserInfo = app.model.define(
    'user_info',
    {
      id: { type: INTEGER, primaryKey: true, comment: '用户ID' },
      role: {
        type: INTEGER,
        comment:
          '用户角色ID，1毕业生，2在校生，3教师，4企业用户，5运营管理员，6学校管理员，7企业管理员，8超级管理员',
      },
      username: { type: STRING, comment: '用户真实姓名' },
      nickName: { type: STRING, comment: '用户昵称' },
      avatar: { type: STRING, comment: '用户头像url' },
    },
    {
      paranoid: true,
      underscored: false,
    }
  );
  // UserInfo.associate = function() {
  //   app.model.UserInfo.belongsTo(app.model.User, { as: 'info', foreignKey: 'id' });
  // };
  UserInfo.sync();
  return UserInfo;
};
