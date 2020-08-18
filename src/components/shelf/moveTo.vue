<template>
  <div class="move-to-wrapper">
    <transition name="fade">
      <div class="move-box" v-if="showMoveTo">
        <div class="title">移动书籍</div>
        <div class="new" @click="$emit('new-group')">新建分组</div>
        <div class="move-out" @click="$emit('move-out')" v-if="moveOut">移出分组</div>
        <div class="items">
          <div class="item" v-for="(item, index) in groupList" :key="index" @click="$emit('move-to', item.id)">
            <div class="item-title">{{item.title}}</div>
            <div class="item-check iconfont" v-if="groupId === item.id">&#xe7f6;</div>
          </div>
        </div>
        <div class="cancel" @click="$emit('close')">取消</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="showMoveTo" @click="$emit('close')"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    groupList: Array,
    showMoveTo: Boolean,
    groupId: Number,
    moveOut: {
      type: Boolean,
      default: false
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .move-to-wrapper {
    width: 100%;
    height: 100%;
    .move-box {
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
      .new {
        width: 100%;
        height: px2rem(45);
        box-sizing: border-box;
        padding: px2rem(15) px2rem(20);
        color: #4aabff;
        font-size: px2rem(14);
        line-height: px2rem(15);
      }
      .move-out {
        width: 100%;
        height: px2rem(45);
        box-sizing: border-box;
        padding: px2rem(15) px2rem(20);
        color: #4aabff;
        font-size: px2rem(14);
        line-height: px2rem(15);
      }
      .items {
        width: 100%;
        .item {
          width: 100%;
          height: px2rem(45);
          box-sizing: border-box;
          padding: px2rem(15) px2rem(20);
          display: flex;
          border-top: px2rem(1) solid #eee;
          .item-title {
            height: 100%;
            flex: 1;
            @include left;
            color: #666;
            font-size: px2rem(14);
          }
          .item-check {
            height: 100%;
            width: px2rem(20);
            @include right;
            color: #4aabff;
            font-size: px2rem(14);
          }
        }
      }
      .cancel {
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
