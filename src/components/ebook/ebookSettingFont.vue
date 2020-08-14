<template>
  <div class="ebook-setting-font-wrapper">
    <div class="setting-font">
      <div class="preview" :style="{'fontSize': minimumFontSize}">A</div>
      <div class="select-wrapper">
        <div class="select" v-for="(item, index) in fontList" :key="index" @click="changeFontSize(item.fontSize)">
          <div class="line"></div>
          <div class="point">
            <div class="circle" v-if="defaultFontSize === item.fontSize">
              <div class="inner"></div>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="preview" :style="{'fontSize': maximumFontSize}">A</div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin]
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .ebook-setting-font-wrapper {
    height: px2rem(60);
    width: 100%;
    position: fixed;
    bottom: px2rem(48);
    left: 0;
    background: white;
    z-index: 101;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-font {
      height: 100%;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: px2rem(7);
      .preview {
        width: px2rem(40);
        height: 100%;
        @include center;
      }
      .select-wrapper {
        flex: 1;
        height: 100%;
        display: flex;
        .select {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          &:first-child {
            .line:first-child {
              opacity: 0;
            }
          }
          &:last-child {
            .line:last-child {
              opacity: 0;
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point {
            width: 0;
            position: relative;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .circle {
              position: absolute;
              top: px2rem(-7);
              left: px2rem(-11);
              border-radius: 50%;
              border: #ccc solid px2rem(1);
              height: px2rem(20);
              width: px2rem(20);
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
              background: white;
              @include center;
              .inner {
                width: px2rem(5);
                height: px2rem(5);
                border-radius: 50%;
                background: black;
              }
            }
          }
        }
      }
    }
  }
</style>
