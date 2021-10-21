<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>收件免扫申请</span>
      <el-tabs v-model='activeName' type='card' @tab-click="handleClick">
        <el-tab-pane label='未处理' name='1'></el-tab-pane>
        <el-tab-pane label='已处理' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 预报单号 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>预报单号</span>
          <el-col :span='16'>
            <el-input v-model='forecast_no' placeholder='请输入'>
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
            </el-input>
          </el-col>
        </el-col>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>客户名称</span>
          <el-col :span='16'>
            <el-input v-model='customer_name' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 客户编码 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>客户编码</span>
          <el-col :span='16'>
            <el-input v-model='customer_code' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 预报类型 -->
         <el-col :span='6' class='colbox'>
          <span class='text'>预报类型</span>
          <el-col :span='16'>
            <el-select v-model='type' placeholder='请输入'></el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row class='searchbox1'>
        <!-- 收货司机 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>收货司机</span>
          <el-col :span='16'>
            <el-input v-model='driver_name' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 预报时间 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>预报时间</span>
          <el-col :span='16'>
            <el-input v-model='forecast_created_at' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 业务员 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>业务员</span>
          <el-col :span='16'>
            <el-input v-model='salesman_name' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colbox justify-center'>
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left" v-if="activeName==='1'">
            <!-- <el-button class='stopBtn'>批量通过审核</el-button>
            <el-button class='stopBtn'>批量拒绝审核</el-button> -->
          </el-col>
          <!-- <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">新增渠道</el-button>
            <el-button class='whiteBtn'>列表显示设置</el-button>
          </el-col> -->
        </el-row>
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
             <!-- slot -->
          <template v-slot:yewuyuan="slotData">
            {{ slotData.data.salesman_name
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <template v-slot:piaoshu="slotData">
            {{ slotData.data.forecast_waybill_count
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <template v-slot:diver="slotData">
            {{ slotData.data.driver_name
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <!-- <template v-slot:status="slotData">
            {{ slotData.data.status
            }}
          </template>
          <template v-slot:spr="slotData">
            {{ slotData.data.spr
            }}
          </template> -->
          <!-- 操作 -->
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="210"
            :resizable="false"
          >
            <template slot-scope="scope">
               <el-button type="text" @click="detail(scope.row)">查看详情</el-button>
               <el-button type="text" v-if="activeName==='1'" @click="adopt(scope.row.id)" >通过</el-button>
               <el-button type="text" v-if="activeName==='1'" @click="refuse(scope.row.id)">拒绝</el-button>
            </template>
          </el-table-column>
        </commonTable>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      forecast_no: '', // 预报单号
      type: '', // 预报类型
      forecast_waybill_count: '', // 运单数量
      customer_name: '', // 客户名称
      customer_code: '', // 客户编号
      receipt_type: '', // 收货类型
      driver_name: '', // 司机姓名
      forecast_box_count: '', // 预报件数
      forecast_weight: '', // 预报重量
      forecast_volume: '', // 预报方数
      forecast_good_time: '', // 货好时间
      forecast_created_at: '', // 预报时间
      salesman_name: '', // 业务员

      activeName: '1', // 标签绑定
      serviceName: null,
      fenquzhongliang: true,
      columns: [
        {
          prop: 'forecast_no',
          label: '预报单号',
          width: '200',
          align: 'center'
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'forecast_type',
          label: '预报类型',
          width: '100',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'forecast_waybill_count',
          label: '票数',
          width: '100',
          align: 'center',
          type: 'slot',
          slotName: 'piaoshu'
        },
        {
          prop: 'customer_name',
          label: '客户名称',
          width: '250',
          align: 'center'
        },
        {
          prop: 'customer_code',
          label: '客户编号',
          width: '100',
          align: 'center'

        },
        {
          prop: 'driver_name',
          label: '收货司机',
          width: '200',
          align: 'center',
          type: 'slot',
          slotName: 'diver'
        },
        {
          prop: 'forecast_box_count',
          label: '预报件数',
          width: '100',
          align: 'center'
        },
        {
          prop: 'forecast_address',
          label: '收货地址',
          width: '300',
          align: 'center'
        },
        {
          prop: 'forecast_weight',
          label: '预报重量',
          width: '100',
          align: 'center'
        },
        {
          prop: 'forecast_volume',
          label: '预报方数',
          width: '100',
          align: 'center'
        },
        {
          prop: 'forecast_created_at',
          label: '预报时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'forecast_good_time',
          label: '货好时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'salesman_name',
          label: '业务员',
          width: '100',
          align: 'center',
          type: 'slot',
          slotName: 'yewuyuan'
        }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
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
      // 初始的表格数据清空
      this.tableData = []
      // limit: this.page.limit, page: this.page.pageNo 页码和页容量
      this.$api.Ordermanagement.forecastDirect({ limit: this.page.limit, page: this.page.pageNo, status: Number(this.activeName) }).then(res => {
        console.log(res.data) // res是接口返回的结果
        this.page.total = res.data.total // 数据总量
        this.tableData = res.data.list
      })
    },
    // 通过
    adopt: function (event) {
      console.log(event)
      this.$api.Ordermanagement.directAgree({ directId: Number(event) }).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 拒绝
    refuse: function (event) {
      console.log(event)
      this.$api.Ordermanagement.directReject({ directId: Number(event) }).then((res) => {})
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'status':
          return row.status === 1 ? '申请直接收获' : row.status === 2 ? '审核通过' : '审核驳回'
        case 'forecast_type':
          return row.forecast_type === 1 ? '计划下单' : '无计划下单'
        case 'forecast_created_at':
          return this.formatDate(row.forecast_created_at, 'yyyy-MM-dd hh:mm:ss')
        case 'forecast_good_time':
          return this.formatDate(row.forecast_good_time, 'yyyy-MM-dd hh:mm:ss')
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
    // checkbox选中获取数据
    handleSelectionChange (val) {
      console.log(val)
    },
    // 查看
    detail (val) {
      console.log(val.data)
      this.$router.push('name:sjmssqDetail')
    },
    handleClick (tab, event) {
      this.getData()
    },
    // 操作按钮列表
    editTableData (row) {}
    // 关闭抽屉
  },
  watch: {
    activeName: {
      handler (val) {
        console.log(val)
        if (val === '1') {
          this.columns.splice(5, 2)
        } else {
          this.columns.splice(5, 0, {
            prop: 'status',
            label: '处理状态',
            width: '100',
            align: 'center',
            formatter: this.formatter
          },
          {
            prop: 'approver_name',
            label: '审批人',
            width: '100',
            align: 'center'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .searchbox1{
  .stopBtn{
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
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  .el-dialog__body{
    border-top: 1px solid rgba(0,0,0,0.06);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
