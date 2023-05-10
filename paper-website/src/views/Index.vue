<template>
  <div class="index">
    <el-row>
      <el-col :span="17">
        <ImgSwiper />
      </el-col>
      <el-col :span="7">
        <ProductType />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <div class="gsjj">
          <p class="gstit">
            <span class="more">
              <router-link to="/Intro">更多 》</router-link>
            </span>
          </p>
          <p
            class="gsnr"
          >公司名称是一家从事生产，加工，销售为一体的企业，主营：柔滋初品牌生活用纸，主要以天然木浆竹浆为原料，公司主要产品有卫生纸、卷筒纸、面巾纸（盒抽、软抽）、手帕纸、方巾纸、大盘纸、擦手纸及酒店专用纸等。</p>
          <p class="gsnr">公司本着诚信为本、以质量求生存、以信誉.....</p>
        </div>
      </el-col>
      <el-col :span="9">
        <div id="xw">
          <p class="xwtit">
            <span class="more">
              <router-link to="/News">更多 》</router-link>
            </span>
          </p>
          <ul>
            <li v-for="(item,index) in newsList" :key="index">
              <span class="time">
                <font>{{ item.showTime }}</font>
              </span>
              <a href="javascript:;" @click="goDetail(item)">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6">
        <ContractUs />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <p class="zstit">
          <span class="more1">
            <router-link to="/Products">
              <img src="../assets/more.jpg">
            </router-link>
          </span>
        </p>
        <div class="products-list">
          <ul>
            <li v-for="(item,index) in productsList" :key="index">
              <div class="cover-wp" @click="goProductDetail(item.id)">
                <a href="javascript:;">
                  <img class="cover" :src="item.url">
                </a>
              </div>
              <!-- <div class="info">
                <p>{{ item.title }}</p>
              </div> -->
            </li>
          </ul>
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
import { fetchList } from '@/api/product'
import { fetchNewsList } from '@/api/news'
import { formatTimeToStr } from '@/utils/index.js'
import ProductType from '@/components/ProductType.vue'
import ContractUs from '@/components/ContractUs.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'Index',
  components: { ProductType, ContractUs, ImgSwiper, FooterComponent },
  data() {
    return {
      productsList: [],
      newsList: [],
      queryParam: {
        page: 1,
        limit: 8
      }
    }
  },
  mounted() {
    this.getNewsList()
    this.getProductList()
  },
  methods: {
    getNewsList() {
      fetchNewsList(this.queryParam).then(res => {
        if (res.code === 0) {
          const data = res.data
          const news = data.news
          if (news.length > 0) {
            this.newsList = this.forMateNews(news).splice(0, 5)
          }
        }
      })
    },
    goProductDetail(id) {
      this.$router.push({ path: '/products/' + id })
    },
    getProductList() {
      fetchList(this.queryParam).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data.length > 0) {
            this.productsList = data[0].products.splice(0, 6)
          }
        }
      })
    },
    goDetail(item) {
      this.$router.push({ path: '/news/' + item.id })
    },
    forMateNews(news) {
      news.forEach(item => {
        item.showTime = formatTimeToStr(item.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      })
      return news
    }
  }
}
</script>
<style lang="scss" scoped>
.index {
  margin: 0 auto;
  text-align: left;
  width: 1004px;
  background: #fff;
  .cplb {
    p.lbtit {
      background: url('../assets/lbtit.jpg') no-repeat;
      height: 43px;
    }
    dl {
      dt {
        border-bottom: 1px solid #456b00;
        a {
          font-size: 14px;
          font-family: '微软雅黑';
          color: #456b00;
          padding: 10px 46px;
          display: block;
          background: url('../assets/linoc.jpg') no-repeat 6px 6px;
          margin-left: 18px;
          text-align: left;
        }
      }
    }
  }
  .gsjj {
    font-size: 13px;
    p {
      &.gstit {
        background: url('../assets/gstit.jpg') no-repeat;
        height: 38px;
        span.more {
          margin-top: 7px;
        }
      }
      &.gsnr {
        line-height: 24px;
        text-indent: 2em;
        padding: 0 10px;
        color: #888773;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  #xw {
    font-size: 13px;
    p {
      &.xwtit {
        background: url('../assets/xwtit.jpg') no-repeat;
        height: 38px;
      }
    }
    ul {
      padding: 10px;
      li {
        margin-right: 10px;
        padding: 5px 2px;
        list-style-type: none;
        line-height: 16px;
        border-bottom: 1px dashed #8b3a28;
        a {
          margin-left: 10px;
          color: #817b5d;
        }
        span {
          &.time {
            float: right;
            margin-right: 8px;
            color: #999;
          }
        }
      }
    }
  }
  span {
    &.more {
      float: right;
      margin-top: 7px;
      a {
        color: 557601;
      }
    }
  }
  p.zstit {
    background: url('../assets/zstit.jpg') no-repeat;
    height: 43px;
    span.more1 {
      float: right;
      margin-right: 30px;
      margin-top: 20px;
      font-size: 14px;
    }
  }
  .products-list {
    margin-left: 30px;
    li {
      position: relative;
      margin: 0 20px 20px 0;
      width: 220px;
      background: #fff;
      list-style-type: none;
      float: left;
      box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.06);
      .cover {
        padding: 5px;
        width: 216px;
        height: 160px;
      }
      .info {
        text-align: center;
        margin-bottom: 8px;
        font-size: 14px;
      }
    }
  }
}
</style>
