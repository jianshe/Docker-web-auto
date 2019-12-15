<template>
  <div class="contractus">
    <div class="contract-con">
      <p class="lxtit" />
      <p class="lxnr">公司名称：河南鑫欣纸业有限责任公司</p>
      <p class="lxnr">联系人：未知</p>
      <p class="lxnr">Q Q:未知</p>
      <p class="lxnr">手机：151312--789</p>
      <p class="lxnr">地址：河南鑫欣纸业有限责任公司</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contract'
}
</script>

<style lang="scss">
.contractus {
  .contract-con {
      font-size: 14px;
    text-align: left;
    width: 100%;
    background: url('../assets/lxbg.jpg') no-repeat;
    p {
      &.lxtit {
        background: url('../assets/lxtit.jpg') no-repeat;
        height: 44px;
      }
      &.lxnr {
        line-height: 30px;
        margin-left: 10px;
      }
    }
  }
}
</style>
