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
                    <span class="item-box">目的国&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.destinationCountry" size="small"></el-input>
                </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row  style="margin-top:18px">
                <el-col :span="6" class="item">
                    <span class="item-box">目的地&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.destination" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">订单类型&nbsp;&nbsp;</span>
                    <el-select placeholder="请输入" class="input" v-model="form.orderType" size="small"></el-select>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">入仓时间&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.warehousingTime" size="small"></el-input>
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
                <el-button class='stopBtn' size="small">批量修改入仓渠道</el-button>
                <el-button class='stopBtn' size="small">批量出库</el-button>
                <el-button class='stopBtn' size="small">批量扣货</el-button>
                <el-button class='stopBtn' size="small">批量放货</el-button>
                <el-button class='stopBtn' size="small">批量导出发票</el-button>
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
                <el-table-column prop="warehousingNum" label="入仓件数" min-width="100" key="7"></el-table-column>
                <el-table-column prop="incoming" label="入库件数" min-width="80" key="6"></el-table-column>
                <el-table-column prop="goodsNum" label="收货件数" min-width="80" key="8"></el-table-column>
                <el-table-column prop="forecastNum" label="预报件数" min-width="180" key="9">
                    <template slot-scope="scope">
                        <span class="forecastNo">{{scope.row.forecastNum}}</span>
                        <span class="electrified">带电</span>
                        <el-button type="text">装箱清单</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="problem" label="问题件" min-width="100" key="10">
                    <template>
                        <span class="ele" style="color:#333333">正常件</span>
                        <span class="ele" style="color:#FF0000">扣货件</span>
                        <span class="ele" style="color:#FF0000">发票未做</span>
                    </template>
                </el-table-column>
                <el-table-column label="发票" min-width="180" key="11">
                    <template slot-scope="scope">
                        <div class="rows">
                                <div class="dot"></div>
                                <span class="ele" style="color:#333333;margin-right:10px">已做发票</span>
                                <el-button type="text" @click="printing(scope.row)">打印</el-button>
                                <span class="ele" style="color:#0084FF">｜</span>
                                <el-button type="text" @click="modify(scope.row)">修改</el-button>
                        </div>
                        <div class="rows">
                                <div class="dot"></div>
                                <span class="ele" style="color:#FF0000;margin-right:10px">发票未做</span>
                                <el-button type="text" @click="make(scope.row)">制作</el-button>
                                <span class="ele" style="color:#0084FF">｜</span>
                                <el-button type="text" @click="modify(scope.row)">修改</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="预报时间" min-width="80" key="13"></el-table-column>
                <!--  -->
                <el-table-column prop="forecastTime" label="寄件方式" min-width="80" key="14"></el-table-column>
                <el-table-column prop="forecastTime" label="方数" min-width="80" key="15"></el-table-column>
                <el-table-column prop="forecastTime" label="实重" min-width="80" key="16"></el-table-column>
                <el-table-column prop="forecastTime" label="材积重" min-width="80" key="17"></el-table-column>
                <el-table-column prop="settlementWeight" label="结算重" min-width="80" key="18">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.settlementWeight}}</span>
                        <el-button type="text" @click="Detials(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="预报重量" min-width="100" key="19">

                </el-table-column>
                <el-table-column prop="forecastTime" label="预报方数" min-width="80" key="20"></el-table-column>
                <el-table-column prop="forecastTime" label="改货方数" min-width="80" key="21"></el-table-column>
                <el-table-column prop="forecastTime" label="改货重量" min-width="80" key="22"></el-table-column>
                <el-table-column prop="forecastTime" label="改货材积重" min-width="100" key="23"></el-table-column>
                <el-table-column prop="forecastTime" label="改货结算重" min-width="80" key="24">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.settlementWeight}}</span>
                        <el-button type="text" @click="changeGoodsWeight(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsNo" label="货件编号" min-width="80" key="25">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.goodsNo}}</span>
                        <el-button type="text" @click="goodsNoAll(scope.row)">全部</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="定单类型" min-width="80" key="26"></el-table-column>
                <el-table-column prop="forecastTime" label="目的国" min-width="80" key="27"></el-table-column>
                <el-table-column prop="forecastTime" label="目的地" min-width="80" key="28"></el-table-column>
                <el-table-column prop="forecastTime" label="目的地邮编" min-width="80" key="29"></el-table-column>
                <el-table-column prop="forecastTime" label="预报渠道" min-width="80" key="30"></el-table-column>
                <el-table-column prop="warehousingChannel" label="入仓渠道" min-width="80" key="31">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.warehousingChannel}}</span>
                        <el-button type="text" @click="warehousingChannelModify(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="deliveryChannel" label="出库渠道" min-width="80" key="32">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.deliveryChannel}}</span>
                        <el-button type="text" @click="deliveryChannelModify(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="deliveryAgent" label="出库代理" min-width="80" key="33">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.deliveryAgent}}</span>
                        <el-button type="text" @click="deliveryAgentModify(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="报关类型" min-width="80" key="34"></el-table-column>
                <el-table-column prop="forecastTime" label="单独清关" min-width="80" key="35"></el-table-column>
                <el-table-column prop="productName" label="品名" min-width="80" key="36">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.productName}}</span>
                        <el-button type="text" @click="productNameCheck(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="申报价值" min-width="80" key="37"></el-table-column>
                <el-table-column prop="forecastTime" label="下单时间" min-width="80" key="38"></el-table-column>
                <el-table-column prop="forecastTime" label="客户备注" min-width="80" key="39"></el-table-column>
                <el-table-column prop="innerRemarks" label="内部备注" min-width="80" key="40">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.innerRemarks}}</span>
                        <el-button type="text" @click="innerRemarksCheck(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="是否有保险" min-width="80" key="41"></el-table-column>
                <el-table-column prop="salesman" label="业务员" min-width="80" key="42">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.salesman}}</span>
                        <el-button type="text" @click="salesmanCheck(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastTime" label="入库员" min-width="80" key="43"></el-table-column>
                <el-table-column prop="forecastTime" label="入仓员" min-width="80" key="44"></el-table-column>
                <el-table-column prop="driver" label="收货司机" min-width="80" key="45">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.driver}}</span>
                        <el-button type="text" @click="driverCheck(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="fee" label="费用" min-width="180" key="46">
                    <template slot-scope="scope">
                        <span class="Right">已确认</span>
                        <span class="Right">¥ {{scope.row.fee}}</span>
                        <el-button type="text" @click="feeWithdraw(scope.row)">撤回</el-button>
                        <span class="ele" style="color:#0084FF">｜</span>
                        <el-button type="text" @click="supplement(scope.row)">补录</el-button>
                    </template>
                </el-table-column>
