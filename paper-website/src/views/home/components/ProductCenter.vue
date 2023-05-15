<template>
  <div class="pubBg">
    <section class="pubCon productCon">
      <div class="pubTit">
        <h2>产品中心</h2>
        <h3>PRODUCT CENTER</h3>
      </div>
      <div class="productBox">
        <div v-for="item in productList" :key="item.id">
          <img :src="item.url" alt="" />
          <p>
            <span>{{ item.content }}</span>
          </p>
        </div>
      </div>
      <router-link to="/product"><div class="moreBtn">MORE</div></router-link>
    </section>
  </div>
</template>

<script>
import { getTotalTypeList } from "@/api/productType";
import { getLatestProducts } from "@/api/product";
export default {
  data() {
    return {
      productTypeList: [],
      productList: [],
      typeId: "",
      page: 1,
      limit: 4,
      total: 0,
    };
  },
  methods: {
    getProductsList() {
      const params = {
        page: this.page,
        limit: this.limit,
        productTypeId: this.typeId,
      };
      getLatestProducts(params).then((res) => {
        if (res.code === 0) {
          const data = res.data;
          this.total = data.count;
          const products = data.products;
          if (products && products.length > 0) {
            this.productList = products;
          } else {
            this.productList = [];
          }
        }
      });
    },
    getProductTypeList() {
      const params = {
        page: 1,
        limit: 6,
      };
      getTotalTypeList(params).then((res) => {
        if (res.code === 0) {
          const data = res.data;
          const productTypes = data.productTypes;
          if (productTypes.length > 0) {
            this.productTypeList = productTypes;
            this.typeId = productTypes[0].id + "";
            this.getProductsList();
          }
        }
      });
    },
    handleSelect(val) {
      this.typeId = val + "";
      this.getProductsList();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getProductsList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getProductsList();
    },
  },
  mounted() {
    this.getProductTypeList();
  },
};
</script>

<style scoped>
.productCon {
  padding-bottom: 50px;
}
.productBox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
.productBox div {
  width: 22%;
  text-align: center;
}
.productBox div img {
  width: 263px;
  height: 361px;
}
.productBox div span {
  color: #333333;
  line-height: 50px;
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

/* 小于1100*/
@media (max-width: 1100px) {
  .couBox {
    width: 90%;
    margin: auto;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .couBox div {
    width: 48%;
  }
}

/* 小于620*/
@media (max-width: 620px) {
  .productBox div {
    width: 100%;
  }
  .productBox div img {
    width: 100%;
    height: auto;
  }
}
</style>
