<template>
  <div id="commonTable">
    <el-table
      :data="data"
      :max-height="maxHeight"
      :header-cell-style="{ background: '#F5F5F6', color: '#999999FF',fontSize:'14px' }"
      border
      tooltip-effect="light"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
      type="selection"
      width="50">
    </el-table-column>
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.type=='slot'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align ? item.align : 'center'"
          :width="item.width"
          :formatter="item.formatter ? item.formatter : formatterValue">
              <template slot-scope="scope">
                  <slot :name="item.slotName"
                              :data="scope.row"></slot>
                </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align ? item.align : 'center'"
          :width="item.width"
          :formatter="item.formatter ? item.formatter : formatterValue"
        >
        </el-table-column>
      </template>
      <slot name="table_oper" />
    </el-table>
    <div class="block">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center; margin: 20px 0"
      :current-page="pager.pageNo"
      :page-size="pager.limit"
      :page-sizes="pager.sizes"
      :total="pager.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonTable',
  props: {
    columns: Array,
    data: Array,
    pager: Object,
    maxHeight: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    formatterValue (row, column, cellValue) {
      return cellValue
    },
    check (val) {
      this.$emit('check', val)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  border-color:#FE822FFF;
  background-color:#FE822FFF;
}
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner{
  border-color:#FE822FFF;
  background-color:#FE822FFF;
}
/* 分页重置样式 */
.pagination-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.pagination-item p {
    color: #999999;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #fb4702 !important;
    color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    background-color: #fb4702 !important;
    color: #fff !important;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: #ffffff !important;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.15);
}
.el-pagination__jump {
    margin-left: 24px;
    font-weight: 400;
    color: #999999 !important;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    height: 32px;
    margin: 0px 8px;
    background-color: #f4f4f5;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
    display: inline-block;
    width: 32px;
}
/* 分页插入的搜索框样式重置 */
.page-slot {
    display: inline-block;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 32px;
}
.slot-jump {
    display: inline-block;
    cursor: pointer;
    width: 51px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    text-align: center;
    background: #ffe7dd;
    border-radius: 2px;
    border: 1px solid #fb4702;
}
.el-input.page-jump {
    width: 52px !important;
    height: 32px !important;
    padding: 0 !important;
}
.el-input.page-jump > .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 2px;
    color: #606266;
    font-size: inherit;
    height: 100%;
    line-height: 100%;
    display: inline-block;
    outline: 0;
    padding: 0px !important;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.comprehensive {
    .el-tabs__item.is-active {
        color: #036dfd !important;
    }
    .el-tabs__active-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #036dfd !important;
        z-index: 1;
        transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        list-style: none;
    }
    .el-tabs__item:hover {
        color: #036dfd !important;
        cursor: pointer;
    }
    .login-input .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 0px;
        border: none;
        border-bottom: 1px solid #d8d8d8;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0px 0px;
        margin-bottom: 30px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #3163c0 !important;
        color: #fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
        background-color: #3163c0 !important;
        color: #fff !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #409eff !important;
        border-color: #409eff !important;
    }
    // comprehensive
}
</style>
