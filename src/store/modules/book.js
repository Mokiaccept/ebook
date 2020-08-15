const book = {
  state: {
    ifShowHeaderAndMenu: 'false',
    defaultFontSize: 20,
    chooseId: -1,
    defaultTheme: 0,
    progress: 0,
    book: null,
    rendition: null,
    themes: null,
    locations: null,
    bookAvailable: false,
    navigation: null,
    section: 1,
    contentList: []
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
    }
  }
}
export default book
