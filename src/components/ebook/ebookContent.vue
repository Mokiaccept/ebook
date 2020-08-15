<template>
  <div class="content-wrapper">
    <transition name="slide-right">
      <div class="content" v-if="chooseId === 0">
        <scroll class="content-list" v-if="bookAvailable" :top="0" :bottom="0" :initPosition="initPosition">
          <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href, hideHeaderAndMenu)" ref="item">
            <span class="text" :class="{'current': section === index}">{{item.label}}</span>
          </div>
        </scroll>
        <div class="loading" v-else>目录加载中...</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="chooseId === 0" @click="hideHeaderAndMenu"></div>
    </transition>
  </div>

</template>

<script>
import Scroll from '@/components/Scroll'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data () {
    return {
      initPosition: { x: 0, y: 0 }
    }
  },
  updated () {
    if (this.$refs.item && this.$refs.item.length > 0) {
      this.initPosition.y = this.$refs.item[this.section].offsetTop
      console.log(this.initPosition)
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .content-wrapper {
    width: 100%;
    height: 100%;
    .content {
      position: fixed;
      top: 0;
      left: 0;
      width: 80%;
      height: 100%;
      z-index: 201;
      background: #fff;
      .content-list {
        width: 100%;
        height: 100%;
        .content-item {
          width: 100%;
          padding: px2rem(10) px2rem(15);
          border-bottom: px2rem(1) solid #f4f4f4;
          overflow: hidden;
          .text {
            font-size: px2rem(16);
            width: 100%;
            color: #333;
            @include ellipsis;
            &.current {
              color: rgb(81, 79, 194);
            }
          }
        }
      }
      .loading {
        width: 100%;
        height: 100%;
        @include center;
        font-size: px2rem(20);
      }
    }
    .mask {
      background: rgba(0, 0, 0, .8);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
    }
  }
</style>
