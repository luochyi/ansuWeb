<!--已建计划-->
<template>
  <div id='boxx'>
    <div class="box">
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>代理详情</span>
      </el-row>
      <div>
        <div class="en">
          <el-descriptions title="客户资料">
            <el-descriptions-item label="代理名称">{{data.name}}</el-descriptions-item>
            <el-descriptions-item label="代理编码">{{data.code}}</el-descriptions-item>
            <el-descriptions-item label="公司地址">{{data.province_name}}{{data.city_name}}{{data.county_name}}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{data.address}}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="en">
          <el-descriptions title="代理账期">
            <el-descriptions-item label="结算账期">{{data.period_name}}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="en">
          <el-descriptions title="代理账期">
            <el-descriptions-item label="代理备注">{{data.remark}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <div class="wu"></div>
    <div>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>联系人</span>
      </el-row>
      <el-divider></el-divider>
      <div class="foot" >
        <el-row class="left">
          <!-- <span class='title' >票数：2票 货件数量：100箱</span> -->
        </el-row>
        <br>
        <el-table ref="multipleTable" :data="data.contacts" border  tooltip-effect="dark" style="width: 80%"
                  :header-cell-style="{background: '#F5F5F6'}">
          <!-- 联系人姓名 -->
          <el-table-column  prop='name'  label='联系人姓名'  min-width='318'> </el-table-column>
          <!-- 类型 -->
          <el-table-column  prop='type'  label='类型'  min-width='318'></el-table-column>
          <!-- 手机号 -->
          <el-table-column  prop='phone'  label='手机号'  min-width='318'></el-table-column>
          <!-- 微信 -->
          <el-table-column  prop='wechat'  label='微信'  min-width='318'></el-table-column>
          <!-- qq -->
          <el-table-column  prop='qq'  label='qq'  min-width='318'></el-table-column>
          <!-- <el-table-column label='操作' fixed='right' min-width='120'>
           <template slot-scope="scope">
              <el-button type="text" @click="Viewwaybill(scope.row.id)"> 查看运单</el-button>
           </template>
         </el-table-column> -->
        </el-table>
      </div>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>收货地址</span>
      </el-row>
      <el-divider></el-divider>
      <div class="foot" >
        <el-row class="left">
          <!-- <span class='title' >票数：2票 货件数量：100箱</span> -->
        </el-row>
        <br>
        <el-table ref="multipleTable" :data="data.addresses" border  tooltip-effect="dark" style="width: 80%"
                  :header-cell-style="{background: '#F5F5F6'}">
          <!-- 联系人姓名 -->
          <el-table-column  prop='name'  label='负责人名称'  min-width='318'> </el-table-column>
          <!-- 手机号 -->
          <el-table-column  prop='phone'  label='负责人手机'  min-width='318'></el-table-column>
          <!-- 微信 -->
          <el-table-column  prop=''  label='公司地址'  min-width='318'>{{data.province_name}}{{data.city_name}}{{data.county_name}}</el-table-column>
          <!-- qq -->
          <el-table-column  prop='address'  label='详细地址'  min-width='318'></el-table-column>
          <!-- <el-table-column label='操作' fixed='right' min-width='120'>
           <template slot-scope="scope">
              <el-button type="text" @click="Viewwaybill(scope.row.id)"> 查看运单</el-button>
           </template>
         </el-table-column> -->
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
      id: '',
      tableData: [
      ],
      data: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.getdata()
  },
  methods: {
    // this.msg = this.$route.params.mes
    getdata () {
      console.log('111')
      console.log(this.id)
      this.$api.agent.agentInfo({
        agentId: this.id
      }).then(res => {
        console.log(res)
        this.data = res.data
        // this.data.good_time = this.formatDate(res.data.good_time, 'yyyy-MM-dd')
        // this.data.created_at = this.formatDate(res.data.created_at, 'yyyy-MM-dd')
        this.tableData = res.data.contacts
      })
    },
    modify () {
      this.$router.push({ name: 'modify' })
    },
    handleSelectionChange () {

    }
  }
}
</script>

<style lang="scss" scoped>
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
  /* width: 1191px; */
  /* height: 1050px; */
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
.el-descriptions{
  margin: 25px;
}
</style>
