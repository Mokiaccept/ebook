<template>
  <div class="shelf-wrapper">
    <shelf-header :editMode="editMode" @edit="onEdit" @cancel="onCancel" :count="selectedList.length"></shelf-header>
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
    ></shelf-menu>
    <move-to
      :groupList="groupList"
      :showMoveTo="showMoveTo"
      @close="onMoveToClose"
      @new-group="onNewGroup"
      @move-to="onMoveTo"
    ></move-to>
    <new-group
      :showNewGroup="showNewGroup"
      @close="onNewGroupClose"
      @submit="onCreateGroup"
    ></new-group>
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
import NewGroup from '@/components/shelf/newGroup'
export default {
  mixins: [shelfMixin],
  components: {
    ShelfHeader,
    Scroll,
    Book,
    Group,
    ShelfMenu,
    MoveTo,
    NewGroup
  },
  data () {
    return {
      menuList: [
        {
          icon: '&#xe60e;',
          title: '缓存书籍',
          important: false,
          emit: 'download'
        }, {
          icon: '&#xe602;',
          title: '移动到...',
          important: false,
          emit: 'move'
        }, {
          icon: '&#xe60a;',
          title: '移出书架',
          important: true,
          emit: 'delete'
        }
      ],
      showMoveTo: false,
      showNewGroup: false
    }
  },
  computed: {
    groupList () {
      return this.shelfList.filter(item => {
        return item.type === 2
      })
    }
  },
  methods: {
    onEdit () {
      this.editMode = true
    },
    onCancel () {
      this.editMode = false
      this.selectedList = []
    },
    onChoose (id) {
      if (this.selectedList.indexOf(id) > -1) {
        this.selectedList = this.selectedList.filter(item => {
          return item !== id
        })
      } else {
        this.selectedList.push(id)
      }
    },
    onMove () {
      this.showMoveTo = true
    },
    onMoveToClose () {
      this.showMoveTo = false
    },
    onNewGroup () {
      this.onMoveToClose()
      this.showNewGroup = true
    },
    onMoveTo (id) {
    },
    onNewGroupClose () {
      this.showNewGroup = false
    },
    onCreateGroup () {
    }
  },
  created () {
    console.log(this.shelfList)
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
