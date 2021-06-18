<template>
    <div>
        <el-row class="box">
            <!-- 第一行 -->
            <el-row>
                <el-col :span="6" class="item">
                    <span class="item-box">运单号&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.wayBillNo" size="small">
                        <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer ">批量</i>
                        <i slot="suffix" class="expend">&#xe9cc;</i>
                    </el-input>
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
                    <el-input placeholder="请输入" class="input" v-model="form.control" size="small"></el-input>
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
                    <span class="item-box">入库件数&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.incomingNum" size="small"></el-input>
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
                <el-table-column prop="orderType" label="订单类型" min-width="150" key="2"></el-table-column>
                <el-table-column prop="name" label="客户名称" min-width="100" key="3"></el-table-column>
                <el-table-column prop="customerNo" label="客户编号" min-width="80" key="4"></el-table-column>
                <el-table-column prop="driver" label="收货司机" min-width="150" key="5">
                    <template slot-scope="scope">
                        <div class="Flexcenter">
                            <span class="Right">{{scope.row.driver}}</span>
                            <div>
                                <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="click">
                                    <div class="driver">收货司机：{{scope.row.driver}}</div>
                                    <div class="driver" style="margin: 6px 0">职位：{{scope.row.driver}}</div>
                                    <div class="driver">手机：{{scope.row.driver}}</div>
                                    <el-button slot="reference" type="text" @click="ASdriverCheck(scope.row)">查看</el-button>
                                </el-popover>
                            </div>
                            <div>
                                <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="click">
                                    <div class="driver">收货司机：{{scope.row.driver}}</div>
                                    <div class="driver" style="margin: 6px 0">车牌：{{scope.row.driver}}</div>
                                    <div class="driver">预计送达时间：{{scope.row.driver}}</div>
                                    <el-button slot="reference" type="text" @click="ASdriverCheck(scope.row)">查看</el-button>
                                </el-popover>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNo" label="运单号" min-width="150" key="6"></el-table-column>
                <el-table-column prop="forecastNo" label="预报单号" min-width="160" key="7">
                    <template slot-scope="scope">
                        <span>{{scope.row.forecastNo}}</span>
                        <el-button type="text" @click="forecastNoCheck(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="warehousingNum" label="入仓件数" min-width="100" key="8"></el-table-column>
                <el-table-column prop="warehouser" label="入仓员" min-width="80" key="9"></el-table-column>
                <el-table-column prop="squareNum" label="方数" min-width="80" key="10"></el-table-column>
                <el-table-column prop="realWeight" label="实重" min-width="80" key="11"></el-table-column>
                <el-table-column prop="volumeWeight" label="材积重" min-width="80" key="12"></el-table-column>
                <el-table-column prop="settlementWeight" label="结算重" min-width="80" key="13">
                    <template slot-scope="scope">
                        <div class="Flexcenter">
                            <span class="Right">{{scope.row.settlementWeight}}</span>
                            <div>
                                <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="click">
                                    <div class="driver">实重：{{scope.row.settlementWeight}}</div>
                                    <div class="driver" style="margin: 6px 0">方数：{{scope.row.settlementWeight}}</div>
                                    <div class="driver" style="margin-bottom:6px">材积重：{{scope.row.settlementWeight}}</div>
                                    <div class="driver">结算重：{{scope.row.settlementWeight }}</div>
                                    <el-button slot="reference" type="text" @click="settlementWeight(scope.row)">详情</el-button>
                                </el-popover>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="changeGoodsSquare" label="改货方数" min-width="80" key="14"></el-table-column>
                <el-table-column prop="changeGoodsWeight" label="改货重量" min-width="80" key="15"></el-table-column>
                <el-table-column prop="changeGoodsvolumeW" label="改货材积重" min-width="100" key="16">
                    <template slot-scope="scope">
                        <div class="Flexcenter">
                            <span>{{scope.row.changeGoodsvolumeW}}</span>
                            <el-button type="text">修改</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="changeGoodsSettlementW" label="改货结算重" min-width="80" key="17">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.settlementWeight}}</span>
                        <el-button type="text" @click="changeGoodsWeight(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="warehousingChannel" label="入仓渠道" min-width="80" key="18">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.warehousingChannel}}</span>
                        <el-button type="text" @click="warehousingChannelModify(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="发票" min-width="180" key="19">
                    <template slot-scope="scope">
                        <div class="rows">
                                <div class="dot"></div>
                                <span class="ele" style="color:#333333;margin-right:10px">已做发票</span>
                                <el-button type="text" @click="invoiceDetials(scope.row)">详情</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mailingMethod" label="寄件方式" min-width="80" key="20"></el-table-column>
                <el-table-column prop="forecastNum" label="预报件数" min-width="180" key="21">
                    <template slot-scope="scope">
                        <span class="forecastNo">{{scope.row.forecastNum}}</span>
                        <span class="electrified">带电</span>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsNum" label="收货件数" min-width="80" key="22"></el-table-column>
                <el-table-column prop="storekeeper" label="入库员" min-width="80" key="23"></el-table-column>
                <el-table-column prop="storageNum" label="入库件数" min-width="80" key="24"></el-table-column>
                <el-table-column prop="receivingTime" label="收货时间" min-width="140" key="25"></el-table-column>
                <el-table-column prop="storageTime" label="入库时间" min-width="80" key="26"></el-table-column>
                <el-table-column prop="warehousingTime" label="入仓时间" min-width="80" key="27"></el-table-column>
                <el-table-column prop="packingList" label="装箱清单" min-width="160" key="28">
                    <template>
                        <div class="alignment flex align-center">
                            <div class="dot"></div>
                            <span class="ele" style="color:#333333;margin-right:10px">已做装箱清单</span>
                            <el-button type="text" @click="packingListDetials(scope.row)">详情</el-button>
                        </div>
                        <div class="alignment flex align-center">
                            <div class="dot" style="background:#FF0000"></div>
                            <span class="ele" style="color:#333333;margin-right:10px">未做装箱清单</span>
                            <el-button type="text" @click="packingListDetials(scope.row)">详情</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastWeight" label="预报重量" min-width="100" key="29"></el-table-column>
                <el-table-column prop="forecastSquare" label="预报方数" min-width="80" key="30"></el-table-column>
                <el-table-column prop="goodsNo" label="货件编号" min-width="0" key="31">
                    <template slot-scope="scope">
                        <div>
                            <span class="Right">{{scope.row.goodsNo}}</span>
                            <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click">
                                <el-button slot="reference" type="text" @click="goodsNoAll(scope.row)">全部</el-button>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="destinationCountry" label="目的国" min-width="80" key="32"></el-table-column>
                <el-table-column prop="destination" label="目的地" min-width="80" key="33"></el-table-column>
                <el-table-column prop="destinationPostcode" label="目的地邮编" min-width="80" key="34"></el-table-column>
                <el-table-column prop="forecastChannel" label="预报渠道" min-width="80" key="35"></el-table-column>
                <el-table-column prop="customsType" label="报关类型" min-width="80" key="36"></el-table-column>
                <el-table-column prop="aloneClearance" label="单独清关" min-width="80" key="37"></el-table-column>
                <el-table-column prop="deferral" label="递延" min-width="80" key="38"></el-table-column>
                <el-table-column prop="productName" label="品名" min-width="80" key="39">
                    <template slot-scope="scope">
                        <div class="Flexcenter">
                            <span class="Right">{{scope.row.productName}}</span>
                            <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click">
                                <span class="productName">品名：</span>
                                <span>{{scope.row.productName}}</span>
                                <el-button slot="reference" type="text" @click="productNameCheck(scope.row)">查看</el-button>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="declarationTime" label="申报价值" min-width="80" key="40"></el-table-column>
                <el-table-column prop="orderTime" label="下单时间" min-width="80" key="41"></el-table-column>
                <el-table-column prop="customerNote" label="客户备注" min-width="80" key="42"></el-table-column>
                <el-table-column prop="innerRemarks" label="内部备注" min-width="80" key="43">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.innerRemarks}}</span>
                        <el-button type="text" @click="innerRemarksCheck(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="insurance" label="是否有保险" min-width="80" key="44"></el-table-column>
                <el-table-column prop="salesman" label="业务员" min-width="130" key="45">
                    <template slot-scope="scope">
                            <span class="Right">{{scope.row.salesman}}</span>
                                <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click">
                                <div class="driver">业务员：{{scope.row.salesman}}</div>
                                <div class="driver" style="margin:6px 0">职位：{{scope.row.salesman}}</div>
                                <div class="driver" style="margin-bottom:6px">手机：{{scope.row.salesman}}</div>
                                <div class="driver">上级主管：{{scope.row.salesman}}</div>
                                <el-button slot="reference" type="text" @click="salesmanCheck(scope.row)">查看</el-button>
                                </el-popover>
                        </template>
                </el-table-column>
                <el-table-column prop="basicsFee" label="基础费用" min-width="150" key="46">
                    <template slot-scope="scope">
                        <div class="alignment flex align-center">
                            <div class="dot"></div>
                            <span class="Right">已确认</span>
                            <span class="Right">¥ {{scope.row.fee}}</span>
                            <el-button type="text" @click="basicsFeeCheck  (scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="surcharge" label="附加费" min-width="150" key="47">
                    <template slot-scope="scope">
                        <div class="alignment flex align-center">
                            <div class="dot"></div>
                            <span class="Right">已确认</span>
                            <span class="Right">¥ {{scope.row.fee}}</span>
                            <el-button type="text" @click="surchargeCheck(scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalFreight" label="合计运费" min-width="80" key="48"></el-table-column>
                <el-table-column prop="WithholdingStatus" label="扣货状态" min-width="80" key="49"></el-table-column>
                <el-table-column prop="coordination" label="协同" min-width="80" key="50"></el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" min-width="240" key="51">
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
            <!-- 批量搜索 -->
          <el-dialog
            title="批量输入预报单号"
            :visible.sync="dialogPL"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:40px"></div>
            <div class="number">
                <el-input type="textarea" placeholder="请输入预报单号" v-model="batch" :rows=5></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-checkbox v-model="checked" style="float:left">备选项</el-checkbox>
                <el-button class="wuBtn" @click="dialogPL = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogPL = false" size="small">确 定</el-button>
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
      batch: '', // 批量搜索
      checked: false, // 是否模糊搜索
      dialogPL: false, // 批量搜索
      fileError: false,
      number: 0, // 选择批量归档件数
      form: {
        WayBillNo: '', // 运单号
        name: '', // 客户名称
        customerNo: '', // 客户编码
        control: '', // 目的国
        destination: '', // 目的地
        orderType: '', // 订单类型
        incomingNum: '' // 入库件数
      },
      total: 50, // 表格数据总条数
      currentPage: 1,
      pageSize: 10,
      // 表格数据
      tableData: [
        {
          name: '史蒂夫',
          forecastNum: '21件',
          driver: '王成虎'
        }
      ]
    }
  },
  methods: {
    // 归档
    file () {},
    // 预报单号查看
    forecastNoCheck (val) {
      this.$router.push({ name: 'prediction' })
    },
    // 表格发票详情
    invoiceDetials () {},
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
.expend {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/deep/ .el-checkbox {
  .el-checkbox__input.is-checked .el-checkbox__inner,
       .el-checkbox__input.is-indeterminate .el-checkbox__inner {
         background-color: #FB4702 !important;
         border-color: #FB4702 !important;
       }
       .el-checkbox__label {
         font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.75);
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
.productName{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FB4702;
}
.Flexcenter{
    display: flex;
    align-items: center;
}
.driver{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
}
.Right{
   font-size: 14px;
    margin-right: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.dot{
    margin-right: 6px;
    width: 7px;
    height: 7px;
    background: #3CBB00;
    border-radius: 50%;
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
