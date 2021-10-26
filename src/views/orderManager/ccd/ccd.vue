<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text' style="height:43px;lineHeight:43px">出仓单</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 预报单号 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>运单号</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'>
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
            </el-input>
          </el-col>
        </el-col>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>出仓单号</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'>
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class='searchbox1'>
          <!-- 目的地 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>目的地</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 订单类型 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>订单类型</span>
          <el-col :span='16'>
            <el-select v-model='msg' placeholder='请输入'></el-select>
          </el-col>
        </el-col>
        <!-- 入仓件数 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>入仓件数</span>
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
          <el-col :span='12' class="left" >
            <el-button class='stopBtn'>批量导出Excel</el-button>
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
            width="300"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span @click="detail(scope.row)" class="blue">下载Excel</span>
              <span @click="detail(scope.row)" class="blue">&nbsp;|&nbsp;运单明细</span>
               <span @click="detail(scope.row)" v-if="scope.row.has_assign_drivers===1" class="blue">&nbsp;|&nbsp;查看送货司机</span>
                <span @click="setDriver(scope.row)" v-else class="blue">&nbsp;|&nbsp;配置司机</span>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <commonDrawer :drawerVrisible="drawerVrisible"  @handleClose='addClose' :drawerTitle="drawerTitle" style="textAlign:left">
          <div class="dra-content">
            选择司机<el-select>
              <el-option  v-for="item in warehouseOption" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </div>
          <!-- 抽屉底部按钮 -->
          <div slot="footer">
            <button class="btn-orange" @click="ejectSubmit()">
              <span> <i class="el-icon-circle-check"></i>提交</span>
            </button>
            <button class="btn-gray" @click="addClose">
              <span>取消</span>
            </button>
          </div>
        </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawerVrisible: false,
      drawerTitle: '配置司机',
      warehouseOption: [], // 仓库选择
      msg: '',
      activeName: '1', // 标签绑定
      serviceName: null,
      fenquzhongliang: true,
      columns: [
        {
          prop: 'eject_no',
          label: '出仓单号',
          width: '200',
          align: 'center'
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'channel_name',
          label: '渠道名称',
          width: '250',
          align: 'center'
        },
        {
          prop: 'agent_name',
          label: '代理名称',
          width: '200',
          align: 'center'

        },
        {
          prop: 'eject_time',
          label: '出仓时间',
          width: '200',
          align: 'center',
          formatter: this.formatters
        },
        {
          prop: 'waybill_count',
          label: '运单数',
          width: '200',
          align: 'center'
        },
        {
          prop: 'item_count',
          label: '货件数',
          width: '200',
          align: 'center'
        },
        {
          prop: 'volume',
          label: '体积',
          width: '100',
          align: 'center'
        },
        {
          prop: 'bill_weight',
          label: '结算重',
          width: '100',
          align: 'center'
        },
        {
          prop: 'has_assign_drivers',
          label: '是否配置司机',
          width: '100',
          align: 'center',
          formatter: this.formatter
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
    this.$api.configure.warehouse.select().then(res => {
      this.warehouseOption = res.data
    })
    this.$api.setting.warehouse.select().then(res => {
      this.warehouseOption = res.data
    })
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.ejectLists({ limit: this.page.limit, page: this.page.pageNo }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total // 数据总量
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      if (row.has_assign_drivers === 1) {
        return '是'
      } else {
        return '否'
      }
    },
    formatters (row, column, cellValue) {
      return this.formatDate(row.eject_time, 'yyyy-MM-dd hh:mm:ss')
    },
    setDriver (data) {
      this.$api.Ordermanagement.ejectInfo({ ejectId: data.id }).then(res => {
        console.log(res.data.waybills)
        this.drawerVrisible = true
      })
      // ejectDriver
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
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
    handleClick (tab, event) { console.log(tab, event) },
    // 操作按钮列表
    editTableData (row) {},
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
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
