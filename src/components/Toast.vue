<template>
  <transition name="fade">
    <div class="toast" v-show="showToast">
      <span class="toast-text">{{text}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: String,
    timeout: {
      type: Number,
      default: 1500
    }
  },
  data () {
    return {
      showToast: false,
      task: null
    }
  },
  methods: {
    show () {
      this.showToast = true
      clearTimeout(this.task)
      this.task = setTimeout(() => {
        this.hide()
      }, this.timeout)
    },
    hide () {
      this.showToast = false
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .toast {
    position: fixed;
    z-index: 500;
    color: #eee;
    bottom: px2rem(30);
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: px2rem(12);
    @include center;
    .toast-text {
      background: #000;
      padding: px2rem(5);
      border-radius: px2rem(10);
      overflow: hidden;
    }
  }
</style>
