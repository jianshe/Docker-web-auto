<template>
  <div>
    <sub-nav-banner />
    <div class="pubCon newDetailCon">
      <div class="pubTit">
        <h2>新闻详情</h2>
        <h3>NEWS</h3>
      </div>
      <div class="newDetail">
        <p class="title">
        <h3>{{ newDetail.title }}</h3>
        </p>
        <p>{{ newDetail.content }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import SubNavBanner from "@/components/banner/SubNavBanner";
import scrollRevealMixin from "@/mixin/scrollRevealMixin.js";
import { getNewDetail } from '@/api/news'
import { formatTimeToStr } from '@/utils/index.js'
export default {
  components: { SubNavBanner },
  mixins: [scrollRevealMixin],
  name: "NewsComp",
  data() {
    return {
      newId: -1,
      newDetail: {}
    }
  },
  mounted() {
    this.newId = parseInt(this.$route.params.id)
    this.getNewDetail()
  },
  methods: {
    getNewDetail() {
      const params = {
        id: this.newId
      }
      getNewDetail(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data) {
            this.newDetail = this.formateDate(data)
          }
        }
      })
    },
    formateDate(data) {
      data.showTime = formatTimeToStr(data.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      return data
    }
  }
};
</script>
  
<style scoped>
.newDetailCon {
  max-width: 950px;
  margin: auto;
}

.newDetailCon .newDetail {
  width: 90%;
  margin: auto auto 50px auto;
}

.newDetailCon .newDetail .title {
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  display: block;
}

.newDetailCon .newDetail h3 {
  color: #333333;
  font-size: 16px;
  padding: 8px 0px;
  text-align: center;
  margin-bottom: 20px;
}

.newDetailCon .newDetail p {
  text-indent: 2em;
  line-height: 28px;
  height: auto;
  color: #aaaaaa;
}</style>
  