<template>
  <div class="engineer-case">
    <el-row :gutter="20">
      <el-col :span="7">
        <ProductType />
        <div class="mt">
          <ContractUs />
        </div>
      </el-col>
      <el-col :span="17">
        <ImgSwiper />
        <EngineerCaseCmp />
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
import EngineerCaseCmp from '@/components/EngineerCaseCmp.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'Products',
  components: {
    ProductType,
    ContractUs,
    ImgSwiper,
    EngineerCaseCmp,
    FooterComponent
  }
}
</script>
<style lang="scss" scoped>
.engineer-case {
  margin: 0 auto;
  text-align: left;
  width: 1004px;
  background-color: #fff;
  .mt {
    margin-top: 30px;
  }
}
</style>
