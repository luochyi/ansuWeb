<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>车辆管理</span>
       <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
        <el-tab-pane label='启用' name='1'></el-tab-pane>
        <el-tab-pane label='停用' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
     <div>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>司机名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='search.driveName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>车牌号</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='search.licensePlate' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
           <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="reset">重 置</el-button>
          </el-col>
         </el-row>
           </div>
      <!-- 表格 -->
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button v-if ="activeName === '1'" class='batch' @click="disabled(carIds)">批量停用</el-button>
            <el-button v-else-if ="activeName === '2'" class='batch' @click="enabled(carIds)">批量启用</el-button>
        </el-col>
        <el-col :span='12' class="right">
          <el-button @click="addTruck" class='orangeBtn long2' icon="el-icon-circle-plus-outline">新建车辆</el-button>
        </el-col>
        </el-row>
        <div>
         <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleSelectionChange="handleSelectionChange"
      >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="131"
        :resizable="false"
        >
        <template slot-scope="scoped">
                <el-button type="text" @click="edit(scoped.row)"> 修改</el-button>
                 <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="disabled([scoped.row.id])">停用车辆</el-button>
                <el-button v-else-if="activeName === '2'" type="text" @click="enabled([scoped.row.id])" >启用车辆</el-button>
        </template>
       </el-table-column>
       </commonTable>
    </div>
       <!-- 批量停用 -->
   <el-dialog title="批量停用车辆" :visible.sync="deactivation" width="30%">
               <div class="input" >
               <br><span><i class="el-icon-circle-check"></i>您是否确认停用这3辆货车</span><br>
               </div>
               <span slot="footer" class="deactivation-footer">
                 <el-button @click="deactivation = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="deactivation = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
   <!-- 停用收货车辆 -->
   <el-dialog title="停用收货车辆" :visible.sync="vehicle" width="30%">
               <div class="input">
                <br><span><i class="el-icon-circle-check"></i>您是否确认停用收货车辆“五菱宏光1号车吗？”</span><br>
               </div>
               <span slot="footer" class="vehicle-footer">
                 <el-button @click="vehicle = false" class='wuBtn'>取 消</el-button>
                 <el-button @click="vehicleis = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
  </div>
</template>

<script>
import api from '../../../api/api'

export default {
  data () {
    return {
      dialogVisible: false, // 对话框可见
      activeName: '1', // 标签绑定
      // 复选
      carIds: [],

      // 弹框
      deactivation: false, // 批量停用
      vehicle: false, // 停用车辆

      search: {
        driveName: '',
        licensePlate: ''
      },
      agentName: '',
      agentCode: '',
      columns: [
        { prop: 'name', label: '车辆名称', width: '223', align: 'center' },
        { prop: 'number', label: '车牌号', width: '102', align: 'center' },
        { prop: 'status', label: '账号状态', width: '122', align: 'center', formatter: this.formatter },
        { prop: 'load', label: '车载数量', width: '154', align: 'center', formatter: this.formatter },
        { prop: 'Carsize', label: '车厢大小（米）', align: 'center', width: '204', formatter: this.formatter }
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
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    addTruck () {
      this.$router.push({ name: 'addTruck' })
    },
    handleClick () {
      this.getData()
    },
    getData () {
      let params = {
        status: Number(this.activeName),
        name: this.search.driveName,
        licensePlate: this.search.licensePlate,
        page: this.page.pageNo,
        limit: this.page.limit
      }
      api.configure.car.carLists(params).then((res) => {
        this.tableData = []
        res.data.list.forEach(item => {
          this.tableData.push({
            id: item.id,
            name: item.name,
            number: item.license_plate,
            status: item.status,
            load: item.load,
            long: item.long,
            wide: item.wide,
            high: item.high
          })
          console.log(item)
        })
        this.page.total = res.data.total
        console.log(res)
      })
    },
    reset  () {
      this.search.licensePlate = ''
      this.search.driveName = ''
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'load':
          return row.load + '公斤'
        case 'status':
          return row.status === 1 ? '启用' : '停用'
        case 'Carsize':
          return '长' + row.long + '*宽' + row.wide + '*高' + row.high
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
    // 复选
    handleSelectionChange (val) {
      console.log(val)
      this.carIds = []
      val && val.forEach((item) => {
        this.carIds.push(item.id)
      })
    },
    edit  (data) {
      console.log(data)
      this.$router.push({
        name: 'addTruck',
        params: {
          high: data.high,
          id: data.id,
          load: data.load,
          long: data.long,
          name: data.name,
          number: data.number,
          status: data.status,
          wide: data.wide
        }
      })
    },
    enabled  (val) {
      api.configure.car.carEnabled(val).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData() // 刷新数据
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    disabled  (val) {
      api.configure.car.carDisabled(val).then(res => {
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
.el-icon-circle-check{
  width: 66px;
  height: 58px;
  font-size: 58px;
  color: #FB4702;
}
</style>
