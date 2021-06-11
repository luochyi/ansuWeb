<template>
    <div>
       <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 0px;font-size: 16px;
       font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #333333;">
         <span class='text'>新建代理</span>
       </el-row>
       <el-row class="box" style="padding:17px 44px;background:#fff;text-align:left;">
           <span class="headTitle">信息代理</span>
           <el-row>
               <!-- 选择代理 -->
               <el-col :span="8">
                   <el-row style="display:flex;align-items:center;margin-top:20px;margin-bottom:16px">
                       <el-col :span="4" class="secondaryTitle">选择代理</el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="16" class="changebox">
                         <el-input placeholder="请输入" v-model="agent" size="small" style="">
                         </el-input>
                         <img src="@/assets/search.png" alt="" style="width: 13px;height: 13px;opacity: 0.65;margin-right:10px">
                       </el-col>
                   </el-row>
               </el-col>
               <!-- 代理编码 -->
               <el-col :span="8">
                   <el-row style="display:flex;align-items:center;margin-top:20px;margin-bottom:16px">
                       <el-col :span="4" class="secondaryTitle">代理编码</el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="16" class="changebox">
                         <el-input placeholder="请输入" v-model="code" size="small" style=""></el-input>
                         <img src="@/assets/search.png" alt="" style="width: 13px;height: 13px;opacity: 0.65;margin-right:10px">
                       </el-col>
                   </el-row>
               </el-col>
               <!-- 发票模板 -->
               <el-col :span="8">
                   <el-row style="display:flex;align-items:center;margin-top:20px;margin-bottom:16px">
                       <el-col :span="4" class="secondaryTitle">发票模板</el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="16" class="changebox">
                         <el-select placeholder="请选择" v-model="invoice" size="small" style="width:100%">
                             <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                             </el-option>
                         </el-select>
                       </el-col>
                   </el-row>
               </el-col>
           </el-row>
            <el-row style="height: 1px;background:#E9E9E9;margin-top:26px"></el-row>
            <el-row class="cannelBox">
                    <el-row>
                        <span class="cannelTitle">渠道快递：UPS</span>
                    </el-row>
                    <el-row style="margin-top:12px">
                        <!-- 是否选择其他快递 -->
                        <el-col :span="8">
                            <el-row style="margin-bottom:16px">
                            <el-col class="secondaryTitle" :span="8">是否使用其他快递</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16" class="changebox">
                                    <el-select placeholder="请选择" v-model="ortherExpress" size="small" style="width:100%">
                                        <el-option
                                        v-for="item in changeExpressList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                        <!-- 请选择快递 -->
                        <el-col :span="8" v-if="ortherExpress === 1">
                            <el-row style="margin-bottom:16px">
                            <el-col class="secondaryTitle" :span="8">请选择快递</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16" class="changebox">
                                    <el-select placeholder="请选择" v-model="express" size="small" style="width:100%">
                                        <el-option v-for="item in expressList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
            <el-row style="height: 1px;background:#E9E9E9;margin-top:26px"></el-row>
            <el-row style="margin-top:26px">
                <el-col :span="16">
                    <el-row style="margin-bottom:16px">
                        <el-col :span="10" class="secondaryTitle">
                            <span>该渠道不接受的货物</span>
                        </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="20">
                        <el-input type="textarea"  v-model="notAccepted" clearable style="height200px" :rows="10"
                        maxlength="500" show-word-limit></el-input>
                    </el-col>
                   </el-row>
                   <el-row style="margin-top:10px;font-size: 12px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
                   color: #FF0003;">
                       注：品名用,(英文逗号)分割
                   </el-row>
                   <el-row style="margin-top:200px">
                       <el-col :span="5">
                           <el-button class='orangeBtn long1' style="width:140px;font-size: 14px;font-family: PingFangSC-Regular, PingFang
                            SC;font-weight: 400;" size="small">确 认</el-button>
                       </el-col>
                       <el-col :span="5">
                           <el-button class='whiteBtn' style="width:140px" size="small">取 消</el-button>
                       </el-col>
                   </el-row>
                </el-col>
            </el-row>
            </el-row>
       </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      notAccepted: '', // 不接受的货物
      ortherExpress: '', // 是否选择其他快递
      express: '', // 其他快递
      code: '', // 选择编码
      agent: '', // 选择代理
      invoice: '', // 发票模版
      options: [{
        value: 1,
        label: '模版1'
      }],
      changeExpressList: [{
        value: 1,
        label: '使用'
      },
      {
        value: 2,
        label: '不使用'
      }],
      expressList: []
    }
  }
}
</script>
<style lang="scss" scoped>
.cannelBox{
    margin-top:24px;
}
.cannelTitle{
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FE822F;
}
/deep/ .changebox{
    display: flex;
    align-items: center;
    height: 34px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    .el-input__inner{
        border:none
    }
}
.secondaryTitle{
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
}
// .box{
//     display: flex;
//     justify-content: flex-start;
//     flex-direction: column;
//     align-items: flex-start;
// }
.headTitle{
    margin-bottom: 24px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
}
</style>
