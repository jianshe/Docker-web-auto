<template>
  <div class="products">
    <el-row :gutter="20">
      <el-col :span="7">
        <ProductType @updatePrdTypeId="updatePrdTypeId" />
        <div class="mt">
          <ContractUs />
        </div>
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <ProductsCmp :product-type-id="productTypeId" />
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
import ProductType from '@/components/ProductType.vue'
import ContractUs from '@/components/ContractUs.vue'
import ImgSwiper from '@/components/ImgSwiper.vue'
import ProductsCmp from '@/components/ProductsCmp.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'Products',
  components: {
    ProductType,
    ContractUs,
    ImgSwiper,
    ProductsCmp,
    FooterComponent
  },
  data() {
    return {
      productTypeId: -1,
      productTypeList: []
    }
  },
  mounted() {
    this.productTypeId = parseInt(this.$route.query.id)
  },
  methods: {
    updatePrdTypeId() {
      this.productTypeId = parseInt(this.$route.query.id)
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
}
</style>
