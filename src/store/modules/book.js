const book = {
  state: {
    ifShowHeaderAndMenu: 'false',
    defaultFontSize: 12,
    chooseId: -1,
    defaultTheme: 0,
    progress: 0
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
    }
  }
}
export default book
