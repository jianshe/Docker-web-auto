<template>
  <div class="engineer-case-cmp">
    <p class="zijj">工程案例-公司名称是专业的卫生纸生产厂家,主要产品有保定卫生纸,生活用纸,保定抽纸,满城湿巾等,产品价格合理,厂家直销,欢迎选购。</p>
    <center class="title">
      <h1>工程案例</h1>
    </center>
    <div class="case-list">
      <ul>
        <li v-for="(item,index) in engineerCaseList" :key="index">
          <div class="cover-wp" @click="goDetail(item.id)">
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
    <div class="engineer-page-con">
      <el-pagination
        :current-page="page"
        :page-sizes="[6, 12, 18, 24]"
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
import { fetchList } from '@/api/engineerCase'
export default {
  name: 'EngineerCaseCmp',
  data() {
    return {
      page: 1,
      limit: 6,
      total: 0,
      engineerCaseList: []
    }
  },
  mounted() {
    this.getEngineerCaseList()
  },
  methods: {
    goDetail(id) {
      this.$router.push({ path: '/engineerCase/' + id })
    },
    getEngineerCaseList() {
      const params = {
        page: this.page,
        limit: this.limit
      }
      fetchList(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.total = res.data.count
          const engineerCase = data.engineerCase
          if (engineerCase && engineerCase.length > 0) {
            this.engineerCaseList = engineerCase
          }
        }
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getEngineerCaseList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getEngineerCaseList()
    }
  }
}
</script>

<style lang="scss">
.engineer-case-cmp {
  .zijj {
    margin-top: 10px;
    font-size: 14px;
  }
  .title {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
  }
  .case-list {
    li {
      position: relative;
      margin: 0 20px 20px 0;
      width: 210px;
      background: #fff;
      list-style-type: none;
      display: inline-block;
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
  .t {
    text-align: center;
    font-size: 14px;
  }
  .engineer-page-con {
    margin-right: 50px;
  }
}
</style>
