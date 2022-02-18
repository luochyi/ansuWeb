<template>
<div id='boxx'>
  <div class="box">
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>拜访记录详情</span>
    </el-row>
    <div>
    <div class="en" >
         <el-descriptions title="深圳大成亚马逊科技有限公司">
         <el-descriptions-item label="拜访时间">2021年12月12日</el-descriptions-item>
         <el-descriptions-item class='tele' label="拜访业务员">张三</el-descriptions-item>
         <br />
         </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="随行人员">李四、王五</el-descriptions-item>
</el-descriptions>
    </div>
    <div >
      <el-descriptions direction="vertical">
         <el-descriptions-item label="拜访记录">和李总喝了个茶、吃了个饭</el-descriptions-item>
         </el-descriptions>
    </div>
    <el-divider></el-divider>
        <div >
      <el-descriptions direction="vertical">
         <el-descriptions-item label="拜访总结">李总很认可我们的产品，但是产品的价格太高了</el-descriptions-item>
         </el-descriptions>
    </div>
    <div class="left">
          <span slot="footer" class="left" style="margin:30px">
             <el-button @click="modify" class='orangeBtn long2'>修改</el-button>
             <el-button @click="aildds" class='wuBtn long2' >返回</el-button>
          </span>
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      methods: {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog{
  text-align: left;
}
.title{
width: 120px;
font-size: 16px;
font-family: PingFangSC-Medium, PingFang SC;
color: #333333;;
margin: 20px;
}
.el-dialog{
  display: block;
  width: 1128px;
  height: 1px;
  margin:-1px 0 ;
  background-color: #f3f3f3;
}
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.tele{
  width:728px ;
}
.en{
  width: 100%;
  height: 180px;
  border: 1px solid #E8E8E8;
}
.el-descriptions__title{
width: 234px;
height: 25px;
font-size: 18px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #FB4702;
line-height: 25px;
margin: 19px 32px ;
}
.el-descriptions__table{
margin: 19px 32px ;
}
</style>
