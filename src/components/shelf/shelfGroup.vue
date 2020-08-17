<template>
  <div class="group-wrapper" @click="onClick">
    <div class="books-wrapper">
      <div class="book-item-wrapper">
        <div class="book-item" v-for="(item, index) in getList" :key="index">
          <div class="cover iconfont">&#xe633;</div>
        </div>
      </div>
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
    editMode: Boolean
  },
  computed: {
    getList () {
      return this.info.books.slice(0, Math.min(this.info.books.length, 9))
    }
  },
  methods: {
    onClick () {
      if (this.editMode) return
      this.$router.push(`/group/${this.info.id}`)
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .group-wrapper {
    @include columnCenter;
    .books-wrapper {
      width: 100%;
      padding-bottom: 136.14%;
      height: 0;
      position: relative;
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(7);
      .book-item-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        .book-item {
          width: 33.3%;
          height: 33.3%;
          .cover {
            height: 100%;
            width: 100%;
            @include center;
            font-size: px2rem(16);
            color: #333;
          }
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
