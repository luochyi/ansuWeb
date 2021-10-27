<template>
    <div>
        <!-- 扣货详情 （v-if="" ）-->
        <!-- <div v-if="waybillInfo.is_lock === 1">
            <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 6px;">
                <span class='text' style="color:#FF0000">扣货件详情</span>
            </el-row>
            <el-row class="titleReason">
                <span>扣货原因：{{waybillInfo.lock_reason}}</span>
            </el-row>
        </div> -->
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
                                <!-- <el-button type="text" style="padding:0" @click="changeAsettlement = true">查看</el-button> -->
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
                                <el-button type="text" style="padding:0" @click="setWeight">查看</el-button>
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
        <commonDrawer
             :drawerVrisible="drawer" :drawerTitle="drawerTitle" :drawerSize='drawerSize'
            size="50%">
            <div class="dra-content" style="textAlign:left;padding:10px">
                <el-row class="orderId">{{waybillInfo.waybill_no}}</el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">客户名称：</span>
                    <span class="item2">{{waybillInfo.customer_name}}</span>
                </el-row>
                <el-row><el-button @click="edit()" class="orangeBtn">批量修改</el-button></el-row>
                <el-row class="line"></el-row>
                <!-- <el-row style="margin-top:16px">
                    <span class="item1">预报渠道：</span>
                    <span class="item2">{{forecastChannel}}</span>
                </el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">件数：</span>
                    <span class="item2">{{number}}</span>
                </el-row> -->
                <div class="table" style="margin-top:16px">
                    <el-table ref="multipleTable" :data="weightList" border  tooltip-effect="dark" style="width: 100%" @selection-change="tableChange"
                    :header-cell-style="{background: '#F5F5F6'}">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="cargo_no" label="货件编号" min-width="180"></el-table-column>
                        <el-table-column prop="length" label="长（cm）"></el-table-column>
                        <el-table-column prop="width" label="宽（cm）"></el-table-column>
                        <el-table-column prop="height" label="高（cm）"></el-table-column>
                        <el-table-column prop="weight" label="重（kg）"></el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <button class="btn-orange" @click="submit()">
                <span> <i class="el-icon-circle-check"></i>提交</span>
                </button>
                <button class="btn-gray" @click="addClose">
                <span>取消</span>
                </button>
            </div>
        </commonDrawer>
            <el-dialog
            title="批量改货"
            :visible.sync="dialogVisible"
            width="26%"
            :before-close="handleClose">
            <span style="textAlign:left;marginLeft:20px">
                <el-row><el-checkbox>长</el-checkbox><el-input size="mini" v-model="changeWeight.length" class="ipt"><template slot="append">cm</template></el-input></el-row>
                <el-row><el-checkbox>宽</el-checkbox><el-input size="mini" v-model="changeWeight.width" class="ipt"><template slot="append">cm</template></el-input></el-row>
                <el-row><el-checkbox>高</el-checkbox><el-input size="mini" v-model="changeWeight.height" class="ipt"><template slot="append">cm</template></el-input></el-row>
                <el-row><el-checkbox>重</el-checkbox><el-input size="mini" v-model="changeWeight.weight" class="ipt"><template slot="append">kg</template></el-input></el-row>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button class="orangeBtn" type="primary" @click="batchChange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      weightList: [],
      waybillId: null,
      dialogVisible: false,
      changeWeight: {
        length: '',
        width: '',
        height: '',
        weight: ''
      },
      drawer: false,
      drawerTitle: '改重',
      drawerSize: '50%',
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
    addClose () {
      this.drawer = false
    },
    batchChange () {},
    tableChange (val) {
    },
    setWeight () {
      this.drawer = true
      this.$api.Ordermanagement.customerWeight({ waybillId: this.waybillId }).then(res => {
        console.log(res.data)
        this.weightList = res.data.cargoes
      })
    },
    edit () {
      this.dialogVisible = true
    },
    submit () {
      this.$api.Ordermanagement.customerWeightEdit({
        waybillId: this.waybillId,
        cargoSpecs: this.weightList
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.addClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
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
.ipt{
    width: 200px;
    margin-left: 10px;
    margin-top: 5px;
}
</style>
