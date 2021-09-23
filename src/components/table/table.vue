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
          v-if="item.show != false"
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
</style>
