<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view v-if="isRouterAlive"/>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      transitionName: '',
      isRouterAlive: true
    }
  },
  updated () {
    const href = location.href
    if (href.indexOf('group') > -1) {
      this.transitionName = 'slide-left'
    } else if (href.indexOf('ebook') > -1) {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-right'
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  const html = document.querySelector('html')
  html.style.fontSize = fontSize + 'px'
})
</script>

<style>
  #app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
