<template>
  <div class="footer-con">
    <div class="f_wz">
      <div class="version">
        <span>Copyright © All Rights Reserved&nbsp;公司名称</span>
      </div>首页关键词：xxx,xxxxx,xxxxx,xxxx,xxxx
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style lang="scss">
.footer-con {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
  background: url('../assets/xx.jpg') no-repeat top;
  font-size: 14px;

  p {
    &.f_wz {
      line-height: 24px;
    }
    &.zf_wz {
      line-height: 24px;
      padding-top: 10px;
      a {
        padding-right: 2px;
      }
    }
  }
}
</style>
