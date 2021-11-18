<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
            <span class='text'>新建渠道</span>
        </el-row>
        <el-row style="background:#fff;text-align:left;padding:16px 43px">
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                渠道信息
            </el-row>
            <el-row :gutter="15">
              <el-form ref="elForm" :model="form" :rules="rules" size="small" label-width="93px" label-position="top">
                <el-col :span="8">
                  <el-form-item label="渠道编号" prop="code">
                    <el-input v-model="form.code" placeholder="请输入渠道编号" clearable :style="{width: '60%'}"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入渠道名称" clearable :style="{width: '60%'}"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道英文名" prop="enName">
                    <el-input v-model="form.enName" placeholder="请输入渠道英文名" clearable :style="{width: '60%'}">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道分类" prop="cate">
                    <el-select v-model="form.cate" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in cateOption"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="派送类型" prop="type">
                    <el-select v-model="form.type" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in typeOption"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道评分" prop="score">
                    <el-input v-model="form.score" placeholder="请输入渠道评分" type="number" clearable :style="{width: '60%'}">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="币种" prop="currencyId">
                    <el-select v-model="form.currencyId" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in currencyOption"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                    <el-form-item label="接收货物" prop="materialCates">
                        <el-select v-model="form.materialCates" multiple placeholder="请选择">
                            <el-option
                                v-for="item in materialCatesOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item>
                      <template>
                        <el-divider></el-divider>
                      </template>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <div style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
                    margin-top:16px">
                        计算规则
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="材积除" prop="weightRule.volumeDivide">
                      <el-select v-model="form.weightRule.volumeDivide" placeholder="请选择材积除" clearable
                        :style="{width: '60%'}">
                        <el-option
                                v-for="item in volumeDivideOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算重" prop="weightRule.settlementWeight">
                      <el-select v-model="form.weightRule.settlementWeight" placeholder="请选择结算重" clearable
                        :style="{width: '60%'}">
                        <el-option
                                v-for="item in settlementWeightOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="比较重" prop="weightRule.comparisonWeight">
                      <el-input v-model="form.weightRule.comparisonWeight" placeholder="请输入比较重" clearable
                        :style="{width: '60%'}">
                        <template slot="append">KG</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="大货起始重" prop="weightRule.bigStartingWeight">
                      <el-input v-model="form.weightRule.bigStartingWeight" placeholder="请输入大货起始重" clearable
                        :style="{width: '60%'}">
                        <template slot="append">KG</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="多件重量计算方式" prop="weightRule.multiPieceWeight">
                      <el-select v-model="form.weightRule.multiPieceWeight" placeholder="请选择多件重量计算方式" clearable
                        :style="{width: '60%'}">
                        <el-option
                                v-for="item in multiPieceWeightOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算重进位规则" prop="weightRule.carryRule">
                      <el-select v-model="form.weightRule.carryRule" placeholder="请选择结算重进位规则" clearable
                        :style="{width: '60%'}">
                        <el-option
                                v-for="item in carryRuleOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="方数" prop="weightRule.realWeightCube">
                      <el-select v-model="form.weightRule.realWeightCube" placeholder="请选择方数" clearable
                        :style="{width: '60%'}">
                        <el-option
                                v-for="item in realWeightCubeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <div style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
                    margin-top:16px">
                        其他
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="是否含燃料费" prop="hasFuel">
                      <el-select v-model="form.hasFuel" placeholder="请选择是否含燃料费" clearable :style="{width: '60%'}">
                        <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="是否含税" prop="hasTax">
                      <el-select v-model="form.hasTax" placeholder="请选择是否含税" clearable :style="{width: '60%'}">
                        <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="是否含清关费" prop="hasClearanceFee">
                      <el-select v-model="form.hasClearanceFee" placeholder="请选择是否含清关费" clearable
                        :style="{width: '60%'}">
                        <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-row :gutter="15">
                      <el-col>运输时间：</el-col>
                      <el-col :span="4">
                        <el-form-item label="" prop="minDuration">
                          <el-input v-model="form.minDuration" placeholder="请输入" clearable :style="{width: '100%'}">
                            <template slot="append">天</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1">&nbsp;——</el-col>
                      <el-col :span="4">
                        <el-form-item label="" prop="maxDuration">
                          <el-input v-model="form.maxDuration" placeholder="请输入" clearable :style="{width: '100%'}">
                            <template slot="append">天</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="" prop="durationType">
                          <el-select v-model="form.durationType" placeholder="请选择" clearable
                            :style="{width: '60%'}">
                            <el-option
                                v-for="item in durationTypeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="" prop="durationCate">
                          <el-select v-model="form.durationCate" placeholder="请选择" clearable
                            :style="{width: '60%'}">
                            <el-option
                                v-for="item in durationCateOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
              </el-form>
            </el-row>

