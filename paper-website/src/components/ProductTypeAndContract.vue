<template>
  <div class="productTypes">
    <div class="cplb">
      <p class="lbtit" />
      <dl>
        <dt v-for="(item,index) in productTypeList" :key="index">
          <router-link :to="{ name: 'products', params: { type: item.id } }">{{ item.type }}</router-link>
        </dt>
      </dl>
      <ComtractUs />
    </div>
  </div>
</template>

<script>
import { getTotalTypeList } from '@/api/productType'
import ComtractUs from '@/components/ContractUs.vue'
export default {
  name: 'ProductTypes',
  components: { ComtractUs },
  data() {
    return {
      queryParam: {
        page: 1,
        limit: 8
      },
      productTypeList: []
    }
  },
  mounted() {
    this.getProductTypeList()
  },
  methods: {
    getProductTypeList() {
      getTotalTypeList(this.queryParam).then(res => {
        if (res.code === 0) {
          const data = res.data
          const productTypes = data.productTypes
          if (productTypes.length > 0) {
            this.productTypeList = productTypes.splice(0, 8)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.productTypes {
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
</style>
