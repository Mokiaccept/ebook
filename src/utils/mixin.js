import { FONT_SIZE_LIST, themeList } from './bookConfig'
import { mapGetters, mapActions } from 'vuex'
import { px2rem } from './utils'

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
      'progress'
    ]),
    minimumFontSize () {
      return px2rem(this.fontList[0].fontSize) + 'rem'
    },
    maximumFontSize () {
      return px2rem(this.fontList[this.fontList.length - 1].fontSize) + 'rem'
    }
  },
  methods: {
    ...mapActions([
      'setIfShowHeaderAndMenu',
      'setDefaultFontSize',
      'setChooseId',
      'setDefaultTheme',
      'setProgress'
    ]),
    toggleHeaderAndMenu () {
      this.setIfShowHeaderAndMenu(!this.ifShowHeaderAndMenu)
      if (!this.ifShowHeaderAndMenu) {
        this.switchSetting(-1)
      }
    },
    changeFontSize (size) {
      this.setDefaultFontSize(size)
    },
    switchSetting (id) {
      if (id === this.chooseId) {
        this.setChooseId(-1)
        return
      }
      this.setChooseId(id)
    },
    changeTheme (theme) {
      this.setDefaultTheme(theme)
    },
    changeProgress (progress) {
      this.setProgress(progress)
    }
  }
}
