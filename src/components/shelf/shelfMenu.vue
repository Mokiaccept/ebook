<template>
  <transition name="slide-up">
    <div class="shelf-menu" v-if="editMode">
      <div class="menu-item" v-for="(item, index) in menuList" :key="index" @click="onClick(item.emit)" :style="{opacity: getOpacity}">
        <div class="menu-item-icon iconfont" :class="{important: item.important}" v-html="item.icon"></div>
        <div class="menu-item-title" :class="{important: item.important}">{{item.title}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    menuList: Array,
    editMode: Boolean,
    iconActived: Boolean
  },
  computed: {
    getOpacity () {
      return this.iconActived ? 1 : 0.5
    }
  },
  methods: {
    onClick (emit) {
      if (!this.iconActived) return
      this.$emit(emit)
    }
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .shelf-menu {
    box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, .15);
    position: fixed;
    width: 100%;
    z-index: 101;
    height: px2rem(50);
    bottom: 0;
    left: 0;
    display: flex;
    background: white;
    .menu-item {
      flex: 1;
      height: 100%;
      @include columnCenter;
      color: #666;
      font-size: px2rem(5);
      .menu-item-icon {
        font-size: px2rem(24);
        &.important {
          color: #FF669f;
        }
      }
      .menu-item-title {
        margin-top: px2rem(5);
        &.important {
          color: #FF669f;
        }
      }
    }
  }
</style>
