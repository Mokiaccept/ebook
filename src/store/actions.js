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
  },
  setBook: ({ commit }, book) => {
    return commit('SET_BOOK', book)
  },
  setRendition: ({ commit }, rendition) => {
    return commit('SET_RENDITION', rendition)
  },
  setThemes: ({ commit }, themes) => {
    return commit('SET_THEMES', themes)
  },
  setLocations: ({ commit }, locations) => {
    return commit('SET_LOCATIONS', locations)
  },
  setBookAvailable: ({ commit }, available) => {
    return commit('SET_BOOK_AVAILABLE', available)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  }
}

export default actions
