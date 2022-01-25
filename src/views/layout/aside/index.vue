<template>
  <div>
    <el-scrollbar style='height: calc( - 30px)'>
      <transition
        :duration='{ enter: 800, leave: 100 }'
        mode='out-in'
        name='el-fade-in-linear'
      >
        <el-menu
          :collapse='isCollapse'
          :collapse-transition='true'
          :default-active='active'
          :router='true'
          @select='select'
          active-text-color='#FE822F'
          class='el-menu-vertical'
          text-color='rgba(0,0,0,0.65)'
          unique-opened
        >
          <template v-for='item in newCol'>
            <AsideComponent
              :key='item.name'
              :routerInfo='item'
            />
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AsideComponent from '@/views/layout/aside/asideComponent/index.vue'
export default {
  name: 'Aside',
  data () {
    return {
      active: '',
      isCollapse: false,
      // arr: [],
      indexs: undefined,
      col: undefined
    }
  },
  props: {
    num: Number
  },
  computed: {
    newCol: function () {
      return this.sortByKey(this.col, 'sort')
      // this.col是原数组
    },
    ...mapGetters('router', ['asyncRouters'])
  },
  watch: {
    $route (to) {
      let arr = to.path.split('/')[1]
      this.active = arr
    },
    num (val) {
      this.arr = []
      // console.log(val)
      this.asyncRouters && this.asyncRouters.forEach((element, index) => {
        if (element.sort === val) {
          this.indexs = index
          this.col = this.asyncRouters[index].children
        }
      })
      console.log(this.col)
    }
  },
  mounted () {
    let arr = this.$route.path.split('/')
    console.log(arr)
    this.active = arr[1]
  },
  methods: {
    sortByKey (array, key) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return x < y ? -1 : x > y ? 1 : 0
      })
    },
    // ...mapMutations('router', ['addHistory']),
    select (key, keypath) {
      // console.log(key)
      // console.log(keypath)
    }
  },
  components: {
    AsideComponent
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  .el-scrollbar__view {
    height: 100%;
  }
}
.menu-info {
  .menu-contorl {
    line-height: 52px;
    font-size: 20px;
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
