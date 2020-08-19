<template>
  <div class="ebook-reader-wrapper">
    <ebook-title></ebook-title>
    <div id="read"></div>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import EbookTitle from '@/components/ebook/ebookTitle'
import EbookFooter from '@/components/ebook/ebookFooter'
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  components: {
    EbookTitle,
    EbookFooter
  },
  mounted () {
    this.initEpub()
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .read {
    position: fixed;
    top: px2rem(20);
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100;
  }
</style>
