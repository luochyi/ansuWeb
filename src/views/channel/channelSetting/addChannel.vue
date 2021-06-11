<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
            <span class='text'>新建渠道</span>
        </el-row>
        <el-row style="background:#fff;text-align:left;padding:16px 43px">
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);">
                渠道模版
            </el-row>
            <el-row style="margin-top:16px">
                <el-button size="small" class='whiteBtn' @click="dialogChannel = true" style="">参考其他渠道</el-button>
            </el-row>
            <el-row style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: rgba(0, 0, 0, 0.85);
            margin-top:16px">
                渠道信息
            </el-row>
            <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道名称&nbsp;</span>
                    <span><el-input style="width:108%" v-model="channelName" size="small" placeholder="请输入"></el-input></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道编号&nbsp;</span>
                    <span><el-input style="width:108%" v-model="channelCode" size="small" placeholder="请输入"></el-input></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道英文&nbsp;</span><span>
                    <el-input style="width:108%" v-model="channelEngLish" size="small" placeholder="请输入"></el-input></span>
                 </el-col>
            </el-row>
            <!--  -->
            <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道分类&nbsp;</span>
                    <span><el-select v-model="channelClassify" size="small" placeholder="请选择"></el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">派送类型&nbsp;</span>
                    <span><el-select v-model="deliveryType" size="small" placeholder="请选择"></el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">派送公司&nbsp;</span><span>
                    <el-input v-model="deliveryCompany" style="width:108%" size="small" placeholder="请输入"></el-input></span>
                 </el-col>
            </el-row>
            <!--  -->
             <el-row style="margin-top:16px">
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">接受货物&nbsp;</span>
                    <span><el-select v-model="goods" size="small" placeholder="请选择"></el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">渠道评分&nbsp;</span>
                    <span><el-input v-model="channelScore" size="small" style="width:108%" placeholder="请选择"></el-input></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item" style="margin-left:14px">目的国&nbsp;</span>
                    <div class="item-box" style="dispaly:flex;align-items:center">
                        <el-input class="input" v-model="aimCountry" style="width:90%" size="small"
                    placeholder="请输入"></el-input>
                    <img src="@/assets/search.png" alt="" style="width: 13px;height: 13px;margin-right:0px">
                    </div>
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
                    <span><el-select v-model="fuel" size="small" placeholder="请选择"></el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">是否含税&nbsp;</span>
                    <span><el-select v-model="tax" size="small" placeholder="请选择"></el-select></span>
                </el-col>
                <el-col :span="8" style="display:flex;align-items:center">
                    <span class="item">是否含清光费&nbsp;</span>
                    <span><el-select v-model="chearingFee" size="small" placeholder="请选择"></el-select></span>
                </el-col>
            </el-row>
            <el-row style="text-align:left;margin-top:28px;">
                <div style="display:flex;align-items:center">
                    <span class="item">运输时间：最短时间&nbsp;
                        <span><el-input v-model="shortest" style="width:10%" size="small"></el-input> 天 —— 最长时间
                        <el-input style="width:10%" v-model="Longest" size="small"></el-input> 天
                        <el-select v-model="time" size="small" style="margin-left:20px;width:16%"></el-select>
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
               <el-input type="textarea" v-model="sendRule" rows="5"></el-input>
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
                   <el-input type="textarea" v-model="carefulText" rows="5"></el-input>
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
                   <el-input type="textarea" v-model="RequireText" rows="5"></el-input>
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
            <el-row class="line"></el-row>
            <el-row style="margin-bottom:">
                <el-button @click="back" size="small" style="width:80px;margin-top:-2px;width:100px;margin-right:20px" class='wuBtn long1'>
                    取 消
                </el-button>
                <el-button class='orangeBtn long1' size="small" style="width:80px;margin-top:10px;width:100px">
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
      deliveryCompany: '' // 派送公司
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
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
</style>
