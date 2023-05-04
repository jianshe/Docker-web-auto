<template>
  <div class="intro">
    <el-row :gutter="20">
      <el-col :span="7">
        <ProductTypeAndContract />
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <div class="company-detail">
          <p class="title">河南鑫欣纸业有限责任公司</p>
          <div id="zi_gsjj">
            <p
              class="gsnr"
            >河南鑫欣纸业有限责任公司是一家从事生产，加工，销售为一体的企业，主营：柔滋初品牌生活用纸，主要以天然木浆竹浆为原料，公司主要产品有芯小卷纸、无芯小卷纸、面巾纸（盒抽、软抽）、手帕纸、餐巾纸、大盘纸、擦手纸及酒店专用纸等。</p>
            <p
              class="gsnr"
            >公司本着诚信为本、以质量求生存、以信誉谋发展的经营理念。 经过多年的发展和鑫欣人不懈地努力，已形成良好的企业文化。我们一直坚持选用优质的原料确保产品柔韧、洁净、舒适、卫生。</p>
            <p
              class="gsnr"
            >客户的满意就是我们的追求，这也是我们一直坚持和努力奋斗的目标，因此在广大消费者中赢得了良好的口碑。我们将一如既往，不断开拓进取与您携手——共创辉煌。 欢迎社会各界新老客户来电咨询洽谈业务。</p>
            <p class="gsnr">我公司愿与您精诚合作，共同开创美好未来。</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <FooterComponent />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import ProductTypeAndContract from '@/components/ProductTypeAndContract.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'Intro',
  components: { ProductTypeAndContract, ImgSwiper, FooterComponent }
}
</script>
<style lang="scss" scoped>
.intro {
  margin: 0 auto;
  width: 1004px;
  background-color: #fff;
  .company-detail {
    margin-bottom: 30px;
    .title {
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
    }
    font-size: 13px;
    text-align: left;
    .gsnr {
      margin: 10px;
      text-indent: 2em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
