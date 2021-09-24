<template>
<div id='boxx'>
   <el-row type='flex' justify='flex-start' class='title' align='middle' >
      <span class='text'>新建子公司</span>
    </el-row>
  <div class="box">
    <!--  标签页 -->
   <el-descriptions class="margin-top" :column="2" direction="vertical">
   <el-descriptions-item label="公司名称">
       <el-input style="width: 265px" v-model="input" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="运单起始号码">
        <el-input style="width: 265px" v-model="inputa" placeholder="请输入"></el-input>
        </el-descriptions-item>
         </el-descriptions>
        <el-descriptions class="margin-top" :column="1" direction="vertical">
   <el-descriptions-item label="公司地址" :span="2">
    <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
   </el-descriptions-item>
   <el-descriptions-item label="详细地址">
        <el-input style="width: 517px" type="textarea" :rows="2" placeholder="请输入" v-model="textarea"></el-input>
   </el-descriptions-item>
   </el-descriptions>
    <div class="top">
        <el-descriptions class="margin-top" :column="2" direction="vertical">
   <el-descriptions-item label="管理员名称">
       <el-input style="width: 265px" v-model="inputb" placeholder=""></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="管理员手机">
        <el-input  style="width: 265px" v-model="inputc" placeholder=""></el-input>
        </el-descriptions-item>
         </el-descriptions>
         <el-descriptions class="margin-top" :column="4" direction="vertical">
   <el-descriptions-item label="登陆账号" >
       <el-input style="width: 265px" v-model="inputd" placeholder=""></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="登陆密码">
       <el-input style="width: 265px" placeholder="" v-model="inpute" show-password></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="确认密码">
       <el-input style="width: 265px" placeholder="" v-model="inputf" show-password></el-input>
       <el-button class='whiteBtn'>生成随机密码</el-button>
   </el-descriptions-item>
   </el-descriptions>
   <el-form >
    <el-form-item size="large">
    <el-button type="primary" @click="determine" class="orangeBtn long2">确定</el-button>
    <el-button class='whiteBtn long2' >取消</el-button>
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
      value: '',
      input: '',
      inputa: '',
      inputb: '',
      inputc: '',
      inputd: '',
      inpute: '',
      inputf: '',
      options: '',
      textarea: '',
      determine: '',
      methods: {
        add () {
          this.$router.push({ name: 'addcustomerp' })
        },
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
