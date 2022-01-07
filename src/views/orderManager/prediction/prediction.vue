<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>预报管理</span>
        <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='已下单' name='1'></el-tab-pane>
          <el-tab-pane label='已收货' name='2'></el-tab-pane>
          <el-tab-pane label='全部' name='0'></el-tab-pane>
          <!-- <el-tab-pane label='已入库' name='3'></el-tab-pane> -->
        </el-tabs>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row :gutter="15">
          <el-col :span="20">
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
            </el-form>
            </el-col>
           <el-col :span="4">
                <!-- <el-form-item size="large"> -->
                  <div class="searchBtn">
                    <el-button class="orangeBtn" @click="search">查询</el-button>
                    <el-button class="whiteBtn" @click="resetForm('elForm')">重置</el-button>
                  </div>
                <!-- </el-form-item> -->
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class='table'>
          <el-row class='tableBtn'>
            <el-col :span='12' class='left'>
              <!-- <el-button class='batch'>批量导出Excel</el-button> -->
              <!-- <el-button class='batch'>协调订单</el-button> -->
            </el-col>
            <el-col :span='20' class='right'>
              <!-- <el-button class='whiteBtn '>列表显示设置</el-button> -->
            </el-col>
          </el-row>
          <br>
          <!-- 表格 -->
          <el-table ref="multipleTable" :data="tableData"  border  tooltip-effect="dark" style="width: 100%" @handleSelectionChange="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <!-- <el-table-column type='selection' min-width='50'> </el-table-column> -->
            <!-- 预报单号 -->
            <el-table-column  prop='forecast_no'  label='预报单号'  min-width='153'> </el-table-column>
            <!-- 预报类型 -->
            <el-table-column  prop='type' :formatter='formatter' label='预报类型'  min-width='126'></el-table-column>
            <!-- 票数 -->
            <el-table-column prop='waybill_count' label='票数' min-width='107'   >
               <template v-slot='scope'>
                <span style='margin-right: 5px'>  {{ scope.row.waybill_count }}  </span>
                <!-- <el-button @click="waybill" type='text'>查看</el-button> -->
              </template>
            </el-table-column>
             <!-- 客户名称 -->
            <el-table-column  prop='customer_name'  label='客户名称'  min-width='193'>  </el-table-column>
            <!-- 客户编号 -->
            <el-table-column  prop='customer_code'  label='客户编号'  min-width='118'>
            </el-table-column>
            <!-- 收货司机 -->
            <el-table-column label='收货司机' min-width='107' prop='driver_name'>
              <template v-slot='scope'>
                <span style='margin-right: 5px'>
                  {{ scope.row.driver_name }}
                </span>
                <!-- <el-button type='text'>查看</el-button> -->
              </template>
            </el-table-column>
            <!-- 预报件数 -->
            <el-table-column prop='box_count' label='预报件数' min-width='86'>  </el-table-column>
            <!-- 预报重量 -->
            <el-table-column prop='weight' label='预报重量' min-width='80'>  </el-table-column>
            <!-- 预报方数 -->
             <el-table-column prop='volume' label='预报方数' min-width='80'>
               <template slot-scope="scope">
                 {{(scope.row.volume/1000000).toFixed(2)+'m³'}}
               </template>
             </el-table-column>
            <el-table-column label='货好时间' min-width='157' prop='good_time'>
              <template slot-scope='scope'>
                {{formatDate(scope.row.good_time,'yyyy-MM-dd hh:mm:ss')}}
              </template>
            </el-table-column>
            <!-- 寄件方式 -->
            <el-table-column label='收件方式' min-width='81' prop="receive_type">
              <template slot-scope='scope'>
                {{ scope.row.receive_type ===1?'上门取件':'自送入仓'}}
              </template>
            </el-table-column>
            <!-- 预报时间 -->
             <el-table-column prop='created_at' label='预报时间' min-width='182'>
               <template slot-scope="scope">{{formatDate(scope.row.created_at,'yyyy-MM-dd hh:mm:ss')}}</template>
            </el-table-column>
              <!-- 收货时间 -->
             <el-table-column prop='received_at' label='收货时间' min-width='182' v-if="activeName === '2'">
               <template slot-scope="scope">{{formatDate(scope.row.received_at,'yyyy-MM-dd hh:mm:ss')}}</template>
            </el-table-column>
              <!-- 收货时间 -->
             <el-table-column prop='received_at' label='收货时间' min-width='182' v-if="activeName === '3'">
               <template slot-scope="scope">{{formatDate(scope.row.received_at,'yyyy-MM-dd hh:mm:ss')}}</template>
            </el-table-column>
              <!-- 入库时间 -->
             <el-table-column prop='already_at' label='入库时间' min-width='182' v-if="activeName === '3'">
               <template slot-scope="scope">{{formatDate(scope.row.already_at,'yyyy-MM-dd hh:mm:ss')}}</template>
            </el-table-column>
            <!-- 业务员 -->
            <el-table-column label='业务员' min-width='110'  prop='salesman_name'>
              <template v-slot='scope'>
                <span style='margin-right: 5px'>
                  {{ scope.row.salesman_name }}
                </span>
                <!-- <el-button type='text'>查看</el-button> -->
              </template>
            </el-table-column>
            <!-- 协同 -->
             <!-- <el-table-column prop='coordination' label='协同' min-width='124'>
            </el-table-column> -->
            <!-- 操作 -->
            <el-table-column label='操作' fixed='right' width='120'>
              <template slot-scope="scope">
                 <el-button type="text" @click="Orderdetails(scope.row.id)"> 查看详情</el-button>
                <!-- <el-button v-if="scope.row.type ===2" type="text" @click="delivery(scope.row)">|&nbsp;&nbsp;发货 </el-button> -->
                 <!-- <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="Coordinated"> 协同运单 </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
         <div class='block'>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
              :current-page.sync='currentPage'
              :pager-count='9'
               :page-size='pageSize'
               :page-sizes='[5, 20, 50, 100]'
              layout='total, sizes, prev, pager, next, jumper'
              :total='total'>
              </el-pagination>
          </div>
        </div>
      </div>
      <commonDrawer :drawerVrisible="drawer" :drawerSize="drawerSize" :drawerTitle="drawerTitle">
        <div class="dra-content">
          <el-row class="label">
            <span>目的仓</span>
          </el-row>
          <el-row class="label">
            <span>渠道</span>
          </el-row>
          <el-divider></el-divider>
          <div v-for="item,index in tickets" :key="index" style="marginTop:30px">
            <el-row class="label">
              <span>货件编号</span><el-input size="mini" v-model="item.code" @blur="changeList(index)"></el-input>
              <el-button type="danger" size="mini" @click="delPlan(index)" v-if="index!==0" style="marginLeft:10px">删除计划</el-button>
            </el-row>
            <el-row class="label"><span>货件数量</span><el-input size="mini" type="number" v-model="item.num" @blur="changeList(index)"></el-input></el-row>
            <el-table :data="item.checklists" :key="timeStamp" border :header-cell-style="{ background: '#F5F5F6', color: '#999999FF',fontSize:'14px' }" tooltip-effect="light">
              <el-table-column label="货件编号" prop="code" class="column" >
                <template slot-scope="scope">
                  {{scope.row.code}} <el-button type="text" @click="editCode(scope,index)">修改尾号</el-button>
                </template>
              </el-table-column>
              <el-table-column label="装箱清单">
                <template slot-scope="scope">
                  {{scope.row.isHaveList===1?'有装箱清单':'无装修清单'}}
                  <el-button type="text" v-if="scope.row.isHaveList===1">编辑</el-button>
                  <el-button type="text" v-else-if="scope.row.isHaveList===0">填写</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-button class="orangeBtn" @click="addPlan" size="mini">新增计划</el-button>
        </div>
        <div slot="footer">
        <button class="btn-orange" @click="submit()" >
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="drawerClose" >
          <span>取消</span>
        </button>
      </div>
      </commonDrawer>
      <el-dialog
        title="修改尾号"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span><el-input v-model="msg"></el-input></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editOK">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 抽屉
      drawer: false,
      timeStamp: null,
      drawerTitle: '未建FBA计划——发货',
      codeindex: null,
      scopeindex: null,
      drawerSize: '40%',
      dialogVisible: false,
      forecastId: null, // 预报单id
      warehouseOption: [], // 仓库筛选
      addressId: null, // 仓库id
      channelOption: [], // 渠道筛选
      channelId: null, // 渠道id
      tickets: [
        {
          num: null,
          code: '',
          checklists: []
        }
      ], // 票数据
      msg: '',
      // 分页
      pageSize: 5, // 默认当前条数
      currentPage: 1, // 当前页码
      total: 0, // 数据数量

      activeName: '1', // 默认第一项‘已下单’

      forecast_no: '', // 预报单号
      type: '', // 预报类型
      waybill_count: '', // 票数
      customer_name: '', // 客户名称
      customer_code: '', // 客户编号
      receipt_type: '', // 收货类型
      driver_id: '', // 司机id
      driver_name: '', // 司机名称
      box_count: '', // 收货件数
      warehousedpieces: '', // 入库件数
      Forecastnumber: '', // 预报件数
      weight: '', // 预报重量
      volume: '', // 预报方数
      good_time: '', // 货好时间
      receive_type: '', // 寄件方式
      created_at: '', // 预报时间
      received_at: '', // 收货时间
      already_at: '', // 入库时间
      salesman_name: '', // 业务员
      salesman_id: '', // 销售id
      coordination: '', // 协同

      tableData: [

      ],
      searchForm: {
        forecastNo: '',
        customerCode: '',
        customerName: '',
        salesmanName: ''
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      let params = {
        status: Number(this.activeName),
        page: this.currentPage,
        limit: this.pageSize,
        forecastNo: this.searchForm.forecastNo,
        customerCode: this.searchForm.customerCode,
        customerName: this.searchForm.customerName,
        salesmanName: this.searchForm.salesmanName
      }
      this.$api.Ordermanagement.forecastLists(params).then(res => {
        console.log(res.data) // res是接口返回的结果
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    addPlan () {
      this.tickets.push(
        {
          num: null,
          code: '',
          checklists: []
        }
      )
    },
    delPlan (index) {
      this.tickets.splice(index, 1)
    },
    // 修改尾号
    editCode (scope, index) {
      // console.log(scope)
      this.msg = scope.row.code
      this.dialogVisible = true
      this.scopeindex = scope.$index
      this.codeindex = index
    },
    editOK () {
      this.timeStamp = String(new Date())
      this.dialogVisible = false
      this.tickets[this.codeindex].checklists[this.scopeindex].code = this.msg
    },
    // 输入数量、编号后调用
    changeList (index) {
      console.log(index)
      console.log(this.tickets[index].num)
      this.tickets[index].checklists = []
      for (let j = 0; j < this.tickets[index].num; j++) {
        this.timeStamp = String(new Date())
        this.tickets[index].checklists[j] = {
          code: this.tickets[index].code + '000' + (j + 1),
          isHaveList: 0
        }
      }
      console.log(this.tickets)
    },
    // 发货
    delivery (data) {
      this.drawer = true
      console.log(data)
      // this.forecastId = data.id
    },
    drawerClose () {
      this.drawer = false
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      console.log(1)
      this.pageSize = val // 设置当前页容量为val
      this.getData() // 重新渲染表格
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.currentPage = val // 设置当前页码为val
      this.getData() // 重新渲染表格
    },
    formatter (row, column) {
      // console.log(row)
      if (row.type === 1) {
        return '计划下单'
      } else if (row.type === 2) {
        return '无计划下单'
      }
    },
    search () {
      this.currentPage = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    waybill () {
      this.$router.push({ name: 'waybill' })
    },
    Orderdetails (val) {
      this.$router.push({ name: 'Orderdetails', params: { mes: val } })
    },
    Coordinated () {
      this.$router.push({ name: 'Coordinated' })
    },
    handleClick (tab, event) {
      console.log(tab, event)
      this.activeName = tab.name
      this.getData()
    },
    handleSelectionChange () {

    }
  }
}
</script>

<style lang='scss' scoped>

.dra-content{
  text-align: left;
  /deep/.cell{
  display: flex;
  justify-content:space-between;
  line-height: 40px;
}
}
/deep/ .tableBtn{
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
.label{
  font-size: 14px;
  padding: 5px;
  span{
    width: 100px;
  }
  /deep/.el-input__inner{
    width: 200px;
    display: inline;
  }
   .el-input{
    display: inline;
    margin-left: 10px;
  }
}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
