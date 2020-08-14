<template>
  <div class="ebook-setting-theme-wrapper">
    <div class="setting-theme">
      <div class="select" v-for="(item, index) in themeList" :key="index" @click="changeTheme(index)">
        <div class="preview" :style="{'background': item.style.body.background}" :class="{selected: index === defaultTheme}"></div>
        <div class="title" :class="{selected: index === defaultTheme}">{{item.alias}}</div>
      </div>
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
  .ebook-setting-theme-wrapper {
    height: px2rem(70);
    width: 100%;
    position: fixed;
    bottom: px2rem(48);
    left: 0;
    background: white;
    z-index: 101;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme {
      display: flex;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: px2rem(7);
      .select {
        flex: 1;
        height: 100%;
        @include columnCenter;
        box-sizing: border-box;
        padding: 0 px2rem(5);
        .preview {
          border: none;
          width: 100%;
          flex: 1;
          &.selected {
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .1);
            border: px2rem(2) solid #5e6369;
          }
        }
        .title {
          box-sizing: border-box;
          padding-top: px2rem(5);
          font-size: px2rem(14);
          @include center;
          flex: 0 0 px2rem(20);
          color: rgb(155, 151, 151);
          &.selected {
            color: #000;
          }
        }
      }
    }
  }
</style>
