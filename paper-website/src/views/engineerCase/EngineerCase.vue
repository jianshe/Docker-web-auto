<template>
  <div class="engineerCase">
    <sub-nav-banner />
    <!-- 内容区域 -->
    <div class="pubCon engineerCon">
      <div class="pubTit">
        <h2>工程案例</h2>
        <h3>ENGINEERING CASE</h3>
      </div>
      <div class="engineerBox">
        <div class="box" v-for="item in engineerCaseList" :key="item.id">
          <img :src="item.url" />
          <span>{{ item.content }}</span>
        </div>
      </div>
      <div class="engineer-page-con">
        <el-pagination
          :current-page="page"
          :page-sizes="[4,6, 12, 18, 24]"
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
import { fetchList } from '@/api/engineerCase'

export default {
  components: { SubNavBanner },
  mixins: [scrollRevealMixin],
  data() {
    return {
      page: 1,
      limit: 4,
      total: 0,
      engineerCaseList: []
    };
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
};
</script>

<style scoped>
.engineerBox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  padding: 0 20px;
}
.engineerBox .box {
  width: 263px;
  height: 361px;
  margin-bottom: 70px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.engineerBox .box img {
  width: 100%;
  height: 100%;
}
.engineerBox .box span {
  display: block;
  text-align: center;
  padding-top: 20px;
}
</style>
