import { FONT_SIZE_LIST, themeList } from './bookConfig'
import { mapGetters, mapActions } from 'vuex'
import { px2rem, flatten } from './utils'

export const ebookMixin = {
  data () {
    return {
      fontList: FONT_SIZE_LIST,
      themeList: themeList()
    }
  },
  computed: {
    ...mapGetters([
      'ifShowHeaderAndMenu',
      'defaultFontSize',
      'chooseId',
      'defaultTheme',
      'progress',
      'book',
      'rendition',
      'themes',
      'locations',
      'bookAvailable',
      'navigation',
      'section',
      'contentList'
    ]),
    minimumFontSize () {
      return px2rem(this.fontList[0].fontSize) + 'rem'
    },
    maximumFontSize () {
      return px2rem(this.fontList[this.fontList.length - 1].fontSize) + 'rem'
    },
    getSectionName () {
      if (this.section) {
        if (this.contentList.length) {
          return this.contentList[this.section].label
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'setIfShowHeaderAndMenu',
      'setDefaultFontSize',
      'setChooseId',
      'setDefaultTheme',
      'setProgress',
      'setBook',
      'setRendition',
      'setThemes',
      'setLocations',
      'setBookAvailable',
      'setNavigation',
      'setSection',
      'setContentList'
    ]),
    toggleHeaderAndMenu () {
      this.setIfShowHeaderAndMenu(!this.ifShowHeaderAndMenu)
      if (!this.ifShowHeaderAndMenu) {
        this.switchSetting(-1)
      }
    },
    hideHeaderAndMenu () {
      this.setIfShowHeaderAndMenu(false)
      if (!this.ifShowHeaderAndMenu) {
        this.switchSetting(-1)
      }
    },
    changeFontSize (fontSize) {
      this.setDefaultFontSize(fontSize)
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    switchSetting (id) {
      if (id === this.chooseId) {
        this.setChooseId(-1)
        return
      }
      this.setChooseId(id)
    },
    changeProgress (progress) {
      this.setProgress(progress)
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location).then(() => {
        this.refreshLocation()
      })
    },
    jumpTo (href, cb) {
      this.rendition.display(href).then(() => {
        this.refreshLocation()
      })
      if (cb) cb()
    },
    registerTheme () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    changeTheme (index) {
      this.themes.select(this.themeList[index].name)
      this.setDefaultTheme(index)
    },
    prevPage () {
      this.hideHeaderAndMenu()
      if (this.rendition) {
        this.rendition.prev()
        this.refreshLocation()
      }
    },
    nextPage () {
      this.hideHeaderAndMenu()
      if (this.rendition) {
        this.rendition.next()
        this.refreshLocation()
      }
    },
    refreshLocation () {
      const currentLocation = this.rendition.currentLocation()
      if (currentLocation.start && this.locations) {
        const progress = this.locations.percentageFromCfi(currentLocation.start.cfi)
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
      }
    },
    nextSection () {
      if (this.section + 1 > this.contentList.length - 1) return
      this.setSection(this.section + 1).then(() => {
        this.displaySection()
      })
    },
    prevSection () {
      if (this.section - 1 < 0) return
      this.setSection(this.section - 1).then(() => {
        this.displaySection()
      })
    },
    displaySection () {
      const section = this.book.section(this.section)
      if (section && section.href) {
        this.jumpTo(section.href)
      }
    },
    initContentList () {
      console.log(Array.prototype.slice.call(this.navigation.toc))
      this.setContentList(flatten(Array.prototype.slice.call(this.navigation.toc))).then(() => {
        console.log(this.contentList)
      })
    }
  }
}
