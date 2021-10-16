<template>
   <div class="two">
     <span class="title">运单信息</span>
      <el-descriptions class="margin-top" :title="data.code" :column="2">
        <el-descriptions-item label="客户名称">{{data.customerName}}</el-descriptions-item>
        <el-descriptions-item label="业务员">{{data.salesman}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :title="title" :column="4">
        <el-descriptions-item label="目的国">{{data.country}}</el-descriptions-item>
        <el-descriptions-item label="目的国邮编">{{data.postalCode}}</el-descriptions-item>
        <el-descriptions-item label="申报价值">{{data.price}}</el-descriptions-item>
        <el-descriptions-item label="品名">{{data.cate}}</el-descriptions-item>
        <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
        <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
        <el-descriptions-item label="是否有保险">{{data.isInsurance===1?'是':'否'}}</el-descriptions-item>
        <el-descriptions-item label="货物">{{data.goods}}</el-descriptions-item>
        <el-descriptions-item label="预报渠道">{{data.prediction}}</el-descriptions-item>
        <el-descriptions-item label="入仓渠道">{{data.warehousing}}</el-descriptions-item>
        <el-descriptions-item label="出仓渠道">{{data.outwarehouse}}</el-descriptions-item>
        <el-descriptions-item label="入仓代理">{{data.WarehousingAgent}}</el-descriptions-item>
        <el-descriptions-item label="结算重">{{data.settlementWeight}}</el-descriptions-item>
        <el-descriptions-item label="改货重">{{data.changeWeight}}</el-descriptions-item>
        <el-descriptions-item label="出仓重">{{data.outWeight}}</el-descriptions-item>
        <el-descriptions-item label="代理结算重">{{data.agentWeight}}</el-descriptions-item>
        <el-descriptions-item label="货物数量">{{data.num}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="备注">{{data.remarks}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="内部备注">{{data.inRemarks}}</el-descriptions-item>
      </el-descriptions>
    </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: String,
    data: Object
  }
}
</script>

<style>
.two {
  height: 371px;
  background: #ffffff;
  padding: 10px;
  text-align: left;
  margin-bottom: 10px;
}
</style>