<!--
  <template>
  <div>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="form" :rules="rules" size="small" label-width="93px"
        label-position="top">
        <el-col :span="6">
          <el-form-item label="材积除" prop="weightRule.volumeDivide">
            <el-select v-model="form.weightRule.volumeDivide" placeholder="请选择材积除" clearable
              :style="{width: '60%'}">
              <el-option v-for="(item, index) in weightRule.volumeDivideOptions" :key="index"
                :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算重" prop="weightRule.settlementWeight">
            <el-select v-model="form.weightRule.settlementWeight" placeholder="请选择结算重" clearable
              :style="{width: '60%'}">
              <el-option v-for="(item, index) in weightRule.settlementWeightOptions" :key="index"
                :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="比较重" prop="weightRule.comparisonWeight">
            <el-input v-model="form.weightRule.comparisonWeight" placeholder="请输入比较重" clearable
              :style="{width: '60%'}">
              <template slot="append">KG</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="大货起始重" prop="weightRule.bigStartingWeight">
            <el-input v-model="form.weightRule.bigStartingWeight" placeholder="请输入大货起始重" clearable
              :style="{width: '60%'}">
              <template slot="append">KG</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="多件重量计算方式" prop="weightRule.multiPieceWeight">
            <el-select v-model="form.weightRule.multiPieceWeight" placeholder="请选择多件重量计算方式" clearable
              :style="{width: '60%'}">
              <el-option v-for="(item, index) in weightRule.multiPieceWeightOptions" :key="index"
                :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算重进位规则" prop="weightRule.carryRule">
            <el-select v-model="form.weightRule.carryRule" placeholder="请选择结算重进位规则" clearable
              :style="{width: '60%'}">
              <el-option v-for="(item, index) in weightRule.carryRuleOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="方数" prop="weightRule.realWeightCube">
            <el-select v-model="form.weightRule.realWeightCube" placeholder="请选择方数" clearable
              :style="{width: '60%'}">
              <el-option v-for="(item, index) in weightRule.realWeightCubeOptions" :key="index"
                :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="是否含燃料费" prop="hasFuel">
            <el-select v-model="form.hasFuel" placeholder="请选择是否含燃料费" clearable :style="{width: '60%'}">
              <el-option v-for="(item, index) in hasFuelOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="是否含税" prop="hasTax">
            <el-select v-model="form.hasTax" placeholder="请选择是否含税" clearable :style="{width: '60%'}">
              <el-option v-for="(item, index) in hasTaxOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="是否含清关费" prop="hasClearanceFee">
            <el-select v-model="form.hasClearanceFee" placeholder="请选择是否含清关费" clearable
              :style="{width: '60%'}">
              <el-option v-for="(item, index) in hasClearanceFeeOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-row gutter="15">
            <el-col :span="4">
              <el-form-item label="" prop="minDuration">
                <el-input v-model="form.minDuration" placeholder="请输入" clearable :style="{width: '60%'}">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="" prop="maxDuration">
                <el-input v-model="form.maxDuration" placeholder="请输入" clearable :style="{width: '60%'}">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="" prop="durationType">
                <el-select v-model="form.durationType" placeholder="请选择" clearable
                  :style="{width: '60%'}">
                  <el-option v-for="(item, index) in durationTypeOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="" prop="durationCate">
                <el-select v-model="form.durationCate" placeholder="请选择" clearable
                  :style="{width: '60%'}">
                  <el-option v-for="(item, index) in durationCateOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        weightRule.volumeDivide: undefined,
        weightRule.settlementWeight: undefined,
        weightRule.comparisonWeight: undefined,
        weightRule.bigStartingWeight: undefined,
        weightRule.multiPieceWeight: undefined,
        weightRule.carryRule: undefined,
        weightRule.realWeightCube: undefined,
        hasFuel: undefined,
        hasTax: undefined,
        hasClearanceFee: undefined,
        minDuration: undefined,
        maxDuration: undefined,
        durationType: undefined,
        durationCate: undefined,
      },
      rules: {
        weightRule.volumeDivide: [{
          required: true,
          message: '请选择材积除',
          trigger: 'change'
        }],
        weightRule.settlementWeight: [{
          required: true,
          message: '请选择结算重',
          trigger: 'change'
        }],
        weightRule.comparisonWeight: [{
          required: true,
          message: '请输入比较重',
          trigger: 'blur'
        }],
        weightRule.bigStartingWeight: [{
          required: true,
          message: '请输入大货起始重',
          trigger: 'blur'
        }],
        weightRule.multiPieceWeight: [{
          required: true,
          message: '请选择多件重量计算方式',
          trigger: 'change'
        }],
        weightRule.carryRule: [{
          required: true,
          message: '请选择结算重进位规则',
          trigger: 'change'
        }],
        weightRule.realWeightCube: [{
          required: true,
          message: '请选择方数',
          trigger: 'change'
        }],
        hasFuel: [{
          required: true,
          message: '请选择是否含燃料费',
          trigger: 'change'
        }],
        hasTax: [{
          required: true,
          message: '请选择是否含税',
          trigger: 'change'
        }],
        hasClearanceFee: [{
          required: true,
          message: '请选择是否含清关费',
          trigger: 'change'
        }],
        minDuration: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }],
        maxDuration: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }],
        durationType: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        durationCate: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
      },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>

 -->
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
               <el-input type="textarea" v-model="text" rows="5"></el-input>
                </el-col>
            </el-row>
            <!--  -->
            <el-row style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
             color: rgba(0, 0, 0, 0.65);margin-top:20px">
                注意事项
            </el-row>
            <el-row style="marginTop:16px">
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
                <el-col>
                   <!-- <el-input type="textarea" v-if="careful===1" v-model="carefulText" rows="5"></el-input> -->
                    <quill-editor class="appwrapper"
                      v-model="carefulText"
                      v-if="careful===1"
                      @change="onEditorChange($event)">
                    </quill-editor>
                </el-col>
            </el-row>
            <!--  -->
            <el-row style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
             color: rgba(0, 0, 0, 0.65);marginTop:20px">
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
                <el-col>
                   <!-- <el-input type="textarea" v-show="Require===1"  v-model="RequireText" rows="5"></el-input> -->
                   <quill-editor class="appwrapper"
                      v-model="RequireText"
                      v-if="Require===1"
                      @change="onEditorChange($event)">
                    </quill-editor>
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
                <el-col>
                   <!-- <el-input type="textarea" v-show="tip===1" v-model="tiptext" rows="5"></el-input> -->
                   <quill-editor class="appwrapper"
                      v-model="tiptext"
                      v-if="tip===1"
                      @change="onEditorChange($event)">
                    </quill-editor>
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
      tip: 2, // 是否有温馨提示
      RequireText: '', // 有无特殊要求
      Require: 2, // 特殊要求
      carefulText: '', // 注意事项
      text: '',
      tiptext: '',
      sendRule: '', // 寄送规则
      careful: 2, // 注意事项
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
        durationCate: null,
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
          }, {}, {}, {}
          // 简介类型 1=寄送规则 2=注意事项 3=特殊要求 4=温馨提示
          // {
          //   type: 2,
          //   content: ''
          // },
          // {
          //   type: 3,
          //   content: ''
          // },
          // {
          //   type: 4,
          //   content: ''
          // }
        ],
        materialCates: []
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入编号',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        enName: [
          {
            required: true,
            message: '请输入英文名',
            trigger: 'blur'
          }
        ],
        cate: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        score: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        materialCates: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        currencyId: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        'weightRule.volumeDivide': [{
          required: true,
          message: '请选择材积除',
          trigger: 'change'
        }],
        'weightRule.settlementWeight': [{
          required: true,
          message: '请选择结算重',
          trigger: 'change'
        }],
        'weightRule.comparisonWeight': [{
          required: true,
          message: '请输入比较重',
          trigger: 'blur'
        }],
        'weightRule.bigStartingWeight': [{
          required: true,
          message: '请输入大货起始重',
          trigger: 'blur'
        }],
        'weightRule.multiPieceWeight': [{
          required: true,
          message: '请选择多件重量计算方式',
          trigger: 'change'
        }],
        'weightRule.carryRule': [{
          required: true,
          message: '请选择结算重进位规则',
          trigger: 'change'
        }],
        'weightRule.realWeightCube': [{
          required: true,
          message: '请选择方数',
          trigger: 'change'
        }],
        hasFuel: [{
          required: true,
          message: '请选择是否含燃料费',
          trigger: 'change'
        }],
        hasTax: [{
          required: true,
          message: '请选择是否含税',
          trigger: 'change'
        }],
        hasClearanceFee: [{
          required: true,
          message: '请选择是否含清关费',
          trigger: 'change'
        }],
        minDuration: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }],
        maxDuration: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }],
        durationType: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        durationCate: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
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
      durationCateOption: [
        {
          value: 1,
          label: '签收'
        },
        {
          value: 2,
          label: '提取'
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
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        // TODO 提交表单
        let obj = [{ type: 1, content: this.text }]
        if (this.careful === 1) {
          obj.push({ type: 2, content: this.carefulText })
        }
        if (this.Require === 1) {
          obj.push({ type: 3, content: this.RequireText })
        }
        if (this.tip === 1) {
          obj.push({ type: 4, content: this.tiptext })
        }
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
            durationCate: this.form.durationCate,
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
            materialCates: this.form.materialCates,
            describes: obj
          }
        ).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({ name: 'channelSetting' })
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  mounted () {
    this.$api.setting.material.select().then(res => {
      this.materialCatesOptions = res.data
    })
    this.$api.setting.currency.select().then(res => {
      this.currencyOption = res.data
    })
  },
  watch: {
    careful: {
      handler (val) {
        if (val === 1) {
          this.form.describes[1] = {
            type: 2,
            content: ''
          }
        } else if (val === 2) {
          this.form.describes[1] = {}
        }
      }
    },
    Require: {
      handler (val) {
        if (val === 1) {
          this.form.describes[2] = {
            type: 3,
            content: ''
          }
        } else if (val === 2) {
          this.form.describes[2] = {}
        }
      }
    },
    tip: {
      handler (val) {
        if (val === 1) {
          this.form.describes[3] = {
            type: 4,
            content: ''
          }
        } else if (val === 2) {
          this.form.describes[3] = {}
        }
      }
    }
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
.appwrapper{
  height: 200px;
  margin-bottom: 50px;
}
</style>
