<template>
  <div class="group-wrapper">
    <group-header
      :editMode="editMode"
      @edit="onEdit"
      @cancel="onCancel"
      :count="selectedList.length"
      :title="groupInfo.title"
      :groupEmpty="groupInfo.books.length === 0"
      @change-group="onChangeGroup"
      @change-name="onChangeName"
    ></group-header>
    <scroll :top="50" :bottom="0">
      <div class="item-wrapper" v-if="groupInfo.books.length > 0">
        <template v-for="(item, index) in groupInfo.books">
          <div class="book" :key="index">
            <book
              :info="item"
              class="item"
              :selected="selectedList.indexOf(item.id) > -1"
              @choose="onChoose"
              :editMode="editMode"
            ></book>
          </div>
        </template>
      </div>
      <div class="empty" v-else>当前分组暂无书籍！</div>
    </scroll>
    <group-menu
      :menuList="menuList"
      :editMode="editMode"
      :iconActived="selectedList.length > 0"
      @move="onMove"
      @delete="onDelete"
    ></group-menu>
    <move-to
      :groupList="groupList"
      :showMoveTo="showMoveTo"
      :groupId="parseInt($route.params.id)"
      :moveOut="true"
      @close="onMoveToClose"
      @new-group="onNewGroup"
      @move-to="onMoveTo"
      @move-out="onMoveOut"
    ></move-to>
    <input-box
      :showInputBox="showNewGroup"
      :title="'新建分组'"
      :inputTitle="'分组名：'"
      @close="onNewGroupClose"
      @submit="onCreateGroup"
    ></input-box>
    <popup
      :title="popupTitle"
      :options="popupOptions"
      :show="showPopup"
      @delete="deleteSelectedBooks"
      @close="hidePopup"
      @change-name="onChangeName"
      @delete-group="onDeleteGroup"
    ></popup>
    <input-box
      :showInputBox="showGroupName"
      :title="'修改分组名'"
      :inputTitle="'新的分组名：'"
      @close="onGroupNameClose"
      @submit="onChangeGroupName"
    ></input-box>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
import { shelfMixin } from '@/utils/mixin'
import GroupHeader from '@/components/shelf/groupHeader.vue'
import Scroll from '@/components/Scroll'
import Book from '@/components/shelf/shelfBook'
import GroupMenu from '@/components/shelf/shelfMenu.vue'
import MoveTo from '@/components/shelf/moveTo.vue'
import inputBox from '@/components/shelf/inputBox'
import Popup from '@/components/shelf/popup'
import Toast from '@/components/Toast'
export default {
  mixins: [shelfMixin],
  components: {
    GroupHeader,
    Scroll,
    Book,
    GroupMenu,
    MoveTo,
    inputBox,
    Popup,
    Toast
  }
}

</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global';
  .group-wrapper {
    .item-wrapper {
      margin-top: px2rem(10);
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .book {
        width: 33.3%;
        padding-bottom: 49%;
        height: 0;
        position: relative;
        .item {
          width: 100%;
          height: 100%;
          position: absolute;
          box-sizing: border-box;
          padding: px2rem(15);
        }
      }
    }
    .empty {
      width: 100%;
      height: 100%;
      @include center;
      color: #333;
      font-size: px2rem(16);
    }
  }
</style>
