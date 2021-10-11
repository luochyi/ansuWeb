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
            <el-input v-model='msg' placeholder='请输入'>
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
            </el-input>
          </el-col>
        </el-col>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>客户名称</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 客户编码 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>客户编码</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 预报类型 -->
         <el-col :span='6' class='colbox'>
          <span class='text'>预报类型</span>
          <el-col :span='16'>
            <el-select v-model='msg' placeholder='请输入'></el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row class='searchbox1'>
        <!-- 收货司机 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>收货司机</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 预报时间 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>预报时间</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 业务员 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>业务员</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
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
            <el-button class='stopBtn'>批量通过审核</el-button>
            <el-button class='stopBtn'>批量拒绝审核</el-button>
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
            {{ slotData.data.ywy
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <template v-slot:piaoshu="slotData">
            {{ slotData.data.num
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <template v-slot:diver="slotData">
            {{ slotData.data.diver
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
              <span @click="detail(scope.row)" class="blue">查看详情</span>
              <span v-if="activeName==='1'" @click="detail(scope.row)" class="blue">&nbsp;|&nbsp;通过&nbsp;|&nbsp;</span>
              <span v-if="activeName==='1'" @click="detail(scope.row)" class="blue">拒绝</span>
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
      msg: '',
      activeName: '1', // 标签绑定
      serviceName: null,
      fenquzhongliang: true,
      columns: [
        {
          prop: 'code',
          label: '预报单号',
          width: '200',
          align: 'center'
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'type',
          label: '预报类型',
          width: '100',
          align: 'center'
        },
        {
          prop: 'num',
          label: '票数',
          width: '100',
          align: 'center',
          type: 'slot',
          slotName: 'piaoshu'
        },
        {
          prop: 'name',
          label: '客户名称',
          width: '250',
          align: 'center'
        },
        {
          prop: 'khbh',
          label: '客户编号',
          width: '100',
          align: 'center'

        },
        // 已处理才有
        // {
        //   prop: 'status',
        //   label: '处理状态',
        //   width: '200',
        //   align: 'center',
        //   type: 'slot',
        //   slotName: 'status'
        // },
        // {
        //   prop: 'spr',
        //   label: '审批人',
        //   width: '200',
        //   align: 'center',
        //   type: 'slot',
        //   slotName: 'spr'
        // },
        {
          prop: 'diver',
          label: '收货司机',
          width: '100',
          align: 'center',
          type: 'slot',
          slotName: 'diver'
        },
        {
          prop: 'js',
          label: '预报件数',
          width: '100',
          align: 'center'
        },
        {
          prop: 'address',
          label: '收货地址',
          width: '300',
          align: 'center'
        },
        {
          prop: 'ybzl',
          label: '预报重量',
          width: '100',
          align: 'center'
        },
        {
          prop: 'ybfs',
          label: '预报方数',
          width: '100',
          align: 'center'
        },
        {
          prop: 'time',
          label: '预报时间',
          width: '200',
          align: 'center'
        },
        {
          prop: 'hhsj',
          label: '货好时间',
          width: '100',
          align: 'center'
        },
        {
          prop: 'ywy',
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
  created () {
    this.tableData = [
      {
        code: 'YBSZ213232232',
        type: '已建计划',
        num: '2票',
        name: 'sz沙马家具毛衣公司',
        khbh: 'smjj',
        status: '通过审批',
        spr: '张三',
        diver: '王师傅',
        js: '2件',
        address: '上海市普陀区金沙江路 1518 弄',
        ybzl: '80公斤',
        ybfs: '90立方',
        time: '2020年12月9日',
        hhsj: '14.50',
        ywy: '张三'
      },
      {
        code: 'YBSZ213232232',
        type: '已建计划',
        num: '2票',
        name: 'sz沙马家具毛衣公司',
        khbh: 'smjj',
        status: '通过审批',
        spr: '张三',
        diver: '王师傅',
        js: '2件',
        address: '上海市普陀区金沙江路 1518 弄',
        ybzl: '80公斤',
        ybfs: '90立方',
        time: '2020年12月9日',
        hhsj: '14.50',
        ywy: '张三'
      }
    ]
    this.page.total = 2
  },
  methods: {
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
    },
    formatters (row, column, cellValue) {
      return row.address + '测试'
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      console.log(val)
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        {
          date: '2016-05-03',
          name: '王小虎111',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    },
    // checkbox选中获取数据
    handleSelectionChange (val) {
      console.log(val)
    },
    // 查看
    detail (val) {
      console.log(val.data)
      this.$route.push('name:sjmssqDetail')
    },
    handleClick (tab, event) { console.log(tab, event) },
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
            align: 'center'
          },
          {
            prop: 'spr',
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
