import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyload from 'vue-lazyload'
// import i18n from './lang'
import '@/assets/styles/global.scss'
import '@/assets/styles/iconfont.css'
import '@/utils/json'
Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.use(lazyload, {
  error: '/img/loading.png',
  loading: '/img/loading.png'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
