<template>
<div id='boxx'>
   <el-row type='flex' justify='flex-start' class='title' align='middle' >
      <span class='text'>分配区域</span>
    </el-row>
  <div class="box">
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle' >
      <span class='text'>司机名称：黄旭东</span>
      <span class='text'>司机职位：司机主管</span>
    </el-row>
        <el-descriptions class="margin-top" :column="1" direction="vertical">
   <el-descriptions-item label="收货区域" :span="2">
    <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in value" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
   </el-descriptions-item>
   </el-descriptions>
   <el-row class="left" >
  <el-button class="orangeBtn long3" icon="el-icon-circle-plus-outline">新增收货区域</el-button>
</el-row>
 <el-divider></el-divider>
   <el-form >
    <el-form-item size="large">
    <el-button type="primary" @click="determine" class="orangeBtn long2">确定</el-button>
    <el-button class='wuBtn long2' style="color:rgba(251, 71, 2, 1)">取消</el-button>
    </el-form-item>
   </el-form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      determine: '',
      methods: {
        determine () {
          console.log('ondetermine!')
        }

      }
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    font-size: 16px;
    font-weight: 500;
    margin: 17px;
}
.box{
  height: 400px;
  margin: 25px;
background: #FFFFFF;
}
#boxx{
width: 1191px;
height: 914px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.boxa{
    width:1191px ;
    height: 300px;
    border: 1px solid #E9E9E9;
}
.top{
  border-top:1px solid #E9E9E9;
}
.el-form{
  margin: 10px;
    text-align: left;
}
</style>
