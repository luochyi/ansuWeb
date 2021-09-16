<template>
<div id='boxx'>
    <div class="box">
    <!--  top -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>新建员工账号</span>
    </el-row>
    <div>
      <el-descriptions class="margin-top" :column="2" direction="vertical">
        <el-descriptions-item label="货车名称">
          <el-input style="width: 200px" v-model="input" placeholder="请输入"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="车牌号">
          <el-input style="width: 200px" v-model="inputa" placeholder="请输入"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="2" direction="vertical">
       <el-descriptions-item label="车载数量">
          <el-input style="width: 200px" v-model="inputb" placeholder="请输入"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="车辆大小">
       <span class='text'>长</span>
       <el-input style="width: 100px" placeholder="请输入" v-model="inputc" >
          <span slot="suffix">米</span>
       </el-input>
        <span class='text'>宽</span>
       <el-input style="width: 100px" placeholder="请输入" v-model="inputd" >
         <span slot="suffix">米</span>
       </el-input>
        <span class='text'>高</span>
       <el-input style="width: 100px" placeholder="请输入" v-model="inpute" >
         <span slot="suffix">米</span>
       </el-input>
       </el-descriptions-item>
        </el-descriptions>
<el-form>
 <el-form-item size="large">
    <el-button type="primary" @click="determine" class="orangeBtn long2">确定</el-button>
    <el-button class='wuBtn long2'>取消</el-button>
  </el-form-item>
  </el-form>
    </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      inputa: '',
      inputb: '',
      inputc: '',
      inputd: '',
      inpute: '',
      determine: '',
      methods: {

      }
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    margin: 10px;
}
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}

</style>
