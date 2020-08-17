import { FONT_SIZE_LIST, themeList } from './bookConfig'
import { mapGetters, mapActions } from 'vuex'
import { px2rem, flatten, deepClone } from './utils'
import {
  saveLocation,
  saveDefaultFontSize,
  saveDefaultTheme
} from './localStorage'
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
      'contentList',
      'metadata',
      'cover',
      'showInfo'
    ]),
    minimumFontSize () {
      return px2rem(this.fontList[0].fontSize) + 'rem'
    },
    maximumFontSize () {
      return px2rem(this.fontList[this.fontList.length - 1].fontSize) + 'rem'
    },
    getSectionName () {
      if (this.section) {
        if (this.contentList.length && this.contentList[this.section]) {
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
      'setContentList',
      'setMetadata',
      'setCover',
      'setShowInfo'
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
      saveDefaultFontSize(fontSize)
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
      saveDefaultTheme(index)
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
      this.$forceUpdate()
      const currentLocation = this.rendition.currentLocation()
      if (currentLocation.start && this.locations) {
        saveLocation(this.$route.params.fileName, currentLocation.start.cfi)
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
      this.setContentList(flatten(Array.prototype.slice.call(this.navigation.toc))).then(() => {
        // console.log(this.contentList)
      })
    },
    toggleShowInfo () {
      this.setShowInfo(!this.showInfo)
    }
  }
}
export const shelfMixin = {
  computed: {
    ...mapGetters([
      'shelfList'
    ]),
    groupList () {
      return this.shelfList.filter(item => {
        return item.type === 2
      })
    }
  },
  data () {
    return {
      editMode: false,
      selectedList: [],
      menuList: [
        {
          icon: '&#xe60e;',
          title: '缓存书籍',
          important: false,
          emit: 'download'
        }, {
          icon: '&#xe602;',
          title: '移动到...',
          important: false,
          emit: 'move'
        }, {
          icon: '&#xe60a;',
          title: '移出书架',
          important: true,
          emit: 'delete'
        }
      ],
      showMoveTo: false,
      showNewGroup: false,
      popupTitle: '',
      popupOptions: [],
      showPopup: false
    }
  },
  methods: {
    ...mapActions([
      'setShelfList'
    ]),
    onEdit () {
      this.editMode = true
    },
    onCancel () {
      this.editMode = false
      this.selectedList = []
    },
    onChoose (id) {
      if (this.selectedList.indexOf(id) > -1) {
        this.selectedList = this.selectedList.filter(item => {
          return item !== id
        })
      } else {
        this.selectedList.push(id)
      }
    },
    onMove () {
      this.showMoveTo = true
    },
    onMoveToClose () {
      this.showMoveTo = false
    },
    onNewGroup () {
      this.onMoveToClose()
      this.showNewGroup = true
    },
    onMoveTo (id) {
      let list = deepClone(this.shelfList)
      const books = []
      list = list.filter(item => {
        if (item.type === 1) {
          if (this.selectedList.indexOf(item.id) === -1) {
            return true
          } else {
            books.push(item)
            return false
          }
        } else {
          item.books = item.books.filter(book => {
            if (this.selectedList.indexOf(book.id) === -1) {
              return true
            } else {
              books.push(book)
              return false
            }
          })
          return true
        }
      })
      for (let i = 0; i < list.length; i++) {
        if (list[i].type === 2 && list[i].id === id) {
          list[i].books = list[i].books.concat(books)
        }
      }
      this.setShelfList(list)
      this.onCancel()
      this.onMoveToClose()
    },
    onNewGroupClose () {
      this.showNewGroup = false
    },
    onCreateGroup () {
    },
    onDelete () {
      this.showPopup = true
      this.popupTitle = '是否将所选书籍移出书架？'
      this.popupOptions = [{
        title: '移出',
        important: true,
        emit: 'delete'
      }, {
        title: '取消',
        important: false,
        emit: 'close'
      }]
    },
    hidePopup () {
      this.showPopup = false
    },
    deleteBook (id, cb) {
      this.setShelfList(this.shelfList.filter(item => {
        if (item.type === 1) {
          if (item.id === id) cb(item)
          return item.id !== id
        }
        item.books = item.books.filter(book => {
          if (book.id === id) cb(book)
          return book.id !== id
        })
        return true
      }))
    },
    deleteSelectedBooks () {
      this.selectedList.forEach(id => {
        this.deleteBook(id)
      })
      this.hidePopup()
      this.onCancel()
    }
  }
}
