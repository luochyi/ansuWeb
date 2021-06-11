<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 0">
            <span class='text'>订单详情</span>
        </el-row>
        <el-row class="box">
            <el-row style="display:flex;align-items:center">
                <el-col :span="6">
                    <span class="item" style="width:90px">运单号：</span>
                    <span class="item">{{wayBill}}</span>
                </el-col>
                <el-col :span="6">
                    <span class="item" style="width:120px">预报单号：</span>
                    <span class="item">{{forecastNo}}</span>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      wayBill: 'AS202012120001', // 运单号
      forecastNo: 'YB202012120001' // 预报单号
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
