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
            <el-col :span='16'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>运单号</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='waybillNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>预报渠道</span>
            </el-col>
            <el-col :span='16'>
              <el-input
                v-model='predictionChannel'
                placeholder='请输入'
              ></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>收货司机</span>
            </el-col>
            <el-col :span='16'>
              <el-input
                v-model='receivingDriver'
                placeholder='请输入'
              ></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>业务员</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='salesman' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <el-button class='wuBtn long1'>展开全部</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class='table'>
          <el-row class='tableBtn'>
            <el-col :span='12' class='left'>
              <el-button class='orangeBtn long1'>批量导出Excel</el-button>
            </el-col>
            <el-col :span='12' class='right'>
              <el-button class='whiteBtn '>查询条件设置</el-button>
              <el-button class='whiteBtn '>列表显示设置</el-button>
            </el-col>
          </el-row>
          <!--  -->
          <el-table
            :data='tableData'
            style='width: 100%; margin-top: 20px'
            :header-cell-style="{ background: '#E9E9E9' }"
          >
            <el-table-column type='selection' min-width='50'> </el-table-column>
            <!-- 预报单号 -->
            <el-table-column
              prop='predictionNo'
              label='预报单号'
              min-width='130'
            >
            </el-table-column>
            <!-- 客户名称 -->
            <el-table-column
              prop='customerName'
              label='客户名称'
              min-width='200'
            >
            </el-table-column>
            <!-- 客户编号 -->
            <el-table-column
              prop='customerCode'
              label='客户编号'
              min-width='80'
            >
            </el-table-column>
            <!-- 司机 -->
            <el-table-column label='收货司机' min-width='110'>
              <template v-slot='scope'>
                <span style='margin-right: 5px'>
                  {{ scope.row.receivingDriver }}
                </span>
                <el-button type='text'>查看</el-button>
              </template>
            </el-table-column>
            <!-- 分票 -->
            <el-table-column label='发票' min-width='130'>
              <template v-slot='scope'>
                <div v-if="scope.row.isvotes === '已分票'">
                  <span class='greenCricle' style='margin-right: 5px'></span>
                  <span style='margin-right: 15px'>
                    {{ scope.row.isvotes }}
                  </span>
                  <el-button type='text'>详情</el-button>
                </div>
                <div v-else-if="scope.row.isvotes === '部分分票'">
                  <span class='orangeCricle' style='margin-right: 5px'></span>
                  <span style='margin-right: 15px'>
                    {{ scope.row.isvotes }}
                  </span>
                  <el-button type='text'>分票</el-button>
                </div>
                <div v-else>
                  <span class='redCricle' style='margin-right: 5px'></span>
                  <span style='margin-right: 15px'>
                    {{ scope.row.isvotes }}
                  </span>
                  <el-button type='text'>分票</el-button>
                </div>
              </template>
            </el-table-column>
            <!-- 发票 -->
            <el-table-column label='发票' min-width='130'>
              <template v-slot='scope'>
                <div v-if="scope.row.invoice === '已做发票'">
                  <span class='greenCricle' style='margin-right: 5px'></span>
                  <span style='margin-right: 15px'>
                    {{ scope.row.invoice }}
                  </span>
                  <el-button type='text'>详情</el-button>
                </div>
                <div v-else>
                  <span class='redCricle' style='margin-right: 5px'></span>
                  <span style='margin-right: 15px'>
                    {{ scope.row.invoice }}
                  </span>
                  <el-button type='text'>制作</el-button>
                </div>
              </template>
            </el-table-column>
            <!-- 票数 -->
            <el-table-column label='收货司机' min-width='80'>
              <template v-slot='scope'>
                <span> {{ scope.row.invoiceNum }}票 </span>
              </template>
            </el-table-column>
            <!-- 运单号 -->
            <el-table-column prop='waybillNo' label='运单号' min-width='150'>
            </el-table-column>
            <!-- 运单号 -->
            <el-table-column prop='waybillNo' label='运单号' min-width='150'>
            </el-table-column>
            <!-- 货好时间 -->
            <el-table-column label='货好时间' min-width='160'>
              <template v-slot='scope'>
                {{ scope.row.completeTime }}
              </template>
            </el-table-column>
            <!-- 寄件方式 -->
            <el-table-column label='寄件方式' min-width='160'>
              <template v-slot='scope'>
                {{ scope.row.mailingMethod }}
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label='操作' fixed='right' min-width='110'>
              <template v-slot='scope'>
                <div v-if="scope.row.isvotes === '已分票'">
                  <el-button type='text'>查看详情</el-button>
                </div>
                <div v-else>
                  <el-button type='text'>查看详情</el-button>
                  <span style='color: blue'>|</span>
                  <el-button type='text'>分票</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class='block'>
            <span>共搜索到{{ total }}条数据</span>
            <el-pagination
              :current-page.sync='currentPage'
              :pager-count='9'
              :page-size='pageSize'
              :page-sizes='[10, 20, 50, 100, 200, 500]'
              layout='prev, pager, next, sizes, jumper'
              :total='total'
            ></el-pagination>
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
      total: 50, // 数据数量
      pageSize: 10, // 默认当前条数
      currentPage: 1, // 当前页码

      activeName: '1',
      predictionNo: '', // 预报单号
      waybillNo: '', // 运单号
      customerName: '', // 客户名称
      customerCode: '', // 客户编码
      predictionChannel: '', // 预报渠道
      receivingDriver: '', // 收货司机
      salesman: '', // 业务员
      completeTime: '', // 货好时间
      mailingMethod: '', // 寄件方式

      tableData: [
        {
          predictionNo: 'YB2012090001', // 预报单号
          customerName: '深圳沙马家居贸易有限公司', // 客户名称
          customerCode: 'SMJJ', // 客户编号
          receivingDriver: '王狮虎', // 司机
          isvotes: '已分票', // 分票
          invoice: '已做发票', // 发票
          invoiceNum: '1', // 票数
          waybillNo: 'AS2012090001' // 运单号
        }
      ]
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
    }
  }
}
</script>

<style lang='scss' scoped>
// .main {
//   margin: 20px 0px;
// }
</style>
