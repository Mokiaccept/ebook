import {
  getDefaultFontSize,
  getDefaultTheme
} from '@/utils/localStorage'
const defaultTheme = getDefaultTheme() || 0
const defaultFontSize = getDefaultFontSize() || 20
const book = {
  state: {
    ifShowHeaderAndMenu: false,
    defaultFontSize,
    chooseId: -1,
    defaultTheme,
    progress: 0,
    book: null,
    rendition: null,
    themes: null,
    locations: null,
    bookAvailable: false,
    navigation: null,
    section: 1,
    contentList: [],
    metadata: null,
    cover: null,
    showInfo: false
  },
  mutations: {
    SET_IF_SHOW_HEADER_AND_MENU: (state, ifShowHeaderAndMenu) => {
      state.ifShowHeaderAndMenu = ifShowHeaderAndMenu
    },
    SET_DEFAULT_FONT_SIZE: (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    SET_CHOOSE_ID: (state, chooseId) => {
      state.chooseId = chooseId
    },
    SET_DEFAULT_THEME: (state, defaultTheme) => {
      state.defaultTheme = defaultTheme
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_BOOK: (state, book) => {
      state.book = book
    },
    SET_RENDITION: (state, rendition) => {
      state.rendition = rendition
    },
    SET_THEMES: (state, themes) => {
      state.themes = themes
    },
    SET_LOCATIONS: (state, locations) => {
      state.locations = locations
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    },
    SET_SECTION: (state, section) => {
      state.section = section
    },
    SET_CONTENT_LIST: (state, contentList) => {
      state.contentList = contentList
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_SHOW_INFO: (state, showInfo) => {
      state.showInfo = showInfo
    }
  }
}
export default book
