<!--已建计划-->
<template>
<div id='boxx'>
  <div class="box">
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>订单详情</span>
    </el-row>
    <div>
    <div class="top" >
         <el-row type='flex' justify='flex-start' class='titlea' align='middle'>
      <span style=" margin:25px" class='text'>预报订单：YBSZ202012120001  预报类型：已建计划</span>
    </el-row>
         <el-descriptions title="客户信息">
         <el-descriptions-item label="客户名称">深圳大成贸易科技有限公司</el-descriptions-item>
         <el-descriptions-item class='number' label="客户编号">DCMY大成贸易</el-descriptions-item>
         </el-descriptions>
    </div>
    <div class="en">
          <el-descriptions title="业务员">
         <el-descriptions-item label="所属业务员">张三</el-descriptions-item>
         <el-descriptions-item label="业务员手机">15990589493</el-descriptions-item>
         <el-descriptions-item label="业务员职位">普通业务员</el-descriptions-item>
         <el-descriptions-item label="上级领导">高飞</el-descriptions-item>
         </el-descriptions>
    </div>
        <div class="en">
          <el-descriptions title="收货信息">
         <el-descriptions-item label="收货司机">张三</el-descriptions-item>
         <el-descriptions-item label="司机职位">普通司机</el-descriptions-item>
         <el-descriptions-item label="司机手机">15990589231</el-descriptions-item>
         </el-descriptions>
    </div>
        <div class="en">
          <el-descriptions title="预报信息">
         <el-descriptions-item label="下单时间">2020年12月09日 15:00</el-descriptions-item>
         <el-descriptions-item label="货好时间">今日 16:00-17:00</el-descriptions-item>
         <el-descriptions-item label="寄件方式">上门取件</el-descriptions-item>
         <el-descriptions-item label="预报件数">100件</el-descriptions-item>
         <el-descriptions-item label="预报重量">80公斤</el-descriptions-item>
         <el-descriptions-item label="预报方数">90立方</el-descriptions-item>
         </el-descriptions>
    </div>
   </div>
  </div>
  <div class="wu"></div>
  <div class="button">
     <!--  标签页 -->
     <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>查看运单</span>
     </el-row>
     <el-divider></el-divider>
        <div class="foot" >
            <el-row class="left">
              <span class='title' >票数：2票 货件数量：100箱</span>
            </el-row>
            <br>
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 80%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <!-- 运单号 -->
            <el-table-column  prop='WaybillNo'  label='运单号'  min-width='318'> </el-table-column>
            <!-- 预报类型 -->
            <el-table-column  prop='quantity'  label='发货数量'  min-width='318'></el-table-column>
             <el-table-column label='操作' fixed='right' min-width='120'>
              <template slot-scope="scope">
                 <el-button type="text" @click="Viewwaybill(scope.row.id)"> 查看运单</el-button>
              </template>
            </el-table-column>
            </el-table>
         </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      WaybillNo: '',
      quantity: '',
      tableData: [
        {
          WaybillNo: 'AS202112120001',
          quantity: '20箱'
        },
        {
          WaybillNo: 'AS202112120002',
          quantity: '40箱'
        }

      ]
    }
  },
  methods: {
    modify () {
      this.$router.push({ name: 'modify' })
    }

  }
}
</script>

<style>
.el-dialog{
  text-align: left;
}
.title{
width: 64px;
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
height: 1050px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.wu{
  width: 100%;
  height: 25px;
  background: #E8EBF2;
}
.en{
  width: 100%;
  height: 141px;
  border: 1px solid #E8E8E8;
}
.top{
    width: 100%;
  height: 141px;
  border: 1px solid #E8E8E8;
}
.foot{
  width: 100%;
  height: 350px;
  margin: 20px;
}
.titlea{
 width: 650px;
height: 25px;
font-size: 18px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #FB4702;
line-height: 25px;
margin: 10px  ;
}
.el-descriptions__title{
width: 110px;
height: 10px;
font-size: 16px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
line-height: 25px;
margin: 10px  ;
}
.el-descriptions__table{
margin: 19px 32px ;
}
.button{
border: 20px;
}
</style>
