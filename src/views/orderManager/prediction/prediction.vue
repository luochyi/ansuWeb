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
              <el-button class='orangeBtn long1' size="samll"
              style="width:130px;background: #FEF4E1;color: rgba(0, 0, 0, 0.65);" @click="visibleList = true">批量导出Excel</el-button>
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
          <!-- 列表显示设置 -->
            <el-drawer
            title="批量导出Excel"
            :visible.sync="visibleList"
            :wrapperClosable='false'
            size="50%">
              <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                  <el-row class="Flexcenter">
                    <span class="query">导出配置&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="listQueryName"></el-select>
                    <el-button class="orangeBtn" style="margin-left:20px">确 定</el-button>
                    <el-button class="whiteBtn" style="margin-left:20px" @click="preservation = true">保存配置</el-button>
                    <el-button class="whiteBtn" style="margin-left:20px">查看配置</el-button>
                  </el-row>
                  <el-row class="mainSearch">请选择需要导出Excel的字段</el-row>
                  <!-- 全选/反选 -->
                  <div class="Flexcenter" style="margin-left:24px">
                    <el-checkbox v-model="checked" @change="checked1"/>
                    <span class="checked1">全部</span>
                  </div>
                  <el-tree
                  ref="tree"
                  :default-checked-keys="roleData"
                  :data="data"
                  show-checkbox
                  @check-change="handleCheckChange"
                  default-expand-all
                  node-key="id"
                  :props="{label: 'label'}">
                </el-tree>
              </div>
            <el-row style="background:#fff;text-align:left;padding:26px;margin-top:26px">
                <el-button class="orangeBtn long1" plain size="small"  style="margin-right:20px">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>
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
      ],

      visibleList: false, // 批量导出
      listQueryName: '', // 导出配置名称
      // 树组
      data: [
        {
          label: '客户信息',
          id: 1,
          children: [{
            label: '客户名称',
            id: '1-1'
          },
          {
            label: '客户编码',
            id: '1-2'
          }]
        },
        {
          label: '运号',
          id: 2,
          children: [{
            label: '订单类型',
            id: '2-1'
          },
          {
            label: '运单号',
            id: '2-2'
          },
          {
            label: '预报单号',
            id: '2-3'
          },
          {
            label: '货件编号',
            id: '2-4'
          }
          ]
        }
      ],
      roleData: [],
      checked: ''
    }
  },
  methods: {
    // 选择标签
    handleClick (val) {
      console.log(val)
    },
    // 全选/反选
    checked1 (val) {
      console.log(val)
      if (this.checked) { // 全选
        this.$refs.tree.setCheckedNodes(this.data)
      } else { // 取消选中
        this.$refs.tree.setCheckedKeys([])
      }
    },
    // 保存配置
    preservation () {},
    // 回调
    handleCheckChange (data, checked, indeterminate) {
      // console.log(data)
    }
  }
}
</script>

<style lang='scss' scoped>
.SelectedNodeStyle{
  margin: 10px 0;
}
.checked1{
  font-size: 16px;
  margin-left: 10px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}
.el-tree {
    /deep/ .el-tree-node__children {
        display: flex;
        .el-tree-node__children {
            display: flex;
        }
    }
}
.mainSearch{
  font-size: 16px;
  margin: 26px 0 16px 0;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.query{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
/deep/ .el-drawer{
  padding-top: 0px;
  background: #E8EBF2;
    .el-drawer__header{
      padding: 30px 20px;
      margin-bottom: 0px;
      text-align: left;
      background: #FFFFFF;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;color: #333333;
}
.el-drawer__rtl{
    padding:0;
    margin:0;
}
.el-drawer__body{
      margin-top: 0px;
      padding-top: 0px;
      text-align: left;
      overflow: scroll;
    }
.drawer_btn{
      display: flex;
      width:100%;
      padding-left: 20px;
      align-items: center;
      justify-content: flex-start;
      margin-top: 26px;
      // margin-left: -26px;
      margin-bottom: -26px;
      // width: 100%;
      box-sizing: border-box;
      height: 60px;
      background: #FFFFFF;
      box-sizing: border-box;
    }
}
// .main {
//   margin: 20px 0px;
// }
</style>
