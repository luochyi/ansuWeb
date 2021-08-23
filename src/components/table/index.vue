<template>
  <div>
    <el-table
            :data='tableData'
            style='width: 100%; margin-top: 20px'
            :header-cell-style="{ background: '#E9E9E9' }"
          >
            <el-table-column type='selection' min-width='50'> </el-table-column>
            <el-table-column type='index' min-width='50'> </el-table-column>
            <el-table-column :type='type' :min-width='width' :prop="prop"> </el-table-column>
          </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style>
</style>
