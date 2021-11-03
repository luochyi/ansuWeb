<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text' style="fontWeight:500">分配司机</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
        <el-row style="borderBottom:1px solid #E9E9E9;paddingBottom:20px">
            <el-col :span="3"><span style="fontSize:14px;fontWeight:500">司机名称：{{basicInfo.name}}</span></el-col>
            <el-col :span="3"><span style="fontSize:14px;fontWeight:500">司机职位：{{basicInfo.role}}</span></el-col>
        </el-row>
       <div style="textAlign:left;paddingTop:20px;borderBottom:1px solid #E9E9E9;paddingBottom:20px">
            <div>收货区域</div>
            <div v-for="(item, index) in formData" :key="index">
              <el-cascader
                  size="mini"
                  style="marginBottom:10px"
                  :options="options"
                  v-model="item.areaIds"
                  :show-all-levels="false"
                  :props="{ expandTrigger: 'hover' }"
                  filterable
              ></el-cascader>
              <el-button v-show="index > 0" @click="delArea(index)">删除</el-button>
            </div>
            <div><el-button icon="el-icon-circle-plus-outline" class='orangeBtn' @click="addArea">新增收货区域</el-button></div>
       </div>
       <div style="textAlign:left;paddingTop:20px;">
           <el-button size="mini" class='orangeBtn submitbtn' @click="region">确认</el-button>
           <!-- <el-button size="mini" class='whiteBtn submitbtn' @click="back">取消</el-button> -->
       </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      adressArea: null,
      options: [],
      basicInfo: {
        driverId: 0,
        name: '',
        role: ''
      },
      formData: [{}]
    }
  },
  mounted () {
    this.basicInfo.driverId = this.$route.params.id
    this.basicInfo.name = this.$route.params.name
    this.basicInfo.role = this.$route.params.position_name
    this.options = this.$store.state.common.regiondata
    if (this.$route.params.regions && this.$route.params.regions.length > 0) {
      this.formData = []
      this.$route.params.regions.forEach(item => {
        this.formData.push({ areaIds: [item.province_id, item.city_id, item.county_id] })
      })
    }
    console.log(this.formData)
  },
  methods: {
    addArea () {
      this.formData.push({})
    },
    delArea (index) {
      this.formData.splice(index, 1)
    },
    region () {
      let countyIds = []
      this.formData.forEach(item => {
        if (item.areaIds && item.areaIds.length === 3) {
          countyIds.push(Number(item.areaIds.slice(-1)))
        }
      })
      this.$api.configure.driver.region({
        driverId: this.basicInfo.driverId,
        countyIds: countyIds
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'driverManagement' }) // 添加成功后返回列表
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}

</script>
<style lang="scss" scoped>
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.submitbtn{
    width: 96px;
    height: 32px;
}
</style>
