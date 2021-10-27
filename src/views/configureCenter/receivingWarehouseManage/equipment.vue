<template>
  <div id='boxx'>
    <div class="box">
      <!--  top -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>设备列表</span>
        <el-tabs v-model='activeName' type='card' @tab-click='getData'>
          <el-tab-pane label='使用中' name='1'></el-tab-pane>
          <el-tab-pane label='停用' name='2'></el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='texta'>{{ basicInfo.name }}设配列表</span>
      </el-row>
    </div>
    <div class='content'>
      <el-row class='searchbox1'>
        <el-col :span='8' class='colbox'>
          <el-col :span='7'>
            <span class='text'>设备名称</span>
          </el-col>
          <el-col :span='16'>
            <el-input v-model='search.name' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <el-col :span='8' class='colbox'>
          <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
        <el-col :span='8' class="left">
          <el-button @click="showAdd" class='orangeBtn long2' icon="el-icon-circle-plus-outline">添加设备</el-button>
        </el-col>
      </el-row>
      <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column
            slot="table_oper"
            fixed="right"
            label="操作"
            width="231"
            :resizable="false"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)"> 修改</el-button>
            <span style="color: #0084FF; margin: 0px 5px">|</span>
            <el-button v-if="activeName === '1'" type="text" @click="disabled([scope.row.id])"> 停用设备</el-button>
            <el-button v-if="activeName === '2'" type="text" @click="enabled([scope.row.id])"> 启用设备</el-button>
          </template>
        </el-table-column>
      </commonTable>
    </div>

    <el-dialog
        :title="dialog.titile"
        :visible.sync="dialog.visible"
        width="30%"
        style="textAlign:left"
        :before-close="dialogClose">
      设备名称：
      <el-input v-model="formData.name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../../api/api'

export default {
  data () {
    return {
      chooseAgent: {}, // 选择停用
      activeName: '1', // 标签绑定
      search: {
        name: ''
      },
      basicInfo: {
        id: 0,
        name: ''
      },
      columns: [
        { prop: 'name', label: '设备名称', width: '300', align: 'center' },
        { prop: 'link', label: '设备连接', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 15,
        sizes: [15, 50, 100],
        total: 0
      },
      dialog: {
        type: 1,
        titile: '',
        visible: false
      },
      formData: {
        deviceId: null,
        name: ''
      }
    }
  },
  mounted () {
    this.basicInfo.id = this.$route.params.id
    this.basicInfo.name = this.$route.params.name
    this.getData()
  },
  methods: {
    getData () {
      this.$api.setting.warehouse.device.lists({
        warehouseId: this.basicInfo.id,
        status: Number(this.activeName),
        name: this.search.name,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
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
    enabled  (val) {
      api.setting.warehouse.device.enabled({
        warehouseId: this.basicInfo.id,
        deviceIds: val
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData() // 刷新数据
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    disabled  (val) {
      api.setting.warehouse.device.disabled({
        warehouseId: this.basicInfo.id,
        deviceIds: val
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData() // 刷新数据
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    showAdd () {
      this.dialog.titile = '新建设备'
      this.dialog.visible = true
      this.dialog.type = 1
    },
    showEdit (row) {
      this.formData.deviceId = row.id
      this.formData.name = row.name
      this.dialog.titile = '修改设备'
      this.dialog.visible = true
      this.dialog.type = 2
    },
    submit () {
      switch (this.dialog.type) {
        case 1: // 添加设备
          this.$api.setting.warehouse.device.add({
            warehouseId: this.basicInfo.id,
            name: this.formData.name
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg) // 成功提示
              this.dialogClose()
              this.getData() // 刷新数据
            } else {
              this.$message.error(res.msg) // 错误提示
            }
          })
      }
    },
    dialogClose () {
      this.dialog.visible = false
      this.formData.name = ''
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    margin: 17px;
}
#boxx{
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.texta{

width: 162px;
height: 30px;
font-size: 18px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #FB4702;
margin: 17px;
}

</style>
