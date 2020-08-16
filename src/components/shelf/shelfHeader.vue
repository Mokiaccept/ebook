<template>
  <div class="shelf-header-wrapper">
    <div class="clear">清除缓存</div>
    <div class="title-wrapper">
      <div class="title">书架</div>
      <div class="count" v-if="editMode">已选择{{count}}本</div>
    </div>
    <div class="edit-wrapper">
      <div class="edit" v-if="!editMode" @click="$emit('edit')">编辑</div>
      <div class="cancel" v-else @click="$emit('cancel')">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editMode: Boolean,
    count: Number
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .shelf-header-wrapper {
    width: 100%;
    height: px2rem(50);
    box-sizing: border-box;
    padding: 0 px2rem(16);
    display: flex;
    .clear {
      width: px2rem(70);
      color: #666;
      font-size: px2rem(14);
      @include center;
      height: 100%;
    }
    .edit, .cancel {
      height: 100%;
      width: px2rem(70);
      color: #666;
      font-size: px2rem(14);
      @include right;
    }
    .title-wrapper {
      flex: 1;
      @include columnCenter;
      .title {
        color: #333;
        font-weight: bold;
        font-size: px2rem(16);
        @include center;
      }
      .count {
        color: #333;
        font-size: px2rem(10);
        @include center;
        margin-top: px2rem(5);
      }
    }
  }
</style>
