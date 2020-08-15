const getters = {
  ifShowHeaderAndMenu: state => state.book.ifShowHeaderAndMenu,
  defaultFontSize: state => state.book.defaultFontSize,
  chooseId: state => state.book.chooseId,
  defaultTheme: state => state.book.defaultTheme,
  progress: state => state.book.progress,
  book: state => state.book.book,
  rendition: state => state.book.rendition,
  themes: state => state.book.themes,
  locations: state => state.book.locations,
  bookAvailable: state => state.book.bookAvailable,
  navigation: state => state.book.navigation,
  section: state => state.book.section
}
export default getters