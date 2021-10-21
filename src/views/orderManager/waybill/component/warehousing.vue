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
                            <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer ">批量</i>
                            <i slot="suffix" class="expend">&#xe9cc;</i>
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
                <el-button class='stopBtn' @click="Export" size="small">批量导出Excel</el-button>
                <el-button class='stopBtn' @click="batchSendChannel" size="small">批量设置出库渠道</el-button>
                <el-button class='stopBtn' @click="batchModifyChannel" size="small">批量修改入仓渠道</el-button>
                <el-button class='stopBtn' @click="batchWarehouse" size="small">批量出仓</el-button>
                <el-button class='stopBtn' @click="batchArchive" size="small">批量扣货</el-button>
                <el-button class='stopBtn' size="small" @click="dialogRelease = true">批量放货</el-button>
                <el-button class='stopBtn' @click="Export" size="small">批量导出发票</el-button>
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
                            <span class="WithholdingStatus" style="color:#FF0000">已扣货</span>
                            <el-button type="text" @click="holdCustody(scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="coordination" label="协同" min-width="80" key="50"></el-table-column>
                <el-table-column prop="coordination" label="发票导出" min-width="144" key="50">
                    <template>
                        <div class="alignment flex align-center">
                            <div class="dot"></div>
                            <span class="ele" style="color:#333333;margin-right:10px">发票已导出</span>
                        </div>
                        <div class="alignment flex align-center">
                            <div class="dot" style="background:#FF0000"></div>
                            <span class="ele" style="color:#333333;margin-right:10px">发票未导出</span>
                        </div>
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" min-width="241" key="51" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)">查看详情</el-button>
                        <span class="ele">｜</span>
                        <!-- <el-button type="text" @click="RELEASE(scope.row)">放货</el-button> -->
                        <el-button type="text" @click="detentionCargo(scope.row)">扣货</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="Delivery(scope.row)">出库</el-button>
                        <span class="ele">｜</span>
                        <el-button type="text" @click="Problempiece(scope.row)">问题件</el-button>
                        <!-- <el-button type="text" @click="checkInvoice(scope.row)">查看发票</el-button> -->
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
          <!-- 批量扣货 -->
          <el-dialog
            title="批量扣货"
            :visible.sync="dialogFile"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:20px"></div>
            <div class="number">是否对这<span> {{number}} </span>笔运单批量进行扣货处理</div>
            <div class="number" style="margin:14px 0 10px 0">扣货原因</div>
            <el-input type="textarea" rows=5 placeholder="请输入扣货原因" v-model="DetentionCargo"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="dialogFile = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogFile = false" size="small">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 单个扣货 -->
          <el-dialog
            title="扣货"
            :visible.sync="singleDetentionCargo"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:20px"></div>
            <div class="number" style="margin:14px 0 10px 0">扣货原因</div>
            <el-input type="textarea" rows=5 placeholder="请输入扣货原因" v-model="singleDeliveryCoods"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="dialogRelease = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogRelease = false" size="small">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 批量放货 -->
          <el-dialog
            title="批量放货"
            :visible.sync="dialogRelease"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:20px"></div>
            <div class="number">是否对这<span> {{number}} </span>笔运单批量进行放货处理</div>
            <div class="number" style="margin:14px 0 10px 0">放货原因</div>
            <el-input type="textarea" rows=5 placeholder="请输入放货原因" v-model="deliveryCoods"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="dialogRelease = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogRelease = false" size="small">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 单个放货 -->
          <el-dialog
            title="批量放货"
            :visible.sync="singleRelease"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:20px"></div>
            <div class="number" style="margin:14px 0 10px 0">放货理由</div>
            <el-input type="textarea" rows=5 placeholder="请输入放货理由" v-model="Release"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="dialogRelease = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogRelease = false" size="small">确 定</el-button>
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
            <!-- 出库弹窗 -->
            <el-dialog
            :visible.sync="dialogStop"
            top="10%"
            width="30%">
            <div slot="title" class="left">无法出库</div>
            <div class="flex align-center">
                <div class="icon" style="font-size: 58px; color: #FF0000;margin-right: 20px">&#xe781;</div>
                <div>抱歉！运单{{prohibit}}无法出库因为该运单已被扣货</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="wuBtn" @click="dialogStop = false">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogStop = false">确 定</el-button>
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
                <el-button class="orangeBtn long1" plain size="small"  style="margin-right:20px">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>
            <!-- 列表显示设置 -->
            <el-drawer
            :visible.sync="visibleList"
            :wrapperClosable='false'
            size="50%">
            <div class="title">列表显示设置</div>
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
                <el-button class="orangeBtn long1" plain size="small"  style="margin-right:20px">
                    提 交
                </el-button>
                <el-button type="info long1" plain size="small" style="margin-right:20px">
                    取 消
                </el-button>
            </el-row>
            </el-drawer>

            <!-- 列表显示设置保存配置 -->
            <el-dialog
                title="保存配置"
                :visible.sync="preservation"
                top="12%"
                width="30%">
                <div class="line" style="margin-top:-20px;margin-bottom:40px"></div>
                <div class="Flexcenter">
                    <span class="configuration">
                        配置名称&nbsp;&nbsp;
                    </span>
                    <el-input size="small" v-model="configurationName" style="width:60%" placeholder="请输入配置名称"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-row class="line"></el-row>
                    <el-button class="wuBtn" @click="preservation = false" size="small">取 消</el-button>
                    <el-button class="orangeBtn" @click="preservation = false" size="small">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 表格扣货状态扣货抽屉 -->
            <el-drawer
            title="扣货"
            :visible.sync="visibleholdCustody"
            :wrapperClosable='false'
            size="50%">
            <div style="padding:0 26px">
                <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                <el-row>
                    <el-row>
                        <el-col :span="12" class="font flex align-center">
                            <span style="width:18%;text-align:right">所属公司：</span>
                            <span>{{custodyCompany}}</span>
                        </el-col>
                        <el-col :span="12" class="font flex align-center">
                            <span style="width:18%;text-align:right">客户名称：</span>
                            <span>{{CustomerName}}</span>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="12" class="font flex align-center">
                            <span style="width:18%;text-align:right">运单号：</span>
                            <span>{{orderNo}}</span>
                        </el-col>
                        <el-col :span="12" class="font flex align-center">
                            <span style="width:18%;text-align:right">业务员：</span>
                            <span>{{salesman}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="line" style="margin-bottom:30px"></el-row>
                    <!-- 扣货 （v-if）-->
                    <div>
                       <el-row class="Yfont">扣货件</el-row>
                        <el-row class="Bfont" style="margin:16px 0">
                            <span style="width:16%">扣货原因：</span>
                            <span>{{reason}}</span>
                        </el-row>
                        <el-row class="Gfont">
                            <el-col :span="6">
                                <span>{{date}}</span>
                            </el-col>
                            <el-col :span="6">
                                <span>扣货人：</span>
                                <span>{{operator}}</span>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 扣货放货 -->
                    <div>
                       <el-row class="Yfont" style="color:#000000">正常件</el-row>
                        <el-row class="Bfont" style="margin:16px 0">
                            <span style="width:16%">扣货原因：</span>
                            <span>{{reason}}</span>
                        </el-row>
                        <el-row class="Gfont">
                            <el-col :span="6">
                                <span>{{date}}</span>
                            </el-col>
                            <el-col :span="6">
                                <span>扣货人：</span>
                                <span>{{operator}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="Bfont" style="margin:24px 0 16px 0">
                            <span style="width:16%">放货理由：</span>
                            <span>{{reason}}</span>
                        </el-row>
                        <el-row class="Gfont">
                            <el-col :span="6">
                                <span>{{ReleaseDate}}</span>
                            </el-col>
                            <el-col :span="6">
                                <span>放货人：</span>
                                <span>{{ReleaseOperator}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
            </div>
        </div>
            <div class="drawer_btn">
                <el-button class="orangeBtn" @click="visibleholdCustody = false">返 回</el-button>
            </div>
            </el-drawer>
            <!-- 表格入仓渠道修改抽屉 -->
            <el-drawer
            title="修改入仓渠道"
            :visible.sync="visibleChanel"
            :wrapperClosable='false'
            :before-close="handleClose"
            size="50%">
            <div style="padding:0 26px">
                <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                    <el-row>
                        <el-row>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">所属公司：</span>
                                <span>{{custodyCompany}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">客户名称：</span>
                                <span>{{CustomerName}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">运单号：</span>
                                <span>{{orderNo}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">业务员：</span>
                                <span>{{salesman}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="line" style="margin-bottom:30px"></el-row>
                        <el-row class="Flexcenter">
                            <el-col :span="2" class="channel">渠道名称</el-col>
                            <el-col :span="8" style="display:flex;justify-content:flex-start">
                                <el-input placeholder="请输入渠道名称/编码" size="small" v-model="channelCode"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="orangeBtn" style="margin-left:20px">查询</el-button>
                            </el-col>
                            <el-col :span="10" style="display:flex;justify-content:flex-end" v-if="add === false">
                                <el-button class="whiteBtn" style="margin-left:20px" @click="modifyHistory">修改历史</el-button>
                            </el-col>
                            <el-col :span="10" style="display:flex;justify-content:flex-end" v-if="add === true">
                                <el-button class="whiteBtn" style="margin-left:20px">新增渠道</el-button>
                            </el-col>
                        </el-row>
                        <div class="CHANNEL" style="margin-top:26px">
                            <el-table ref="multipleTable" :data="chaanelData" border  tooltip-effect="dark" style="width: 100%"
                                @selection-change="channelChange" :header-cell-style="{background: '#F5F5F6'}">
                                <el-table-column type="selection" width="50" key="1"></el-table-column>
                                <el-table-column prop="channelName" label="渠道名称" key="2"></el-table-column>
                                <el-table-column prop="channelCode" label="渠道编码" key="3"></el-table-column>
                            </el-table>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="drawer_btn">
                <el-button class="orangeBtn" size="small" icon="el-icon-circle-check" @click="drawerChannelConfirm">确 认</el-button>
                <el-button  class="wuBtn" size="small" style="margin-left:20px;line-height:30px">取 消</el-button>
            </div>
            </el-drawer>
            <!-- 修改入仓渠道错误框 -->
            <el-dialog
            :visible.sync="dialogChannelError"
            top="10%"
            width="30%">
            <div slot="title" class="left">无法修改入仓渠道</div>
            <el-row class="line" style="margin-top:-20px"></el-row>
            <div class="flex align-center">
                <div class="icon" style="font-size: 58px; color: #FF0000;margin-right: 20px">&#xe781;</div>
                <div>抱歉！无法修改
                    <div>运单{{prohibit}}的目的地为美国</div>
                    修改后的入仓渠道英国海运不支持该目的地
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-row class="line" style="margin-top:-20px"></el-row>
                <el-button class="wuBtn" @click="dialogChannelError = false">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogChannelError = false">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 修改入仓渠道--修改历史 -->
            <el-drawer
            title="入仓渠道修改历史"
            :visible.sync="visibleModifyHistory"
            :wrapperClosable='false'
            size="50%">
            <div style="padding:0 26px">
                <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                    <el-row>
                        <el-row>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">所属公司：</span>
                                <span>{{custodyCompany}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">客户名称：</span>
                                <span>{{CustomerName}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">运单号：</span>
                                <span>{{orderNo}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">业务员：</span>
                                <span>{{salesman}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="line" style="margin-bottom:30px"></el-row>
                        <div class="CHANNEL" style="margin-top:26px">
                            <el-table ref="multipleTable" :data="channelModifyData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}">
                                <el-table-column prop="modifyTime" label="修改时间" key="1"></el-table-column>
                                <el-table-column prop="modifyBeforChannel" label="修改前渠道" key="2"></el-table-column>
                                <el-table-column prop="modifyBeforChannel" label="修改后渠道" key="3"></el-table-column>
                                <el-table-column prop="reviser" label="修改人" key="4"></el-table-column>
                            </el-table>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="drawer_btn">
                <el-button class="orangeBtn" size="small" icon="el-icon-circle-check" @click="visibleModifyHistory = false">
                    确 认
                </el-button>
                <el-button  class="wuBtn" size="small" style="margin-left:20px;line-height:30px" @click="visibleModifyHistory = false">
                    取 消
                </el-button>
            </div>
            </el-drawer>
            <!-- 单个表格出库抽屉 -->
            <el-drawer
            title="出仓渠道"
            :visible.sync="visibleOutletChanel"
            :wrapperClosable='false'
            :before-close="handleOutletClose"
            size="50%">
            <div style="padding:0 26px">
                <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                    <el-row>
                        <el-row>
                            <el-row style="display:flex;align-items:center">
                                <el-col :span="3" style="display:flex;">
                                <div style="display:flex;flex-direction: column;align-items:center">
                                    <div class="circle">1</div>
                                    <div>选择渠道</div>
                                </div>
                                </el-col>
                                <el-col :span="2">
                                    <img src="@/assets/jiantou.png" alt="">
                                </el-col>
                                <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="change === 1">
                                    <div class="circle1">2</div>
                                    <div>选择代理</div>
                                </el-col>
                                <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="change === 2">
                                    <div class="circle">2</div>
                                    <div>选择代理</div>
                                </el-col>
                            </el-row>
                            <el-row class="line"></el-row>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">所属公司：</span>
                                <span>{{custodyCompany}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">客户名称：</span>
                                <span>{{CustomerName}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">运单号：</span>
                                <span>{{orderNo}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">业务员：</span>
                                <span>{{salesman}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="line" style="margin-bottom:30px"></el-row>
                        <!-- 选择渠道 -->
                        <el-row class="Flexcenter" v-if="change === 1">
                            <el-col :span="2" class="channel">渠道名称</el-col>
                            <el-col :span="8" style="display:flex;justify-content:flex-start">
                                <el-input placeholder="请输入渠道名称/编码" size="small" v-model="channelCode"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="orangeBtn" style="margin-left:20px">查询</el-button>
                            </el-col>
                        </el-row>
                        <!-- 选择代理 -->
                        <el-row class="Flexcenter" v-if="change === 2">
                            <el-col :span="2" class="channel">代理名称</el-col>
                            <el-col :span="8" style="display:flex;justify-content:flex-start">
                                <el-input placeholder="请输入渠道名称/编码" size="small" v-model="agentName"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="orangeBtn" style="margin-left:20px">查询</el-button>
                            </el-col>
                        </el-row>
                        <!-- 单选选择渠道表格 -->
                        <div class="CHANNEL" style="margin-top:26px" v-if="change === 1">
                            <el-table ref="multipleTable" :data="changeChannelData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}" @select="select" @select-all="selectAll">
                                <el-table-column type="selection" key="1"></el-table-column>
                                <el-table-column prop="name" label="渠道名称" key="2" min-width="300"></el-table-column>
                                <el-table-column prop="code" label="渠道编码" key="3"></el-table-column>
                            </el-table>
                        </div>
                        <!-- 单选选择代理表格 -->
                        <div class="CHANNEL" style="margin-top:26px" v-if="change === 2">
                            <el-table ref="multipleTable" :data="changeAgentlData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}" @select="select" @select-all="selectAll">
                                <el-table-column type="selection" key="1"></el-table-column>
                                <el-table-column prop="name" label="代理名称" key="2" min-width="300"></el-table-column>
                                <el-table-column prop="code" label="代理编码" key="3"></el-table-column>
                            </el-table>
                        </div>

                        <!-- 多选选择渠道表格 -->
                        <div class="CHANNEL" style="margin-top:26px" v-if="change === 3">
                            <el-table ref="multipleTable" :data="changeChannelData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}"  @select="select" @select-all="selectAll">
                                <el-table-column type="selection" key="1"></el-table-column>
                                <el-table-column prop="name" label="渠道名称" key="2" min-width="300"></el-table-column>
                                <el-table-column prop="code" label="渠道编码" key="3"></el-table-column>
                            </el-table>
                        </div>
                        <!-- 多选选择代理表格 -->
                        <div class="CHANNEL" style="margin-top:26px" v-if="change === 4">
                            <el-table ref="multipleTable" :data="changeAgentlData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}">
                                <el-table-column type="selection" key="1"></el-table-column>
                                <el-table-column prop="name" label="代理名称" key="2" min-width="300"></el-table-column>
                                <el-table-column prop="code" label="代理编码" key="3"></el-table-column>
                            </el-table>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="drawer_btn">
                <el-button class="orangeBtn" size="small" @click="change = 2" v-if="change === 1">
                    下一步
                </el-button>
                <el-button class="orangeBtn" size="small" icon="el-icon-circle-check" @click="dialogConfirmChannel = true"
                v-if="change === 2">
                    确 认
                </el-button>
                <el-button class="orangeBtn" size="small" @click="change = 1" v-if="change === 2" style="margin-left:20px">
                    上一步
                </el-button>
                <el-button  type="info" size="small" style="margin-left:20px;line-height:10px" @click="falseOutletChanel">
                    取 消
                </el-button>
            </div>
            </el-drawer>
            <!-- 多个表格出库抽屉 -->
            <el-drawer
            title="出仓渠道"
            :visible.sync="visibleManyOutletChanel"
            :wrapperClosable='false'
            :before-close="handleManyOutletClose"
            size="50%">
            <div style="padding:0 26px">
                <div style="padding:20px 26px 26px 26px;margin-top:26px;background:#ffffff;margin-bottom:26px">
                    <el-row>
                        <el-row>
                            <el-row style="display:flex;align-items:center">
                                <el-col :span="3" style="display:flex;">
                                <div style="display:flex;flex-direction: column;align-items:center">
                                    <div class="circle">1</div>
                                    <div>选择渠道</div>
                                </div>
                                </el-col>
                                <el-col :span="2">
                                    <img src="@/assets/jiantou.png" alt="">
                                </el-col>
                                <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="change === 3">
                                    <div class="circle1">2</div>
                                    <div>选择代理</div>
                                </el-col>
                                <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="change === 4">
                                    <div class="circle">2</div>
                                    <div>选择代理</div>
                                </el-col>
                            </el-row>
                            <el-row class="line"></el-row>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">所属公司：</span>
                                <span>{{custodyCompany}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">客户名称：</span>
                                <span>{{CustomerName}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">运单号：</span>
                                <span>{{orderNo}}</span>
                            </el-col>
                            <el-col :span="12" class="font flex align-center">
                                <span style="width:18%;text-align:right">业务员：</span>
                                <span>{{salesman}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="line" style="margin-bottom:30px"></el-row>
                        <!-- 选择渠道 -->
                        <el-row class="Flexcenter" v-if="change === 1">
                            <el-col :span="2" class="channel">渠道名称</el-col>
                            <el-col :span="8" style="display:flex;justify-content:flex-start">
                                <el-input placeholder="请输入渠道名称/编码" size="small" v-model="channelCode"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="orangeBtn" style="margin-left:20px">查询</el-button>
                            </el-col>
                        </el-row>
                        <!-- 选择代理 -->
                        <el-row class="Flexcenter" v-if="change === 2">
                            <el-col :span="2" class="channel">代理名称</el-col>
                            <el-col :span="8" style="display:flex;justify-content:flex-start">
                                <el-input placeholder="请输入渠道名称/编码" size="small" v-model="agentName"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="orangeBtn" style="margin-left:20px">查询</el-button>
                            </el-col>
                        </el-row>
                        <!-- 多选选择渠道表格 -->
                        <div class="CHANNEL" style="margin-top:26px" v-if="change === 3">
                            <el-table ref="multipleTable" :data="changeChannelData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}">
                                <el-table-column type="selection" key="1"></el-table-column>
                                <el-table-column prop="name" label="渠道名称" key="2" min-width="300"></el-table-column>
                                <el-table-column prop="code" label="渠道编码" key="3"></el-table-column>
                            </el-table>
                        </div>
                        <!-- 多选选择代理表格 -->
                        <div class="CHANNEL" style="margin-top:26px" v-if="change === 4">
                            <el-table ref="multipleTable" :data="changeAgentlData" border  tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{background: '#F5F5F6'}">
                                <el-table-column type="selection" key="1"></el-table-column>
                                <el-table-column prop="name" label="代理名称" key="2" min-width="300"></el-table-column>
                                <el-table-column prop="code" label="代理编码" key="3"></el-table-column>
                            </el-table>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="drawer_btn">
                <el-button class="orangeBtn" size="small" @click="change = 4" v-if="change === 3">
                    下一步
                </el-button>
                <el-button class="orangeBtn" size="small" icon="el-icon-circle-check" @click="dialogConfirmChannel = true"
                v-if="change === 4">
                    确 认
                </el-button>
                <el-button class="orangeBtn" size="small" @click="change = 3" v-if="change === 4" style="margin-left:20px">
                    上一步
                </el-button>
                <el-button  type="info" size="small" style="margin-left:20px;line-height:10px" @click="ManyOutletChanel">
                    取 消
                </el-button>
            </div>
            </el-drawer>
            <!-- 表格出库抽屉--确定弹框 -->
            <el-dialog
            :visible.sync="dialogConfirmChannel"
            top="10%"
            width="25%">
            <div slot="title" class="left">出库</div>
            <el-row class="line" style="margin-top:-20px"></el-row>
            <div class="flex align-center">
                <div>您确认对运单号AS202012120001的运单进行出仓操作
                <div>出仓渠道：{{channelCode}}</div>
                <div>出仓代理：{{agentName}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-row class="line" style="margin-top:-20px"></el-row>
                <el-button class="wuBtn" @click="dialogConfirmChannel = false">取 消</el-button>
                <el-button class="orangeBtn" @click="dialogConfirmChannel = false">确 定</el-button>
            </span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      prohibit: 'AS202012120001', // 无法出库订单id
      agentName: '', // 代理名称搜索input
      visibleManyOutletChanel: false, // 多个出仓渠道
      change: 1, // 控制显示选择渠道、选择代理
      add: false, // 批量入仓渠道修改抽屉--控制新增渠道按钮
      dialogChannelError: false, // 修改入仓渠道错误框
      visibleOutletChanel: false, // 出仓渠道
      dialogConfirmChannel: false, // 确认出仓渠道
      visibleModifyHistory: false, // 修改入仓渠道--修改历史
      channelCode: '', // 请输入渠道名称/编码
      visibleChanel: false, // 表格入仓渠道修改抽屉
      reason: '已经有10w的货款没接了啊', // 扣货原因
      operator: '李四-业务', // 扣货人
      date: '2020年10月11日 14:00', // 扣货日期
      ReleaseDate: '2020年10月11日 14:00', // 放货日期
      ReleaseOperator: '王武-业务', // 放货人
      custodyCompany: '安速深圳分公司', // 所属公司
      orderNo: 'AS202012120001', // 订单号
      salesman: '张三', // 业务员
      CustomerName: '深圳爱因美贸易科技有限公司', // 客户名称
      visibleholdCustody: false, // 表格扣货状态扣货抽屉
      dialogFile: false, // 批量扣货
      DetentionCargo: '', // 请输入批量扣货
      singleRelease: false, // 单个放货
      singleDetentionCargo: false, // 单个扣货
      Release: '', // 请输入单个放货
      dialogStop: false, // 无法出库弹窗
      singleDeliveryCoods: '', // 请输入单个扣货
      dialogRelease: false, // 批量放货
      deliveryCoods: '', // 请输入批量放货
      queryName: '', // 查询名称
      listQueryName: '', // 列表显示设置
      visibleQueryCondition: false, // 查询条件设置
      visibleList: false, // 列表显示设置
      configurationName: '', //  列表显示设置-请输入配置名称
      preservation: false, // 保存配置弹框
      FORM: 1, // 控制搜索条件显示
      batch: '', // 批量搜索
      checked: false, // 是否模糊搜索
      dialogPL: false, // 批量搜索
      fileError: false,
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
      // 修改入仓渠道表格
      chaanelData: [
        {
          channelName: '美森—UPS',
          channelCode: 'UPS300'
        },
        {
          channelName: '美森—UPS',
          channelCode: 'UPS300'
        },
        {
          channelName: '美森—UPS',
          channelCode: 'UPS300'
        },
        {
          channelName: '美森—UPS',
          channelCode: 'UPS300'
        }
      ],
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
      // 入仓渠道修改历史
      channelModifyData: [
        {
          modifyTime: '2020年12月12日 15:00',
          modifyBeforChannel: '美森—UPS',
          modifyAfterChannel: '英国海运',
          reviser: '张三'
        },
        {
          modifyTime: '2020年12月12日 15:00',
          modifyBeforChannel: '美森—UPS',
          modifyAfterChannel: '英国海运',
          reviser: '张三'
        },
        {
          modifyTime: '2020年12月12日 15:00',
          modifyBeforChannel: '美森—UPS',
          modifyAfterChannel: '英国海运',
          reviser: '张三'
        }
      ],
      // 选择渠道表格
      changeChannelData: [
        {
          name: '美森—UPS',
          code: 'MSUPS'
        },
        {
          name: '以星卡派送',
          code: 'XYKP'
        }
      ],
      // 选择代理表格
      changeAgentlData: [
        {
          name: '奥威捷国际',
          code: 'AWJGJ'
        },
        {
          name: '安信国际',
          code: 'AXGJ'
        }
      ],
      hide: 0,
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
    // 表格入仓渠道修改抽屉表格选择
    channelChange () {},

    // 表格入仓渠道修改抽屉表格选种颜色
    // rowClick (row) {
    //   this.getIndex = row.index
    //   this.$emit('rowClick', row)
    // },
    // tableRowClassName ({ row, rowIndex }) {
    //   // 把每行怼索引放进row
    //   row.index = rowIndex
    // },
    // selectedHighlight ({ row, rowIndex }) {
    //   if (this.getIndex === rowIndex) {
    //     return {
    //       background: '#FB4702'
    //     }
    //   }
    // },

    // 表格入仓渠道修改抽屉确认
    drawerChannelConfirm () {
      this.dialogChannelError = true
    },
    select (selection, row) {
      if (selection.length > 1) {
        let delrow = selection.shift()
        console.log(delrow)
        this.$refs.multipleTable.toggleRowSelection(delrow, false)
      }
    },
    selectAll (selection) {
      if (selection.length > 1) {
        selection.length = 1
      }
    },
    // 批量出仓
    batchWarehouse () {
      this.change = 3
      this.visibleManyOutletChanel = true
    },
    // 关闭单个出库渠道
    falseOutletChanel () {
      this.visibleOutletChanel = false
      this.change = 1
    },
    handleManyOutletClose () {
      this.ManyOutletChanel()
    },
    // 关闭批量出库渠道
    ManyOutletChanel () {
      this.visibleManyOutletChanel = false
      this.change = 3
    },
    // 表格出库抽屉关闭
    handleOutletClose () {
      this.falseOutletChanel()
    },
    // 批量设置出库渠道
    batchSendChannel () {},
    // 表格入仓渠道修改抽屉
    handleClose () {
      this.visibleChanel = false
      this.add = false
    },
    // 批量修改出仓渠道
    batchModifyChannel () {
      this.add = true
      this.visibleChanel = true
    },
    // 修改历史
    modifyHistory () {
      this.visibleModifyHistory = true
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
    // 单个放货
    RELEASE () {
      this.singleRelease = true
    },
    // 表格入仓渠道修改
    modifyChanel () {
      this.visibleChanel = true
    },
    // 出库
    Delivery () {
      this.visibleOutletChanel = true
      this.dialogStop = true
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
    // 扣货状态扣货
    holdCustody () {
      this.visibleholdCustody = true
    },
    // 单个扣货
    detentionCargo () {
      this.singleDetentionCargo = true
    },
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
    // 选择页码
    handleCurrentChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.Flexchannel{
    display: flex;
    align-items: center;
}
.circle1{
  margin-bottom: 10px;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  text-align:center;
  line-height:34px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.35);
}
.circle{
  margin-bottom: 10px;
  width: 34px;
  height: 34px;
  background: #FB4702;
  border-radius: 50%;
  text-align:center;
  line-height:34px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
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
.expend {
  font-family: "iconfont" !important;
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
.configuration{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.number{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
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
