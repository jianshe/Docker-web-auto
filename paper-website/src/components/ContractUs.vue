<template>
  <div class="contractus">
    <div class="contract-con">
      <p class="lxtit" />
      <p class="lxnr">联系人: xxx</p>
      <p class="lxnr">电话: xxx-xxxxxxx</p>
      <p class="lxnr">手机 xxx-xxxx-xxxx</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractUs'
}
</script>

<style lang="scss">
.contractus {
  .contract-con {
    font-size: 12px;
    text-align: left;
    width: 100%;
    background: url('../assets/lxbg.jpg') no-repeat;
    background-size: 100% 100%;
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
