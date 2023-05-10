<template>
  <div class="contract-info">
    <el-row :gutter="20">
      <el-col :span="7">
        <ProductTypeAndContract />
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <div class="contract-ignore">
          <div class="detail">
            <p class="lxtit" />
            <p class="lxnr">公司名称: 公司名称</p>
            <p class="lxnr">联系人: 李涛</p>
            <p class="lxnr">电话: xxxx-xxxxxxx</p>
            <p class="lxnr">手机 139-037-603-89</p>
            <p class="lxnr">地址：河南省息县化肥厂北门曹园新村对面</p>
          </div>
          <div class="image">
            <img src="../assets/contract.jpg">
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
  name: 'Contract',
  components: { ProductTypeAndContract, ImgSwiper, FooterComponent }
}
</script>
<style lang="scss">
.contract-info {
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
  .contract-ignore {
    overflow: hidden;
    .detail {
      float: left;
      text-align: left;
      margin-top: 30px;
      line-height: 30px;
      margin-left: 30px;
    }
    .image {
      float: right;
      margin-right: 80px;
      padding: 10px;
      margin-top: 26px;
      img {
        height: 140px;
        width: 100%;
      }
    }
  }
}
</style>
