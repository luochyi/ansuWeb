<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
            <span class='text'>渠道详情</span>
        </el-row>
        <el-row>
          <div class="cont">
            <el-descriptions title="渠道信息">
                <template slot="extra">
                  <el-button type="primary" @click="goBack" size="small">返回</el-button>
                </template>
                <el-descriptions-item  label="渠道编码">{{info.code}}</el-descriptions-item>
                <el-descriptions-item  label="渠道名称">{{info.name}}</el-descriptions-item>
                <el-descriptions-item  label="英文名">{{info.en_name}}</el-descriptions-item>
                <el-descriptions-item  label="渠道分类">{{info.cate===1?'海运':info.cate===2?'空运':info.cate===3?'快递':info.cate===4?'铁路':'专车'}}</el-descriptions-item>
                <el-descriptions-item  label="派送类型">{{info.type===1?'快递':'卡派'}}</el-descriptions-item>
                <el-descriptions-item  label="评分">{{info.score}}</el-descriptions-item>
                <el-descriptions-item  label="币种名称">{{info.currency_name}}</el-descriptions-item>
                <el-descriptions-item  label="材质">{{materialName.substring(0,materialName.length-1)}}</el-descriptions-item>
            </el-descriptions>
            <!-- 计算规则 -->
            <el-descriptions title="计算规则">
                <el-descriptions-item  label="材积除">{{rule.volume_divide===1?'材积除5000':rule.volume_divide===2?'材积除6000':rule.volume_divide===3?'材积除100w':'材积除100w方数'}}</el-descriptions-item>
                <el-descriptions-item  label="结算重">{{rule.settlement_weight===1?'取实重材积最大值':rule.settlement_weight===2?'取材积不计实重':'分泡50%'}}</el-descriptions-item>
                <el-descriptions-item  label="比较重">{{rule.comparison_weight}}</el-descriptions-item>
                <el-descriptions-item  label="大货起始重">{{rule.big_starting_weight}}</el-descriptions-item>
                <el-descriptions-item  label="多件计重方式">{{rule.multi_piece_weight===1?'先累加再比较':rule.multi_piece_weight===2?'先比较再累加':'先比较进位在累加'}}</el-descriptions-item>
                <el-descriptions-item  label="进位规则">{{rule.carry_rule===0?'不进位':rule.carry_rule===1?'大货进1小货进0.5':rule.carry_rule===2?'进1':rule.carry_rule===3?'不足1进1，超过1进0.1':rule.carry_rule===4?'进0.5':'进0.05'}}</el-descriptions-item>
                <el-descriptions-item  label="方数">{{rule.real_weight_cube===0?'不计算方数':rule.real_weight_cube===1?'方数363':'方数280'}}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="其他">
                <template slot="extra">
                    <el-button type="primary" @click="editOther" size="small">修改</el-button>
                </template>
                <el-descriptions-item  label="含燃料费">{{other.has_fuel===0?'不含燃料费':'含燃料费'}}</el-descriptions-item>
                <el-descriptions-item  label="含税">{{other.has_tax===0?'不含税':'含税'}}</el-descriptions-item>
                <el-descriptions-item  label="含清关费">{{other.has_clearance_fee===0?'不含清关费':'含清关费'}}</el-descriptions-item>
                <el-descriptions-item  label="运输时长">{{other.min_duration+'-'+other.max_duration}}{{other.duration_type===1?' 工作日':' 自然日'}}{{other.duration_cate===1?' 签收':' 提取'}}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="渠道简介" :column="1">
              <template slot="extra">
                  <el-button type="primary" @click="editDes" size="small">修改</el-button>
              </template>
              <el-descriptions-item  label="寄送规则">{{text}}</el-descriptions-item>
              <el-descriptions-item v-if="careful===1" label="注意事项"><div v-html="carefulText"></div></el-descriptions-item>
              <el-descriptions-item v-if="Require===1" label="特殊要求"><div v-html="RequireText"></div></el-descriptions-item>
              <el-descriptions-item v-if="tip===1" label="温馨提示"><div v-html="tiptext"></div></el-descriptions-item>
            </el-descriptions>
          </div>
        </el-row>
        <!-- -->
        <el-dialog title="修改渠道简介" :visible.sync="describeShow" :before-close="desClose">
          <div class="desDia">
            <el-row>
            <el-row>
                寄送规则
            </el-row>
            <el-row>
                <el-col :span="10">
                  <el-input type="textarea" v-model="text" rows="5"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top:30px">
                注意事项
            </el-row>
            <el-row>
                    <template>
                        <el-radio-group v-model="careful">
                            <el-radio :label="1">有注意事项</el-radio>
                            <el-radio :label="2">无注意事项</el-radio>
                        </el-radio-group>
                        </template>
            </el-row>
            <el-row style="">
                <el-col>
                    <quill-editor class="appwrapper"
                      v-model="carefulText"
                      v-if="careful===1"
                      @change="onEditorChange($event)">
                    </quill-editor>
                </el-col>
            </el-row>
            <el-row>
                特殊要求
            </el-row>
            <el-row>
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
                   <quill-editor class="appwrapper"
                      v-model="RequireText"
                      v-if="Require===1"
                      @change="onEditorChange($event)">
                    </quill-editor>
                </el-col>
            </el-row>
            <el-row>
                温馨提示
            </el-row>
            <el-row>
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
                   <quill-editor class="appwrapper"
                      v-model="tiptext"
                      v-if="tip===1"
                      @change="onEditorChange($event)">
                    </quill-editor>
                </el-col>
            </el-row>
        </el-row>
        </div>
        <div slot="footer">
            <el-button @click="desClose">取消</el-button>
            <el-button type="primary" @click="desSubmit">确定</el-button>
          </div>
    </el-dialog>
    <el-dialog :visible.sync="otherShow"  title="修改渠道其他信息"  width="30%">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData"  size="small" label-width="100px"
          label-position="top">
          <el-col :span="7">
            <el-form-item label="含燃料费" prop="hasFuel">
              <el-select v-model="formData.hasFuel" placeholder="请选择含燃料费" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in hasFuelOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="含税" prop="hasTax">
              <el-select v-model="formData.hasTax" placeholder="请选择含税" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in hasTaxOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="含清关费" prop="hasClearanceFee">
              <el-select v-model="formData.hasClearanceFee" placeholder="请选择含清关费" clearable
                :style="{width: '100%'}">
                <el-option v-for="(item, index) in hasClearanceFeeOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="最短时长" prop="minDuration">
              <el-input v-model="formData.minDuration" type="number" placeholder="请输入最短时长"  :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="最长时长" prop="maxDuration">
              <el-input v-model="formData.maxDuration" type="number" placeholder="请输入最长时长"  :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="时长单位" prop="durationType">
              <el-select v-model="formData.durationType" placeholder="请选择时长单位" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in durationTypeOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="时长类型" prop="durationCate">
              <el-select v-model="formData.durationCate" placeholder="请选择时长类型" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in durationCateOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="otherClose">取消</el-button>
        <el-button type="primary" @click="otherSubmit">确定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      otherShow: false,
      describeShow: false,
      id: null,
      info: { name: '' },
      rule: {},
      other: {},
      materialName: '',
      careful: 1,
      Require: 1,
      tip: 1,
      text: '',
      carefulText: '',
      RequireText: '',
      tiptext: '',
      formData: {
        hasFuel: undefined,
        hasTax: undefined,
        hasClearanceFee: undefined,
        minDuration: undefined,
        maxDuration: undefined,
        durationType: undefined,
        durationCate: undefined
      },
      hasFuelOptions: [{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }],
      hasTaxOptions: [{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }],
      hasClearanceFeeOptions: [{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }],
      durationTypeOptions: [{
        label: '工作日',
        value: 1
      }, {
        label: '自然日',
        value: 2
      }],
      durationCateOptions: [{
        label: '签收',
        value: 1
      }, {
        label: '提取',
        value: 2
      }]
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id === undefined || this.id === null) {
      this.goBack()
    }
    this.getData()
  },
  methods: {
    getData () {
      this.$api.agent.channelInfo({ channelId: this.id }).then(res => {
        this.info = res.data.info
        this.rule = res.data.rule
        this.other = res.data.other
        console.log(this.info)
        this.info.material_cates.forEach(element => {
          this.materialName += element.name + ','
        })
        console.log(res.data.describes)
        for (let i = 0; i < res.data.describes.length; i++) {
          switch (res.data.describes[i].type) {
            case 1:
              this.text = res.data.describes[i].content
              break
            case 2:
              this.careful = 1
              this.carefulText = res.data.describes[i].content
              break
            case 3:
              this.Require = 1
              this.RequireText = res.data.describes[i].content
              break
            case 4:
              this.tip = 1
              this.tiptext = res.data.describes[i].content
              break
            default:
              break
          }
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    // 修改其他
    editOther () {
      this.otherShow = true
      console.log(this.other)
      this.formData.hasFuel = this.other.has_fuel
      this.formData.hasTax = this.other.has_tax
      this.formData.hasClearanceFee = this.other.has_clearance_fee
      this.formData.minDuration = this.other.min_duration
      this.formData.maxDuration = this.other.max_duration
      this.formData.durationType = this.other.duration_type
      this.formData.durationCate = this.other.duration_cate
    },
    otherClose () {
      this.otherShow = false
    },
    // 修改其他提交
    otherSubmit () {
      this.$api.agent.channelEditOther({
        channelId: this.id,
        other: {
          hasFuel: this.formData.hasFuel,
          hasTax: this.formData.hasTax,
          hasClearanceFee: this.formData.hasClearanceFee,
          minDuration: Number(this.formData.minDuration),
          maxDuration: Number(this.formData.maxDuration),
          durationType: this.formData.durationType,
          durationCate: this.formData.durationCate
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.otherClose()
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    editDes () {
      this.describeShow = true
    },
    desClose (done) {
      this.describeShow = false
      this.getData()
    },
    // 提交修改简介
    desSubmit () {
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
      this.$api.agent.channelEditDescribe(
        {
          channelId: this.id,
          describes: obj
        }
      ).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.desClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onEditorChange () {}

  }
}
</script>

<style lang="scss" scoped>
.cont{
  background: #ffffff;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 20px;
}
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
.desDia{
  text-align: left;
  padding-left: 20px;
}
.appwrapper{
  height: 100px;
  padding-bottom: 100px;
}
</style>
