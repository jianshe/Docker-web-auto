<template>
  <div class="engineer-case-cmp">
    <p class="zijj">工程案例-河南鑫欣纸业有限责任公司是专业的卫生纸生产厂家,主要产品有保定卫生纸,生活用纸,保定抽纸,满城湿巾等,产品价格合理,厂家直销,欢迎选购。</p>
    <center class="title">
      <h1>工程案例</h1>
    </center>
    <div class="cpcon">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
          <tr>
            <td v-for="(item, index) in engineerCaseList" :key="index">
              <div class="image">
                <img
                  :src="item.url"
                  border="0"
                  width="214"
                  height="156"
                  class="pic"
                  :alt="item.title"
                  align="absmiddle"
                >
              </div>
              <div class="t">
                <span>{{ item.title }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="products-page-con">
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
    font-weight: 800;
    font-size: 20px;
  }
  .cpcon {
    td {
      display: inline-block;
      width: 33%;
      margin-bottom: 16px;
    }
  }
  .t {
    text-align: center;
    font-size: 14px;
  }
}
</style>
