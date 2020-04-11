<template>
  <div class="engineerCase-detail-con">
    <el-row :gutter="20">
      <el-col :span="7">
        <productTypeAndContract />
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <div class="engineerCase-detail">
          <div id="zi_gsjj">
            <h1>{{ engineerCaseDetal.title }}</h1>
            <div class="sub-title">
              日期：{{ engineerCaseDetal.showTime }}
              <span>&nbsp;&nbsp;来源:本站原创</span>&nbsp;&nbsp;
            </div>
            <img class="img-cls" :src="engineerCaseDetal.url" alt="">
            <p class="gsnr">{{ engineerCaseDetal.content }}</p>
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
import { getEngineerCaseDetail } from '@/api/engineerCase'
import { formatTimeToStr } from '@/utils/index.js'
import productTypeAndContract from '@/components/ProductTypeAndContract.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'Intro',
  components: { productTypeAndContract, ImgSwiper, FooterComponent },
  data() {
    return {
      engineerCaseId: -1,
      engineerCaseDetal: {}
    }
  },
  mounted() {
    this.engineerCaseId = parseInt(this.$route.params.id)
    this.getEngineerCaseDetail()
  },
  methods: {
    getEngineerCaseDetail() {
      const params = {
        id: this.engineerCaseId
      }
      getEngineerCaseDetail(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data) {
            this.engineerCaseDetal = this.formateDate(data)
          }
        }
      })
    },
    formateDate(data) {
      data.showTime = formatTimeToStr(data.updatedAt, 'yyyy-MM-dd hh:mm:ss')
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
.engineerCase-detail-con {
  margin: 0 auto;
  width: 1004px;
  background-color: #fff;
  .engineerCase-detail {
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
