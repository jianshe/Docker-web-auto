"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  const auth_token_check = app.middleware.authTokenCheck({}, app);
  const auth_token_check_not_get = app.middleware.authTokenCheckNotGet({}, app);
  // 单点登录相关
  router.post("/api/user/login", "api.users.login"); // 登录
  router.get("/api/user/logout", auth_token_check, "api.users.logout"); // 登出
  router.post("/api/user/signup", "api.users.signup"); // 注册
  router.post("/api/user/updatePwd", "api.users.updatePwd"); // 更新密码

  router.get("/api/user/info", auth_token_check, "api.users.info"); // 获取登录状态

  router.resources("/api/companies", auth_token_check_not_get, "api.companies"); // RESTFUL api风格  公司相关接口

  // 帖子相关
  router.post("/api/uploadImg", "api.uploader.uploadImg"); // 上传单张图片
  router.post("/api/uploadImgs", "api.uploader.uploadImgs"); // 上传多张图片
  router.post("/api/uploadImgsForPost", "api.uploader.uploadImgsForPost"); // 上传多张图片,供写帖子时上传图片

  // 产品类型相关
  router.get("/api/productTypes/list", "api.productTypes.index"); // 获取所有产品类型
  router.get("/api/productTypes/getProductType","api.productTypes.findById"); // 获取某一产品类型
  router.get("/api/productTypes/total", "api.productTypes.getTotal"); // 获取所有产品类型,不分页
  router.post("/api/productTypes/create", "api.productTypes.create"); // 添加产品类型
  router.post("/api/productTypes/update", "api.productTypes.update");
  router.get("/api/productTypes/delete", "api.productTypes.destroy");

  // 产品相关
  router.get("/api/products/getLatestProducts", "api.products.index"); // 获取最新产品
  router.get("/api/products/list", "api.products.getTotalProductList"); // 获取所有产品
  router.get("/api/products/getProductList","api.products.getProductList"); // 获取产品列表
  router.post("/api/products/create", "api.products.create"); // 获取最新产品
  router.get("/api/products/delete", "api.products.destroy"); // 删除某一产品
  router.get("/api/products/findById", "api.products.findById"); // 通过id产品
  router.post("/api/products/update", "api.products.updateProduct"); // 更新产品
  // 工程案例相关
  router.get("/api/engineerCase/list", "api.engineerCase.index"); // 获取最新工程案例
  router.post("/api/engineerCase/create", "api.engineerCase.create"); // 添加工程案例
  router.get("/api/engineerCase/delete", "api.engineerCase.destroy"); // 删除工程案例
  router.get("/api/engineerCase/findById", "api.engineerCase.findById"); // 通过id查找工程案例
  router.post("/api/engineerCase/update", "api.engineerCase.updateEngineer"); // 更新工程案例

  // 行业知识相关
  router.get("/api/knowledge/list", "api.knowledge.index");
  router.post("/api/knowledge/create", "api.knowledge.create");
  router.get("/api/knowledge/detail", "api.knowledge.findById");
  router.post("/api/knowledge/update", "api.knowledge.update");
  router.post("/api/knowledge/updateViews","api.knowledge.updateViews")
  router.get("/api/knowledge/delete", "api.knowledge.destroy");

  // 公司新闻相关
  router.get("/api/news/list", "api.news.index");
  router.post("/api/news/create", "api.news.create");
  router.get("/api/news/detail", "api.news.findById");
  router.post("/api/news/update", "api.news.update");
  router.post("/api/news/updateViews","api.news.updateViews")
  router.get("/api/news/delete", "api.news.destroy");
};
