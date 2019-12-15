<template>
  <div class="product-cmp">
    <p class="zijj">{{ desc }}</p>
    <h1>{{ type }}</h1>
    <div class="cpcon">
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
</template>

<script>
import { getLatestProducts } from '@/api/product'
import { getProductTypeById } from '@/api/productType'
export default {
  name: 'ProductsCmp',
  props: {
    productTypeId: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data() {
    return {
      page: 1,
      type: '',
      desc: '',
      limit: 6,
      products: [],
      total: 0
    }
  },
  watch: {
    productTypeId(val) {
      if (val !== this.oldProductTypeId) {
        this.getProductTypeById()
        this.getProductsList()
      }
    }
  },
  mounted() {
    // this.getProductTypeById()
    // this.getProductsList()
    this.oldProductTypeId = this.productTypeId
  },
  methods: {
    getProductTypeById() {
      const params = {
        id: this.productTypeId
      }
      getProductTypeById(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data) {
            this.type = data.type
            this.desc = data.desc
          }
        }
      })
    },
    getProductsList() {
      const params = {
        page: this.page,
        limit: this.limit,
        productTypeId: this.productTypeId
      }
      getLatestProducts(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.total = data.count
          const products = data.products
          if (products && products.length > 0) {
            this.products = products
          }
        }
      })
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

<style lang="scss">
.product-cmp {
  .zijj {
    margin-top: 10px;
  }
  h1 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
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
