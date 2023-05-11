<template>
  <div>
    <sub-nav-banner />
    <div class="pubCon newsCon">
      <div class="pubTit">
        <h2>新闻动态</h2>
        <h3>NEWS</h3>
      </div>
      <div class="box" v-for="item in newsList" :key="item.id">
        <a href="###"
          ><h3>{{ item.title }}</h3></a
        >
        <p>{{ item.content }}</p>
        <div class="bottom">
          <span>{{ item.showTime }}</span>
          <i class="fa fa-eye"> {{ item.views }}</i>
        </div>
      </div>
      <div class="news-page-con">
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubNavBanner from "@/components/banner/SubNavBanner";
import scrollRevealMixin from "@/mixin/scrollRevealMixin.js";
import { fetchNewsList, updateNewViews } from '@/api/news'
import { formatTimeToStr } from '@/utils/index.js'
export default {
  components: { SubNavBanner },
  mixins: [scrollRevealMixin],
  name: "NewsComp",
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      newId: -1,
      views: 0,
      isNoData: false,
      newsList: [],
    };
  },
  mounted() {
    this.fetchNewsList();
  },
  methods: {
    goDetail(id) {
      this.newId = id;
      this.updateNewViews();
      this.$router.push({ path: "/news/" + id });
    },
    updateNewViews() {
      const params = {
        id: this.newId,
      };
      updateNewViews(params).then((res) => {
        if (res.code === 0) {
          this.views++;
        }
      });
    },
    fetchNewsList() {
      const params = {
        page: this.page,
        limit: this.limit,
      };
      fetchNewsList(params).then((res) => {
        if (res.code === 0) {
          const data = res.data;
          this.total = res.data.count;
          const news = data.news;
          if (news && news.length > 0) {
            this.isNoData = false;
            this.newsList = this.formateNews(news);
          } else {
            this.isNoData = true;
          }
        }
      });
    },
    formateNews(news) {
      news.forEach((item) => {
        item.showTime = formatTimeToStr(item.updatedAt, "yyyy-MM-dd hh:mm:ss");
      });
      return news;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.fetchNewsList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchNewsList();
    },
  },
};
</script>

<style scoped>
.newsCon {
  max-width: 950px;
  margin: auto;
}
.newsCon .box {
  border-bottom: 1px solid #f5f5f5;
  width: 90%;
  margin: auto auto 50px auto;
}
.newsCon .box a {
  text-decoration: none;
}
.newsCon .box a:hover {
  text-decoration: underline;
  color: #333333;
}
.newsCon .box h3 {
  color: #333333;
  font-size: 16px;
  padding: 8px 0px;
}
.newsCon .box p {
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
.newsCon .box .bottom {
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
.newsCon .page {
  padding: 0 0 80px;
  text-align: center;
}
.newsCon .page a {
  border: 1px solid #aaaaaa;
  padding: 8px 15px;
  border-radius: 3px;
  color: #aaaaaa;
  text-decoration: none;
}
</style>
