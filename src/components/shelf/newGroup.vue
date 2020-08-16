<template>
  <div class="new-group-wrapper">
    <transition name="fade">
      <div class="new-group" v-if="showNewGroup">
        <div class="title">新建分组</div>
        <div class="input-wrapper">
          <div class="input-title">分组名：</div>
          <input class="input" type="text" v-model="input"/>
        </div>
        <div class="submit" @click="onSubmit">确定</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="showNewGroup" @click="$emit('close')"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showNewGroup: Boolean
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', this.input)
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .new-group-wrapper {
    width: 100%;
    height: 100%;
    .new-group {
      position: fixed;
      width: 60%;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 201;
      background: white;
      border-radius: px2rem(10);
      overflow: hidden;
      .title {
        height: px2rem(70);
        width: 100%;
        box-sizing: border-box;
        padding: px2rem(30) px2rem(20);
        color: #333;
        font-size: px2rem(22);
        @include center;
        font-weight: bold;
      }
      .input-wrapper {
        width: 100%;
        height: px2rem(50);
        box-sizing: border-box;
        padding: px2rem(15) px2rem(20);
        @include columnCenter;
        .input-title {
          height: px2rem(10);
          @include left;
          color: #333;
          font-size: px2rem(10);
          width: 100%;
        }
        .input {
          margin-top: px2rem(10);
          margin-bottom: px2rem(10);
          display: block;
          box-sizing: border-box;
          width: 100%;
          padding: px2rem(10) 0;
          border: none;
          border-bottom: px2rem(1) solid #eee;
          font-size: px2rem(16);
          height: px2rem(20);
          &:focus {
            outline: none;
          }
        }
      }
      .submit {
        width: 100%;
        height: px2rem(44);
        background: #4aabff;
        color: #fff;
        font-size: px2rem(14);
        @include center;
      }
    }
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .15);
      z-index: 200;
    }
  }
</style>
