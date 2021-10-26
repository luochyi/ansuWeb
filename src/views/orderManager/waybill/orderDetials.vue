<template>
    <div>
        <!-- 扣货详情 （v-if="" ）-->
        <div v-if="waybillInfo.is_lock === 1">
            <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 6px;">
                <span class='text' style="color:#FF0000">扣货件详情</span>
            </el-row>
            <el-row class="titleReason">
                <span>扣货原因：{{waybillInfo.lock_reason}}</span>
            </el-row>
        </div>
        <!-- 不扣货详情 -->
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 0">
            <span class='text'>订单详情</span>
        </el-row>
        <el-row class="box">
            <el-row style="display:flex;align-items:center;margin-bottom:20px">
                <el-col :span="8">
                    <span class="item" style="width:90px">订单类型：</span>
                    <span class="item">{{waybillInfo.type === 1 ? 'FBA运单' :  '非FBA运单'}}</span>
                </el-col>
                <el-col :span="8">
                    <span class="item" style="width:120px">运单号：</span>
                    <span class="item">{{waybillInfo.waybill_no}}</span>
                </el-col>
            </el-row>
                <!-- 客户信息 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">客户信息</span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户名称：</span>
                            <span class="item2">{{waybillInfo.customer_name}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">客户编号：</span>
                            <span class="item2">{{waybillInfo.customer_code}}</span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 业务员 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">业务员</span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">所属业务员：</span>
                            <span class="item2">{{waybillInfo.salesman_name}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">业务员手机：</span>
                            <span class="item2">{{waybillInfo.salesman_phone}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">业务员职位：</span>
                            <span class="item2">{{waybillInfo.salesman_position_name}}</span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 收货信息 -->
                <el-row v-if="false">
                    <el-row>
                        <span class="headerTitle">收货信息</span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">收货司机：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">司机职位：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">司机手机：</span>
                            <span class="item2"></span>
                        </el-col>
                            <el-col :span="8" style="margin-top:8px">
                                <span class="item1">收货时间：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8" style="margin-top:8px">
                                <span class="item1">收货件数：</span>
                                <span class="item2"></span>
                            </el-col>
                    </el-row>
                </el-row>
                <el-row class="line" v-if="false"></el-row>
                <!-- 预报信息 -->
                <el-row v-if="false">
                    <el-row>
                        <span class="headerTitle">预报信息</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">下单时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">货好时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">邮寄方式：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">预报件数：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">预报渠道：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line" v-if="false"></el-row>
                <!-- 重量尺寸 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">重量尺寸</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">实重：</span>
                                <span class="item2">{{ waybillInfo.weight }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">方数：</span>
                                <span class="item2">{{ waybillInfo.volume }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">材积重：</span>
                                <span class="item2">{{ waybillInfo.volume_weight }}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">结算重：</span>
                                <span class="item2">{{ waybillInfo.bill_weight }}</span>
                                <el-button type="text" style="padding:0" @click="changeAsettlement = true">查看</el-button>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货重量：</span>
                                <span class="item2">{{ waybillInfo.agent_weight }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货方数：</span>
                                <span class="item2">{{ waybillInfo.agent_volume }}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">改货材积重：</span>
                                <span class="item2">{{ waybillInfo.agent_volume_weight }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货结算重：</span>
                                <span class="item2">{{ waybillInfo.agent_bill_weight }}</span>
                                <el-button type="text" style="padding:0" @click="changeAsettlement = true">查看</el-button>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 物流 -->
                <el-row v-if="waybillInfo.fba_address.country_name !== ''">
                    <el-row>
                        <span class="headerTitle">物流</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">目的国：</span>
                                <span class="item2">{{ waybillInfo.fba_address.country_name }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">目的地：</span>
                                <span class="item2">{{ waybillInfo.fba_address.fba_name }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">目的地邮编：</span>
                                <span class="item2">{{ waybillInfo.fba_address.zip_code }}</span>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-row>
                <el-row v-if="waybillInfo.address.country_name !== ''">
                    <el-row>
                        <span class="headerTitle">物流</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">目的国：</span>
                                <span class="item2">{{ waybillInfo.address.country_name }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">目的地：</span>
                                <span class="item2">{{ waybillInfo.address.address }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">目的地邮编：</span>
                                <span class="item2">{{ waybillInfo.address.zip_code }}</span>
                            </el-col>
                        </el-row>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">收件人：</span>
                                <span class="item2">{{ waybillInfo.address.name }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">收件人手机号：</span>
                                <span class="item2">{{ waybillInfo.address.phone }}</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">收件人邮箱：</span>
                                <span class="item2">{{ waybillInfo.address.email }}</span>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 申报信息 -->
                <el-row v-if="waybillInfo.invoice.has_invoice === 1">
                  <el-row>
                      <span class="headerTitle">申报信息</span>
                      <span class="item-info"></span>
                  </el-row>
                  <el-row style="margin-top:10px">
                    <el-col :span="8" style="margin-top:-20px">
                      <span class="item1">装箱清单：</span>
                      <span class="item2"></span>
                      <el-button class="button" type="text">查看装箱清单</el-button>
                    </el-col>
                    <el-col :span="8">
                      <span class="item1">货件数量：</span>
                      <span class="item2">{{ waybillInfo.box_count }}</span>
                    </el-col>
                    <el-col :span="8">
                      <span class="item1">申报价值：</span>
                      <span class="item2">{{ waybillInfo.invoice.declared_value + waybillInfo.invoice.currency_name }}</span>
                    </el-col>
                    <el-col :span="8" style="margin-top:-20px">
                        <span class="item1">单独清关：</span>
                        <span class="item2">{{ waybillInfo.invoice.is_separate_customs_clearance === 1 ? '单独清关' : '非单独清关' }}</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="item1">报关类型：</span>
                        <span class="item2">{{ waybillInfo.invoice.trade_type === 1 ? '一般贸易报关' : '非一般贸易报关' }}</span>
                    </el-col>
                    <el-col :span="8">
                      <span class="item1" style="margin-top:-20px">VAT税号：</span>
                      <span class="item2">{{ waybillInfo.invoice.vat }}</span>
                    </el-col>
                    <el-col :span="8" style="margin-top:-20px">
                        <span class="item1">保险：</span>
                        <span class="item2">{{ waybillInfo.invoice.have_safe === 1 ? '投保' : '不投保' }}</span>
                        <el-button class="button" type="text">购买保险</el-button>
                    </el-col>
                    <el-col :span="8">
                        <span class="item1" style="margin-top:-20px">递延：</span>
                        <span class="item2">{{ waybillInfo.invoice.is_deferred === 1 ? '递延' : '不递延' }}</span>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="line" v-if="waybillInfo.invoice.has_invoice === 1"></el-row>
                <!-- 备注 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">备注</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户备注：</span>
                            <span class="item2">{{ waybillInfo.remark }}</span>
                        </el-col>
                        <el-col :span="8" style="margin-top:-10px">
                            <span class="item1">内部备注：</span>
                            <span class="item2">{{ waybillInfo.interior_remark }}</span>
                            <el-button class="button" type="text">查看所有</el-button>
                        </el-col>
                    </el-row>
                </el-row>
        </el-row>
<!--        <el-drawer-->
<!--            :visible.sync="drawer"-->
<!--            size="50%">-->
<!--            <div slot="title" class="headTitle">页面显示设置</div>-->
<!--           <el-row class="" style="padding:26px;text-align:left;background:#fff;margin-top:26px">-->
<!--               <el-row style="display:flex;align-items:center">-->
<!--                   <el-col :span="11" style="display:flex;align-items:center">-->
<!--                        <span class="formTitle">字段集名称&nbsp;&nbsp;</span>-->
<!--                        <span>-->
<!--                            <el-input size="small" style="width:100%" v-model="fieldName" placeholder="请输入"></el-input>-->
<!--                        </span>-->
<!--                   </el-col>-->
<!--                   <el-col :span="8">-->
<!--                       <el-button size="small" class="orangeBtn">查 询</el-button>-->
<!--                   </el-col>-->
<!--               </el-row>-->
<!--               &lt;!&ndash; 抽屉表格 &ndash;&gt;-->
<!--          <div class="table" style="margin-top:16px">-->
<!--          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="tableChange"-->
<!--          :header-cell-style="{background: '#F5F5F6'}">-->
<!--          <el-table-column type="selection" width="55"></el-table-column>-->
<!--            <el-table-column prop="name" label="字段集名称" min-width="130"></el-table-column>-->
<!--            <el-table-column prop="display" label="是否显示" min-width="100">-->
<!--                <template>-->
<!--                    <div style="display:flex;align-items:center">-->
<!--                        <div style="width: 8px;height: 8px;background: #32AF05;border-radius: 50%;margin-right:8px"></div>-->
<!--                        <span>显示</span>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column type="expand" label="默认展开/收缩" :width="120">-->
<!--                <template v-slot="scope">-->
<!--                    <el-table :data="scope.row.view_detail" :row-class-name="tableRowClassName" :header-cell-style="{ background: '#EDF6FF' }">-->
<!--                        <el-table-column prop="goods_name" label="开票商品名称" min-width="120">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="tax_name" label="税收分类">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="unit" label="单位">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="unit_price" label="单价">-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="顺序" min-width="150">-->
<!--                <template>-->
<!--                    <span>{{(num+1)}}</span>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--          </div>-->
<!--           </el-row>-->
<!--        </el-drawer>-->
        <el-drawer
            :visible.sync="drawer.visible"
            size="50%">
            <div slot="title" class="headTitle">改货结算重</div>
            <div class="body">
                <el-row class="orderId">{{orderId}}</el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">客户名称：</span>
                    <span class="item2">{{name}}</span>
                </el-row>
                <el-row class="line"></el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">预报渠道：</span>
                    <span class="item2">{{forecastChannel}}</span>
                </el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">件数：</span>
                    <span class="item2">{{number}}</span>
                </el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">备注：</span>
                    <span class="item2">{{note}}</span>
                </el-row>
                <div class="table" style="margin-top:16px">
                    <el-table ref="multipleTable" :data="changeSettlementTable" border  tooltip-effect="dark" style="width: 100%" @selection-change="tableChange"
                    :header-cell-style="{background: '#F5F5F6'}">
                    <el-table-column prop="orderNum" label="货件编号" min-width="180" key="1"></el-table-column>
                    <el-table-column prop="long" label="长（cm）" key="2"></el-table-column>
                    <el-table-column prop="width" label="宽（cm）" key="3"></el-table-column>
                    <el-table-column prop="high" label="高（cm）" key="4"></el-table-column>
                    <el-table-column prop="squareNumber" label="方数（m³）" key="5"></el-table-column>
                    <el-table-column prop="realWeight" label="实重（kg）" key="6"></el-table-column>
                    <el-table-column prop="volumeWeight" label="材积重（kg）" min-width="120" key="7"></el-table-column>
                    </el-table>
                </div>
                <el-row style="font-size: 14px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #333333;margin-top:16px">
                    <span>合计结算重：<span>{{total}}</span>公斤</span>
                </el-row>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      waybillId: null,
      waybillInfo: {
        is_lock: 0,
        lock_reason: '0',
        type: 1,
        waybill_no: '',
        customer_name: '',
        customer_code: '',
        salesman_name: '',
        salesman_phone: '',
        salesman_position_name: '',
        invoice: {
          vat: '',
          trade_type: 0,
          is_deferred: 0,
          is_separate_customs_clearance: 0,
          amazon_reference_id: '',
          declared_value: '0',
          currency_name: '',
          items: [],
          material_cates: [],
          have_safe: 0,
          has_invoice: 0
        },
        remark: '',
        interior_remark: '',
        bill_weight: '',
        volume: '',
        volume_weight: '',
        weight: '',
        agent_bill_weight: '',
        agent_volume: '',
        agent_volume_weight: '',
        agent_weight: '',
        fba_address: {
          country_name: '',
          fba_name: '',
          zip_code: ''
        },
        address: {
          address: '',
          country_area_code: '',
          country_name: '',
          email: '',
          name: '',
          phone: '',
          zip_code: ''
        }
      },
      drawer: {
        visible: false
      }
    }
  },
  mounted () {
    this.waybillId = this.$route.params.id
    this.getData()
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.waybillInfo(this.waybillId).then(res => {
        this.waybillInfo = res.data
      })
    },
    // 关闭抽屉
    handleClose () {},
    // 抽屉表格
    tableChange () {}
  }
}
</script>
<style lang="scss" scoped>
.titleReason{
    font-size: 14px;
    background: #fff;
    margin-bottom: 26px;
    text-align: left;
    padding: 20px 0 26px 42px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.body{
    text-align:left;
    background: #fff;
    margin-top: 26px;
    padding: 20px 30px;
}
.orderId{
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FB4702;
}
.search{
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #000000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.line{
    height: 1px;
    background: #E9E9E9;
    margin: 14px 0 20px 0;
}
.formTitle{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
/deep/ .el-drawer{
  padding-top: 0px;
  background: #E8EBF2;
    .el-drawer__header{
      padding: 30px 26px;
      text-align: left;
      background: #FFFFFF;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;color: #333333;
      margin-bottom: 6px;
}
.el-drawer__rtl{
    padding:0;
    margin:0;
}
.el-drawer__body{
      margin-top: -6px;
      padding: 0px 26px;
      overflow: scroll;
    }
}
.button{
    margin-left: 14px;
}
.item1{
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.item2{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.item-info{
    margin-left:26px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.headerTitle{
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
}
.box{
    background: #fff;
    padding: 14px 44px;
    text-align: left;
}
.item{
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FB4E0C;
}
</style>
