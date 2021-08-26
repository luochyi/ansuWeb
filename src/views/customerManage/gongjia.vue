<template>
<div class="drawer" >
             <el-drawer title="添加客户" :visible.sync="drawer" :with-header="false">
           <span>客户名称</span>
           <el-input v-model="input" placeholder="请输入内容"></el-input>
           <span>客户地址</span>
           <el-input v-model="input" placeholder="客户地址"></el-input>
           <el-input type="textarea" :rows="2" placeholder="详细地址" v-model="textarea"></el-input>
              <el-button class='orangeBtn long1'>确 定</el-button>
              <el-button class='wuBtn long1'>取 消</el-button>
            </el-drawer>
          </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }

}
</script>

<style >
/* 写样式的地方，可以百度一下elementui怎么更改样式，要使用/deep/给组件改样式*/
.mainbox{
  width: 1191px;
  height: 854px;
  border:red solid 1px;
  /* border-color: white; */
  background-color: white;
  padding: 1rem;
}

</style>
