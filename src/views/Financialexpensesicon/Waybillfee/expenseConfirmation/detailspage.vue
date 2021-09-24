<template>
  <div>
  <div class="left" >
      <div class="lefta">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>目的国</span>
    </el-row>
      </div>
        <div class="first">
       <span class='text'>业务员：张三</span><br>
        <el-button type="text" @click="Deletedestination= true"> 删除 </el-button>
       </div>
     </div>
  <div class="right">
      <div class="one">
      <el-button @click="Approvaldetails= true" class='whiteBtn' style="margin:15px; float: left; ">审批详情 </el-button>
      </div>
      <br>
      <div class="two">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>运单信息</span>
     </el-row>
      <el-descriptions class="margin-top" title="AS202012120001"  :column="4" :size="size">
    <el-descriptions-item label="客户名称">深圳沙马家具贸易有限公司</el-descriptions-item>
      </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
<el-descriptions-item label="客户编码">沙马家具SMJJFBAONTB</el-descriptions-item>
    <el-descriptions-item label="订单类型">FBA订单</el-descriptions-item>
    <el-descriptions-item label="目的仓">ONTB</el-descriptions-item>
  </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="目的国">美国</el-descriptions-item>
    <el-descriptions-item label="目的国邮编">19999</el-descriptions-item>
    <el-descriptions-item label="申报价值">1000美元</el-descriptions-item>
    <el-descriptions-item label="业务员">张三</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
    <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
    <el-descriptions-item label="是否有保险">有保险</el-descriptions-item>
    <el-descriptions-item label="品名">玩具</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="预报渠道">以星特快UPS派送</el-descriptions-item>
    <el-descriptions-item label="入仓渠道">以星特快UPS派送</el-descriptions-item>
    <el-descriptions-item label="货物数量">12件</el-descriptions-item>
    <el-descriptions-item label="货物">带电</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="方数">30立方</el-descriptions-item>
    <el-descriptions-item label="实重">100公斤</el-descriptions-item>
    <el-descriptions-item label="材积重">90公斤</el-descriptions-item>
    <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
  </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="备注">走以星</el-descriptions-item></el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="内部备注">走以星报美森</el-descriptions-item>
</el-descriptions>
    </div>
    <br>
      <div class="three">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>发货产品</span>
     </el-row>
      <el-descriptions class="margin-top" title="保温杯2020款"  :column="4" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
  </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊ASIN">2345353453553453453</el-descriptions-item></el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
<el-divider></el-divider>
      <el-descriptions class="margin-top" title="保温杯2019款"  :column="4" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
  </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊ASIN">2345353453553453453</el-descriptions-item></el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
    </div>
    <br>
      <div class="four">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>基础运价确认</span>
     </el-row>
     <div class="infoBox">
         <el-descriptions class="margin-top" column="2" :size="size">
         <el-descriptions-item label="运费单价">18/公斤</el-descriptions-item>
</el-descriptions>
        <el-row class="info">
          <el-col :span="10" class="flex align-center">
              <div class="name">单价调整：</div>
            <el-col :span="10" >
               <el-input placeholder="请输入" v-model="input1" style="width:195px">
                    <template slot="prepend">
                        <el-select v-model="value1" style="width:80px">
                            <el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </template>
                    <i slot="suffix" class="el-input__icon">元</i>
                </el-input>
            </el-col>
           </el-col>
           <el-button class="orangeBtn">确认</el-button>
        </el-row>
      </div>
    </div>
    <br>
      <div class="five">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>附加费用明细</span>
     </el-row>
         <el-row style="margin: 20px; float: left;">
          <el-button class="orangeBtn">添加附加费</el-button>
        </el-row>
    </div>
    <br>
      <div class="six">
           <span class='text' >报价合计：¥0.00</span>
          <el-row style="margin: 20px; float: right;">
          <el-button class="orangeBtn" icon="el-icon-circle-check">确认报价</el-button>
          <el-button class="wthBtn">取消</el-button>
        </el-row>
    </div>
  </div>
   <!--审批详情 -->
   <el-dialog title="审批详情" :visible.sync="Approvaldetails" width="30%">
      <el-steps :active="active" finish-status="success">
  <el-step title="确定报价"></el-step>
  <el-step title="财务审核"></el-step>
  <el-step title="总经理审核"></el-step>
</el-steps>
               <span slot="footer" class="Approvaldetails-footer">
                 <el-button type="primary" @click="Approvaldetails = false" class='orangeBtn'>关闭</el-button>
               </span>
            </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0, // 步骤条
      value1: 1,
      options1: [
        {
          value: 1,
          label: '增加'
        },
        {
          value: 2,
          label: '减少'
        },
        {
          value: 3,
          label: '乘以'
        }
      ],
      size: '',
      Deletedestination: false, // 删除目的国
      activeName: '1', // 标签绑定
      Approvaldetails: false // 审批详情
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
    },
    next () {
      if (this.active++ > 2) this.active = 0
    }
  }

}

</script>
<style lang="scss" scoped>
.title{
 height: 56px;
 font-size: 16px;
}
.left[data-v-2849173c][data-v-2849173c]{
  float: left;
  width: 212px;
  height: 1337px;
  background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
text-align:left;
}
.first{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}
.right{
float: left;
width: 1028px;
height: 1337px;
background: #E8EBF2;
border-radius: 4px;
border: 1px solid #E8E8E8;
margin: auto 20px;
}
.one{
    background: #FFFFFF ;
    width: 988px;
    height:63px ;
}
.two{
    height:367px ;
    background: #FFFFFF ;
    width: 988px;
}
.el-descriptions{
    margin: auto  30px;
}
.title .text {
    width: 100px;
}
.three{
    height:520px ;
    background: #FFFFFF ;
    width: 988px;
}
.left[data-v-2849173c] {
    float: left;
    width: 212px;
    height: 30px;
    background: #FFFFFF;
    border-radius: 4px;
    text-align: left;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 10px;
    .name{
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0;
}
.four{
    height:144px ;
    background: #FFFFFF ;
    width: 988px;
}
.five{
    height:136px ;
    background: #FFFFFF ;
    width: 988px;
}
.six{
    height:63px ;
    background: #FFFFFF ;
    width: 1028px;
}
/deep/ .el-dialog{
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

}
/deep/ .el-dialog{
  text-align: left;
}
//biankuang
/deep/ .el-dialog__body {
    padding: 10px 15px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
</style>
