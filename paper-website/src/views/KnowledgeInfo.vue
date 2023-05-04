<template>
  <div class="knowledge-info-con">
    <el-row :gutter="20">
      <el-col :span="7">
        <ProductTypeAndContract />
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <div class="knowledge-detail">
          <div id="zi_gsjj">
            <h1>{{ knowledgeDetail.title }}</h1>
            <div class="sub-title">
              日期：{{ knowledgeDetail.showTime }}
              <span>&nbsp;&nbsp;来源:本站原创</span>&nbsp;&nbsp;
              <span>浏览:{{ knowledgeDetail.views }}次</span>
            </div>
            <p class="gsnr">{{ knowledgeDetail.content }}</p>
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
import { getKnowledgeDetail } from '@/api/knowledge'
import { formatTimeToStr } from '@/utils/index.js'
import ProductTypeAndContract from '@/components/ProductTypeAndContract.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'Intro',
  components: { ProductTypeAndContract, ImgSwiper, FooterComponent },
  data() {
    return {
      knowledgeId: -1,
      knowledgeDetail: {}
    }
  },
  mounted() {
    this.knowledgeId = parseInt(this.$route.params.id)
    this.getKnowledgeDetail()
  },
  methods: {
    getKnowledgeDetail() {
      const params = {
        id: this.knowledgeId
      }
      getKnowledgeDetail(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data) {
            this.knowledgeDetail = this.formateDate(data)
          }
        }
      })
    },
    formateDate(data) {
      data.showTime = formatTimeToStr(data.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
.knowledge-info-con {
  margin: 0 auto;
  width: 1004px;
  background-color: #fff;
  .knowledge-detail {
    font-size: 14px;
    #zi_gsjj {
      margin-top: 10px;
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
