<template>
<div id='boxx'>
  <div class="box">
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>新建目的国</span>
    </el-row>
    <div class="boxa">
  <el-descriptions class="margin-top" :column="2" direction="vertical">
  <el-descriptions-item label="目的国名称">
       <el-input v-model="input" placeholder="请输入内容"></el-input>
  </el-descriptions-item>
  <el-descriptions-item label="目的国电话区号">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-descriptions-item>
  <el-descriptions-item label="国家图标" :span="2">
      <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </el-descriptions-item>
</el-descriptions>
 <div slot="tip" class="el-upload__tip">上传国家图标</div>
  <div slot="tip" class="el-upload__tip">图片像素大小为114*76px</div>
    <el-form>
  <el-form-item size="large">
    <el-button type="primary" @click="determine" class="orangeBtn">确定</el-button>
    <el-button class='wuBtn'>取消</el-button>
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
      // 上传
      dialogImageUrl: '',
      dialogVisible: false,

      input: '',
      options: '',
      textarea: '',
      determine: '',
      methods: {
        add () {
          this.$router.push({ name: 'addcustomerp' })
        },
        determine () {
          console.log('ondetermine!')
        },
        handleRemove (file, fileList) {
          console.log(file, fileList)
        },
        handlePictureCardPreview (file) {
          this.dialogImageUrl = file.url
          this.dialogVisible = true
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
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.boxa{
    width:1191px ;
    height: 395px;
    border: 1px solid #E9E9E9;
}
</style>
