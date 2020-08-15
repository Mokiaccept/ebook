<template>
  <div>
    <ebook-header v-show="ifShowHeaderAndMenu"></ebook-header>
    <router-view></router-view>
    <ebook-menu></ebook-menu>
    <div class="mask">
      <div class="mask-left" @click="prevPage"></div>
      <div class="mask-middle" @click="toggleHeaderAndMenu"></div>
      <div class="mask-right" @click="nextPage"></div>
    </div>
  </div>
</template>

<script>
import EbookHeader from '@/components/ebook/ebookHeader.vue'
import EbookMenu from '@/components/ebook/ebookMenu.vue'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookHeader,
    EbookMenu
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .mask {
    display: flex;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .mask-left {
      width: px2rem(90);
      height: 100%;
    }
    .mask-middle {
      flex: 1;
      height: 100%;
      z-index: 100;
    }
    .mask-right {
      width: px2rem(90);
    }
  }
</style>
