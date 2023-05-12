<template>
    <div>
      <sub-nav-banner />
      <div class="pubCon newDetailCon">
        <div class="pubTit">
          <h2>新闻详情</h2>
          <h3>NEWS</h3>
        </div>
        <div class="newDetail">
          <a href="###"
            ><h3>{{ newDetail.title }}</h3></a
          >
          <p>{{ newDetail.content }}</p>
          <div class="bottom">
            <span>{{ newDetail.showTime }}</span>
            <i class="fa fa-eye"> {{ newDetail.views }}</i>
          </div>
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
  .newDetailCon .box {
    border-bottom: 1px solid #f5f5f5;
    width: 90%;
    margin: auto auto 50px auto;
  }
  .newDetailCon .box a {
    text-decoration: none;
  }
  .newDetailCon .box a:hover {
    text-decoration: underline;
    color: #333333;
  }
  .newDetailCon .box h3 {
    color: #333333;
    font-size: 16px;
    padding: 8px 0px;
  }
  .newDetailCon .box p {
    line-height: 24px;
    color: #aaaaaa;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .newDetailCon .box .bottom {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 30px 0 80px;
    color: #aaaaaa;
    font-size: 12px;
  }
  </style>
  