<template>
  <div class="reader-title-wrapper">
    <div class="reader-title">
      {{getSectionName}}
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
  .reader-title-wrapper {
    position: fixed;
    top: px2rem(10);
    left: 0;
    z-index: 100;
    height: px2rem(20);
    line-height: px2rem(20);
    width: 100%;
    @include left;
    box-sizing: border-box;
    padding: px2rem(1) px2rem(10);
    .reader-title {
      font-size: px2rem(16);
      color: #6d7178;
      @include ellipsis;
    }
  }
</style>
