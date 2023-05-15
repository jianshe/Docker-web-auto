<template>
  <div>
    <sub-nav-banner />
    <div class="pubCon knowledgeCon">
      <div class="pubTit">
        <h2>行业知识</h2>
        <h3>INDUSTRY KNOWLEDGE</h3>
      </div>
      <div class="box" v-for="item in knowledgeList" :key="item.id">
        <a href="javascript:;" @click="goDetail(item.id)"
          ><h3>{{ item.title }}</h3></a
        >
        <p>{{ item.content }}</p>
        <div class="bottom">
          <span>{{ item.showTime }}</span>
          <i class="fa fa-eye"> {{ item.views }}</i>
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
  </div>
</template>

<script>
import { fetchKnowledgeList, updateKnowledgeViews } from "@/api/knowledge";
import { formatTimeToStr } from '@/utils/index.js'
import SubNavBanner from "@/components/banner/SubNavBanner";
import scrollRevealMixin from "@/mixin/scrollRevealMixin.js";
export default {
  components: { SubNavBanner },
  mixins: [scrollRevealMixin],
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      views: 0,
      knowledgeId: -1,
      knowledgeList: [],
      isNoData: false,
    };
  },
  mounted() {
    this.fetchKnowledgeList();
  },
  methods: {
    goDetail(id) {
      this.knowledgeId = id;
      this.updateKnowledgeViews();
      this.$router.push({ path: "/knowledges/" + id });
    },
    updateKnowledgeViews() {
      const params = {
        id: this.knowledgeId,
      };
      updateKnowledgeViews(params).then((res) => {
        if (res.code === 0) {
          this.views++;
        }
      });
    },
    fetchKnowledgeList() {
      const params = {
        page: this.page,
        limit: this.limit,
      };
      fetchKnowledgeList(params).then((res) => {
        if (res.code === 0) {
          const data = res.data;
          this.total = res.data.count;
          const knowledges = data.knowledges;
          if (knowledges && knowledges.length > 0) {
            this.isNoData = false;
            this.knowledgeList = this.formateKnowledge(knowledges);
          } else {
            this.isNoData = true;
          }
        }
      });
    },
    formateKnowledge(knowledge) {
      knowledge.forEach((item) => {
        item.showTime = formatTimeToStr(item.updatedAt, "yyyy-MM-dd hh:mm:ss");
      });
      return knowledge;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.fetchKnowledgeList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchKnowledgeList();
    },
  }
};
</script>

<style scoped>
.knowledgeCon {
  max-width: 950px;
  margin: auto;
}
.knowledgeCon .box {
  border-bottom: 1px solid #f5f5f5;
  width: 90%;
  margin: auto auto 50px auto;
}
.knowledgeCon .box a {
  text-decoration: none;
}
.knowledgeCon .box a:hover {
  text-decoration: underline;
  color: #333333;
}
.knowledgeCon .box h3 {
  color: #333333;
  font-size: 16px;
  padding: 8px 0px;
}
.knowledgeCon .box p {
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
.knowledgeCon .box .bottom {
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
.knowledgeCon .page {
  padding: 0 0 80px;
  text-align: center;
}
.knowledgeCon .page a {
  border: 1px solid #aaaaaa;
  padding: 8px 15px;
  border-radius: 3px;
  color: #aaaaaa;
  text-decoration: none;
}
</style>
