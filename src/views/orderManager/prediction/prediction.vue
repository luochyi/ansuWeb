// 预报管理
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
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type='selection' min-width='50'> </el-table-column>
            <!-- 预报单号 -->
            <el-table-column  prop='ForecastNo'  label='预报单号'  min-width='153'> </el-table-column>
            <!-- 预报类型 -->
            <el-table-column  prop='Forecasttype'  label='预报类型'  min-width='126'></el-table-column>
            <!-- 票数 -->
            <el-table-column label='票数' min-width='107'>
               <template v-slot='scope'>
                <span style='margin-right: 5px'>  {{ scope.row.votes }}  </span>
                <el-button @click="waybill" type='text'>查看</el-button>
              </template>
            </el-table-column>
             <!-- 客户名称 -->
            <el-table-column  prop='customerName'  label='客户名称'  min-width='193'>  </el-table-column>
            <!-- 客户编号 -->
            <el-table-column  prop='Customernumber'  label='客户编号'  min-width='118'>
            </el-table-column>
            <!-- 收货司机 -->
            <el-table-column label='收货司机' min-width='107'>
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
            <el-table-column prop='Predictedweight' label='预报重量' min-width='80'>  </el-table-column>
            <!-- 预报方数 -->
             <el-table-column prop='Predictionsquare' label='预报方数' min-width='80'>  </el-table-column>
             <!-- 收货件数 -->
            <el-table-column label='收货件数' min-width='107' v-if="activeName === '2'">
              <template v-slot='scope' >
                <span style='margin-right: 5px'>
                  {{ scope.row.goodsreceived }}
                </span>
                <el-button type='text'>查看</el-button>
              </template>
            </el-table-column>
             <!-- 收货件数 -->
            <el-table-column label='收货件数' min-width='107' v-if="activeName === '3'">
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
            <el-table-column label='货好时间' min-width='157'>
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
             <el-table-column prop='Forecasttime' label='预报时间' min-width='182'>
            </el-table-column>
              <!-- 收货时间 -->
             <el-table-column prop='Receiving' label='收货时间' min-width='182' v-if="activeName === '2'">
            </el-table-column>
              <!-- 收货时间 -->
             <el-table-column prop='Receiving' label='收货时间' min-width='182' v-if="activeName === '3'">
            </el-table-column>
              <!-- 入库时间 -->
             <el-table-column prop='Warehousingtime' label='入库时间' min-width='182' v-if="activeName === '3'">
            </el-table-column>
            <!-- 业务员 -->
            <el-table-column label='业务员' min-width='110'>
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
                <el-button v-if="scope.row.Forecasttype == '未建计划'" type="text" @click="table = true" style="margin-left: 16px;"> 发货 </el-button>
                <el-drawer title="我嵌套了表格!"  :visible.sync="table" direction="rtl" size="50%">
           <el-table :data="gridData">
      <el-table-column property="date" label="日期" width="150"></el-table-column>
      <el-table-column property="name" label="姓名" width="200"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
</el-drawer>

                 <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="Coordinated"> 协同运单 </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
         <div class='block'>
            <el-pagination
              :current-page.sync='currentPage'
              :pager-count='9'
               :page-size='pageSize'
               :page-sizes='[10, 20, 50, 100]'
              layout='total, sizes, prev, pager, next, jumper'
              :total='150'>
              </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false, // 抽屉
      table: false,
      dialog: false,
      loading: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      // 分页
      pageSize: 10, // 默认当前条数
      currentPage: 1, // 当前页码
      total: 150, // 数据数量
      a: 1,
      b: 9,

      activeName: '1', // 默认第一项‘已下单’

      ForecastNo: '', // 预报单号
      Forecasttype: '', // 预报类型
      votes: '', // 票数
      customerName: '', // 客户名称
      Customernumber: '', // 客户编号
      Receivingdriver: '', // 收货司机
      goodsreceived: '', // 收货件数
      warehousedpieces: '', // 入库件数
      Forecastnumber: '', // 预报件数
      Predictedweight: '', // 预报重量
      Predictionsquare: '', // 预报方数
      completeTime: '', // 货好时间
      mailingMethod: '', // 寄件方式
      Forecasttime: '', // 预报时间
      Receiving: '', // 收货时间
      Warehousingtime: '', // 入库时间
      salesman: '', // 业务员
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
        {
          ForecastNo: 'YB2012090001', // 预报单号
          Forecasttype: '已建计划', // 预报类型
          votes: '2票', // 票数
          customerName: '深圳沙马家居有限公司', // 客户名称
          Customernumber: 'SMJJ沙马家具', // 客户编号
          receivingDriver: '王狮虎', // 司机
          goodsreceived: '12件', // 收货件数
          warehousedpieces: '', // 入库件数
          Forecastnumber: '100件', // 预报件数
          Predictedweight: '80公斤', // 预报重量
          Predictionsquare: '90立方', // 预报方数
          completeTime: '今天14:00-15:00', // 货好时间
          mailingMethod: '上门取件', // 寄件方式
          Forecasttime: '2020年12月09日 15:00', // 预报时间
          Receiving: '11', // 收货时间
          Warehousingtime: '', // 入库时间
          salesman: '张三', // 业务员
          coordination: '协同至安速广州' // 协同
        },
        {
          ForecastNo: 'YB2012090001', // 预报单号
          Forecasttype: '未建计划', // 预报类型
          votes: '————', // 票数
          customerName: '深圳大通科技有限公司', // 客户名称
          Customernumber: 'DTK大通科技', // 客户编号
          receivingDriver: '王狮虎', // 司机
          goodsreceived: '100件', // 件数
          warehousedpieces: '', // 入库件数
          Forecastnumber: '20件', // 预报件数
          Predictedweight: '80公斤', // 预报重量
          Predictionsquare: '90立方', // 预报方数
          completeTime: '今天16:00-17:00', // 货好时间
          mailingMethod: '上门取件', // 寄件方式
          Forecasttime: '2020年12月09日 20:00', // 预报时间
          Receiving: '', // 收货时间
          Warehousingtime: '', // 入库时间
          salesman: '李四', // 业务员
          coordination: '无' // 协同
        },
        {
          ForecastNo: 'YB2012090001', // 预报单号
          Forecasttype: '已建计划', // 预报类型
          votes: '1票', // 票数
          customerName: '深圳大通科技有限公司', // 客户名称
          Customernumber: 'DTK大通科技', // 客户编号
          receivingDriver: '王狮虎', // 司机
          goodsreceived: '', // 件数
          warehousedpieces: '', // 入库件数
          Forecastnumber: '20件', // 预报件数
          Predictedweight: '80公斤', // 预报重量
          Predictionsquare: '90立方', // 预报方数
          completeTime: '今天16:00-17:00', // 货好时间
          mailingMethod: '上门取件', // 寄件方式
          Forecasttime: '2020年12月09日 20:00', // 预报时间
          Receiving: '11', // 收货时间
          Warehousingtime: '', // 入库时间
          salesman: '李四', // 业务员
          coordination: '无' // 协同
        }
      ]
    }
  },
  methods: {
    waybill () {
      this.$router.push({ name: 'waybill' })
    },
    Orderdetails () {
      this.$router.push({ name: 'Orderdetails' })
    },
    Coordinated () {
      this.$router.push({ name: 'Coordinated' })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleClose (done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm () {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
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
