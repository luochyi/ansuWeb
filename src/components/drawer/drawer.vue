<template>
  <div class="drawers_box">
    <el-drawer
      :title="drawerTitle"
      :visible.sync="isVisibleDrawe"
      :with-header="true"
      :before-close="handleClose"
      :size="drawerSize"
      :showClose="false"
    >
      <div class="dra-body">
        <slot></slot>
      </div>
      <div class="dra-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'commonDrawer',
  props: {
    drawerVrisible: Boolean,
    drawerTitle: String,
    drawerSize: {
      type: String,
      default: '30%'
    }
  },
  data () {
    return {
      isVisibleDrawe: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose', 'Close')
    }
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.drawers_box {
    position: relative;
    .el-drawer__header {
        padding: 0 20px;
        margin: 0;
        height: 81px;
        line-height: 81px;
        span {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }
    .el-drawer__body {
        background: #e8ebf2;
        overflow-y: auto;
        padding-bottom: 81px;
    }
    :focus {
        outline: 0;
    }

    .dra-content {
        padding-bottom: 60px;
    }
    .dra-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 81px;
        line-height: 81px;
        padding: 0 20px;
    }
}
</style>
