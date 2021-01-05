import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Intro from './views/Intro.vue'
import Products from './views/Products'
import ProductDetail from './views/ProductDetail'
import EngineerCase from './views/EngineerCase'
import EngineerCaseDetail from './views/EngineerCaseDetail'
import News from './views/News'
import NewDetail from './views/NewDetail'
import Knowledge from './views/Knowledge'
import KnowledgeInfo from './views/KnowledgeInfo'
import Contract from './views/Contract'
import Iframe from './views/Iframe'
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
      },
      children: [
        {
          path: '/products:id',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/engineerCase',
      name: 'engineerCase',
      component: EngineerCase,
      meta: {
        // 页面标题title
        title: '工程案例页面'
      },
      children: [
        {
          path: '/engineerCase:id',
          component: EngineerCaseDetail
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: News
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
      path: '/products/:id(\\d+)',
      name: 'productDetail',
      component: ProductDetail,
      meta: {
        // 页面标题title
        title: '产品详情页'
      }
    },
    {
      path: '/engineerCase/:id(\\d+)',
      name: 'engineerCaseDetail',
      component: EngineerCaseDetail,
      meta: {
        // 页面标题title
        title: '工程案例详情页'
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
    },
    {
      path: '/contract',
      name: 'contract',
      component: Contract,
      meta: {
        // 页面标题title
        title: '联系我们'
      }
    },
    {
      path: '/iframe',
      name: 'iframe',
      component: Iframe,
      meta: {
        title: '内嵌'
      }
    }
  ]
})

