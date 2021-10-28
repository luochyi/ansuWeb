<template>
    <div>
        <el-row class="box">
            <!-- 第一行 -->
            <el-row>
                <el-col :span="6" class="item">
                    <span class="item-box">运单号&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.wayBillNo" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">客户名称&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.name" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">客户编码&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.customerNo" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">目的地&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.destination" size="small"></el-input>
                </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row  style="margin-top:18px">
                <el-col :span="6" class="item">
                    <span class="item-box">预报渠道&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.forecastChannel" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">出仓渠道&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.outletChannel" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">出仓时间&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.outletTime" size="small"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button size="small" class="orangeBtn" style="margin-right:10px">查 询</el-button>
                    <el-button size="small" class="wuBtn" style="margin-right:10px">重 置</el-button>
                    <el-button size="small" class="wuBtn">展开全部</el-button>
                </el-col>
            </el-row>
            <el-row class="line"></el-row>
            <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
            <el-col :span='12' class="left">
                <el-button class='stopBtn' @click="Export" size="small">批量导出Excel</el-button>
                <el-button class='stopBtn' @click="batchArchive" size="small">批量归档</el-button>
            </el-col>
            <el-col :span='12' class="right">
                <el-button class='whiteBtn' @click="toAdd">查询条件设置</el-button>
                <el-button class='whiteBtn'>列表显示设置</el-button>
            </el-col>
            </el-row>
            <!-- 表格 -->
            <div class="table">
            <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange"
                :header-cell-style="{background: '#F5F5F6'}">
                <el-table-column type="selection" width="50" key="1"></el-table-column>
                <el-table-column prop="wayBillNo" label="运单号" min-width="150" key="2"></el-table-column>
                <el-table-column prop="forecastNo" label="预报单号" min-width="100" key="3"></el-table-column>
                <el-table-column prop="name" label="客户名称" min-width="100" key="4"></el-table-column>
                <el-table-column prop="customerNo" label="客户编号" min-width="80" key="5"></el-table-column>
                <el-table-column prop="incoming" label="入库件数" min-width="80" key="6"></el-table-column>
                <el-table-column prop="outgoing" label="出库件数" min-width="100" key="7"></el-table-column>
                <el-table-column prop="goodsNum" label="收货件数" min-width="80" key="8"></el-table-column>
                <el-table-column prop="forecastNum" label="预报件数" min-width="120" key="9">
                    <template slot-scope="scope">
                        <span class="forecastNo">{{scope.row.forecastNum}}</span>
                        <span class="electrified">带电</span>
                        <el-button type="text">装箱清单</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="problem" label="问题" min-width="100" key="10"></el-table-column>
                <el-table-column label="操作" min-width="100" key="11">
                    <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)">查看详情</el-button>
                        <span style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
                            color: #0084FF;">
                         ｜
                        </span>
                        <el-button type="text" @click="file(scope.row)">归档</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div class='block'>
              <span class="block-title">共搜索到{{ total }}条数据</span>
              <el-pagination
                :current-page.sync='currentPage'
                :pager-count='9'
                :page-size='pageSize'
                :page-sizes='[10, 20, 50, 100, 200, 500]'
                layout='prev, pager, next, sizes, jumper'
                :total='total'
                @current-change="handleCurrentChange">
              </el-pagination>
          </div>
          <!-- 批量归档弹窗 -->
          <el-dialog
            title="批量归档"
            :visible.sync="dialogFile"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:40px"></div>
            <div class="number">是否对这<span> {{number}} </span>笔运单批量进行归档</div>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="dialogFile = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogFile = false" size="small">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 归档错误弹窗 -->
          <el-dialog
            title="提示"
            :visible.sync="fileError"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:40px"></div>
            <div class="number">运单AS202012120001的费用并未核销是</div>
            <div class="number">否继续归档</div>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="fileError = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="fileError = false" size="small">确 定</el-button>
            </span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogFile: false, // 批量归档对话框
      fileError: true,
      number: 0, // 选择批量归档件数
      form: {
        WayBillNo: '', // 运单号
        name: '', // 客户名称
        customerNo: '', // 客户编码
        destination: '', // 目的地
        forecastChannel: '', // 预报渠道
        outletChannel: '', // 出仓渠道
        outletTime: '' // 出仓时间
      },
      total: 0, // 表格数据总条数
      currentPage: 1,
      pageSize: 10,
      // 表格数据
      tableData: [
        {
          name: '史蒂夫',
          forecastNum: '21件'
        }
      ]
    }
  },
  methods: {
    // 归档
    file () {},
    // 表格选择
    handleSelectionChange () {},
    // 批量归档
    batchArchive () {
      this.dialogFile = true
    },
    // 查看详情
    check () {
      this.$router.push({ name: 'orderDetials' })
    },
    // 批量导出
    Export () {},
    // 查询条件设置
    toAdd () {},
    // 选择页码
    handleCurrentChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.number{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    }
.block{
    display: flex;
    align-items: center;
    .block-title{
        margin-right: 20px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
    }
}
.forecastNo{
    font-size: 14px;
    margin-right: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.electrified{
    padding: 4px 10px;
    margin-right: 10px;
    width: 44px;
    height: 22px;
    background: #FB4E0B;
    border-radius: 13px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    }
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
.line{
    height: 1px;
    background: #E9E9E9;
    margin: 18px 0;
}
.input{
    width: 70%;
}
.box{
    background: #fff;
    padding: 14px 32px;
    text-align: left;
}
.item{
    display: flex;
    align-items: center;
}
.item-box{
    text-align: right;
    width: 70px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
</style>
