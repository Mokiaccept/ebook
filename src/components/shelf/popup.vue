<template>
  <div class="popup-wrapper">
    <transition name="slide-up">
      <div class="popup" v-if="show">
        <div class="title" v-if="title.length > 0">{{title}}</div>
        <div class="option-wrapper">
          <div class="option"
            v-for="(item, index) in options"
            :key="index"
            :class="{important: item.important}"
            @click="$emit(item.emit)"
          >
            {{item.title}}
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="show" @click="$emit('close')"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    options: Array,
    show: Boolean
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .popup-wrapper {
    width: 100%;
    height: 100%;
    .popup {
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      z-index: 201;
      background: #fff;
      .title {
        height: px2rem(45);
        width: 100%;
        color: #999;
        font-size: px2rem(15);
        box-sizing: border-box;
        padding: px2rem(10);
        @include center;
      }
      .option-wrapper {
        width: 100%;
        .option {
          width: 100%;
          height: px2rem(60);
          @include center;
          color: #666;
          font-size: px2rem(16);
          font-weight: bold;
          &.important {
            color: #ff669f;
          }
        }
      }
    }
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      background: rgba(0, 0, 0, .15);
    }
  }
</style>
