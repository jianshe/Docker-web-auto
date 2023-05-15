<template>
  <div class="pubBg homeKnowledge">
    <section class="pubCon">
      <div class="pubTit">
        <h2>行业知识</h2>
        <h3>INDUSTRY KNOWLEDGE</h3>
      </div>
      <div class="knowledges">
        <div class="knowledge" v-for="item in knowledgeList" :key="item.id">
          <p class="knowledge-tit">{{ item.title }}</p>
          <p class="knowledge-info">
            {{ item.content }}
          </p>
          <p class="knowledge-date">{{ item.showTime }}</p>
        </div>
      </div>
      <router-link to="/knowledges"
        ><div class="moreBtn">MORE</div></router-link
      >
    </section>
  </div>
</template>

<script>
import { fetchKnowledgeList, updateKnowledgeViews } from "@/api/knowledge";
import { formatTimeToStr } from '@/utils/index.js'
export default {
  data() {
    return {
      page: 1,
      limit: 3,
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
    }
  }
};
</script>

<style scoped>
.pubCon {
  padding-bottom: 50px;
}
.knowledges {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.knowledge {
  width: 30%;
  border-right: 1px solid #dddddd;
  padding: 0 40px;
}
.knowledge:last-child {
  border-right: none;
}

.knowledge .knowledge-tit {
  font-size: 16px;
  line-height: 50px;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.knowledge .knowledge-info {
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
.knowledge .knowledge-date {
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
