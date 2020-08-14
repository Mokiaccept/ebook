const getters = {
  ifShowHeaderAndMenu: state => state.book.ifShowHeaderAndMenu,
  defaultFontSize: state => state.book.defaultFontSize,
  chooseId: state => state.book.chooseId,
  defaultTheme: state => state.book.defaultTheme,
  progress: state => state.book.progress
}
export default getters
