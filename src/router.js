import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shelf',
    component: resolve => require(['@/views/shelf/index.vue'], resolve)
  },
  {
    path: '/ebook',
    name: 'reader',
    component: resolve => require(['@/views/ebook/index.vue'], resolve),
    children: [{
      path: ':fileName',
      component: resolve => require(['@/components/ebook/ebookReader.vue'], resolve)
    }]
  },
  {
    path: '/group/:id',
    name: 'group',
    component: resolve => require(['@/views/shelf/group.vue'], resolve)
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
