<template>
  <div class="ebook-menu-wrapper">
    <transition name="slide-up">
      <ebook-slide v-if="chooseId === 0"></ebook-slide>
      <ebook-setting-progress v-else-if="chooseId === 1"></ebook-setting-progress>
      <ebook-setting-theme v-else-if="chooseId === 2"></ebook-setting-theme>
      <ebook-setting-font v-else-if="chooseId === 3"></ebook-setting-font>
    </transition>
    <transition name="slide-up">
      <div class="ebook-menu" v-show="ifShowHeaderAndMenu" :class="{'el-shadow': chooseId > -1 || !ifShowHeaderAndMenu}">
        <div class="iconfont icon-menu" @click="switchSetting(0)">&#xe603;</div>
        <div class="iconfont icon-progress" @click="switchSetting(1)">&#xe738;</div>
        <div class="iconfont icon-theme" @click="switchSetting(2)">&#xe635;</div>
        <div class="iconfont icon-font" @click="switchSetting(3)">&#xe604;</div>
      </div>
    </transition>
  </div>
</template>

<script>
import EbookSlide from '@/components/ebook/ebookSlide.vue'
import EbookSettingProgress from '@/components/ebook/ebookSettingProgress.vue'
import EbookSettingTheme from '@/components/ebook/ebookSettingTheme.vue'
import EbookSettingFont from '@/components/ebook/ebookSettingFont.vue'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSlide,
    EbookSettingFont,
    EbookSettingProgress,
    EbookSettingTheme
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .ebook-menu-wrapper {
    .ebook-menu {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background: white;
      font-size: px2rem(26);
      box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
      height: px2rem(48);
      display: flex;
      z-index: 102;
      &.el-shadow {
        box-shadow: none;
      }
      .iconfont {
        flex: 1;
        height: 100%;
        z-index: 200;
        @include center;
        &.icon-font {
          font-size: px2rem(22);
        }
        &.icon-theme {
          font-size:px2rem(30);
        }
      }
    }
  }
</style>
