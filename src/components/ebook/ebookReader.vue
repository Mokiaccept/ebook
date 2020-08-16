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
import {
  getLocation
} from '@/utils/localStorage'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  components: {
    EbookTitle,
    EbookFooter
  },
  methods: {
    initEpub () {
      this.setBook(new Epub(`/${this.$route.params.fileName}.epub`)).then(() => {
        return this.setRendition(this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          methods: 'default'
        }))
      }).then(() => {
        this.rendition.display()
        const location = getLocation(this.$route.params.fileName)
        if (location) this.jumpTo(location)
        return this.setThemes(this.rendition.themes)
      }).then(() => {
        this.registerTheme()
        this.changeTheme(this.defaultTheme)
        this.changeFontSize(this.defaultFontSize)
      })
      this.book.ready.then(() => {
        return this.setNavigation(this.book.navigation)
      }).then(() => {
        this.initContentList()
        return this.book.locations.generate()
      }).then(result => {
        this.setLocations(this.book.locations)
        this.setBookAvailable(true)
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
    }
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
