<template>
  <div class="book-wrapper" @click="onClick">
    <div class="cover-wrapper">
      <div class="cover iconfont">&#xe633;</div>
      <div class="choose iconfont" v-if="editMode" :class="{choosed: selected}">&#xe610;</div>
    </div>
    <div class="title">
      {{info.title}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
    selected: Boolean,
    editMode: Boolean
  },
  methods: {
    onClick () {
      if (this.editMode) {
        this.$emit('choose', this.info.id)
      } else {
        this.$router.push(`/ebook/${this.info.fileName}`)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .book-wrapper {
    @include columnCenter;
    .cover-wrapper {
      width: 100%;
      padding-bottom: 136.14%;
      height: 0;
      position: relative;
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(7);
      .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        @include center;
        font-size: px2rem(30);
        color: #333;
      }
      .choose {
        position: absolute;
        bottom: px2rem(10);
        right: px2rem(10);
        width: px2rem(10);
        height: px2rem(10);
        z-index: 10;
        color: #ccc;
        font-size: px2rem(20);
        &.choosed {
          color: #333;
        }
      }
    }
    .title {
      margin-top: px2rem(7);
      box-sizing: border-box;
      padding-left: px2rem(5);
      color: #444;
      width: 100%;
      font-size: px2rem(12);
      font-weight: bold;
      @include ellipsis;
    }
  }
</style>
