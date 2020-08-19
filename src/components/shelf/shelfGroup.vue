<template>
  <div class="group-wrapper" @click="onClick">
    <div class="books-wrapper">
      <div class="book-item-wrapper" v-if="getList.length > 0">
        <div class="book-item" v-for="(item, index) in getList" :key="index">
          <div class="cover" v-if="item.cover">
            <img :src="item.cover" class="cover-img"/>
          </div>
          <div class="cover iconfont" v-else>&#xe633;</div>
        </div>
      </div>
      <div class="empty iconfont" v-else>&#xe60c;</div>
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
            box-sizing: border-box;
            padding: px2rem(3);
            height: 100%;
            width: 100%;
            @include center;
            font-size: px2rem(16);
            color: #333;
            .cover-img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .empty {
        position: absolute;
        width: 100%;
        height: 100%;
        @include center;
        color: #333;
        font-size: px2rem(30);
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
