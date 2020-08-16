import {
  getShelf
} from '@/utils/localStorage'
const shelfList = getShelf() || [
  {
    id: 1,
    title: '悟空传',
    fileName: 'wkz',
    type: 1,
    cover: 'blob:http://localhost:8080/34465993-fe8d-4de1-a893-930f69bacc42'
  },
  {
    id: 2,
    title: '分组1',
    type: 2,
    books: [
      {
        id: 3,
        title: '多级目录',
        fileName: 'ml',
        type: 1,
        cover: 'blob:http://localhost:8080/7790d985-732b-4f4e-acd1-f8b2793f7a75'
      }
    ]
  },
  {
    id: 4,
    title: '悟空传',
    fileName: 'wkz',
    type: 1,
    cover: 'blob:http://localhost:8080/34465993-fe8d-4de1-a893-930f69bacc42'
  },
  {
    id: 5,
    title: '分组1',
    type: 2,
    books: [
      {
        id: 6,
        title: '多级目录',
        fileName: 'ml',
        type: 1,
        cover: 'blob:http://localhost:8080/7790d985-732b-4f4e-acd1-f8b2793f7a75'
      }
    ]
  }
]
const shelf = {
  state: {
    shelfList
  },
  mutations: {
    SET_SHELF_LIST: (state, shelfList) => {
      state.shelfList = shelfList
    }
  }
}
export default shelf
