<template>
    <div>
       <el-row class="box">
           <el-row>
               <!-- 运单号 -->
               <el-col :span="6" class="item">
                   <span class="item-box">运单号&nbsp;&nbsp;</span>
                   <el-input placeholder="请输入" class="input" v-model="from.wayBillNo" size="small"></el-input>
               </el-col>
               <!-- 客户名称 -->
               <el-col :span="6" class="item">
                   <span class="item-box">客户名称&nbsp;&nbsp;</span>
                   <el-input placeholder="请输入" class="input" v-model="from.name" size="small"></el-input>
               </el-col>
               <!-- 客户编码 -->
               <el-col :span="6" class="item">
                   <span class="item-box">客户编码&nbsp;&nbsp;</span>
                   <el-input placeholder="请输入" class="input" v-model="from.customerNo" size="small"></el-input>
               </el-col>
               <!-- 目的地 -->
               <el-col :span="6" class="item">
                   <span class="item-box">目的地&nbsp;&nbsp;</span>
                   <el-input placeholder="请输入" class="input" v-model="from.destination" size="small"></el-input>
               </el-col>
           </el-row>
       </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        WayBillNo: '',
        name: '',
        customerNo: '',
        destination: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.input{
    width: 70%;
}
.box{
    background: #fff;
    padding: 14px 32px;
    text-align: left;
}
.item{
    display: flex;
    align-items: center;
}
.item-box{
    text-align: right;
    width: 70px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
</style>
