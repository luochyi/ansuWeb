<template>
  <div>
    <div class="main">
      <!--  标签页 -->
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">预报运单</span>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="未入库" name="1"></el-tab-pane>
          <el-tab-pane label="已入库" name="2"></el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- 主要内容 -->
      <div class="content">
        <el-row class="searchbox1">
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">预报单号</span>
            </el-col>
            <el-col :span="12">
              <el-input v-model="code" placeholder="请输入"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-button class="orangeBtn long1">查 询</el-button>
            <el-button class="wuBtn long1">重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class="table">
          <el-row class="tableBtn">
            <el-col :span="12" class="left">
              <el-button class="batch">批量导出Excel</el-button>
              <!-- <el-button class='batch'>协调订单</el-button> -->
            </el-col>
            <el-col :span="20" class="right">
            </el-col>
          </el-row>
          <br />
          <!-- 表格 -->
          <commonTable
            :columns="columns"
            :data="tableData"
            :pager="page"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            @handleSelectionChange="handleSelectionChange"
          >
            <!-- slot -->
            <template v-slot:chakan="slotData">
              {{ slotData.data.info
              }}<span
                style="color: #0084ff; cursor: pointer"
                @click="check(slotData)"
                >查看</span
              >
            </template>
            <!-- 操作 -->
            <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="300"
              :resizable="false"
            >
              <template slot-scope="scope">
                <span @click="detail(scope.row)" class="blue"
                  >查看详情<span style="margin: 0px 5px 0px">|</span></span
                >
                <span @click="edit(scope.row)" class="blue">修改</span>
                <span @click="irikura(scope.row)" v-show="activeName==='2'" class="blue">&nbsp;|&nbsp;入仓</span>
              </template>
            </el-table-column>
          </commonTable>
        </div>
      </div>
    </div>
    <commonDrawer :drawerVrisible="drawerVrisible" @handleClose='addClose' :drawerTitle="drawerTitle" @click="check(slotData)">
      <div class="dra-content" style="textAlign:left;padding:10px">
        <!-- 内容区域 -->
        <el-row style="fontSize:20px;color:#FB4702">{{info.code}}</el-row>
        <el-row style="fontSize:14px;fontWeight:500">客户名称：<span style="fontWeight:400">{{info.name}}</span></el-row>
         <el-divider></el-divider>
          <el-row style="fontSize:14px;">入仓设备：
            <span v-if="deviceName">{{deviceName}}</span>
            <span v-else>无</span>&nbsp;
            <span class="btnspan" @click="choseDevice">添加设备</span> </el-row>
          <el-divider></el-divider>
        <el-table :data="goodslist" border style="width: 100%"  :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column prop="cargoId" label="货件编号"></el-table-column>
          <el-table-column prop="length" label="长度"></el-table-column>
          <el-table-column prop="width" label="宽度"></el-table-column>
          <el-table-column prop="height" label="高度"></el-table-column>
          <el-table-column prop="weight" label="重量"></el-table-column>
        </el-table>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="addClose">
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>
    <el-dialog
      title="入仓设备"
      :visible.sync="dialog"
      width="20%"
      :before-close="handleClose">
      <span>请选择您的入仓设备</span>
      <span>
        <el-select v-model="deviceId" @change="changedevice">
          <el-option v-for="item in deviceOption"
            :key='item.id'
            :label="item.name"
            :value="item.id"
            ></el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="deviceSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      socket: null,
      activeName: '1',
      drawerVrisible: false,
      drawerTitle: '入仓',
      dialog: false,
      waybillId: null, // 运单id
      deviceId: null,
      deviceName: '',
      deviceOption: [],
      tableData: [],
      goodslist: [],
      code: '',
      info: {
        name: '',
        code: ''
      },
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      },
      columns: [
        {
          prop: 'type',
          label: '订单类型',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'customer_name',
          label: '客户名称',
          width: '100',
          align: 'center'
        },
        {
          prop: 'customer_code',
          label: '客户编码',
          width: '200',
          align: 'center'
        },
        {
          prop: 'driver_name',
          label: '司机姓名',
          width: '100',
          align: 'center'
        },
        {
          prop: 'receipt_type',
          label: '收货类型',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'waybill_no',
          label: '运单号',
          width: '200',
          align: 'center'
        },
        {
          prop: 'forecast_no',
          label: '预报单号',
          width: '200',
          align: 'center'
        },
        {
          prop: 'has_invoice',
          label: '是否制作发票',
          width: '100',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'good_time',
          label: '货好时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'cargoes_num',
          label: '货件数量',
          width: '100',
          align: 'center'
        },
        {
          prop: 'country_name',
          label: '国家名称',
          width: '200',
          align: 'center'
        },
        {
          prop: 'channel_name',
          label: '渠道名称',
          width: '200',
          align: 'center'
        },
        {
          prop: 'created_at',
          label: '下单时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'remark',
          label: '客户备注',
          width: '200',
          align: 'center'
        },
        {
          prop: 'have_safe',
          label: '是否购买保险',
          width: '100',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'salesman_name',
          label: '业务员',
          width: '100',
          align: 'center'
        },
        {
          prop: 'interior_remark',
          label: '内部备注',
          width: '200',
          align: 'center'
        }
      ]
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.waybillLists({ page: this.page.pageNo, limit: this.page.limit, status: Number(this.activeName) }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    choseDevice () {
      this.dialog = true
    },
    detail (data) {},
    edit (data) {},
    handleClick () {
      this.getData()
    },
    // 入仓
    irikura (row) {
      console.log(row)
      this.drawerVrisible = true
      this.info.name = row.customer_name
      this.info.code = row.waybill_no
      this.$api.setting.warehouse.device.select({ waybillId: row.id }).then(res => {
        this.deviceOption = res.data
      })
    },
    addClose () {
      this.drawerVrisible = false
      if (this.socket && this.socket.onclose !== undefined) {
        this.socket.onclose = this.close
      }
    },
    formatter (row, col) {
      switch (col.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : row.type === 2 ? 'FBA运单' : '无'
        case 'receipt_type':
          return row.receipt_type === 1 ? '扫码收货' : row.receipt_type === 2 ? '直接收货' : row.receipt_type === 3 ? '客户直送' : row.receipt_type === 4 ? '货拉拉' : '无'
        case 'has_invoice':
          return row.has_invoice === 1 ? '已制作' : '未制作'
        case 'have_safe':
          return row.has_invoice === 1 ? '购买' : '不购买'
        case 'good_time':
          return this.formatDate(row.good_time, 'yyyy-MM-dd')
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
      }
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    deviceSubmit () {
      this.$message.success('选择成功')
      this.dialog = false
      this.init(this.deviceId)
    },
    changedevice (val) {
      let arr = this.deviceOption.filter(item => {
        return item.id === val
      })
      console.log(arr)
      this.deviceId = arr[0].id
      this.deviceName = arr[0].name
    },
    handleClose () {
      this.dialog = false
    },
    handleSelectionChange (val) {},
    init: function (id) {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.$api.setting.warehouse.device.scanUrl + '?deviceId=' + id)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      console.log(msg.data)
    },
    send: function () {
      // this.socket.send(params)
    },
    close: function () {
      console.log('socket已经关闭')
    }
  }
}
</script>

<style lang='scss' scoped>
// .main {
//   margin: 20px 0px;
// }
/deep/ .tableBtn {
  .batch {
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #fef4e1;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
.btnspan{
  font-weight: 400;
  color: #1890FF;
  cursor: pointer;
}
</style>
