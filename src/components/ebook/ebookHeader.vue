<template>
  <transition name="slide-down">
    <div class="ebook-header-wrapper">
      <div class="ebook-header">
        <div class="ebook-header-left" @click="$router.push('/')">
          <span class="iconfont icon-back">&#xe611;</span>
        </div>
        <div class="ebook-header-right">
          <span class="iconfont icon-shelf" @click="$router.push('/')">&#xe60a;</span>
          <span class="iconfont icon-more">&#xe657;</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .ebook-header-wrapper {
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    background: white;
    .ebook-header {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 px2rem(5);
      .ebook-header-left {
        width: px2rem(37);
        height: 100%;
        @include center;
      }
      .ebook-header-right {
        flex: 1;
        display: flex;
        height: 100%;
        @include right;
        .iconfont {
          @include center;
          height: 100%;
          padding: px2rem(5);
        }
      }
    }
  }
</style>
