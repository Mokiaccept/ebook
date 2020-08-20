import { FONT_SIZE_LIST, themeList } from './bookConfig'
import { mapGetters, mapActions } from 'vuex'
import { px2rem, flatten, deepClone } from './utils'
import axios from 'axios'
import {
  setLocalForage,
  getLocalForage,
  removeLocalForage,
  clearLocalForage
} from './localForage.js'
import Epub from 'epubjs'
import {
  getLocation,
  saveLocation,
  saveDefaultFontSize,
  saveDefaultTheme,
  saveShelf,
  clearLocalStorage
} from './localStorage'
export const ebookMixin = {
  inject: ['reload'],
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
    },
    parseBook () {
      this.setRendition(this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        methods: 'default'
      })).then(() => {
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
    },
    async initEpub () {
      let book
      const fileName = this.$route.params.fileName
      book = await getLocalForage(`${fileName}`)
      book = new Epub(book || `/${this.$route.params.fileName}.epub`)
      this.setBook(book).then(this.parseBook)
    }
  }
}
export const shelfMixin = {
  inject: ['reload'],
  computed: {
    ...mapGetters([
      'shelfList'
    ]),
    groupList () {
      return this.shelfList.filter(item => {
        return item.type === 2
      })
    },
    groupInfo () {
      return this.shelfList.filter(item => {
        return String(item.id) === this.$route.params.id
      })[0]
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
      showPopup: false,
      showGroupName: false,
      toastText: ''
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
      saveShelf(list)
      this.onCancel()
      this.onMoveToClose()
      this.toast('书籍移动成功')
    },
    onNewGroupClose () {
      this.showNewGroup = false
    },
    onCreateGroup (name) {
      let max = 0
      this.shelfList.forEach(item => {
        if (item.type === 1) {
          max = Math.max(max, item.id)
        } else {
          max = Math.max(max, item.id)
          item.books.forEach(book => {
            max = Math.max(max, book.id)
          })
        }
      })
      this.setShelfList(this.shelfList.concat({
        id: max + 1,
        title: name,
        type: 2,
        books: []
      })).then(() => {
        this.onMoveTo(max + 1)
      })
      this.onNewGroupClose()
      console.log(this.shelfList)
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
          if (item.id === id && cb) cb(item)
          return item.id !== id
        }
        item.books = item.books.filter(book => {
          if (book.id === id && cb) cb(book)
          return book.id !== id
        })
        return true
      })).then(() => {
        saveShelf(this.shelfList)
      })
    },
    deleteSelectedBooks () {
      this.selectedList.forEach(id => {
        this.deleteBook(id)
      })
      this.hidePopup()
      this.onCancel()
      this.toast('移除书架成功')
    },
    onMoveOut () {
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
      list = list.concat(books)
      this.setShelfList(list)
      saveShelf(list)
      this.onCancel()
      this.onMoveToClose()
      this.toast('移除分组成功')
    },
    onChangeGroup () {
      this.showPopup = true
      this.popupTitle = ''
      this.popupOptions = [{
        title: '修改分组名',
        important: false,
        emit: 'change-name'
      }, {
        title: '删除分组',
        important: true,
        emit: 'delete-group'
      }, {
        title: '取消',
        important: false,
        emit: 'close'
      }]
    },
    onChangeName () {
      this.showGroupName = true
    },
    onChangeGroupName (name) {
      const list = deepClone(this.shelfList)
      list.forEach(item => {
        if (item.id === parseInt(this.$route.params.id)) {
          item.title = name
        }
      })
      this.setShelfList(list)
      saveShelf(list)
      this.onGroupNameClose()
      this.hidePopup()
      this.toast('修改成功')
    },
    onDeleteGroup () {
      this.setShelfList(this.shelfList.filter(item => {
        return item.id !== parseInt(this.$route.params.id)
      })).then(() => {
        saveShelf(this.shelfList)
      })
      this.$router.push('/')
      this.toast('删除成功')
    },
    onGroupNameClose () {
      this.showGroupName = false
    },
    onClear () {
      this.showPopup = true
      this.popupTitle = '清除后书架及所有个人配置都将清空！'
      this.popupOptions = [{
        title: '确定',
        important: true,
        emit: 'clear-cache'
      }, {
        title: '取消',
        important: false,
        emit: 'close'
      }]
    },
    clearCache () {
      clearLocalForage()
      clearLocalStorage()
      location.reload()
    },
    download (fileName) {
      return axios.create({
        baseUrl: '/',
        method: 'get',
        responseType: 'blob',
        timeout: 180 * 1000
      }).get(`${fileName}.epub`).then(res => {
        const blob = new Blob([res.data])
        return setLocalForage(fileName, blob)
      })
    },
    onDownload () {
      this.toast('开始缓存')
      const books = []
      this.selectedList.forEach(id => {
        this.shelfList.forEach(item => {
          if (item.id === id) {
            books.push(item)
          } else if (item.type === 2) {
            item.books.forEach(book => {
              if (book.id === id) {
                books.push(book)
              }
            })
          }
        })
      })
      this.onCancel()
      const tasks = []
      books.forEach(item => {
        getLocalForage(item.fileName).then(book => {
          if (book) return
          tasks.push(this.download(item.fileName))
        })
      })
      Promise.all(tasks).then(() => {
        this.toast('缓存成功')
      })
    },
    toast (text) {
      this.toastText = text
      this.$refs.toast.show()
    }
  }
}
