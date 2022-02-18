<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span v-if="editId===undefined">新增目的国</span>
      <span v-else>修改目的国</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
        <el-form ref="elForm" :model="form" :rules="rules" size="small" label-width="93px" label-position="top">
          <el-form-item label="目的国名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入目的国名称" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="目的国电话区号" prop="areaCode">
            <el-input v-model="form.areaCode" placeholder="请输入目的国电话区号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-form>
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
                <img v-if="form.icon" :src="ImgUrl(this.form.icon)" style="width:114px;height:76px" class="avatar">
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
      form: {
        name: null,
        areaCode: null,
        icon: null
      },
      rules: {
        name: [{
          required: true,
          message: '请输入目的国名称',
          trigger: 'blur'
        }],
        areaCode: [{
          required: true,
          message: '请输入目的国电话区号',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.editId = this.$route.params.id
    this.form.name = this.$route.params.name
    this.form.icon = this.$route.params.icon
    this.form.areaCode = this.$route.params.area_code
    // countryId
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.icon = res.data.path
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
        this.$refs.elForm.validate(valid => {
          if (!valid) return
          let params = {
            name: this.form.name,
            areaCode: Number(this.form.areaCode),
            icon: this.form.icon
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
        })
      } else {
        let params = {
          countryId: this.editId,
          name: this.form.name,
          areaCode: Number(this.form.areaCode),
          icon: this.form.icon
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
