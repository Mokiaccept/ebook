<template>
  <div class="ebook-setting-progress-wrapper">
    <div class="setting-progress">
      <div class="progress-wrapper">
        <div class="iconfont icon-left" @click="prevSection">&#xe600;</div>
        <input class="progress" type="range"
                max="100"
                min="0"
                step="1"
                @input="onProgressInput($event.target.value)"
                @change="changeProgress($event.target.value)"
                :value="progress"
                :disabled="!bookAvailable"
                ref="progress">
        <div class="iconfont icon-right" @click="nextSection">&#xe601;</div>
      </div>
      <div class="text-wrapper">
        <!-- <span>{{progress + '%'}}</span> -->
        <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    onProgressInput (progress) {
      this.$refs.progress.style.backgroundSize = `${progress}% 100%`
      this.setProgress(progress)
    }
  },
  mounted () {
    this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
  },
  watch: {
    progress () {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .ebook-setting-progress-wrapper {
    height: px2rem(70);
    width: 100%;
    position: fixed;
    bottom: px2rem(48);
    left: 0;
    background: white;
    z-index: 101;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      width: 100%;
      height: 100%;
      @include columnCenter;
      .progress-wrapper {
        width: 100%;
        flex: 1;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .iconfont {
          flex: 0 0 px2rem(30);
          font-size: px2rem(16);
          @include center;
        }
        .progress {
          flex: 1;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        text-align: center;
        flex: 0 0 px2rem(20);
      }
    }
  }
</style>
