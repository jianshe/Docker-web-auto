import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Intro from './views/Intro.vue'
import Products from './views/Products'
import EngineerCase from './views/EngineerCase'
import News from './views/News'
import NewDetail from './views/NewDetail'
import Knowledge from './views/Knowledge'
import KnowledgeInfo from './views/KnowledgeInfo'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  hash: true,
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        // 页面标题title
        title: '卫生纸网站首页'
      }
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
      meta: {
        // 页面标题title
        title: '公司简介页面'
      }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: {
        // 页面标题title
        title: '产品中心页面'
      }
    },
    {
      path: '/engineerCase',
      name: 'engineerCase',
      component: EngineerCase,
      meta: {
        // 页面标题title
        title: '工程案例页面'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      children: [
        {
          path: '/news:id',
          component: NewDetail
        }
      ]
      // children这是嵌套的部分
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: Knowledge,
      meta: {
        // 页面标题title
        title: '行业知识列表页'
      }
    },
    {
      path: '/knowledge/:id',
      name: 'knowledgeInfo',
      component: KnowledgeInfo,
      meta: {
        // 页面标题title
        title: '行业知识详情页'
      }
    },
    {
      path: '/news/:id',
      name: 'newDetail',
      component: NewDetail,
      meta: {
        // 页面标题title
        title: '新闻动态详情页'
      }
    }
  ]
})

