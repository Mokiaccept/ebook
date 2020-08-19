<template>
  <div class="shelf-wrapper">
    <shelf-header
      :editMode="editMode"
      @edit="onEdit"
      @cancel="onCancel"
      :count="selectedList.length"
      @clear="onClear"
    ></shelf-header>
    <scroll :top="50" :bottom="0">
      <div class="item-wrapper">
        <template v-for="(item, index) in shelfList">
          <book v-if="item.type === 1"
            :key="index"
            :info="item"
            class="item"
            :selected="selectedList.indexOf(item.id) > -1"
            @choose="onChoose"
            :editMode="editMode"
          ></book>
          <group
            v-if="item.type === 2"
            :key="index"
            :info="item"
            class="item"
            :editMode="editMode"
          ></group>
        </template>
      </div>
    </scroll>
    <shelf-menu
      :menuList="menuList"
      :editMode="editMode"
      :iconActived="selectedList.length > 0"
      @move="onMove"
      @delete="onDelete"
      @download="onDownload"
    ></shelf-menu>
    <move-to
      :groupList="groupList"
      :showMoveTo="showMoveTo"
      @close="onMoveToClose"
      @new-group="onNewGroup"
      @move-to="onMoveTo"
    ></move-to>
    <new-group
      :showInputBox="showNewGroup"
      :title="'新建分组'"
      :inputTitle="'分组名：'"
      @close="onNewGroupClose"
      @submit="onCreateGroup"
    ></new-group>
    <popup
      :title="popupTitle"
      :options="popupOptions"
      :show="showPopup"
      @delete="deleteSelectedBooks"
      @close="hidePopup"
      @clear-cache="clearCache"
    ></popup>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
import { shelfMixin } from '@/utils/mixin'
import ShelfHeader from '@/components/shelf/shelfHeader.vue'
import Scroll from '@/components/Scroll'
import Book from '@/components/shelf/shelfBook'
import Group from '@/components/shelf/shelfGroup'
import ShelfMenu from '@/components/shelf/shelfMenu.vue'
import MoveTo from '@/components/shelf/moveTo.vue'
import NewGroup from '@/components/shelf/inputBox'
import Popup from '@/components/shelf/popup'
import Toast from '@/components/Toast'
export default {
  mixins: [shelfMixin],
  components: {
    ShelfHeader,
    Scroll,
    Book,
    Group,
    ShelfMenu,
    MoveTo,
    NewGroup,
    Popup,
    Toast
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .shelf-wrapper {
    .item-wrapper {
      margin-top: px2rem(10);
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .item {
        width: 33.3%;
        box-sizing: border-box;
        padding: px2rem(15);
      }
    }
  }
</style>
