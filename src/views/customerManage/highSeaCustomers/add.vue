<template>
<div id="boxx">
<div id="box">
  <div class="add">
    <span class='text'>客户名称</span>
      <el-input v-model="name" placeholder="请输入客户名称"></el-input>
      <span class='text'>客户联系人</span>
      <el-input v-model="customer" placeholder="请输入客户名称"></el-input>
      <span class='text'>客户联系电话</span>
      <el-input v-model="Please" placeholder="请输入客户名称"></el-input>
      <span class='text'>客户地址</span>
      <el-input v-model="address" placeholder="客户地址"></el-input>
      <br><br>
      <el-input v-model="detailed" type="textarea" class="address" placeholder="详细地址" ></el-input>
      <el-button @click="dialogVisible = false" class='orangeBtn long1'>确 定</el-button>
      <el-button @click="dialogVisible = false" class='wuBtn long1'>取 消</el-button>
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
      name: null,
      customer: '',
      Please: '',
      address: '',
      detailed: ''

    }
  },
  methods: {
    submit () {
      // 给请求参数赋值
      let resData = {
        name: this.name,
        customer: this.liaison,
        Please: this.phone,
        address: this.address
      }
      // 把请求参数传输至后端，并且获取接口返回的结果res
      this.$api.configure.publicAdd(resData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'add' }) // 添加成功后返回添加客户
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
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
