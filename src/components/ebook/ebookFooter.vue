<template>
  <div class="reader-footer-wrapper">
    <div class="reader-footer">
      {{this.progress + '%'}}
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin]
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .reader-footer-wrapper {
    position: fixed;
    bottom: px2rem(10);
    left: 0;
    z-index: 100;
    height: px2rem(20);
    width: 100%;
    @include right;
    box-sizing: border-box;
    padding: px2rem(3) px2rem(10);
    .reader-footer {
      @include center;
      font-size: px2rem(16);
      color: #6d7178;
    }
  }
</style>
