const actions = {
  setIfShowHeaderAndMenu: ({ commit }, ifShowHeaderAndMenu) => {
    return commit('SET_IF_SHOW_HEADER_AND_MENU', ifShowHeaderAndMenu)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_DEFAULT_FONT_SIZE', defaultFontSize)
  },
  setChooseId: ({ commit }, chooseId) => {
    return commit('SET_CHOOSE_ID', chooseId)
  },
  setDefaultTheme: ({ commit }, defaultTheme) => {
    return commit('SET_DEFAULT_THEME', defaultTheme)
  },
  setProgress: ({ commit }, progress) => {
    return commit('SET_PROGRESS', progress)
  }
}

export default actions
