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
            <img src="../assets/4.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../assets/5.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../assets/6.jpg">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" />
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
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
      autoplay: {
        disableOnInteraction: false
      },
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
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
    .swiper-container {
      .swiper-button-next:after,
      .swiper-button-prev:after {
        color: #999;
        font-size: 30px;
      }
      &:hover {
        .swiper-button-prev,
        .swiper-button-next {
          display: inline-block;
        }
      }
      .swiper-wrapper {
        img {
          width: 100%;
          height: 330px;
        }
      }
      .swiper-button-prev,
      .swiper-button-next {
        display: none;
      }
    }
  }
}
</style>
