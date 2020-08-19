<template>
  <div class="group-header-wrapper">
    <div class="iconfont icon-back" v-if="!editMode" @click="$router.go(-1)">&#xe611;</div>
    <div class="change-name" v-else @click="$emit('change-name')">修改分组名</div>
    <div class="title-wrapper">
      <div class="title">{{title}}</div>
      <div class="count" v-if="editMode">已选择{{count}}本</div>
    </div>
    <div class="edit-wrapper">
      <div class="edit-group" v-if="groupEmpty" @click="$emit('change-group')">修改分组</div>
      <div class="edit" v-else-if="!editMode" @click="$emit('edit')">编辑</div>
      <div class="cancel" v-else @click="$emit('cancel')">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editMode: Boolean,
    count: Number,
    title: String,
    groupEmpty: Boolean
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .group-header-wrapper {
    width: 100%;
    height: px2rem(50);
    box-sizing: border-box;
    padding: 0 px2rem(16);
    display: flex;
    .icon-back {
      width: px2rem(70);
      color: #666;
      font-size: px2rem(19);
      @include left;
      height: 100%;
    }
    .change-name {
      width: px2rem(70);
      color: #666;
      font-size: px2rem(14);
      @include left;
      height: 100%;
    }
    .edit-group, .edit, .cancel {
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
