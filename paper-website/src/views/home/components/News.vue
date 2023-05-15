<template>
  <div class="pubBg homeNews">
    <section class="pubCon">
      <div class="pubTit">
        <h2>新闻动态</h2>
        <h3>NEWS TENDENCY</h3>
      </div>
      <div class="news">
        <div class="new" v-for="item in newsList" :key="item.id">
          <p class="new-tit">{{ item.title }}</p>
          <p class="new-info">
            {{ item.content }}
          </p>
          <p class="new-date">{{ item.showTime }}</p>
        </div>
      </div>
      <router-link to="/news"><div class="moreBtn">MORE</div></router-link>
    </section>
  </div>
</template>

<script>
import { fetchNewsList, updateNewViews } from '@/api/news'
import { formatTimeToStr } from '@/utils/index.js'
export default {
  data() {
    return {
      page: 1,
      limit: 3,
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
    }
  },
};
</script>

<style scoped>
.pubCon {
  padding-bottom: 50px;
}
.news {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.new {
  width: 30%;
  border-right: 1px solid #dddddd;
  padding: 0 40px;
}
.new:last-child {
  border-right: none;
}

.new .new-tit {
  font-size: 16px;
  line-height: 50px;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.new .new-info {
  font-size: 14px;
  color: #aaaaaa;
  text-align: left;
  font-weight: normal;
  font-style: normal;
  text-decoration: none;
  line-height: 23px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* -moz-text-overflow: ellipsis; */
  overflow: hidden;
  text-align: justify;
  height: 46px;
}
.new .new-date {
  font-size: 12px;
  color: #aaaaaa;
  line-height: 30px;
}

.moreBtn {
  width: 133px;
  padding: 10px 0;
  border: 1px solid;
  border-color: #b09c70;
  color: #b09c70;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  margin: 50px auto 0 auto;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
.moreBtn:hover {
  background-color: #b09c70;
  color: #f5f5f5;
}

/* 小于768 */
@media (max-width: 768px) {
  .new {
    width: 90%;
    border-right: none;
    padding: 0;
  }
}
</style>
