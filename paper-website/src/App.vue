<template>
  <div id="app">
    <div id="header-bg">
      <div id="head">
        <div class="title">河南鑫欣纸业有限责任公司</div>
      </div>
    </div>
    <div id="nav-bg">
      <div id="nav">
        <ul>
          <li>
            <router-link to="/" exact>网站首页</router-link>
          </li>
          <li>
            <router-link to="/intro">公司简介</router-link>
          </li>
          <li>
            <router-link to="/products">产品中心</router-link>
          </li>
          <li>
            <router-link to="/engineerCase">工程案例</router-link>
          </li>
          <li>
            <router-link to="/news">新闻动态</router-link>
          </li>
          <li>
            <router-link to="/knowledge">行业知识</router-link>
          </li>
          <div class="clear" />
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto 30px;
  #header-bg {
    margin: 0 auto;
    text-align: left;
    #head {
      margin: 0 auto;
      width: 100%;
      .title {
        text-align: left;
        font-size: 24px;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-left: 290px;
      }
    }
  }
  #nav-bg {
    margin: 0 auto;
    text-align: center;
    background: url('./assets/navbg.jpg') no-repeat center;
    height: 54px;

    #nav {
      margin: 0 auto;
      text-align: left;
      width: 1004px;
      ul {
        margin-left: 70px;
        li {
          float: left;
          width: 95px;
          text-align: center;
          margin-right: 10px;
          list-style-type: none;
          a {
            font-size: 16px;
            font-family: '微软雅黑';
            display: block;
            height: 54px;
            line-height: 43px;
            color: #fff;
          }
          a:hover,
          a:active {
            line-height: 43px;
            background: url('assets/navhover.jpg') no-repeat;
            height: 45px;
            color: #f9fa44;
            text-align: center;
            width: 95px;
          }
        }
      }
    }
  }
  .router-link-active {
    background: url('assets/navhover.jpg') no-repeat;
    color: #f9fa44 !important;
  }
}
</style>
