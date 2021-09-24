<template>
  <div>
    <div class="main">
      <!--  标签页 -->
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">报价单</span>
      </el-row>
      <!-- 主要内容 -->
      <div class="content">
        <el-row class="searchbox1">
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">运单号</span>
            </el-col>
            <el-col :span="12">
              <el-input v-model="msg" placeholder="请输入"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">客户名称</span>
            </el-col>
            <el-col :span="13">
              <el-select v-model="msg" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">客户编号</span>
            </el-col>
            <el-col :span="11">
              <el-input v-model="msg" placeholder="请输入"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">预报渠道</span>
            </el-col>
            <el-col :span="13">
              <el-input v-model="msg" placeholder="请输入"></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="searchbox1">
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">目的地</span>
            </el-col>
            <el-col :span="13">
              <el-select v-model="msg" placeholder="请输入">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">目的地分区</span>
            </el-col>
            <el-col :span="13">
              <el-select v-model="msg" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">目的地邮编</span>
            </el-col>
            <el-col :span="13">
              <el-select v-model="msg" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-button class="orangeBtn long1">查 询</el-button>
            <el-button class="wuBtn long1">重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class="table">
          <!-- <el-row class="tableBtn">
            <el-col :span="12" class="left">
              <el-button class="batch">批量导出Excel</el-button>
              <el-button class="batch">协调订单</el-button>
            </el-col>
            <el-col :span="20" class="right">
              <el-button class="whiteBtn">列表显示设置</el-button>
            </el-col>
          </el-row> -->
          <br />
          <!-- 表格 -->
          <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="150"
        :resizable="false"
      >
        <template slot-scope="scope">
          <a
            @click="editTableData(scope.row)"
            >查看详情&nbsp;</a
          > |
          <a
            @click="editTableData(scope.row)"
            >查看运单</a
          >
        </template>
      </el-table-column>
    </commonTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      options: [],
      columns: [
        { prop: 'code', label: '安速单号', width: '150', align: 'center' },
        { prop: 'name', label: '客户名称', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'khcode', label: '客户编号', width: '150', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '审核状态', width: '150', align: 'center' },
        { prop: 'people', label: '业务员', width: '200', align: 'center' },
        { prop: 'type', label: '订单类型', width: '150', align: 'center' },
        { prop: 'num', label: '件数', width: '250', align: 'center' },
        { prop: 'isElectromagnetism', label: '带电带磁', width: '250', align: 'center' },
        { prop: 'ybqd', label: '预报渠道', width: '250', align: 'center' },
        { prop: 'ysfs', label: '运输方式', width: '250', align: 'center' },
        { prop: 'mdg', label: '目的国', width: '250', align: 'center' },
        { prop: 'mdgyb', label: '目的国邮编', width: '250', align: 'center' },
        { prop: 'fjf', label: '附加费', width: '250', align: 'center' },
        { prop: '', label: '基础费用', width: '250', align: 'center' },
        { prop: '', label: '附加费用', width: '250', align: 'center' },
        { prop: '', label: '合计费用', width: '250', align: 'center' },
        { prop: '', label: '下单时间', width: '250', align: 'center' },
        { prop: '', label: '报关类型', width: '250', align: 'center' },
        { prop: '', label: '单独清关', width: '250', align: 'center' },
        { prop: '', label: '结算重', width: '250', align: 'center' },
        { prop: '', label: '实重', width: '250', align: 'center' },
        { prop: '', label: '方数', width: '250', align: 'center' },
        { prop: '', label: '材积重', width: '250', align: 'center' },
        { prop: '', label: '客户备注', width: '250', align: 'center' },
        { prop: '', label: '内部备注', width: '250', align: 'center' },
        { prop: '', label: '是否保险', width: '250', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 1,
        sizes: [1, 5, 10],
        total: 0
      }
    }
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

    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        { date: '2016-05-03', name: '王小虎111', address: '上海市普陀区金沙江路 1518 弄' }
      ]
    },
    // 操作按钮列表
    editTableData (row) {}
  },
  mounted () {
    this.tableData = [
      { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
    ]
    this.page.total = 2
  }
}
</script>

<style lang='scss' scoped>
a{
  font-size: 14px;
  color: #0084FFFF;
  cursor: pointer;
}
.title{
  height: 56px;
}
.SelectedNodeStyle {
  margin: 10px 0;
}
.checked1 {
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
.mainSearch {
  font-size: 16px;
  margin: 26px 0 16px 0;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.query {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
/deep/ .el-drawer {
  padding-top: 0px;
  background: #e8ebf2;
  .el-drawer__header {
    padding: 30px 20px;
    margin-bottom: 0px;
    text-align: left;
    background: #ffffff;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .el-drawer__rtl {
    padding: 0;
    margin: 0;
  }
  .el-drawer__body {
    margin-top: 0px;
    padding-top: 0px;
    text-align: left;
    overflow: scroll;
  }
  .drawer_btn {
    display: flex;
    width: 100%;
    padding-left: 20px;
    align-items: center;
    justify-content: flex-start;
    margin-top: 26px;
    // margin-left: -26px;
    margin-bottom: -26px;
    // width: 100%;
    box-sizing: border-box;
    height: 60px;
    background: #ffffff;
    box-sizing: border-box;
  }
}
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
</style>
