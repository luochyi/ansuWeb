<!--已建计划-->
<template>
  <div id='boxx'>
    <div class="box">
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>仓库详情</span>
      </el-row>
      <div>
        <div class="en">
          <el-descriptions title="仓库信息">
            <el-descriptions-item label="仓库名称">{{data.name}}</el-descriptions-item>
<!--            <el-descriptions-item label="代理编码">{{data.code}}</el-descriptions-item>-->
<!--            <el-descriptions-item label="公司地址">{{data.province_name}}{{data.city_name}}{{data.county_name}}</el-descriptions-item>-->
            <el-descriptions-item label="详细地址">{{data.address}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <div class="wu"></div>
  </div>
</template>

<script>
import * as setting from "../../../api/setting";

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
      this.$api.setting.warehouse.warehouseInfo({
        warehouseId: this.id
      }).then(res => {
        console.log(res)
        this.data = res.data
        // this.data.good_time = this.formatDate(res.data.good_time, 'yyyy-MM-dd')
        // this.data.created_at = this.formatDate(res.data.created_at, 'yyyy-MM-dd')
        // this.tableData = res.data.contacts
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

<style scoped>
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
.el-descriptions{
  margin: 25px;
}
</style>
