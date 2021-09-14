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
            <el-select size="mini" v-model="adressArea" style="width:265px;margin:20px 0px 20px 0px">
                <el-option v-for="item in options" :key='item.value'></el-option>
            </el-select>
            <div><el-button icon="el-icon-circle-plus-outline" class='orangeBtn'>新增收货区域</el-button></div>
       </div>
       <div style="textAlign:left;paddingTop:20px;">
           <el-button size="mini" class='orangeBtn submitbtn'>确认</el-button>
           <el-button size="mini" class='whiteBtn submitbtn'>取消</el-button>
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
        name: 'null',
        role: 'null'
      }
    }
  },
  methods: {
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
