<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>仓库列表</span>
  <el-tabs v-model='activeName' type='card' @tab-click='getData'>
        <el-tab-pane label='使用中' name='1'></el-tab-pane>
        <el-tab-pane label='停用' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
     <div>
        <el-row class='searchbox1'>
          <el-col :span='8' class='colbox'>
            <el-col :span='7'>
              <span class='text'>仓库名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='search.name' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='8' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
     </div>
         <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
          <el-button @click="addWarehouse" class='orangeBtn long2' icon="el-icon-circle-plus-outline">新建仓库</el-button>
        </el-col>
        </el-row>
      <!-- 表格 -->
<commonTable
      :columns="columns"
      :data="tableData"
      :selection='selection'
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="238"
        :resizable="false"
        >
        <template slot-scope="scoped">
          <el-button type="text" @click="toDetail(scoped.row.id)"> 详情</el-button>
          <span style="color: #0084FF; margin: 0px 5px">|</span>
          <el-button type="text" @click="edit(scoped.row.id)"> 修改</el-button>
          <span style="color: #0084FF; margin: 0px 5px">|</span>
          <el-button type="text" @click="equipment(scoped.row)"> 仓库设备 </el-button>
          <span style="color: #0084FF; margin: 0px 5px">|</span>
          <el-button type="text" @click="setDefault(scoped.row.id)" v-if="activeName === '1'" v-show="scoped.row.is_default === 0"> 默认仓库 </el-button>
          <span style="color: #0084FF; margin: 0px 5px" v-if="activeName === '1'" v-show="scoped.row.is_default === 0">|</span>
          <el-button v-if="activeName === '1'" type="text" @click="disabled([scoped.row.id])">停用</el-button>
          <el-button v-else-if="activeName === '2'" type="text" @click="enabled([scoped.row.id])" >启用</el-button>
        </template>
      </el-table-column>
      </commonTable>
    </div>
  </div>
</template>

<script>
import api from '../../../api/api'

export default {
  data () {
    return {
      selection: false,
      dialogVisible: false, // 对话框可见
      stopAgentis: false,
      activeName: '1', // 标签绑定
      search: {
        name: ''
      },
      columns: [
        { prop: 'name', label: '仓库名称', width: '124', align: 'center' },
        { prop: 'principal_name', label: '仓库负责人', width: '134', align: 'center' },
        { prop: 'default', label: '默认仓库', width: '122', align: 'center', formatter: this.formatter },
        { prop: 'device', label: '仓库设备配置', width: '172', align: 'center', formatter: this.formatter },
        { prop: 'address', label: '仓库地址', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 15,
        sizes: [15, 50, 100],
        total: 0
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.setting.warehouse.lists({
        status: Number(this.activeName),
        name: this.search.name,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    addWarehouse () {
      this.$router.push({ name: 'addWarehouse' })
    },
    toDetail (val) {
      console.log(val)
      this.$router.push({ name: 'receivingWarehouseDetails', params: { id: val } })
    },
    edit (val) {
      console.log(val)
      this.$router.push({ name: 'addWarehouse', params: { id: val } })
    },
    equipment (val) {
      this.$router.push({ name: 'equipment', params: val })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'default':
          return row.is_default === 0 ? '非默认仓库' : '默认仓库'
        case 'device':
          return row.device_count === 0 ? '未配置设备' : '已配置设备'
        case 'person':
          return row.warehouse_type === 0 ? '——' : row.warehouse_type === 1 ? '仓库负责人' : '普通仓库人员'
        case 'status':
          return row.status === 1 ? '启用' : '停用'
      }
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val // 设置当前页容量为val
      this.getData() // 重新渲染表格
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val // 设置当前页码为val
      this.getData() // 重新渲染表格
    },
    // 操作按钮列表
    editTableData (row) {},
    setDefault (warehouseId) {
      this.$api.setting.warehouse.setDefault(warehouseId).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData() // 刷新数据
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    enabled  (val) {
      api.setting.warehouse.enabled(val).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData() // 刷新数据
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    disabled  (val) {
      api.setting.warehouse.disabled(val).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData() // 刷新数据
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .searchbox1{
  .batch{
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #FEF4E1;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/deep/ .el-dialog{
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

}
/deep/ .el-dialog{
  text-align: left;
}
//biankuang
/deep/ .el-dialog__body {
    padding: 10px 15px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
/deep/ .input{
  height: 90px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}

</style>
