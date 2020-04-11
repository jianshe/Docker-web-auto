<template>
  <div class="products">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="productTypes">
          <div class="cplb">
            <p class="lbtit" />
            <dl>
              <dt v-for="(item,index) in productTypeList" :key="index" @click="goProducts(item.id)">
                <a href="javascript:;">{{ item.type }}</a>
              </dt>
            </dl>
          </div>
        </div>
        <div class="mt">
          <ContractUs />
        </div>
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <div class="product-cmp">
          <p class="zijj">{{ desc }}</p>
          <h1 class="title">{{ type }}</h1>
          <!-- <div class="cpcon">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td v-for="(item, index) in products" :key="index">
                    <div class="image">
                      <img
                        :src="item.url"
                        border="0"
                        width="214"
                        height="156"
                        class="pic"
                        :alt="item.title"
                        align="absmiddle"
                      />
                    </div>
                    <div class="t">
                      <span>{{ item.title }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>-->
          <div class="products-list">
            <ul>
              <li v-for="(item,index) in products" :key="index">
                <div class="img-detail" style="cursor:pointer" @click="goProductDetail(item.id)">
                  <img class="cover" :src="item.url">
                  <div class="info">
                    <p>{{ item.title }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="products-page-con">
            <el-pagination
              :total="total"
              :page-size="100"
              :page-sizes="[6, 12, 18, 24]"
              :current-page="page"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <FooterComponent />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ContractUs from '@/components/ContractUs.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { getTotalTypeList } from '@/api/productType'
import { getLatestProducts } from '@/api/product'

export default {
  name: 'Products',
  components: {
    ContractUs,
    ImgSwiper,
    FooterComponent
  },
  data() {
    return {
      typeId: -1,
      productTypeList: [],
      typeListObj: {},
      page: 1,
      type: '',
      desc: '',
      limit: 6,
      products: [],
      total: 0
    }
  },
  mounted() {
    this.getProductTypeList()
  },
  methods: {
    goProductDetail(id) {
      this.$router.push({
        path: '/products/' + id
      })
    },
    getProductsList() {
      const params = {
        page: this.page,
        limit: this.limit,
        productTypeId: this.typeId
      }
      getLatestProducts(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.total = data.count
          const products = data.products
          if (products && products.length > 0) {
            this.products = products
          } else {
            this.products = []
          }
        }
      })
    },
    getProductTypeList() {
      const params = {
        page: 1,
        limit: 6
      }
      getTotalTypeList(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          const productTypes = data.productTypes
          if (productTypes.length > 0) {
            this.type = productTypes[0].type
            this.desc = productTypes[0].desc
            this.productTypeList = productTypes
            this.typeId = productTypes[0].id
            this.getProductsList()
          }
        }
      })
    },
    goProducts(id) {
      this.typeId = id
      this.productTypeList.forEach((item, index) => {
        this.typeListObj[item.id] = item
      })
      this.type = this.typeListObj[id].type
      this.desc = this.typeListObj[id].desc
      this.getProductsList()
    },
    handleSizeChange(val) {
      this.limit = val
      this.getProductsList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getProductsList()
    }
  }
}
</script>
<style lang="scss" scoped>
.products {
  margin: 0 auto;
  text-align: left;
  width: 1004px;
  background-color: #fff;
  .mt {
    margin-top: 30px;
  }
  .zijj {
    margin-top: 10px;
    font-size: 14px;
  }
  .title {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
  }
  .products-list {
    margin-left: 20px;
    min-height: 200px;
    li {
      position: relative;
      margin: 0 20px 20px 0;
      width: 200px;
      background: #fff;
      list-style-type: none;
      display: inline-block;
      box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.06);
      .cover {
        padding: 5px;
        width: 100%;
        height: 160px;
      }
      .info {
        text-align: center;
        margin-bottom: 8px;
        font-size: 14px;
      }
    }
  }
  .productTypes {
    min-height: 330px;
    max-height: 330px;
    .cplb {
      p.lbtit {
        background: url('../assets/lbtit.jpg') no-repeat;
        height: 43px;
      }
      dl {
        min-height: 300px;
        dt {
          border-bottom: 1px solid #456b00;
          a {
            font-size: 14px;
            font-family: '微软雅黑';
            color: #456b00;
            padding: 10px 46px;
            display: block;
            background: url('../assets/linoc.jpg') no-repeat 6px 6px;
            margin-left: 18px;
            text-align: left;
          }
        }
      }
    }
  }
  .products-page-con {
    margin-right: 50px;
  }
}
</style>
