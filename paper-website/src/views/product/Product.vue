<template>
  <div class="product">
    <sub-nav-banner />
    <!-- 内容区域 -->
    <div class="pubCon productCon">
      <div class="pubTit">
        <h2>产品中心</h2>
        <h3>PRODUCT CENTER</h3>
      </div>
      <el-menu
        :default-active="typeId"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item
          :index="productType.id.toString()"
          v-for="(productType, index) in productTypeList"
          :key="index"
          >{{ productType.type }}</el-menu-item
        >
      </el-menu>
      <div class="productBox">
        <template v-if="productList && productList.length > 0">
          <div class="box" v-for="item in productList" :key="item.id">
            <img :src="item.url" />
            <span>{{ item.content }}</span>
          </div>
        </template>

          <p class="empty" v-else>暂无内容</p>
      </div>
      <div class="product-page-con" v-if="total && total > 0">
        <el-pagination
          :total="total"
          :page-size="100"
          :page-sizes="[4, 6, 12, 18, 24]"
          :current-page="page"
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
import { getTotalTypeList } from "@/api/productType";
import { getLatestProducts } from "@/api/product";
export default {
  components: { SubNavBanner },
  mixins: [scrollRevealMixin],
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
      this.productList = [];
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
.el-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.productBox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
  justify-content: flex-start;
  padding: 0 20px;
}
.productBox .empty {
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #666;
  font-size: 13px;
  border-radius: 3px;
  line-height: 1;
}
.productBox .box {
  width: 263px;
  height: 361px;
  margin-bottom: 70px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 20px;
}
.productBox .box:last-child {
  margin-right: 0;
}
.productBox .box img {
  width: 100%;
  height: 100%;
}
.productBox .box span {
  display: block;
  text-align: center;
  padding-top: 20px;
}
</style>
