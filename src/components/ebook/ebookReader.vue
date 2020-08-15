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
const DOWNLOAD_URL = '/wkz.epub'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  components: {
    EbookTitle,
    EbookFooter
  },
  methods: {
    initEpub () {
      this.setBook(new Epub(DOWNLOAD_URL))
      this.setRendition(this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        methods: 'default'
      })).then(() => {
        this.rendition.display()
        return this.setThemes(this.rendition.themes)
      }).then(() => {
        console.log(this.themes)
        this.registerTheme()
        this.changeTheme(this.defaultTheme)
        this.changeFontSize(this.defaultFontSize)
      })
      this.book.ready.then(() => {
        this.setNavigation(this.book.navigation)
        console.log(this.navigation)
        return this.book.locations.generate()
      }).then(result => {
        this.setLocations(this.book.locations)
        this.setBookAvailable(true)
      })
    }
  },
  mounted () {
    this.initEpub()
    console.log(DOWNLOAD_URL)
  }
}

</script>

<style lang='scss' scoped>
@import '@/assets/styles/global'
</style>