<!--  -->
                <el-table-column label="操作" min-width="240" key="47">
                    <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)">查看详情</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="detentionCargo(scope.row)">扣货</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="checkInvoice(scope.row)">查看发票</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="Delivery(scope.row)">出库</el-button>
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
      fileError: false, // 提示
      number: 0, // 选择批量归档件数
      form: {
        WayBillNo: '', // 运单号
        name: '', // 客户名称
        customerNo: '', // 客户编码
        destinationCountry: '', // 目的国
        orderType: '', // 订单类型
        destination: '', // 目的地
        warehousingTime: '' // 入仓时间
      },
      total: 50, // 表格数据总条数
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
    // 表格选择
    handleSelectionChange () {},
    // 打印
    printing () {},
    // 详情
    Detials () {},
    // 制作
    make () {},
    // 修改
    modify () {},
    // 改货结算重修改
    changeGoodsWeight () {},
    // 货件编码全部
    goodsNoAll () {},
    // 去仓渠道修改
    warehousingChannelModify () {},
    // 出库代理修改
    deliveryAgentModify () {},
    // 出库渠道修改
    deliveryChannelModify () {},
    // 品名查看
    productNameCheck () {},
    // 内部备注查看
    innerRemarksCheck () {},
    // 业务员产看
    salesmanCheck () {},
    // 收货司机查看
    driverCheck () {},
    // 费用撤回
    feeWithdraw () {},
    // 费用补录
    supplement () {},
    // 操作查看详情
    check () {
      this.$router.push({ name: 'orderDetials' })
    },
    // 操作扣货
    detentionCargo () {},
    // 操作查看发票
    checkInvoice () {},
    // 操作出库
    Delivery () {},
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
.rows{
    display: flex;
    align-items: center;
}
.dot{
    margin-right: 6px;
    width: 7px;
    height: 7px;
    background: #3CBB00;
    border-radius: 50%;
}
.Right{
   font-size: 14px;
    margin-right: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
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
.ele{
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
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
