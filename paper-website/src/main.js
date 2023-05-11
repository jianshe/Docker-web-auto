import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/reset.scss'
import './styles/resetElement.scss'
import './styles/global.scss';  
import App from './App.vue'
import router from './router'
// import VConsole from 'vconsole';
// let vconsole = new VConsole();
// export default vconsole;

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + "_产品"
  }
  next()
})

// 跳转之后返回顶部
router.afterEach(() => {
  // chrome
  // document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  // window.pageYOffset = 0 
})
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
