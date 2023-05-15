<template>
  <div>
    <sub-nav-banner />
    <div class="pubCon knowledgeDetailCon">
      <div class="pubTit">
        <h2>新闻动态</h2>
        <h3>NEWS</h3>
      </div>
      <div class="knowledgeDetail">
        <a href="###"
          ><h3>{{ knowledgeDetail.title }}</h3></a
        >
        <p>{{ knowledgeDetail.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SubNavBanner from "@/components/banner/SubNavBanner";
import scrollRevealMixin from "@/mixin/scrollRevealMixin.js";
import { getKnowledgeDetail } from "@/api/knowledge";
import { formatTimeToStr } from "@/utils/index.js";
export default {
  components: { SubNavBanner },
  mixins: [scrollRevealMixin],
  name: "NewsComp",
  data() {
    return {
      knowledgeId: -1,
      knowledgeDetail: {},
    };
  },
  mounted() {
    this.knowledgeId = parseInt(this.$route.params.id);
    this.getKnowledgeDetailFun();
  },
  methods: {
    getKnowledgeDetailFun() {
      const params = {
        id: this.knowledgeId,
      };
      getKnowledgeDetail(params).then((res) => {
        if (res.code === 0) {
          const data = res.data;
          if (data) {
            this.knowledgeDetail = this.formateDate(data);
          }
        }
      });
    },
    formateDate(data) {
      data.showTime = formatTimeToStr(data.updatedAt, "yyyy-MM-dd hh:mm:ss");
      return data;
    },
  },
};
</script>

<style scoped>
.knowledgeDetailCon {
  max-width: 950px;
  margin: auto;
}
.knowledgeDetailCon .knowledgeDetail {
  width: 90%;
  margin: auto auto 50px auto;
}

.knowledgeDetailCon .knowledgeDetail .title {
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  display: block;
}
.knowledgeDetailCon .knowledgeDetail h3 {
  color: #333333;
  font-size: 16px;
  padding: 8px 0px;
  text-align: center;
  margin-bottom: 20px;
}
.knowledgeDetailCon .knowledgeDetail p {
  text-indent:2em;
  line-height: 28px;
  height: auto;
  color: #aaaaaa;
}
</style>
