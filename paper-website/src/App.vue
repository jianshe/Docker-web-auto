<template>
  <div id="app">
    <div id="header-bg">
      <div id="head">
        <p class="title">公司名称</p>
        <div class="tel">
          <p>联系我们：xxxx-xxxxxxx</p>
        </div>
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
          <li>
            <router-link to="/contract">联系我们</router-link>
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
        color: #111;
        letter-spacing: 0;
        text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
          0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
          0px 8px 7px #001135;

        text-shadow: #f3f3f3 1px 1px 0px, #b2b2b2 1px 2px 0;
        text-align: left;
        font-size: 36px;
        padding-top: 30px;
        font-weight: bold;
        letter-spacing: 8px;
        padding-bottom: 30px;
        margin-left: 290px;
        white-space: nowrap;
      }
      .tel {
        position: absolute;
        top: 40px;
        right: 150px;
        color: #444;
        font-size: 14px;
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
