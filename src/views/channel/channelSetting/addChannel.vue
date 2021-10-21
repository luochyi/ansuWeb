<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
            <span class='text'>新建渠道</span>
        </el-row>
        <el-row style="background:#fff;text-align:left;padding:16px 43px">
            <!-- <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);">
                渠道模版
            </el-row>
            <el-row style="margin-top:16px">
                <el-button size="small" class='whiteBtn' @click="dialogChannel = true" style="">参考其他渠道</el-button>
            </el-row> -->
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                渠道信息
            </el-row>
            <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道名称&nbsp;</span>
                    <span><el-input style="width:108%" v-model="form.name" size="small" placeholder="请输入"></el-input></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道编号&nbsp;</span>
                    <span><el-input style="width:108%" v-model="form.code" size="small" placeholder="请输入"></el-input></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道英文&nbsp;</span><span>
                    <el-input style="width:108%" v-model="form.enName" size="small" placeholder="请输入"></el-input></span>
                 </el-col>
            </el-row>
            <!--  -->
            <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道分类&nbsp;</span>
                    <span><el-select v-model="form.cate" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in cateOption"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">派送类型&nbsp;</span>
                    <span><el-select v-model="form.type" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in typeOption"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道评分&nbsp;</span><span>
                    <el-input v-model="form.score" style="width:108%" type="number" size="small" placeholder="请输入"></el-input></span>
                 </el-col>
            </el-row>
            <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">币种&nbsp;</span>
                    <span><el-select v-model="form.currencyId" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in currencyOption"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                            ></el-option>
                        </el-select></span>
                </el-col>
            </el-row>
             <el-row class="line"></el-row>
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                接收货物
                <el-col style="display:flex;align-items:center">
                    <span>
                        <el-select v-model="form.materialCates" multiple placeholder="请选择">
                            <el-option
                                v-for="item in materialCatesOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </span>
                </el-col>
            </el-row>

            <!--  -->
            <el-row class="line"></el-row>
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                计算规则
            </el-row>
             <el-row style="margin-top:16px">
                <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">材积除&nbsp;</span>
                    <span><el-select v-model="form.weightRule.volumeDivide" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in volumeDivideOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">结算重&nbsp;</span>
                    <span><el-select v-model="form.weightRule.settlementWeight" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in settlementWeightOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>

                <!-- comparisonWeight -->
                 <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">比较重&nbsp;</span>
                    <span><el-input v-model="form.weightRule.comparisonWeight" size="small" placeholder="请输入"> <template slot="append">KG</template></el-input></span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">大货起始重&nbsp;</span>
                    <span><el-input v-model="form.weightRule.bigStartingWeight" size="small" placeholder="请选择"> <template slot="append">KG</template></el-input></span>
                </el-col>
            </el-row>
             <el-row style="margin-top:16px">
                 <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">多件重量计算方式&nbsp;</span>
                    <span><el-select v-model="form.weightRule.multiPieceWeight" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in multiPieceWeightOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">结算重进位规则&nbsp;</span>
                    <span><el-select v-model="form.weightRule.carryRule" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in carryRuleOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="6" style="display:flex;align-items:center">
                    <span class="item">方数 &nbsp;</span>
                    <span><el-select v-model="form.weightRule.realWeightCube" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in realWeightCubeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
            </el-row>
            <!--  -->
            <el-row class="line"></el-row>
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                其他
            </el-row>
            <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">是否含燃料费&nbsp;</span>
                    <span><el-select v-model="form.hasFuel" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">是否含税&nbsp;</span>
                    <span><el-select v-model="form.hasTax" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">是否含税清关费&nbsp;</span>
                    <span><el-select v-model="form.hasClearanceFee" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></span>
                </el-col>
            </el-row>
            <el-row style="text-align:left;margin-top:28px;">
                <div style="display:flex;align-items:center">
                    <span class="item">运输时间&nbsp;
                        <span><el-input v-model="form.minDuration" style="width:20%" size="small" placeholder="最短时间"><template slot="append">天</template></el-input>  ——
                        <el-input style="width:20%" v-model="form.maxDuration"  type="number" size="small" placeholder="最长时间"><template slot="append">天</template></el-input>
                        <el-select v-model="form.durationType" type="number" size="small" style="margin-left:20px;width:16%" >
                          <el-option
                                v-for="item in durationTypeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        </span>
                    </span>
                </div>
            </el-row>
            <el-row class="line"></el-row>
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                渠道简介
            </el-row>
            <el-row style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
             color: rgba(0, 0, 0, 0.65);margin-top:20px">
                寄送规则
            </el-row>
            <el-row style="">
                <el-col :span="10">
               <el-input type="textarea" v-model="form.describes[0].content" rows="5"></el-input>
                </el-col>
            </el-row>
            <!--  -->
            <el-row style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
             color: rgba(0, 0, 0, 0.65);margin-top:20px">
                注意事项
            </el-row>
            <el-row style="margin-top: 16px;">
                <el-col :span="3" class="yes">是否有注意事项</el-col>
                <el-col :span="14">
                    <template>
                        <el-radio-group v-model="careful">
                            <el-radio :label="1">有注意事项</el-radio>
                            <el-radio :label="2">无注意事项</el-radio>
                        </el-radio-group>
                        </template>
                </el-col>
            </el-row>
            <el-row style="">
                <el-col :span="10">
                   <el-input type="textarea" v-show="careful===1" v-model="form.describes[1].content" rows="5"></el-input>
                </el-col>
            </el-row>
            <!--  -->
            <el-row style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
             color: rgba(0, 0, 0, 0.65);margin-top:20px">
                特殊要求
            </el-row>
            <el-row style="margin-top: 16px;">
                <el-col :span="3" class="yes">是否有特殊要求</el-col>
                <el-col :span="14">
                    <template>
                        <el-radio-group v-model="Require">
                            <el-radio :label="1">有特殊要求</el-radio>
                            <el-radio :label="2">无特殊要求</el-radio>
                        </el-radio-group>
                        </template>
                </el-col>
            </el-row>
            <el-row style="">
                <el-col :span="10">
                   <el-input type="textarea" v-show="Require===1"  v-model="form.describes[2].content" rows="5"></el-input>
                </el-col>
            </el-row>
            <!--  -->
            <el-row style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
             color: rgba(0, 0, 0, 0.65);margin-top:20px">
                温馨提示
            </el-row>
            <el-row style="margin-top: 16px;">
                <el-col :span="3" class="yes">是否温馨提示</el-col>
                <el-col :span="14">
                    <template>
                        <el-radio-group v-model="tip">
                            <el-radio :label="1">有温馨提示</el-radio>
                            <el-radio :label="2">无温馨提示</el-radio>
                        </el-radio-group>
                        </template>
                </el-col>
            </el-row>
            <el-row style="">
                <el-col :span="10">
                   <el-input type="textarea" v-show="tip===1" v-model="form.describes[3].content" rows="5"></el-input>
                </el-col>
            </el-row>
            <el-row class="line"></el-row>
            <el-row style="margin-bottom:">
                <el-button @click="back" size="small" style="width:80px;margin-top:-2px;width:100px;margin-right:20px" class='wuBtn long1'>
                    取 消
                </el-button>
                <el-button class='orangeBtn long1' @click="addSumbit" size="small" style="width:80px;margin-top:10px;width:100px">
                    确 定
                </el-button>
            </el-row>
            <!-- 选择其他渠道弹窗 -->
            <el-dialog
            title="提示"
            :visible.sync="dialogChannel"
            top="14%"
            width="30%">
            <el-row style="display:flex;align-items:center">
                <el-col :span="4" style="display:flex;align-items:center">
                    <span class="item" style="margin-left:14px">目的国&nbsp;</span>
                </el-col>
                <el-col :span="18">
                    <div class="item-box" style="dispaly:flex;align-items:center">
                        <el-input class="input" v-model="otherChannel" style="width:90%" size="small"
                        placeholder="请输入"></el-input>
                        <img src="@/assets/search.png" alt="" style="width: 13px;height: 13px;margin-right:0px">
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogChannel = false" plian size="small">取 消</el-button>
                <el-button type="primary"  class='orangeBtn' @click="dialogChannel = false" size="small">确 定</el-button>
            </span>
            </el-dialog>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      otherChannel: '', // 参考其他渠道输入框
      dialogChannel: false, // 选择其他渠道弹窗
      tip: 1, // 是否有温馨提示
      RequireText: '', // 有无特殊要求
      Require: 1, // 特殊要求
      carefulText: '', // 注意事项
      sendRule: '', // 寄送规则
      careful: 1, // 注意事项
      shortest: '', // 最短时间
      Longest: '', // 最长时间
      time: '', // 派送时间
      fuel: '', // 是否含燃料费
      tax: '', // 是否含税
      chearingFee: '', // 是否含清光费
      aimCountry: '', // 目的国
      channelScore: '', // 渠道评分
      goods: '', // 接受货物
      channelName: '', // 渠道名称
      channelCode: '', // 渠道编号
      channelEnglish: '', // 渠道英文
      channelClassify: '', // 渠道分类
      deliveryType: '', // 派送类型
      deliveryCompany: '', // 派送公司
      form: {
        name: null,
        enName: null,
        code: null,
        cate: null,
        type: null,
        score: null,
        currencyId: null,
        hasFuel: null,
        hasTax: null,
        hasClearanceFee: null,
        durationType: null,
        minDuration: null,
        maxDuration: null,
        weightRule: {
          volumeDivide: null,
          settlementWeight: null,
          comparisonWeight: null,
          bigStartingWeight: null,
          multiPieceWeight: null,
          carryRule: null,
          realWeightCube: null
        },
        describes: [
          {
            type: 1,
            content: ''
          },
          {
            type: 2,
            content: ''
          },
          {
            type: 3,
            content: ''
          },
          {
            type: 4,
            content: ''
          }
        ],
        materialCates: []
      },
      // 选项
      cateOption: [
        {
          value: 1,
          label: '海运'
        },
        {
          value: 2,
          label: '空运'
        },
        {
          value: 3,
          label: '快递'
        },
        {
          value: 4,
          label: '铁路'
        }, {
          value: 5,
          label: '专车'
        }
      ],
      typeOption: [
        {
          value: 1,
          label: '快递'
        },
        {
          value: 2,
          label: '卡派'
        }
      ],
      currencyOption: [],
      materialCatesOptions: [],
      option: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      durationTypeOption: [
        {
          value: 1,
          label: '工作日'
        },
        {
          value: 2,
          label: '自然日'
        }
      ],
      volumeDivideOption: [
        {
          value: 1,
          label: '材积除5000'
        },
        {
          value: 2,
          label: '材积除6000'
        },
        {
          value: 3,
          label: '材积除100w'
        },
        {
          value: 4,
          label: '材积除100w方数'
        }
      ],
      settlementWeightOption: [
        {
          value: 1,
          label: '取实重材积最大值'
        },
        {
          value: 2,
          label: '取材积不计实重'
        },
        {
          value: 3,
          label: '分泡50%'
        }
      ],
      multiPieceWeightOption: [
        {
          value: 1,
          label: '先累加再比较'
        },
        {
          value: 2,
          label: '先比较再累加'
        },
        {
          value: 3,
          label: '先比较进位在累加'
        }
      ],
      //   multiPieceWeightOption: [],
      carryRuleOption: [
        {
          value: 0,
          label: '不进位'
        },
        {
          value: 1,
          label: '大货进1小货进0.5'
        },
        {
          value: 2,
          label: '进1'
        },
        {
          value: 3,
          label: '不足1进1，超过1进0.1'
        },
        {
          value: 4,
          label: '进0.5'
        },
        {
          value: 5,
          label: '进0.05'
        }

      ],
      realWeightCubeOption: [
        {
          value: 0,
          label: '不计算方数'
        },
        {
          value: 1,
          label: '方数 363'
        },
        {
          value: 2,
          label: '方数 280'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    addSumbit () {
      this.$api.agent.channelAdd(
        {
          name: this.form.name,
          enName: this.form.enName,
          code: this.form.code,
          cate: this.form.cate,
          type: this.form.type,
          score: Number(this.form.score),
          currencyId: this.form.currencyId,
          hasFuel: this.form.hasFuel,
          hasTax: this.form.hasTax,
          hasClearanceFee: this.form.hasClearanceFee,
          durationType: this.form.durationType,
          minDuration: Number(this.form.minDuration),
          maxDuration: Number(this.form.maxDuration),
          weightRule: {
            volumeDivide: this.form.weightRule.volumeDivide,
            settlementWeight: this.form.weightRule.settlementWeight,
            comparisonWeight: Number(this.form.weightRule.comparisonWeight),
            bigStartingWeight: Number(this.form.weightRule.bigStartingWeight),
            multiPieceWeight: this.form.weightRule.multiPieceWeight,
            carryRule: this.form.weightRule.carryRule,
            realWeightCube: this.form.weightRule.realWeightCube
          },
          describes: this.form.describes,
          materialCates: this.form.materialCates
        }
      ).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$router.push({ name: 'channelSetting' })
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted () {
    this.$api.setting.material.select().then(res => {
      this.materialCatesOptions = res.data
    })
    this.$api.setting.currency.select().then(res => {
      this.currencyOption = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.yes{
    margin-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.line{
    background:#E9E9E9;
    height: 1px;
    margin:16px 0;
}
/deep/ .item-box .el-input__inner{
    border:0;
}
.item-box{
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    // width:36%
}
.item{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
</style>
