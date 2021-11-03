<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span v-if="editId===undefined">新增目的国</span>
      <span v-else>修改目的国</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
        <el-row>
            <el-col :span="8">目的国名称<div><el-input class="elipt" v-model="name" size="mini"></el-input></div></el-col>
            <el-col :span="8">目的国电话区号<div><el-input class="elipt" v-model="areaCode" size="mini"></el-input></div></el-col>
        </el-row>
        <div class="item">
            <div style="margin:20px 0 10px 0">国家图标</div>
            <el-upload
                class="avatar-uploader"
                :action="`${$baseUrl}/file/upload/image`"
                :headers="uploadhead"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="icon" :src="ImgUrl(this.icon)" style="width:114px;height:76px" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div style="fontSize:14px;color:#000000A6;marginTop:10px">上传国家图标</div>
                <div  style="fontSize:12px;color:#00000073;marginBottom:10px">图片像素为114*76px</div>
            <el-button @click="addSubmit" class="orangeBtn">确 认</el-button>
            <el-button class="whiteBtn" @click="back()">取 消</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editId: null,
      uploadhead: {
        'Ansuex-Manage-Token': sessionStorage.getItem('token')
      },
      name: null,
      areaCode: null,
      icon: null
    }
  },
  mounted () {
    this.editId = this.$route.params.id
    this.name = this.$route.params.name
    this.icon = this.$route.params.icon
    this.areaCode = this.$route.params.area_code
    // countryId
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.icon = res.data.path
    },
    // 上传前的钩子函数，设置上传限制
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      const isJPG = file.type === 'image/png'
      const isPNG = file.type === 'image/jpeg'
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    // 提交新增
    addSubmit () {
      if (this.editId === undefined) {
        let params = {
          name: this.name,
          areaCode: Number(this.areaCode),
          icon: this.icon
        }
        this.$api.configure.countryAdd(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({ name: 'countryManagement' })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        let params = {
          countryId: this.editId,
          name: this.name,
          areaCode: Number(this.areaCode),
          icon: this.icon
        }
        this.$api.configure.countryEdit(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({ name: 'countryManagement' })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  padding: 17px 35px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.elipt{
    width: 265px;
    height: 32px;
}
.content{
    font-size: 14px;
    font-weight: 500;
    text-align: left;
}
.avatar-uploader{
width: 114px;
height: 76px;
background: rgba(0, 0, 0, 0.04);
border-radius: 2px;
border: 1px solid rgba(0, 0, 0, 0.15);
text-align: center;
line-height: 76px;
}
</style>
