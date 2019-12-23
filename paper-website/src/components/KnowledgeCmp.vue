<template>
  <div class="knowledge-con">
    <center>
      <h1>行业知识</h1>
    </center>
    <div class="knowledge">
      <div class="dynamic-list">
        <ul v-if="!isNoData" id="dynamic_list" style="min-height: 180px;">
          <li
            v-for="(item,index) in knowledgeList"
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
    <div class="knowledge-page-con">
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
import { fetchKnowledgeList, updateKnowledgeViews } from '@/api/knowledge'
import { formatTimeToStr } from '@/utils/index.js'
export default {
  name: 'NewsCmp',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      views: 0,
      knowledgeId: -1,
      knowledgeList: [],
      isNoData: false
    }
  },
  mounted() {
    this.fetchKnowledgeList()
  },
  methods: {
    goDetail(id) {
      this.knowledgeId = id
      this.updateKnowledgeViews()
      this.$router.push({ path: '/knowledge/' + id })
    },
    updateKnowledgeViews() {
      const params = {
        id: this.knowledgeId
      }
      updateKnowledgeViews(params).then(res => {
        if (res.code === 0) {
          this.views++
        }
      })
    },
    fetchKnowledgeList() {
      const params = {
        page: this.page,
        limit: this.limit
      }
      fetchKnowledgeList(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.total = res.data.count
          const knowledges = data.knowledges
          if (knowledges && knowledges.length > 0) {
            this.isNoData = false
            this.knowledgeList = this.formateKnowledge(knowledges)
          } else {
            this.isNoData = true
          }
        }
      })
    },
    formateKnowledge(knowledge) {
      knowledge.forEach(item => {
        item.showTime = formatTimeToStr(item.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      })
      return knowledge
    },
    handleSizeChange(val) {
      this.limit = val
      this.fetchKnowledgeList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchKnowledgeList()
    }
  }
}
</script>

<style lang="scss">
.knowledge-con {
  h1 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
  }
  .dynamic-list {
    .common-no-data {
      text-align: center;
      color: #999;
      font-size: 16px;
    }
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
