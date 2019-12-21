<template>
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
</template>

<script>
import { getTotalTypeList } from '@/api/productType'

export default {
  name: 'ProductTypes',
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
    },
    goProducts(id) {
      this.$emit('updatePrdTypeId')
      this.$router.push({
        path: '/products',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
