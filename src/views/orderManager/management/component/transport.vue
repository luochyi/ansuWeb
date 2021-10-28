<template>
    <div>
        <el-row class="box">
              <!-- 运输 -->
                <el-row>
                    <el-col :span="6" class="item">
                        <span class="item-box">运单号&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="code" size="small">
                            <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button size="small" class="orangeBtn" style="margin-right:10px">查 询</el-button>
                        <el-button size="small" class="wuBtn" style="margin-right:10px">重 置</el-button>
                    </el-col>
                </el-row>
                <el-row class="line"></el-row>
            <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
            <el-col :span='14' class="left">
                <el-button class='orangeBtn' @click="updateRoad" size="small">批量更新轨迹</el-button>
            </el-col>
            <el-col :span='10' class="right">
            </el-col>
            </el-row>
            <!-- 表格 -->
            <div class="table">
              <commonTable
                :columns="columns"
                :data="tableData"
                :pager="page"
                @handleSizeChange="handleSizeChange"
                @handleSelectionChange='handleSelectionChange'
                @handleCurrentChange="handleCurrentChange"
                >
                <el-table-column
                  slot="table_oper"
                  align="center"
                  fixed="right"
                  label="操作"
                  width="126"
                  :resizable="false"
                  >
                  <template slot-scope="scope">
                    <span @click="detail(scope.row)" class="blue">详情</span>
                    <el-button type="text" @click="check(scope.row)"> 查看轨迹</el-button>
                    <el-button type="text" @click="sign(scope.row)"> 签收</el-button>
                  </template>
                </el-table-column>
              </commonTable>
            </div>
        </el-row>
        <el-dialog
          title="更新轨迹"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div class="diabox">
            <div>节点状态</div>
            <el-select v-model="milestone.status">
              <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <div>
              名称
            <el-input v-model="milestone.name"></el-input>
            </div>
            <div>节点时间</div>
            <el-date-picker
              v-model="milestone.nodeTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateRoadSubmit()">确 定</el-button>
          </span>
        </el-dialog>
        <commonDrawer :drawerVrisible="drawerVrisible"  @handleClose='addClose' :drawerSize='drawerSize' :drawerTitle="drawerTitle" style="textAlign:left">
          <div class="dra-content">
            <el-table  :data="milestoneList">
              <el-table-column prop="user_name" label="操作人姓名" width="120"></el-table-column>
              <el-table-column prop="status" label="状态" width="120">
                <template slot-scope="scope">
                  {{scope.row.status===1?'港前':scope.row.status===2?'港后':'派件'}}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" width="200"></el-table-column>
              <el-table-column prop="node_time" label="节点时间">
                <template slot-scope="scope">
                  {{formatDate(scope.row.node_time, 'yyyy-MM-dd hh:mm:ss')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 抽屉底部按钮 -->
          <div slot="footer">
            <!-- <button class="btn-orange" @click="ejectSubmit()">
              <span> <i class="el-icon-circle-check"></i>提交</span>
            </button> -->
            <button class="btn-gray" @click="addClose">
              <span>关闭</span>
            </button>
          </div>
        </commonDrawer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      dialogVisible: false,
      drawerSize: '40%',
      drawerVrisible: false,
      drawerTitle: '查看轨迹',
      req: {
        waybillIds: []
      },
      milestoneList: [],
      milestone: {
        status: '',
        name: '',
        nodeTime: ''
      },
      options: [
        {
          label: '港前',
          value: 1
        }, {
          label: '港后',
          value: 2
        }, {
          label: '派件',
          value: 3
        }
      ],
      table_choose: [],
      columns: [
        { prop: 'type', label: '运单类型', align: 'center', formatter: this.formatter },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户编码', width: '200', align: 'center' },
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'forecast_no', label: '预报单号', width: '200', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '200', align: 'center' },
        { prop: 'has_invoice', label: '是否制作发票', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'irikura_time', label: '入库时间', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '下单时间', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'remark', label: '客户备注', width: '200', align: 'center' },
        { prop: 'interior_remark', label: '内部备注', width: '200', align: 'center' }
      ],
      tableData: [

      ],
      page: {
        limit: 10,
        total: 0,
        sizes: [1, 5, 10],
        pageNo: 1
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData () {
      // shipmentLists
      // signLists
      // checkoutLists
      // Ejectlists
      this.$api.Ordermanagement.shipmentLists({ limit: this.page.limit, page: this.page.pageNo }).then(res => {
        this.page.total = res.data.total // 数据总量
        this.tableData = res.data.list
      })
    },
    // 签收
    sign (data) {
      this.req.waybillIds.push(data.id)
      this.$confirm('确认签收')
        .then(_ => {
          this.$api.Ordermanagement.shipmentSign(this.req).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(_ => {})
    },
    detail (data) {
      this.$router.push({ name: 'waybillDetail', params: { id: data.id } })
    },
    check (data) {
      console.log(data.id)
      this.drawerVrisible = true
      this.$api.Ordermanagement.milestoneInfo({ waybillId: data.id }).then(res => { this.milestoneList = res.data })
    },
    handleSelectionChange (val) {
      val && val.forEach(item => {
        this.table_choose.push(item.id)
      })
    },
    updateRoad () {
      if (this.table_choose.length < 1) {
        this.$message.error('请选择')
        return
      }
      this.dialogVisible = true
    },
    updateRoadSubmit () {
      let obj = {
        waybillIds: this.table_choose,
        status: this.milestone.status,
        name: this.milestone.name,
        nodeTime: this.milestone.nodeTime
      }
      this.$api.Ordermanagement.milestoneAdd(obj).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.handleClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 页码切换
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 页容量切换
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 表格格式化
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'has_invoice':
          return row.has_invoice === 1 ? '是' : '否'
        case 'irikura_time':
          return this.formatDate(row.irikura_time, 'yyyy-MM-dd hh:mm:ss')
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    addClose () {
      this.drawerVrisible = false
    },
    handleClose () {
      this.milestone = {
        status: '',
        name: '',
        nodeTime: ''
      }
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.line{
    height: 1px;
    background: #E9E9E9;
    margin: 18px 0;
}
.input{
    width: 70%;
    display: flex;
    align-items: center;
}
.box{
    background: #fff;
    padding: 14px 32px;
    text-align: left;
}
.item{
    display: flex;
    align-items: center;
}
.item-box{
    text-align: right;
    width: 80px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.unit{
    line-height: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FE822F;
    margin-right: 10px;
}
.expend {
  font-family: "iconfont" !important;
  line-height: 32px;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.diabox{
  text-align: left;
  /deep/.el-input__inner{
    width: 200px;
  }
}
</style>
