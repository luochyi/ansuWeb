<template>
<div id='boxx'>
    <div class="box">
     <!--  top -->
     <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>新建客户账户</span>
     </el-row>
      <div class="left">
      <span class='text'>客户资料</span>
     </div>
     <div class="top">
<el-descriptions class="margin-top" :column="4" >
   <el-descriptions-item label="客户名称" >
       <el-input style="width: 200px" v-model="inputd" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="客户编码">
       <el-input style="width: 200px" placeholder="请输入" v-model="inpute" show-password></el-input>
   </el-descriptions-item>
   </el-descriptions>
          <el-descriptions class="margin-top" :column="4" >
   <el-descriptions-item label="登陆账号" >
       <el-input style="width: 200px" v-model="inputd" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="登陆密码">
       <el-input style="width: 200px" placeholder="请输入" v-model="inpute" show-password></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="确认密码">
       <el-input style="width: 200px" placeholder="请输入" v-model="inputf" show-password></el-input>
       <el-button  class='whiteBtn '>生成随机密码</el-button>
   </el-descriptions-item>
   </el-descriptions>
     </div>
          <el-descriptions class="margin-top" :column="1" >
   <el-descriptions-item label="营业执照">
        <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
  <span class='text' style="margin:10px">注：支持格式JPG、PNG</span>
</el-upload>
   </el-descriptions-item>
   </el-descriptions>
     <el-descriptions class="margin-top" :column="1" >
   <el-descriptions-item label="公司地址">
        <el-select style="width: 600px" v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
   </el-descriptions-item>
   </el-descriptions>
    <el-descriptions class="margin-top" :column="1" >
   <el-descriptions-item label="详细地址">
         <el-input style="width: 600px" placeholder="请输入" v-model="inpute" show-password></el-input>
   </el-descriptions-item>
   </el-descriptions>
               <el-col :span='2' >
              <span class='text'>联系资料</span>
            </el-col>
            <br><br>
            <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 80%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50"></el-table-column>
             <el-table-column prop="name" label="姓名" width="88"></el-table-column>
             <el-table-column prop="position" label="职位" width="123"></el-table-column>
             <el-table-column prop="number" label="联系电话" width="168"></el-table-column>
             <el-table-column prop="WeChat" label="微信" width="145"></el-table-column>
             <el-table-column prop="QQ" label="QQ" width="129"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="142">
              <template slot-scoped="scoped">
                <el-button type="text" @click="dialogVisible "> 编辑信息</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button  type="text" @click="dialogVisible "> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
             <el-form >
    <el-form-item size="large" class="left">
    <el-button type="primary" @click="determine" class="orangeBtn long2">新建联系人</el-button>
    <el-button class='wuBtn long2' style="color:rgba(251, 71, 2, 1)">取消</el-button>
    </el-form-item>
   </el-form>
        </div>
            <el-col :span='2'>
              <span class='text'>收货地址</span>
            </el-col>
            <br> <br>
            <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 80% " @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50"></el-table-column>
             <el-table-column prop="contact" label="仓库联系人" width="100"></el-table-column>
             <el-table-column prop="charge" label="负责人电话" width="125"></el-table-column>
             <el-table-column prop="address" label="仓库地址" width="425"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="142">
              <template slot-scoped="scoped">
                <el-button type="text" @click="dialogVisible "> 编辑地址</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button  type="text" @click="dialogVisible "> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
         <el-form >
    <el-form-item size="large" class="left">
    <el-button type="primary" @click="determine" class="orangeBtn long2">新建收货地址</el-button>
    <el-button class='wuBtn long2' style="color:rgba(251, 71, 2, 1)">批量删除</el-button>
    </el-form-item>
   </el-form>
        <div>
        <el-col :span='2'>
              <span class='text'>客户账期</span>
            </el-col>
            <br> <br>
        <el-row class='searchbox1'>
          <el-col :span='10' class='colbox'>
            <el-col :span='5'>
              <span class='text'>结算账期</span>
            </el-col>
            <el-col :span='10'>
              <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='10' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户等级</span>
            </el-col>
          <el-col :span='10'>
            <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
            </el-col>
        </el-row>
         <el-col :span='2'>
              <span class='text'>报价设置</span>
            </el-col>
             <br> <br>
        <el-row class='searchbox1'>
          <el-col :span='10' class='colbox'>
            <el-col :span='7'>
              <span class='text'>大货价格</span>
            </el-col>
            <el-col :span='6'>
              <el-select v-model="value" placeholder="增加">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
             <el-input :span='10' v-model='predictionNo' placeholder='请输入'></el-input>
          </el-col>
          <el-col :span='10' class='colbox'>
            <el-col :span='9'>
              <span class='text'>小货价格</span>
            </el-col>
          <el-col :span='6'>
             <el-select v-model="value" placeholder="减少">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
            <el-input :span='8' v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
         </el-row>
         <div class="left">
          <el-button @click="dialogVisible = false" class='orangeBtn long1'>确 定</el-button>
      <el-button @click="dialogVisible = false" class='wuBtn long1'>取 消</el-button>
         </div>
            </div>
         </div>
       </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,

      tableData: [
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ],
      methods: {
        handleSelectionChange (val) {
          console.log(val)
          this.chooseArr = []
          val && val.forEach((item) => {
            this.chooseArr.push(item)
          })
        }

      }
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    margin: 17px;
}
.box{
    width: 1191px;
height: 100%;
    background: #FFFFFF;
}
#boxx{
width: 1191px;
height: 100%;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.top{
  margin: 25px;
}
.left{
  margin: 10px;
}
.el-icon-camera-solid{
  width: 30px;
  height: 26px;
}
.avatar-uploader .el-upload {
    border: 1px soild #d9d9d9;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #000000;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    background: #F7F7F7;
    width: 75px;
    height: 77px;
    line-height: 77px;
    text-align: center;
  }
  .avatar {
width: 75px;
height: 77px;
background: #F7F7F7;
border-radius: 11px;
    display: block;
  }

</style>
