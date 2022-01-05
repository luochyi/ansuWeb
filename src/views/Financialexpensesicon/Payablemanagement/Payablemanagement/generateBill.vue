<template>
    <div>
        <div class="box">
           <div class="circleBox">
            <el-row style="display:flex;align-items:center">
                <el-col :span="3" style="display:flex;">
                <div style="display:flex;flex-direction: column;align-items:center">
                    <div class="circle">1</div>
                    <span>检查目的国</span>
                </div>
                </el-col>
                <el-col :span="1">
                <img src="@/assets/jiantou.png" alt="">
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step <=1">
                <div class="circle1">2</div>
                <span>检查渠道</span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step>1">
                <div class="circle">2</div>
                <span>检查渠道</span>
                </el-col>
                <el-col :span="1">
                <img src="@/assets/jiantou.png" alt="">
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step < 3">
                <div class="circle1">3</div>
                <span>检查结算重</span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step >= 3">
                <div class="circle">3</div>
                <span>检查结算重</span>
                </el-col>
                <el-col :span="1">
                <img src="@/assets/jiantou.png" alt="">
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step < 4">
                <div class="circle1">4</div>
                <span>检查费用</span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step >= 4">
                <div class="circle">4</div>
                <span>检查费用</span>
                </el-col>
                <el-col :span="1">
                <img src="@/assets/jiantou.png" alt="">
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step < 5">
                <div class="circle1">5</div>
                <span>检查利润</span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center;flex-direction: column;" v-if="step >= 5">
                <div class="circle">5</div>
                <span>检查利润</span>
                </el-col>
            </el-row>
            </div>
        </div>
        <div class="box" v-if="step===1">
            <el-table :data="ver_country" style="margin:auto">
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <img src="@/assets/ok.png" class="tips" alt="" v-if="scope.row.error===''">
                        <img src="@/assets/err.png" class="tips" alt="" v-else>
                    </template>
                </el-table-column>
                <el-table-column label="代理结算渠道">
                    <el-table-column label="代理单号" prop="agent_waybill_no"></el-table-column>
                    <el-table-column label="代理目的国" prop="agent_country"></el-table-column>
                </el-table-column>
                <el-table-column label="安速登记渠道">
                    <el-table-column label="运单号" prop="waybill_no"></el-table-column>
                    <el-table-column label="安速目的国" prop="country"> </el-table-column>
                </el-table-column>
                <el-table-column label="错误类型" prop="error"></el-table-column>
            </el-table>
        </div>
        <div class="box" v-if="step===2">
            <el-table :data="ver_channel">
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <img src="@/assets/ok.png" class="tips" alt="" v-if="scope.row.error===''">
                        <img src="@/assets/err.png" class="tips" alt="" v-else>
                    </template>
                </el-table-column>
                <el-table-column label="代理结算渠道">
                    <el-table-column label="代理单号" prop="agent_waybill_no"></el-table-column>
                    <el-table-column label="代理渠道名称" prop="agent_channel_name"></el-table-column>
                </el-table-column>
                <el-table-column label="安速登记渠道">
                    <el-table-column label="运单号" prop="waybill_no"></el-table-column>
                    <el-table-column label="渠道名称" prop="channel_name"> </el-table-column>
                </el-table-column>
                <el-table-column label="错误类型" prop="error"></el-table-column>
            </el-table>
        </div>
        <div class="box" v-if="step===3">
            <el-table :data="ver_bill_weight">
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <img src="@/assets/ok.png" class="tips" alt="" v-if="scope.row.error===''">
                        <img src="@/assets/err.png" class="tips" alt="" v-else>
                    </template>
                </el-table-column>
                <el-table-column label="代理结算渠道">
                    <el-table-column label="代理单号" prop="agent_waybill_no"></el-table-column>
                    <el-table-column label="代理结算重" prop="agent_bill_weight"></el-table-column>
                </el-table-column>
                <el-table-column label="安速登记渠道">
                    <el-table-column label="运单号" prop="waybill_no"></el-table-column>
                    <el-table-column label="结算重" prop="bill_weight"> </el-table-column>
                </el-table-column>
                <el-table-column label="错误类型" prop="error"></el-table-column>
            </el-table>
        </div>
        <div class="box" v-if="step===4">
            <el-table :data="ver_agent_amount">
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <img src="@/assets/ok.png" class="tips" alt="" v-if="scope.row.error===''">
                        <img src="@/assets/err.png" class="tips" alt="" v-else>
                    </template>
                </el-table-column>
                <el-table-column label="代理结算金额">
                    <el-table-column label="代理单号" prop="agent_waybill_no"></el-table-column>
                    <el-table-column label="应收运费" prop="agent_base_amount"></el-table-column>
                    <el-table-column label="应收附加费" prop="agent_surcharge_amount"></el-table-column>
                    <el-table-column label="应收其他费用" prop="agent_other_amount"></el-table-column>
                    <el-table-column label="应收金额" prop="agent_total_amount"></el-table-column>
                </el-table-column>
                <el-table-column label="安速登记金额">
                    <el-table-column label="运单号" prop="waybill_no"></el-table-column>
                    <el-table-column label="应付运费" prop="base_amount"></el-table-column>
                    <el-table-column label="应付附加费" prop="surcharge_amount"></el-table-column>
                    <el-table-column label="应付其他费用" prop="other_amount"></el-table-column>
                    <el-table-column label="应付金额" prop="total_amount"></el-table-column>
                </el-table-column>
                <el-table-column label="错误类型" prop="error"></el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="check(scope.row)" type="text" size="small">查看费用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="box" v-if="step===5">
            <el-table :data="ver_customer_amount">
                <!---->
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <img src="@/assets/ok.png" class="tips" alt="" v-if="scope.row.error===''">
                        <img src="@/assets/err.png" class="tips" alt="" v-else>
                    </template>
                </el-table-column>

                <el-table-column label="安速应收金额">
                    <el-table-column label="安速应收" prop="customer_total_amount"></el-table-column>
                    <el-table-column label="安速应收运费" prop="customer_base_amount"></el-table-column>
                    <el-table-column label="安速应收附加费" prop="customer_surcharge_amount"></el-table-column>
                    <el-table-column label="安速应收其他费用" prop="customer_other_amount"></el-table-column>
                </el-table-column>
                <el-table-column label="安速支付金额">
                    <el-table-column label="安速应付金额" prop="total_amount"></el-table-column>
                    <el-table-column label="安速应付运费" prop="base_amount"></el-table-column>
                    <el-table-column label="安速应付附加费" prop="surcharge_amount"></el-table-column>
                    <el-table-column label="安速应付其他费用" prop="other_amount"></el-table-column>
                </el-table-column>
                <el-table-column label="利润" prop="profit"></el-table-column>
                <el-table-column label="错误类型" prop="error"></el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="check(scope.row)" type="text" size="small">查看费用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <div style="margin-left:400px">
                <el-button class="orangeBtn" @click="next(1)" :disabled='step===5'>下一步</el-button>
                <el-button class="orangeBtn" @click="next(-1)" :disabled='step===1'>上一步</el-button>
                <el-button class="orangeBtn" @click="finish()" v-show='step===5'>确认对账</el-button>
                <el-button @click="back" class="whiteBtn">返 回</el-button>
            </div>
        </div>
        <commonDrawer :drawerVrisible="checkFeeShow" drawerSize='50%' drawerTitle="费用明细">
            <!-- step4 -->
        <div class="dra-content" v-if="step===4">
            <div style="font-size:20px;color:#FB4702;text-align:left;margin-left:20px;padding-top:10px">{{code}}</div>
            <div style="background:#FFDFDF;line-height:45px;height:45px;font-size:14px">代理结算数据</div>
            <el-table :data="agentCost">
                <el-table-column prop="agent_waybill_no" label="代理单号"></el-table-column>
                <el-table-column prop="name" label="费用类型"></el-table-column>
                <el-table-column prop="bill_weight" label="代理结算重"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
            </el-table>
            <div style="background:#E6FFDF;line-height:45px;height:45px;font-size:14px;margin-top:20px">安速登记数据</div>
            <el-table :data="costs">
                <el-table-column prop="waybill_no" label="运单号"></el-table-column>
                <el-table-column prop="name" label="费用类型"></el-table-column>
                <el-table-column prop="bill_weight" label="代理结算重"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
            </el-table>
        </div>
        <!-- step5 -->
        <div class="dra-content" v-else>
            <div style="font-size:20px;color:#FB4702;text-align:left;margin-left:20px;padding-top:10px">{{code}}</div>
            <div style="background:#FFDFDF;line-height:45px;height:45px;font-size:14px">安速应付金额</div>
            <el-table :data="costs">
                <el-table-column prop="agent_waybill_no" label="代理单号"></el-table-column>
                <el-table-column prop="name" label="费用类型"></el-table-column>
                <el-table-column prop="bill_weight" label="代理结算重"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
            </el-table>
            <div style="background:#E6FFDF;line-height:45px;height:45px;font-size:14px;margin-top:20px">安速应收金额</div>
            <el-table :data="customerCost">
                <el-table-column prop="waybill_no" label="运单号"></el-table-column>
                <el-table-column prop="name" label="费用类型"></el-table-column>
                <el-table-column prop="bill_weight" label="代理结算重"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
            </el-table>
        </div>
        <!-- 抽屉底部按钮 -->
        <div slot="footer">
            <button class="btn-gray" @click="checkFeeShow=false">
            <span>关闭</span>
            </button>
        </div>
        </commonDrawer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      checkFeeShow: false,
      formData: {
        agentId: undefined,
        path: undefined
      },
      step: 1,
      ver_country: [], // 目的国
      ver_channel: [], // 渠道
      ver_bill_weight: [], // 结算重
      ver_agent_amount: [], // 费用
      ver_customer_amount: [], // 利润
      costs: [],
      agentCost: [],
      customerCost: [],
      code: ''
    }
  },
  mounted () {
    if (this.$route.params.formData === undefined) {
      this.$message.error('请重新上传对账单')
      this.back()
    }
    this.formData.agentId = this.$route.params.formData.agentId
    this.formData.path = this.$route.params.formData.path

    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.payabble.agent.start(this.formData).then(res => {
        console.log(res)
        this.ver_country = res.data.ver_country
        this.ver_channel = res.data.ver_channel
        this.ver_bill_weight = res.data.ver_bill_weight
        this.ver_agent_amount = res.data.ver_agent_amount
        this.ver_customer_amount = res.data.ver_customer_amount
      })
    },
    finish () {
      this.$confirm('确认完成报价')
        .then(_ => {
          this.$api.finance.payabble.agent.finish(this.formData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.back()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(_ => {})
    },
    check (data) {
      console.log(data)
      if (this.step === 4) {
        this.agentCost = data.agent_costs
        this.costs = data.costs
        this.code = data.waybill_no
      } else {
        this.customerCost = data.customer_costs
        this.costs = data.costs
        this.code = data.waybill_no
      }
      this.checkFeeShow = true
    },
    back () {
      this.$router.go(-1)
    },
    next (num) {
      this.step += num
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  height: 63px;
  width: 100%;
  line-height: 63px;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.35);
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #e8e8e8;
  z-index: 999;
  left: 201px;
  // text-align: right;
}
.box{
    margin-bottom: 10px;
    background: #ffffff;
    text-align: left;
}
.title{
    line-height: 40px;
    margin-bottom: 10px;
}
.input-with-select{
    width: 300px;
}
.circleBox{
  margin: 20px 0 0 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom:1px solid #E8EBF2;
}
.circle1{
  margin-bottom: 10px;
  width: 31px;
  height: 31px;
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
.tips{
    width: 20px;
    height: 20px;
}
</style>
