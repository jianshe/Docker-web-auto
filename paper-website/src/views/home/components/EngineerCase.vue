<template>
  <div class="pubBg">
    <section class="pubCon engineerCon">
      <div class="pubTit">
        <h2>工程案例</h2>
        <h3>ENGINEERING CASE</h3>
      </div>

      <div class="engineerBox">
        <div v-for="item in engineerCaseList" :key="item.id">
          <img :src="item.img" alt="" />
          <p>
            <span>{{ item.tit }}</span>
          </p>
        </div>
      </div>
      <router-link to="/course"><div class="moreBtn">MORE</div></router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      engineerCaseList: [
        {
          id: "001",
          img: "https://ntemimg.wezhan.cn/contents/sitefiles2038/10193466/images/-38682.png",
          tit: "服装搭配",
        },
        {
          id: "002",
          img: "https://ntemimg.wezhan.cn/contents/sitefiles2038/10193466/images/-38683.png",
          tit: "模特彩妆",
        },
        {
          id: "003",
          img: "https://ntemimg.wezhan.cn/contents/sitefiles2038/10193466/images/-38682.png",
          tit: "服装陈列",
        },
        {
          id: "004",
          img: "https://ntemimg.wezhan.cn/contents/sitefiles2038/10193466/images/-38683.png",
          tit: "视觉营销",
        },
      ],
    };
  },
};
</script>

<style scoped>
.engineerCon {
  padding-bottom: 50px;
}
.engineerBox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
.engineerBox div {
  width: 22%;
  text-align: center;
}
.engineerBox div img {
  width: 263px;
  height: 361px;
}
.engineerBox div span {
  color: #333333;
  line-height: 50px;
}
.moreBtn {
  width: 133px;
  padding: 10px 0;
  border: 1px solid;
  border-color: #b09c70;
  color: #b09c70;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  margin: 50px auto 0 auto;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
.moreBtn:hover {
  background-color: #b09c70;
  color: #f5f5f5;
}

/* 小于1100*/
@media (max-width: 1100px) {
  .engineerBox {
    width: 90%;
    margin: auto;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .engineerBox div {
    width: 48%;
  }
}

/* 小于620*/
@media (max-width: 620px) {
  .engineerBox div {
    width: 100%;
  }
  .engineerBox div img {
    width: 100%;
    height: auto;
  }
}
</style>
