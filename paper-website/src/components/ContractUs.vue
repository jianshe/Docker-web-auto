<template>
  <div class="contractus">
    <div class="contract-con">
      <p class="lxtit" />
      <p class="lxnr">公司名称: 河南鑫欣纸业有限责任公司</p>
      <p class="lxnr">联系人: 李涛</p>
      <p class="lxnr">电话: 0376-5891686</p>
      <p class="lxnr">手机 139-0376-0389</p>
      <p class="lxnr">地址：河南省息县化肥厂北门曹园新村对面</p>
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
