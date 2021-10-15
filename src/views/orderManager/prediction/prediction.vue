<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>预报管理</span>
        <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='已下单' name='1'></el-tab-pane>
          <el-tab-pane label='已收货' name='2'></el-tab-pane>
          <el-tab-pane label='已入库' name='3'></el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>预报单号</span>
            </el-col>
            <el-col :span='12'>
              <el-input v-model='ForecastNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>预报类型</span>
            </el-col>
            <el-col :span='13'>
                        <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='11'>
              <el-input v-model='customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>业务员</span>
            </el-col>
            <el-col :span='13'>
              <el-select v-model="valuea" placeholder="请输入">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>寄件方式</span>
            </el-col>
            <el-col :span='13'>
                         <el-select v-model="valueb" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>收货司机</span>
            </el-col>
            <el-col :span='13'>
                       <el-select v-model="valuec" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class='table'>
          <el-row class='tableBtn'>
            <el-col :span='12' class='left'>
              <el-button class='batch'>批量导出Excel</el-button>
              <el-button class='batch'>协调订单</el-button>
            </el-col>
            <el-col :span='20' class='right'>
              <el-button class='whiteBtn '>列表显示设置</el-button>
            </el-col>
          </el-row>
          <br>
          <!-- 表格 -->
          <el-table ref="multipleTable" :data="tableData"  border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type='selection' min-width='50'> </el-table-column>
            <!-- 预报单号 -->
            <el-table-column  prop='forecast_no'  label='预报单号'  min-width='153'> </el-table-column>
            <!-- 预报类型 -->
            <el-table-column  prop='type' :formatter='formatter' label='预报类型'  min-width='126'></el-table-column>
            <!-- 票数 -->
            <el-table-column prop='waybill_count' label='票数' min-width='107'   >
               <template v-slot='scope'>
                <span style='margin-right: 5px'>  {{ scope.row.waybill_count }}  </span>
                <el-button @click="waybill" type='text'>查看</el-button>
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
                  {{ scope.row.Receivingdriver }}
                </span>
                <el-button type='text'>查看</el-button>
              </template>
            </el-table-column>
            <!-- 预报件数 -->
            <el-table-column prop='Forecastnumber' label='预报件数' min-width='86'>  </el-table-column>
            <!-- 预报重量 -->
            <el-table-column prop='weight' label='预报重量' min-width='80'>  </el-table-column>
            <!-- 预报方数 -->
             <el-table-column prop='volume' label='预报方数' min-width='80'>  </el-table-column>
             <!-- 收货件数 -->
            <el-table-column label='收货件数' min-width='107' prop='box_count' v-if="activeName === '2'">
              <template v-slot='scope' >
                <span style='margin-right: 5px'>
                  {{ scope.row.goodsreceived }}
                </span>
                <el-button type='text'>查看</el-button>
              </template>
            </el-table-column>
             <!-- 收货件数 -->
            <el-table-column label='收货件数' min-width='107' prop='box_count' v-if="activeName === '3'">
              <template v-slot='scope' >
                <span style='margin-right: 5px'>
                  {{ scope.row.goodsreceived }}
                </span>
                <el-button type='text'>查看</el-button>
              </template>
            </el-table-column>
             <!-- 入库件数 -->
             <el-table-column prop='warehousedpieces' label='入库件数' min-width='182' v-if="activeName === '3'">
            </el-table-column>
            <!-- 货好时间 -->
            <el-table-column label='货好时间' min-width='157' prop='good_time'>
              <template v-slot='scope'>
                {{ scope.row.completeTime }}
              </template>
            </el-table-column>
            <!-- 寄件方式 -->
            <el-table-column label='寄件方式' min-width='81'>
              <template v-slot='scope'>
                {{ scope.row.mailingMethod }}
              </template>
            </el-table-column>
            <!-- 预报时间 -->
             <el-table-column prop='created_at' label='预报时间' min-width='182'>
            </el-table-column>
              <!-- 收货时间 -->
             <el-table-column prop='received_at' label='收货时间' min-width='182' v-if="activeName === '2'">
            </el-table-column>
              <!-- 收货时间 -->
             <el-table-column prop='received_at' label='收货时间' min-width='182' v-if="activeName === '3'">
            </el-table-column>
              <!-- 入库时间 -->
             <el-table-column prop='already_at' label='入库时间' min-width='182' v-if="activeName === '3'">
            </el-table-column>
            <!-- 业务员 -->
            <el-table-column label='业务员' min-width='110'  prop='salesman_name'>
              <template v-slot='scope'>
                <span style='margin-right: 5px'>
                  {{ scope.row.salesman }}
                </span>
                <el-button type='text'>查看</el-button>
              </template>
            </el-table-column>
            <!-- 协同 -->
             <el-table-column prop='coordination' label='协同' min-width='124'>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label='操作' fixed='right' min-width='199'>
              <template slot-scope="scope">
                 <el-button type="text" @click="Orderdetails(scope.row.id)"> 查看详情</el-button>
                 <span v-if="scope.row.Forecasttype == '未建计划'" style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="scope.row.Forecasttype == '未建计划'" type="text" @click="drawer= true" style="margin-left: 16px;"> 发货 </el-button>
                 <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="Coordinated"> 协同运单 </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
         <div class='block'>
            <el-pagination
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
              :current-page.sync='currentPage'
              :pager-count='9'
               :page-size='pageSize'
               :page-sizes='[5, 20, 50, 100]'
              layout='total, sizes, prev, pager, next, jumper'
              :total='50'>
              </el-pagination>
          </div>
        </div>
        <el-drawer
  title="我是外面的 Drawer"
  :visible.sync="drawer"
  size="50%">
  <div>
   <el-button @click="innerDrawer = true">打开里面的!</el-button>
   <el-drawer
     title="我是里面的"
     :append-to-body="true"
     :before-close="handleClose"
     :visible.sync="innerDrawer">
     <p>_(:зゝ∠)_</p>
   </el-drawer>
  </div>
</el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 抽屉
      drawer: false,
      innerDrawer: false,
      // 分页
      pageSize: 5, // 默认当前条数
      currentPage: 1, // 当前页码
      total: 50, // 数据数量

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

      options: [{
        label: ''
      }, {
        value: '选项2',
        label: '已建计划'
      }, {
        value: '选项3',
        label: '未建计划'
      }
      ],
      value: '',
      tableData: [

      ]
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
      let params = {
        status: Number(this.activeName)
      }
      console.log('getget')
      // limit: this.page.limit, page: this.page.pageNo 页码和页容量
      this.$api.Ordermanagement.forecastLists(params).then(res => {
        console.log(res.data) // res是接口返回的结果
        // res.data.list && res.data.list.forEach(ele => {
        // let obj = {
        //   status: Number(this.activeName),
        //   name: ele.name,
        //   contact: ele.liaison,
        //   number: ele.phone,
        //   address: ele.address
        // }
        // this.tableData.push(obj)
        this.tableData = res.data.list
        // })
        this.page.total = res.data.total // 数据总量
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
    formatter (row, column) {
      // console.log(row)
      if (row.type === 1) {
        return '计划下单'
      } else if (row.type === 2) {
        return '无计划下单'
      }
    },
    // 操作按钮列表
    editTableData (row) {},
    search () {
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
    handleClose (done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='scss' scoped>
// .main {
//   margin: 20px 0px;
// }
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
</style>
