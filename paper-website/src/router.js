import Vue from 'vue'
import Router from 'vue-router'
import home from "@/views/home/Home"
import about from "@/views/about/About"
// import course from "@/views/course/Course"
// import teacher from "@/views/teacher/Teacher"
import product from "@/views/product/Product"
import engineerCase from "@/views/engineerCase/EngineerCase"
import news from "@/views/news/News"
import newDetail from "@/views/news/NewDetail"
import knowledges from "@/views/knowledges/Knowledges"
import knowledgeDetail from "@/views/knowledges/KnowledgeDetail"
import contact from "@/views/contact/Contact"
import notFind from "@/components/404/NotFind"
Vue.use(Router)
const routes = [
  { path: '', redirect: "/home" },
  { path: '/home', component: home, meta: { title: '首页' } },
  { path: '/about', component: about, meta: { title: '关于我们' } },
  { path: '/product', component: product, meta: { title: '产品中心' } },
  { path: '/engineerCase', component: engineerCase, meta: { title: '工程案例' } },
  { path: '/news', component: news, meta: { title: '新闻动态' } },
  {
    path: '/news/:id',
    name: 'newDetail',
    component: newDetail,
    meta: {
      // 页面标题title
      title: '新闻动态详情页'
    }
  },
  { path: '/knowledges', component: knowledges, meta: { title: '行业知识' } },
  {
    path: '/knowledges/:id',
    name: 'knowledgeDetail',
    component: knowledgeDetail,
    meta: {
      // 页面标题title
      title: '行业知识详情页'
    }
  },
  { path: '/contact', component: contact, meta: { title: '联系我们' } },
  { path: '*', component: notFind, meta: { title: '404' } },
]
export default new Router({
  hash: true,
  base: process.env.BASE_URL,
  routes: routes
})

