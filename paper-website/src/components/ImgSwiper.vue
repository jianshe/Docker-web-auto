<template>
  <div class="img-swiper">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../assets/1.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../assets/2.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../assets/3.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../assets/4.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
export default {
  mounted() {
    new Swiper('.swiper-container', {
      effect: 'fade',
      autoplay: true,
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      // 如果需要滚动条
      scrollbar: '.swiper-scrollbar',
      fadeEffect: {
        crossFade: true
      }
    })
  }
}
</script>

<style lang="scss">
.img-swiper {
  .banner {
    padding: 0px;
    width: 100%;
    height: 333px;
    .slides {
      margin: 0px auto;
      width: 100%;
      height: 333px;
      overflow: hidden;
      position: relative;
      .slide-li {
        margin: 0px;
        padding: 0px;
        left: 0px;
        bottom: 0px;
        position: absolute;
      }
      .slide-pic {
        margin: 0px;
        padding: 0px;
        width: 100%;
        overflow: hidden;
        list-style: none;
        img {
          width: 100%;
          height: 333px;
        }
        li {
          display: none;
          .cur {
            display: block;
          }
        }
      }
    }
    .swiper-wrapper {
      img {
        width: 100%;
        height: 330px;
      }
    }
  }
}
</style>
