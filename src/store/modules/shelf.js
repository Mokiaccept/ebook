import {
  getShelf
} from '@/utils/localStorage'

const shelf = {
  state: {
    shelf: getShelf()
  },
  mutations: {
    SET_SHELF: (state, shelf) => {
      state.shelf = shelf
    }
  }
}
export default shelf
