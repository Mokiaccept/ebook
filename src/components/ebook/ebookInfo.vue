<template>
  <div class="info-wrapper">
    <transition name="scale">
      <div class="info" v-if="showInfo">
        <div class="cover-wrapper">
          <img :src="cover" class="cover"/>
        </div>
        <div class="title">
          《{{metadata.title}}》
        </div>
        <div class="creator">
          {{metadata.creator}}
        </div>
        <div class="close"></div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="showInfo" @click="toggleShowInfo"></div>
    </transition>
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
  .info-wrapper {
    width: 100%;
    height: 100%;
    .info {
      position: fixed;
      width: 70%;
      height: 70%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 201;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: px2rem(10);
      box-sizing: border-box;
      border-radius: px2rem(20);
      box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .8);
      overflow: hidden;
      .cover-wrapper {
        height: 0;
        width: 100%;
        padding-bottom: 130.6%;
        overflow: hidden;
        position: relative;
        .cover {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
      .title {
        @include center;
        font-size: px2rem(24);
        margin-top: px2rem(10);
        @include ellipsis;
      }
      .creator {
        margin-top: px2rem(10);
        @include center;
        font-size: px2rem(20);
        @include ellipsis;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      background: rgba(0, 0, 0, .8);
    }
  }
</style>
