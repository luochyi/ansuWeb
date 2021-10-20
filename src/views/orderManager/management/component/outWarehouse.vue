<template>
    <div>
        <el-row class="box">
            <!-- FORM === 1 -->
            <div v-if="FORM === 1">
              <!-- 第一行 -->
                <el-row>
                    <el-col :span="6" class="item">
                        <span class="item-box">运单号&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.wayBillNo" size="small">
                            <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
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
                        <el-button size="small" class="wuBtn"  @click="FORM = 2">展开全部</el-button>
                    </el-col>
                </el-row>
            <el-row class="line"></el-row>
            </div>
            <!-- FORM === 2 -->
            <div v-if="FORM === 2">
              <!-- 第一行 -->
                <el-row>
                    <el-col :span="6" class="item">
                        <span class="item-box">预报单号&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.forecastNo" size="small">
                            <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
                        </el-input>
                    </el-col>
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
                </el-row>
                <!-- 第二行 -->
                <el-row  style="margin-top:18px">
                    <el-col :span="6" class="item">
                        <span class="item-box">预报渠道&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.forecastChannel" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">收货司机&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.receivingGoodsDriver" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">业务员&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.salesman" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">订单类型&nbsp;&nbsp;</span>
                        <el-select placeholder="请输入" class="input" v-model="form.orderType" size="small"></el-select>
                    </el-col>
                </el-row>
                <!-- 3 -->
                <el-row  style="margin-top:18px">
                    <el-col :span="6" class="item">
                        <span class="item-box">发票详情&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.invoiceDetails" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">装箱清单&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.packingList" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">寄件方式&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.mailingMethod" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">货号编码&nbsp;&nbsp;</span>
                        <el-select placeholder="请输入" class="input" v-model="form.goodsNo" size="small"></el-select>
                    </el-col>
                </el-row>
                <!-- 4 -->
                <el-row  style="margin-top:18px">
                    <el-col :span="6" class="item">
                        <span class="item-box">带电带磁&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.chargedMagnetic" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">品名&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.productName" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">目的国&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.control" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">目的仓&nbsp;&nbsp;</span>
                        <el-select placeholder="请输入" class="input" v-model="form.warehouse" size="small"></el-select>
                    </el-col>
                </el-row>
                <el-row  style="margin-top:18px">
                    <el-col :span="6" class="item">
                        <span class="item-box">目的地邮编&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.destinationPost" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">是否有保险&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.insurance" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">报关类型&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.customsTypes" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">单独清关&nbsp;&nbsp;</span>
                        <el-select placeholder="请输入" class="input" v-model="form.customsClearance" size="small"></el-select>
                    </el-col>
                </el-row>
                <el-row  style="margin-top:18px">
                    <el-col :span="6" class="item">
                        <span class="item-box">递延&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.deferral" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">入仓员&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.warehouser" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">扣货状态&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="form.withholdingStatus" size="small"></el-input>
                    </el-col>
                    <el-col :span="6" class="item">
                        <span class="item-box">入仓渠道&nbsp;&nbsp;</span>
                        <el-select placeholder="请输入" class="input" v-model="form.warehousingChannel" size="small"></el-select>
                    </el-col>
                </el-row>
                <el-row style="display:flex;justify-content:flex-end;margin-top:20px">
                    <el-col :span="6">
                        <el-button size="small" class="orangeBtn" style="margin-right:10px">查 询</el-button>
                        <el-button size="small" class="wuBtn" style="margin-right:10px">重 置</el-button>
                        <el-button size="small" class="wuBtn" @click="FORM = 1">隐藏</el-button>
                    </el-col>
                </el-row>
                <el-row class="line"></el-row>
            </div>
            <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
            <el-col :span='14' class="left">
              <el-button class='stopBtn' @click="UpdateRouter" size="small">批量更新轨迹</el-button>
                <el-button class='stopBtn' @click="Export" size="small">批量导出Excel</el-button>
                <el-button class='stopBtn' @click="batchSendChannel" size="small">批量设置出库渠道</el-button>
                <el-button class='stopBtn' @click="batchModifyChannel" size="small">批量修改入仓渠道</el-button>
                <el-button class='stopBtn' @click="batchWarehouse" size="small">批量出运</el-button>
                <el-button class='stopBtn' @click="batchArchive" size="small">批量扣货</el-button>
                <el-button class='stopBtn' size="small" @click="dialogRelease = true">批量放货</el-button>
                <el-button class='stopBtn' @click="Export" size="small">批量导出发票</el-button>
                <el-button class='stopBtn' @click="batchSetTransfer" size="small">批量设置转单号</el-button>
            </el-col>
            <el-col :span='10' class="right">
                <el-button class='whiteBtn' @click="visibleQueryCondition = true">查询条件设置</el-button>
                <el-button class='whiteBtn' @click="visibleList = true">列表显示设置</el-button>
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
                <el-table-column prop="settlementWeight" label="结算重" min-width="120" key="13">
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
                <el-table-column prop="changeGoodsSettlementW" label="改货结算重" min-width="100" key="17">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.settlementWeight}}</span>
                        <el-button type="text" @click="changeGoodsWeight(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="warehousingChannel" label="入仓渠道" min-width="80" key="18">
                    <template slot-scope="scope">
                        <span class="Right">{{scope.row.warehousingChannel}}</span>
                        <el-button type="text" @click="modifyChanel(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="发票" min-width="180" key="19">
                    <template slot-scope="scope">
                        <div class="Flexchannel">
                                <div class="dot"></div>
                                <span class="ele" style="color:#333333;margin-right:40px">已做发票</span>
                                <el-button type="text" @click="invoiceDetials(scope.row)">详情</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mailingMethod" label="寄件方式" min-width="80" key="20"></el-table-column>
                <el-table-column prop="forecastNum" label="预报件数" min-width="150" key="21">
                    <template slot-scope="scope">
                        <span class="forecastNo">{{scope.row.forecastNum}}</span>
                        <span class="electrified">带电</span>
                        <!-- <el-button type="text">装箱清单</el-button> -->
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
                <el-table-column prop="destinationPostcode" label="目的地邮编" min-width="100" key="34"></el-table-column>
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
                <el-table-column prop="insurance" label="是否有保险" min-width="100" key="44"></el-table-column>
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
                <el-table-column prop="WithholdingStatus" label="扣货状态" min-width="120" key="49">
                    <template slot-scope="scope">
                        <div>
                            <span class="WithholdingStatus">未扣货</span>
                        </div>
                        <div>
                            <span class="WithholdingStatus" style="color:#FF0000;margin-right:10px">已扣货</span>
                            <el-button type="text" @click="holdCustody(scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deliveryChannel" label="出库渠道" min-width="120" key="50"></el-table-column>
                <el-table-column prop="deliveryAgent" label="出库代理" min-width="120" key="51"></el-table-column>
                <el-table-column prop="agentSettlementWeight" label="代理结算重" min-width="120" key="51">
                    <template slot-scope="scope">
                        <div class="alignment flex align-center">
                             <span class="weightFont1">{{scope.row.agentSettlementWeight}}</span>
                             <span class="weightFont2">{{scope.row.agentSettlementWeight}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deliveryAgent" label="派送类型" min-width="120" key="51"></el-table-column>
                <el-table-column prop="deliveryAgent" label="派送状态" min-width="120" key="51"></el-table-column>
                <el-table-column prop="transferOrder" label="转单号" min-width="120" key="51">
                    <template slot-scope="scope">
                      <div class="alignment flex align-center">
                        <el-button type="text" @click="checkWebsite(scope.row)">查看官网</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="modifyTransferOrder(scope.row)">修改</el-button>
                      </div>
                    </template>
                </el-table-column>
                <!-- key重复 报错 -->
                <el-table-column prop="ladingOrder" label="提单号" min-width="120" key="51">
                  <template slot-scope="scope">
                    <div>
                      <el-button type="text" @click="modifyLadingOrder(scope.row)">修改</el-button>
                    </div>
                    <div class="alignment flex align-center">
                      <span class="WithholdingStatus">无</span>
                      <el-button type="text" @click="modifyLadingOrder(scope.row)">添加</el-button>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column prop="coordination" label="协同" min-width="80" key="52"></el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" min-width="220" key="53" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)">查看详情</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="detentionCargo(scope.row)">扣货</el-button>
                        <!-- <el-button type="text" @click="checkInvoice(scope.row)">查看发票</el-button> -->
                        <span class="ele">｜</span>
                        <el-button type="text" @click="outWarehouse(scope.row)">出运</el-button>
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
            <!-- 无法出运 -->
            <el-dialog
            :visible.sync="dialogShipment"
            top="10%"
            width="30%">
            <div slot="title" class="left">无法出运</div>
            <div slot="title" class="left">出运</div>
            <div class="flex align-center">
                <div class="icon" style="font-size: 58px; color: #FF0000;margin-right: 20px">&#xe781;</div>
                <div>
                  <div>抱歉！运单{{unableOrderId}}无法出运</div>
                  <div>因为该运单已被扣货</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="wuBtn" @click="dialogShipment = false">部分入仓</el-button>
                <el-button class="wuBtn" @click="dialogShipment = false">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogShipment = false">重新扫描</el-button>
                <el-button class="orangeBtn" @click="dialogShipment = false">确 认</el-button>
            </span>
            </el-dialog>
            <!-- 转单号修改 -->
            <el-dialog
            :visible.sync="dialogTransferOrder"
            top="10%"
            width="30%">
            <div slot="title" class="left">设置转单号</div>
            <div class="line" style="margin-top:-20px;"></div>
                <div style="padding-top:20px">
                  <div>您确定对运单号为“{{orderId}}”的运单设置转单号吗？</div>
                  <div class="alignment flex align-center" style="margin-top:16px">
                    <span class="zd" style="width:60px">转单号 </span>
                    <el-input placeholder="请输入转单号" size="small" v-model="transferOrder" style="width:60%"></el-input>
                  </div>
                </div>
            <span slot="footer" class="dialog-footer">
              <div class="line"></div>
              <el-button class="wuBtn" @click="dialogTransferOrder = false">取 消</el-button>
              <el-button class="orangeBtn" @click="dialogTransferOrder = false">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 修改提单号 -->
            <el-dialog
            :visible.sync="dialogLadingOrder"
            top="10%"
            width="30%">
            <div slot="title" class="left">设置转单号</div>
            <div class="line" style="margin-top:-20px;"></div>
                <div style="padding-top:20px">
                  <div>您确定对运单号为“{{orderId}}”的运单设置提单号吗？</div>
                  <div class="alignment flex align-center" style="margin-top:16px">
                    <span class="zd" style="width:60px">提单号 </span>
                    <el-input placeholder="请输入转单号" size="small" v-model="ladingOrder" style="width:60%"></el-input>
                  </div>
                </div>
            <span slot="footer" class="dialog-footer">
              <div class="line"></div>
              <el-button class="wuBtn" @click="dialogLadingOrder = false">取 消</el-button>
              <el-button class="orangeBtn" @click="dialogLadingOrder = false">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 批量出运 -->
            <el-dialog
            :visible.sync="bulkShipment"
            top="10%"
            width="30%">
            <div slot="title" class="left">批量出运</div>
            <div class="line" style="margin-top:-20px;"></div>
                <div style="padding-top:20px">
                  <div>您确定对运单号为“{{orderId}}”的运单设置提单号吗？</div>
                  <div class="alignment flex align-center" style="margin-top:16px">
                    <span class="zd" style="width:60px">提单号 </span>
                    <el-input placeholder="请输入转单号" size="small" v-model="ladingOrder" style="width:60%"></el-input>
                  </div>
                </div>
            <span slot="footer" class="dialog-footer">
              <div class="line"></div>
              <el-button class="wuBtn" @click="bulkShipment = false">取 消</el-button>
              <el-button class="orangeBtn" @click="bulkShipment = false">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 批量设置提单号 -->
            <el-dialog
            :visible.sync="dialogBatchSetTransfer"
            top="10%"
            width="30%">
            <div slot="title" class="left">批量设置提单号</div>
            <div class="line" style="margin-top:-20px;"></div>
                <div style="padding-top:20px">
                  <div>您确定对这{{BatchSetTransferNum}}笔订单批量设置提单号吗？</div>
                  <div class="alignment flex align-center" style="margin-top:16px">
                    <span class="zd" style="width:60px">提单号 </span>
                    <el-input placeholder="请输入提单号" size="small" v-model="batchTransfer" style="width:60%"></el-input>
                  </div>
                </div>
            <span slot="footer" class="dialog-footer">
              <div class="line"></div>
              <el-button class="wuBtn" @click="dialogBatchSetTransfer = false">取 消</el-button>
              <el-button class="orangeBtn" @click="dialogBatchSetTransfer = false">确 定</el-button>
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
                <el-checkbox v-model="checked" style="float:left">模糊搜索</el-checkbox>
                <el-button class="wuBtn" @click="dialogPL = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogPL = false" size="small">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 查询条件设置 -->
            <el-drawer
            title="查询条件设置"
            :visible.sync="visibleQueryCondition"
            :wrapperClosable='false'
            size="50%">
            <!-- <div style="height:"></div> -->
            <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                <el-row class="Flexcenter">
                    <span class="query">查询名称&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="queryName"></el-select>
                    <el-button class="orangeBtn" style="margin-left:20px">确 定</el-button>
                    <el-button class="whiteBtn" style="margin-left:20px">保存配置</el-button>
                    <el-button class="whiteBtn" style="margin-left:20px">查看配置</el-button>
                </el-row>
                <!-- 主要搜索条件 -->
                <el-row class="mainSearch">主要搜索条件</el-row>
                <div class="table">
                    <el-table ref="multipleTable" :data="mainData" border  tooltip-effect="dark" style="width: 100%"
                        @selection-change="mainChange" :header-cell-style="{background: '#F5F5F6'}">
                        <el-table-column type="selection" width="50" key="1"></el-table-column>
                        <el-table-column prop="condition" label="搜索条件名称" key="2"></el-table-column>
                        <el-table-column prop="display" label="是否显示" key="3">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status === true" class="Flexcenter">
                                    <div class="dot"></div>
                                    <span>显示</span>
                                </div>
                                <div v-if="scope.row.status === false" class="Flexcenter">
                                    <div class="dot" style="background:#FF0000"></div>
                                    <span>不显示</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 隐藏搜索条件 -->
                <el-row class="mainSearch">隐藏搜索条件</el-row>
                <div class="table">
                    <el-table ref="multipleTable" :data="hideData" border  tooltip-effect="dark" style="width: 100%"
                        @selection-change="hideDataChange" :header-cell-style="{background: '#F5F5F6'}">
                        <el-table-column type="selection" width="50" key="1"></el-table-column>
                        <el-table-column prop="condition" label="搜索条件名称" key="2"></el-table-column>
                        <el-table-column prop="display" label="是否显示" key="3">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status === true" class="Flexcenter">
                                    <div class="dot"></div>
                                    <span>显示</span>
                                </div>
                                <div v-if="scope.row.status === false" class="Flexcenter">
                                    <div class="dot" style="background:#FF0000"></div>
                                    <span>不显示</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-row style="background:#fff;text-align:left;padding:26px;margin-top:26px">
                <el-button class="orangeBtn long1" plain size="small"  style="margin-right:20px" @click="visibleQueryCondition = false">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px" @click="visibleQueryCondition = false">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>
            <!-- 列表显示设置 -->
            <el-drawer
            title="列表显示设置"
            :visible.sync="visibleList"
            :wrapperClosable='false'
            size="50%">
            <!-- <div style="height:"></div> -->
            <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                <el-row class="Flexcenter">
                    <span class="query">查询名称&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="listQueryName"></el-select>
                    <el-button class="orangeBtn" style="margin-left:20px">确 定</el-button>
                    <el-button class="whiteBtn" style="margin-left:20px" @click="preservation = true">保存配置</el-button>
                    <el-button class="whiteBtn" style="margin-left:20px">查看配置</el-button>
                </el-row>
                <!-- 主要搜索条件 -->
                <el-row class="mainSearch">主要搜索条件</el-row>
                <div class="table">
                    <el-table ref="multipleTable" :data="listData" border  tooltip-effect="dark" style="width: 100%"
                        @selection-change="listChange" :header-cell-style="{background: '#F5F5F6'}">
                        <el-table-column type="selection" width="50" key="1"></el-table-column>
                        <el-table-column prop="condition" label="列表名" key="2"></el-table-column>
                        <el-table-column prop="listWidth" label="列表宽度" key="3"></el-table-column>
                        <el-table-column prop="display" label="是否显示" key="4">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status === true" class="Flexcenter">
                                    <div class="dot"></div>
                                    <span>显示</span>
                                </div>
                                <div v-if="scope.row.status === false" class="Flexcenter">
                                    <div class="dot" style="background:#FF0000"></div>
                                    <span>不显示</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-row style="background:#fff;text-align:left;padding:26px;margin-top:26px">
                <el-button class="orangeBtn long1" plain size="small"  style="margin-right:20px" @click="visibleList = false">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px" @click="visibleList = false">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>
            <!-- 批量导出Excel -->
            <el-drawer
            :visible.sync="visibleExport"
            :wrapperClosable='false'
            size="50%">
            <div slot="title">批量导出Excel</div>
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
                        <el-checkbox class="table" v-model="checked" @change="checked1"/>
                        <span class="checked1">全部</span>
                    </div>
                    <el-tree
                    ref="tree"
                    class="table"
                    :default-checked-keys="roleData"
                    :data="data"
                    show-checkbox
                    @check-change="handleCheckChange"
                    default-expand-all
                    node-key="id"
                    :props="{label: 'label'}">
                    </el-tree>
                </div>
            <el-row class="drawer_btn" style="background:#fff;text-align:left;padding:26px;margin-top:26px">
                <el-button class="orangeBtn" plain size="small" icon="el-icon-circle-check"  style="margin-right:20px" @click="batchExportSubmit">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px;line-height:10px" @click="visibleExport = false">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>
            <!-- 更新轨迹弹窗 -->
            <el-drawer
            :visible.sync="routerVisible"
            :wrapperClosable='false'
            size="50%">
            <div slot="title">更新轨迹弹窗</div>
              <div>
                  <el-steps :active="2" align-left>
                    <el-step title="已收货" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="已入仓" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="已出仓" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="已装船" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
              </div>
               <div>
                  <el-steps :active="2" align-left>
                    <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
              </div>
               <div>
                  <el-steps :active="2" align-left>
                    <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
              </div>
            <el-row class="drawer_btn" style="background:#fff;text-align:left;padding:26px;margin-top:26px">
                <el-button class="orangeBtn" plain size="small" icon="el-icon-circle-check"  style="margin-right:20px" @click="batchExportSubmit">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px;line-height:10px" @click="visibleExport = false">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>
            <!-- 导出Excel设置 -->
            <el-drawer
            :visible.sync="visibleExportSetting"
            :wrapperClosable='false'
            size="50%">
            <div slot="title">导出Excel配置</div>
                <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                    <el-row class="backStage">后台配置</el-row>
                    <el-table ref="multipleTable" :data="ExcelChange" border  tooltip-effect="dark" style="width: 100%"
                        @selection-change="listChange" :header-cell-style="{background: '#F5F5F6'}">
                        <el-table-column prop="settingName" label="列表名" key="1"></el-table-column>
                    </el-table>
                    <el-row class="backStage" style="margin-top:20px">我的配置</el-row>
                    <el-table ref="multipleTable" :data="ExcelData" border  tooltip-effect="dark" style="width: 100%"
                        @selection-change="listChange" :header-cell-style="{background: '#F5F5F6'}">
                        <el-table-column prop="settingName" label="列表名" key="1"></el-table-column>
                        <el-table-column label="操作" key="2">
                            <template slot-scope="scope">
                                <el-button type="text" @click="Edit(scope.row)">编辑</el-button>
                                <el-button type="text" @click="Edit(scope.row)">重命名</el-button>
                                <el-button type="text" @click="Delete(scope.row)" style="color:#FF0000">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" size="small" style="margin-top:20px">新增配置</el-button>
                </div>
            <el-row class="drawer_btn" style="background:#fff;text-align:left;padding:26px;margin-top:26px">
                <el-button class="orangeBtn" plain size="small" style="margin-right:20px" @click="visibleExportSetting = false">
                    返 回
                </el-button>
            </el-row>
            </el-drawer>
            <!-- 删除 -->
            <el-dialog
            :visible.sync="dialogDelete"
            top="14%"
            width="30%">
            <div slot="title" class="left">无法出仓</div>
            <div class="line" style="margin-top:-20px"></div>
            <div class="flex align-center">
                <div class="icon" style="font-size: 58px; color: #FF0000;margin-right: 20px">&#xe781;</div>
                <div>您确认要删除“业务员导出设置”？</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="line"></div>
                <el-button class="wuBtn" @click="dialogDelete = false">返 回</el-button>
                <el-button class="orangeBtn" @click="dialogDelete = false">确认删除</el-button>
            </span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogShipment: false, // 无法出运
      unableOrderId: 'AS202012120001', // 无法出运订单号

      dialogBatchSetTransfer: false, // 批量设置提单号
      batchTransfer: '', // // 请输入提单号
      BatchSetTransferNum: 34, // 批量设置提单号--数量
      bulkShipment: false, // 批量出运
      bulkShipmentNum: 34, // 批量出运--数量

      transferOrder: '', // 请输入转单号
      dialogLadingOrder: false, // 修改提单号
      ladingOrder: '', // 请输入提单号
      dialogPL: false, // 批量搜索
      checked: '', // 模糊搜索
      batch: '', // 批量输入单号

      visibleExportSetting: false, // 导出设置
      dialogDelete: false, // 删除弹框
      // 后台配置
      ExcelChange: [
        {
          settingName: '业务导出配置'
        },
        {
          settingName: '操作导出配置'
        }
      ],
      ExcelData: [
        {
          settingName: '业务导出配置'
        },
        {
          settingName: '操作导出配置'
        },
        {
          settingName: '操作导出配置'
        }
      ], // Excel表格
      routerVisible: false, // 更新轨迹弹窗
      visibleExport: false, // 批量导出Excel
      roleData: [
        {
          settingName: '业务导出配置'
        },
        {
          settingName: '操作导出配置'
        }
      ],
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

      visibleList: false, // 列表显示设置
      listQueryName: '', // 列表显示设置
      // 列表显示设置
      listData: [
        {
          condition: '预报单号',
          listWidth: '37',
          status: false
        },
        {
          condition: '运单号',
          listWidth: '60',
          status: false
        },
        {
          condition: '客户名称',
          listWidth: '60',
          status: false
        },
        {
          condition: '客户编码',
          listWidth: '20',
          status: false
        },
        {
          condition: '预报渠道',
          listWidth: '60',
          status: false
        },
        {
          condition: '收货司机',
          listWidth: '60',
          status: false
        },
        {
          condition: '业务员',
          listWidth: '40',
          status: false
        },
        {
          condition: '是否分票',
          listWidth: '60',
          status: false
        },
        {
          condition: '是否有发票',
          listWidth: '40',
          status: false
        },
        {
          condition: '票数',
          listWidth: '60',
          status: false
        }
      ],

      visibleQueryCondition: false, // 条件查询设置
      queryName: '', // 查询名称
      // 主要搜索条件
      mainData: [
        {
          condition: '预报单号',
          status: false
        },
        {
          condition: '运单号',
          status: false
        },
        {
          condition: '客户名称',
          status: false
        },
        {
          condition: '客户编码',
          status: false
        },
        {
          condition: '预报渠道',
          status: false
        },
        {
          condition: '收货司机',
          status: false
        },
        {
          condition: '业务员',
          status: false
        }
      ],
      // 隐藏搜索条件
      hideData: [
        {
          condition: '是否分票',
          status: false
        },
        {
          condition: '是否有发票',
          status: false
        },
        {
          condition: '票数',
          status: false
        },
        {
          condition: '寄件方式',
          status: false
        },
        {
          condition: '预报件数',
          status: false
        }
      ],

      show: 1, // 控制不可出仓时的提示
      FORM: 1, // 控制form显示

      dialogFile: false, // 批量归档对话框
      dialogTransferOrder: false, // 出仓
      fileError: false, // 提示
      number: 0, // 选择批量归档件数

      form: {
        // FORM === 1
        WayBillNo: '', // 运单号
        name: '', // 客户名称
        customerNo: '', // 客户编码
        control: '', // 目的国
        destination: '', // 目的地
        orderType: '', // 订单类型
        incomingNum: '', // 入库件数
        // FORM === 2
        forecastNo: '', // 预报单号
        forecastChannel: '', // 预报渠道
        receivingGoodsDriver: '', // 收货司机
        salesman: '', // 业务员
        invoiceDetails: '', // 发票详情
        packingList: '', // 装箱清单
        mailingMethod: '', // 寄件方式
        goodsNo: '', // 货件编号
        chargedMagnetic: '', // 带电带磁
        productName: '', // 品名
        warehouse: '', // 目的仓
        destinationPost: '', // 目的地邮编
        insurance: '', // 是否有保险
        customsTypes: '', // 报关类型
        customsClearance: '', // 单独清关
        deferral: '', // 递延
        warehouser: '', // 入仓员
        withholdingStatus: '', // 扣货状态
        warehousingChannel: '' // 入仓渠道
      },

      total: 50, // 表格数据总条数
      orderId: 'ASSZ202112120001',
      currentPage: 1,
      pageSize: 10,

      // 表格数据
      type: '', // 运单类型
      customer_name: '', // 客户名称
      customer_code: '', // 客户编码
      waybill_no: '', // 运单号
      forecast_no: '', // 预报单号
      channel_id: '', // 渠道id
      channel_name: '', // 渠道名称
      has_invoice: '', // 是否制作发票
      irikura_time: '', // 入库时间
      created_at: '', // 下单时间
      remark: '', // 客户备注
      interior_remark: '', // 最新内部备注
      tableData: [
      ],
      page: {
        limit: 10,
        pageNo: 1
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData () {
      console.log('1221')
      // 初始的表格数据清空
      this.tableData = []
      this.$api.Ordermanagement.checkoutLists({ limit: this.page.limit, page: this.page.pageNo }).then(res => {
        console.log(res.data) // res是接口返回的结果
        //   res.data.list && res.data.list.forEach(ele => {
        //     let obj = {
        //       // status: Number(this.activeName),
        //       type: ele.type,
        //       customer_name: ele.customer_name,
        //       customer_code: ele.customer_code,
        //       waybill_no: ele.waybill_no,
        //       forecast_no: ele.forecast_no,
        //       channel_id: ele.channel_id,
        //       has_invoice: ele.has_invoice,
        //       irikura_time: ele.irikura_time,
        //       created_at: ele.created_at,
        //       remark: ele.remark,
        //       interior_remark: ele.interior_remark
        //     }
        //     this.tableData.push(obj)
        //   })
        this.page.total = res.data.total // 数据总量
        this.tableData = res.data.list
      })
    },
    // 批量设置转单号
    batchSetTransfer () {
      this.dialogBatchSetTransfer = true
    },
    // 表格选择
    handleSelectionChange (val) {
      this.page.limit = val // 设置当前页容量为val
      this.getData() // 重新渲染表格
    },
    // 转单号查看官网
    checkWebsite () {},
    // 转单号修改
    modifyTransferOrder () {
      this.dialogTransferOrder = true
    },
    // 提单号修改
    modifyLadingOrder () {
      this.dialogLadingOrder = true
    },
    // 导出配置删除弹框
    Delete () {
      this.dialogDelete = true
    },
    // 批量扣货
    batchArchive () {},
    // 批量出运
    batchWarehouse () {
      this.bulkShipment = true
    },
    // 批量修改入仓渠道
    batchModifyChannel () {},
    // 表格出仓
    outWarehouse: function (event) {
      console.log(event)
      this.$api.Ordermanagement.checkoutShipment({ directId: Number(event) }).then((res) => {})
      this.dialogShipment = true
    },
    // 查询搜索条件
    mainChange (val) {
      this.mainData.forEach(item => {
        item.status = false
      })
      val.forEach(item => {
        item.status = true
      })
    },
    // 隐藏搜索条件
    hideDataChange (val) {
      console.log(val)
      this.hideData.forEach(item => {
        item.status = false
      })
      val.forEach((item) => {
        item.status = true
      })
    },
    // 列表显示设置
    listChange (val) {
      this.listData.forEach(item => {
        item.status = false
      })
      val.forEach((item) => {
        item.status = true
      })
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
    // 批量excel提交--导出设置
    batchExportSubmit () {
      this.visibleExport = false
      this.visibleExportSetting = true
    },
    // 回调
    handleCheckChange (data, checked, indeterminate) {
      // console.log(data)
    },
    // 批量设置出库渠道
    batchSendChannel () {},
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
      this.$router.push({ name: 'outWarehousDetials' })
    },
    // 操作扣货
    detentionCargo () {},
    // 操作查看发票
    checkInvoice () {},
    // 操作出库
    Delivery () {},
    // 批量导出
    Export () {
      this.visibleExport = true
    },
    UpdateRouter () {
      this.routerVisible = true
    },
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
.zd{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
.weightFont1{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.weightFont2{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #00951A;
}
.backStage{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-bottom: 20px;
}
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
.channel{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.Gfont{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
}
.Bfont{
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}
.Yfont{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FB4E0C;
}
.font{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.WithholdingStatus{
    font-size: 14px;
    margin-right: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.mainSearch{
    font-size: 16px;
    margin: 26px 0;
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
  line-height: 32px;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.Flexcenter{
    display: flex;
    align-items: center;
}
.icon {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.Flexchannel{
    display: flex;
    align-items: center;
}
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
    color: #0084FF;
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
    display: flex;
    align-items: center;
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
    width: 80px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
</style>
