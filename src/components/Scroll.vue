<template>
  <div class="scroll-wrapper" :class="{'no-scroll': ifNoScroll}" @scroll.passive="handleScroll" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import { realPx } from '@/utils/utils'
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    ifNoScroll: {
      type: Boolean,
      default: false
    },
    initPosition: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0
        }
      }
    }
  },
  methods: {
    handleScroll (e) {
      const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$emit('onScroll', offsetY)
    },
    scrollTo (x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y)
    },
    refresh () { // 更新（重新计算）相关样式信息（滚动区高度）
      if (this.$refs.scrollWrapper) {
        this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll) // 并非重复添加
      }
    }
  },
  mounted () {
    this.refresh()
    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollTo(realPx(this.initPosition.x), realPx(this.initPosition.y))
      }, 1)
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/styles/global";

  .scroll-wrapper {
    position: relative;
    z-index: 100;
    width: 100%;
    @include scroll;
    &.no-scroll {
      overflow: hidden;
    }
  }
</style>
