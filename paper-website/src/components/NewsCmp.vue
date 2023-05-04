<template>
  <div class="company-news-con">
    <center>
      <h1>公司新闻</h1>
    </center>
    <div class="company-news">
      <div class="dynamic-list">
        <ul v-if="!isNoData" id="dynamic_list" style="min-height: 180px;">
          <li
            v-for="(item,index) in newsList"
            :key="index"
            :class="[index % 2==0 ? 'gray-bg' : '']"
          >
            <a href="javascript:;" @click="goDetail(item.id)">{{ item.title }}</a>
            <a class="date" href="javascript:;" @click="goDetail(item.id)">{{ item.showTime }}</a>
          </li>
        </ul>
        <p v-if="isNoData" class="common-no-data">暂无数据</p>
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
</template>

<script>
import { fetchNewsList, updateNewViews } from '@/api/news'
import { formatTimeToStr } from '@/utils/index.js'
export default {
  name: 'NewsCmp',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      newId: -1,
      views: 0,
      isNoData: false,
      newsList: []
    }
  },
  mounted() {
    this.fetchNewsList()
  },
  methods: {
    goDetail(id) {
      this.newId = id
      this.updateNewViews()
      this.$router.push({ path: '/news/' + id })
    },
    updateNewViews() {
      const params = {
        id: this.newId
      }
      updateNewViews(params).then(res => {
        if (res.code === 0) {
          this.views++
        }
      })
    },
    fetchNewsList() {
      const params = {
        page: this.page,
        limit: this.limit
      }
      fetchNewsList(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.total = res.data.count
          const news = data.news
          if (news && news.length > 0) {
            this.isNoData = false
            this.newsList = this.formateNews(news)
          } else {
            this.isNoData = true
          }
        }
      })
    },
    formateNews(news) {
      news.forEach(item => {
        item.showTime = formatTimeToStr(item.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      })
      return news
    },
    handleSizeChange(val) {
      this.limit = val
      this.fetchNewsList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchNewsList()
    }
  }
}
</script>

<style lang="scss">
.company-news-con {
  center h1 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .common-no-data {
    text-align: center;
    color: #999;
    font-size: 16px;
  }
  .dynamic-list {
    li {
      position: relative;
      list-style-type: none;
      &.gray-bg {
        background: #f5f5f5;
      }

      font-size: 14px;
      padding: 10px 0;
      padding-left: 30px;

      &:before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        background: #2e5795;
        border-radius: 50%;
        left: 15px;
        top: 50%;
      }

      a {
        color: #2e57a2;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 460px;

        &:hover {
          color: #fe3c45;
        }
      }

      .date {
        width: 140px;
        text-align: right;
        margin-right: 10px;
      }
    }
  }
}
</style>
