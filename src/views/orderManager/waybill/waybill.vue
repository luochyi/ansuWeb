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
        <el-row :gutter="15">
          <el-col>
            <el-form
              class="elForm"
              ref="elForm"
              size="small"
              :model="searchForm"
              label-width="93px"
              label-position="top"
            >
              <el-col :span="6">
                <el-form-item label="预报单号" prop="forecastNo">
                  <el-input
                    v-model="searchForm.forecastNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户编码" prop="customerCode">
                  <el-input
                    v-model="searchForm.customerCode"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户名称" prop="customerName">
                  <el-input
                    v-model="searchForm.customerName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售姓名" prop="salesmanName">
                  <el-input
                    v-model="searchForm.salesmanName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运单号" prop="waybillNo">
                  <el-input
                    v-model="searchForm.waybillNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运单类型" prop="type">
                  <el-select
                    v-model="searchForm.type"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否制作发票" prop="hasInvoice">
                  <el-select
                    v-model="searchForm.hasInvoice"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in hasInvoiceOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- <el-form-item size="large"> -->
                  <div class="searchBtn">
                    <el-button class="orangeBtn" @click="search">查询</el-button>
                    <el-button class="whiteBtn" @click="resetForm('elForm')">重置</el-button>
                  </div>
                <!-- </el-form-item> -->
            </el-col>
            </el-form>
          </el-col>

        </el-row>
        <el-divider></el-divider>
        <div class="table">
          <el-row class="tableBtn">
            <el-col :span="12" class="left">
              <!-- <el-button class="batch">批量导出Excel</el-button> -->
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
            :selection='selection'
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
                  >查看详情</span
                >
                <!-- <span @click="edit(scope.row)" class="blue">修改</span> -->
                <span @click="irikura(scope.row)" v-show="activeName==='2'" class="blue">&nbsp;|&nbsp;入仓</span>
              </template>
            </el-table-column>
          </commonTable>
        </div>
      </div>
    </div>
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle" :drawerSize='drawerSize'>
      <div class="dra-content" style="textAlign:left;padding:10px">
        <!-- 内容区域 -->
        <div>
          <el-row>
            <el-col :span="18" style="fontSize:20px;color:#FB4702">
              {{info.code}}
            </el-col>
            <el-col :span="4" style="fontSize:14px">
              手动录单<el-switch v-model="manual"  active-color="#13ce66" inactive-color="#ff4949" @change="changes" style="marginLeft:20px"></el-switch>
            </el-col>
          </el-row>
        </div>
        <el-row style="fontSize:14px;fontWeight:500">客户名称：<span style="fontWeight:400">{{info.name}}</span></el-row>
         <el-divider></el-divider>
          <el-row style="fontSize:14px;">入仓设备：
            <span v-if="deviceName">{{deviceName}}</span>
            <span v-else>无</span>&nbsp;
            <span class="btnspan" @click="choseDevice">添加设备</span> </el-row>
          <el-divider></el-divider>

        <el-table :data="goodslist" border style="width: 100%"  :header-cell-style="{background: '#F5F5F6'}" v-show="manual">
          <el-table-column prop="cargoNo" label="货件编号"></el-table-column>
          <el-table-column prop="length" label="长度">
            <template slot-scope="scope">
              <el-input v-model="scope.row.length"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="width" label="宽度">
            <template slot-scope="scope">
              <el-input v-model="scope.row.width"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="height" label="高度">
            <template slot-scope="scope">
              <el-input v-model="scope.row.height"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="重量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.weight"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="goodslist" border style="width: 100%"  :header-cell-style="{background: '#F5F5F6'}" v-show="manual===false">
          <el-table-column prop="cargoNo" label="货件编号"></el-table-column>
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
      selection: false,
      // websocket
      socket: null,
      lockReconnect: false, // 是否真正建立连接
      timeout: 40 * 1000, // 40秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
      header: this.$api.common.loginHeader(),
      //
      manual: false,
      activeName: '1',
      drawerVrisible: false,
      drawerSize: '50%',
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
          width: '300',
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
          prop: 'has_invoice',
          label: '是否制作发票',
          width: '130',
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
          width: '200',
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
      ],
      waybillInfo: {},
      searchForm: {
        forecastNo: '',
        customerCode: '',
        customerName: '',
        salesmanName: '',
        waybillNo: '',
        type: null,
        hasInvoice: null
      },
      typeOptions: [
        {
          label: 'FBA运单',
          value: 1
        }, {
          label: '非FBA运单',
          value: 2
        }
      ],
      hasInvoiceOptions: [
        {
          label: '未制作',
          value: 0
        }, {
          label: '已制作',
          value: 1
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.waybillLists({
        page: this.page.pageNo,
        limit: this.page.limit,
        status: Number(this.activeName),
        forecastNo: this.searchForm.forecastNo,
        customerName: this.searchForm.customerName,
        customerCode: this.searchForm.customerCode,
        salesmanName: this.searchForm.salesmanName,
        waybillNo: this.searchForm.waybillNo,
        type: this.searchForm.type,
        hasInvoice: this.searchForm.hasInvoice
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    search () {
      this.page.pageNo = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    getInfo (waybillId) {
      this.$api.Ordermanagement.waybillInfo(waybillId).then(res => {
        this.goodslist = []
        res.data.cargo_specs.forEach(item => {
          this.goodslist.push({
            cargoId: item.cargo_id,
            cargoNo: item.cargo_no,
            fbaNo: item.fba_no,
            length: null,
            width: null,
            height: null,
            weight: null
          })
        })
      })
    },
    choseDevice () {
      this.dialog = true
    },
    detail (data) {
      this.$router.push({ name: 'waybillDetail', params: { id: data.id } })
    },
    edit (data) {},
    submit () {
      console.log(this.goodslist)
      let params = {
        waybillId: this.waybillId,
        irikuraDataItems: this.goodslist
      }
      this.$api.Ordermanagement.waybillIrikura(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.addClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClick () {
      this.getData()
    },
    // 入仓
    irikura (row) {
      console.log(row)
      this.waybillId = row.id
      this.drawerVrisible = true
      this.info.name = row.customer_name
      this.info.code = row.waybill_no
      this.$api.setting.warehouse.device.select({ waybillId: row.id }).then(res => {
        this.deviceOption = res.data
      })
      this.getInfo(row.id)
    },
    addClose () {
      this.drawerVrisible = false
      this.close()
      this.deviceId = null
      this.deviceName = null
    },
    formatter (row, col) {
      switch (col.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : row.type === 2 ? '非FBA运单' : '无'
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
      if (this.deviceId === null) {
        this.$message.error('请选择入仓设备')
        return
      }
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
    changes (val) {
      console.log(val)
    },
    handleSelectionChange (val) {},
    init: function (id) {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        let wsUrl = this.$api.setting.warehouse.device.scanUrl + '?deviceId=' + id
        for (let header in this.header) {
          wsUrl = wsUrl + '&' + header + '=' + this.header[header]
        }
        // 实例化socket
        this.socket = new WebSocket(wsUrl)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    reconnect () {
      // 重新连接
      var that = this
      if (that.lockReconnect) {
        return
      }
      that.lockReconnect = true
      // 没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum)
      that.timeoutnum = setTimeout(function () {
        // 新连接
        that.init()
        that.lockReconnect = false
      }, 5000)
    },
    reset () {
      // 重置心跳
      var that = this
      // 清除时间
      clearTimeout(that.timeoutObj)
      clearTimeout(that.serverTimeoutObj)
      // 重启心跳
      that.start()
    },
    start () {
      // 开启心跳
      console.log('ping')
      var self = this
      self.timeoutObj && clearTimeout(self.timeoutObj)
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj)
      self.timeoutObj = setTimeout(function () {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.socket.readyState === 1) {
          // 如果连接正常
          self.socket.send('ping') // 这里可以自己跟后端约定
        } else {
          // 否则重连
          self.reconnect()
        }
        self.serverTimeoutObj = setTimeout(function () {
          // 超时关闭
          self.socket.close()
        }, self.timeout)
      }, self.timeout)
    },
    open () {
      console.log('socket连接成功')
      this.start()
    },
    error () {
      console.log('连接错误')
    },
    getMessage (msg) {
      if (msg.data === 'pong') {
        console.log(msg)
      } else {
        var data = JSON.parse(msg.data)
        for (let index in this.goodslist) {
          console.log(this.goodslist[index].cargoNo === data.orderNo, this.goodslist[index].cargoNo, data.data.orderNo, data)
          if (this.goodslist[index].cargoNo === data.data.orderNo) {
            this.goodslist[index].length = data.data.length
            this.goodslist[index].width = data.data.width
            this.goodslist[index].height = data.data.height
            this.goodslist[index].weight = data.data.weight
          }
        }
        console.log(this.goodslist)
      }
      this.reset()
    },
    send (data) {
      this.socket.send(data)
    },
    close () {
      if (this.socket && this.socket.close !== undefined) {
        this.socket.close()
      }
      console.log('socket已经关闭')
      this.reconnect()
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
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
