<template>
  <div class="product-detail-con">
    <el-row :gutter="20">
      <el-col :span="7">
        <ProductTypeAndContract />
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <div class="product-detail">
          <div id="zi_gsjj">
            <h1>{{ productDetail.title }}</h1>
            <div class="sub-title">
              日期：{{ productDetail.showTime }}
              <span>&nbsp;&nbsp;来源:本站原创</span>&nbsp;&nbsp;
            </div>
            <img class="img-cls" :src="productDetail.url" alt="">
            <p class="gsnr">{{ productDetail.content }}</p>
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
import { getProductDetail } from '@/api/product'
import { formatTimeToStr } from '@/utils/index.js'
import ProductTypeAndContract from '@/components/ProductTypeAndContract.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'ProductDetail',
  components: { ProductTypeAndContract, ImgSwiper, FooterComponent },
  data() {
    return {
      productId: -1,
      productDetail: {}
    }
  },
  mounted() {
    this.productId = parseInt(this.$route.params.id)
    this.getproductDetail()
  },
  methods: {
    getproductDetail() {
      const params = {
        id: this.productId
      }
      getProductDetail(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data) {
            this.productDetail = this.formateDate(data)
          }
        }
      })
    },
    formateDate(data) {
      data.showTime = formatTimeToStr(data.created_at, 'yyyy-MM-dd hh:mm:ss')
      if (data.content) {
        data.content = this.formateContent(data.content)
      }
      return data
    },
    formateContent(content) {
      return content.replace(/\s*/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
.product-detail-con {
  margin: 0 auto;
  width: 1004px;
  background-color: #fff;
  .product-detail {
    font-size: 14px;
    #zi_gsjj {
      margin-top: 10px;
      .img-cls {
        width: 500px;
        height: 300px;
        margin: 20px 0;
      }
      h1 {
        text-align: center;
        font-weight: 800;
        font-size: 16px;
        margin-bottom: 10px;
      }
      .sub-title {
        text-align: center;
        margin-bottom: 5px;
      }
      p {
        &.gsnr {
          line-height: 24px;
          text-indent: 2em;
          padding: 0 10px;
          text-align: left;
          white-space: pre-wrap;
        }
        &.lxnr {
          line-height: 24px;
          padding: 10px 10px 10px 20px;
          width: 300px;
          float: left;
        }
      }
      img {
        &.zlx {
          float: right;
          margin-right: 25px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
