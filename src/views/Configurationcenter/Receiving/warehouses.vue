<template>
<div id="boxx">
<div id="box">
    <span class='text'>新建仓库地址</span>
  <div class="add">
      <el-input type="text" v-model="textareaa" placeholder="仓库名称"></el-input>
      <br><br>
      <el-input type="text" v-model="textareab" placeholder="仓库所属公司"></el-input>
      <br><br>
      <el-input type="text" v-model="textareac" placeholder="仓库负责人"></el-input>
      <br><br>
      <el-input type="text" v-model="textaread" placeholder="负责人手机"></el-input>
      <br><br>
      <el-input type="text" v-model="textareae" placeholder="客户地址"></el-input>
      <br><br>
      <el-input type="text" v-model="textarea"  class="address" placeholder="详细地址" ></el-input>
      <br><br>
      <el-button  @click="preservation = false" class='orangeBtn long1'>保存 </el-button>
      <br><br>
      <el-button @click="Cancel = false" class='wuBtn long1'>取 消</el-button>
  </div>
</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      add: '',
      textareaa: '',
      textareab: '',
      textareac: '',
      textaread: '',
      textareae: '',
      textarea: ''

    }
  }

}
</script>

<style>
/* 写样式的地方，可以百度一下elementui怎么更改样式，要使用/deep/给组件改样式*/
#boxx{
width: 1440px;
height: 1080px;
background: rgb(241, 241, 241);
}
#box{
width: 640px;
height: 845px;
background: #FFFFFF;
border-radius: 10px 11px 10px 10px;
margin: 53px 300px ;
border: 1px solid #E8E8E8;
}
.text{
width: 64px;
height: 22px;
font-size: 16px;
color: rgba(0, 0, 0, 0.85);
line-height: 22px;
}
.add{
  width: 392px;
  margin: 53px 124px ;
  text-align: left;
}
</style>
