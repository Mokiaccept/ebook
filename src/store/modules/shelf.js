import {
  getShelf
} from '@/utils/localStorage'
const shelfList = getShelf() || [
  {
    id: 1,
    title: '悟空传',
    fileName: 'wkz',
    type: 1,
    cover: './img/wkz.jpg'
  },
  {
    id: 2,
    title: '童话',
    type: 2,
    books: [
      {
        id: 3,
        title: '舒克与贝塔全传',
        fileName: 'skybtqz',
        type: 1,
        cover: './img/skybtqz.jpg'
      }, {
        id: 4,
        title: '安徒生童话',
        fileName: 'atsth',
        type: 1,
        cover: './img/atsth.jpg'
      }, {
        id: 5,
        title: '王尔德童话',
        fileName: 'wedth',
        type: 1,
        cover: './img/wedth.jpg'
      }
    ]
  },
  {
    id: 6,
    title: '欧洲文学',
    type: 2,
    books: [
      {
        id: 7,
        title: '巴黎圣母院',
        fileName: 'blsmy',
        type: 1,
        cover: './img/blsmy.jpg'
      }, {
        id: 8,
        title: '傲慢与偏见',
        fileName: 'amypj',
        type: 1,
        cover: './img/amypj.jpg'
      }, {
        id: 9,
        title: '悲惨世界',
        fileName: 'bcsj',
        type: 1,
        cover: './img/bcsj.jpg'
      }, {
        id: 10,
        title: '动物庄园',
        fileName: 'dwzy',
        type: 1,
        cover: './img/dwzy.jpg'
      }, {
        id: 11,
        title: '莫泊桑短篇小说精选集',
        fileName: 'mbsdpxs',
        type: 1,
        cover: './img/mbsdpxs.jpg'
      }, {
        id: 12,
        title: '福尔摩斯探案全集',
        fileName: 'fems',
        type: 1,
        cover: './img/fems.jpg'
      }
    ]
  }, {
    id: 13,
    title: '白夜行',
    fileName: 'byx',
    type: 1,
    cover: './img/byx.jpg'
  }, {
    id: 14,
    title: '百年孤独',
    fileName: 'bngd',
    type: 1,
    cover: './img/bngd.jpg'
  }, {
    id: 15,
    title: '草房子',
    fileName: 'cfz',
    type: 1,
    cover: './img/cfz.jpg'
  }, {
    id: 16,
    title: '三体（全）',
    fileName: 'stqj',
    type: 1,
    cover: './img/stqj.jpg'
  }, {
    id: 17,
    title: '活着',
    fileName: 'hz',
    type: 1,
    cover: './img/hz.jpg'
  }, {
    id: 18,
    title: '新东方GRE词汇精选',
    fileName: 'gre',
    type: 1,
    cover: './img/gre.jpg'
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
