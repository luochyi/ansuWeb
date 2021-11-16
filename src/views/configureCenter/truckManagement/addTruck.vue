<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span v-if="this.editId === undefined">新建货车</span>
      <span v-else>修改货车</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
      <!-- 客户资料 -->
      <el-row :gutter="15" style="width:50%;text-align:left;min-width:700px">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="small"
          label-width="90px"
          label-position="top"
        >
          <el-col :span="12">
            <el-form-item label="货车名称" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入货车名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号" prop="licensePlate">
              <el-input
                v-model="formData.licensePlate"
                placeholder="请输入车牌号"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="车辆载重" prop="load">
              <el-input
                v-model="formData.load"
                placeholder="请输入车辆载重"
                type="number"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="车辆大小：长" prop="long">
              <el-input
                v-model="formData.long"
                placeholder="请输入长"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="宽" prop="wide">
              <el-input
                v-model="formData.wide"
                placeholder="请输入宽"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="高" prop="high">
              <el-input
                v-model="formData.high"
                placeholder="请输入高"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button class="orangeBtn" type="primary" @click="add">提交</el-button>
              <el-button class="whiteBtn" @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'

export default {
  data () {
    return {
      editId: null,
      formData: {
        name: '',
        licensePlate: '',
        load: '',
        long: '',
        wide: '',
        high: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入货车名称',
          trigger: 'blur'
        }],
        licensePlate: [{
          required: true,
          message: '请输入车牌号',
          trigger: 'blur'
        }],
        load: [{
          required: true,
          message: '请输入车辆载重',
          trigger: 'blur'
        }],
        long: [{
          required: true,
          message: '请输入长',
          trigger: 'blur'
        }],
        wide: [{
          required: true,
          message: '请输入宽',
          trigger: 'blur'
        }],
        high: [{
          required: true,
          message: '请输入高',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.formData.name = this.$route.params.name
    this.formData.licensePlate = this.$route.params.number
    this.formData.load = this.$route.params.load
    this.formData.long = this.$route.params.long
    this.formData.wide = this.$route.params.wide
    this.formData.high = this.$route.params.high
    this.editId = this.$route.params.id
  },
  methods: {
    add () {
      if (this.editId === undefined) {
        this.$refs.elForm.validate(valid => {
          if (!valid) return
          api.configure.car
            .carAdd({
              name: this.formData.name,
              licensePlate: this.formData.licensePlate,
              load: Number(this.formData.load),
              long: Number(this.formData.long),
              wide: Number(this.formData.wide),
              high: Number(this.formData.high)
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success(res.msg) // 成功提示
                this.$router.push({ name: 'truckManagement' }) // 添加成功后返回子公司列表
              } else {
                this.$message.error(res.msg) // 错误提示
              }
            })
        })
      } else {
        api.configure.car
          .carEdit({
            carId: this.editId,
            name: this.formData.name,
            licensePlate: this.formData.licensePlate,
            load: Number(this.formData.load),
            long: Number(this.formData.long),
            wide: Number(this.formData.wide),
            high: Number(this.formData.high)
          })
          .then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg) // 成功提示
              this.$router.push({ name: 'truckManagement' }) // 添加成功后返回子公司列表
            } else {
              this.$message.error(res.msg) // 错误提示
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
.trucklabel {
  margin: 5px;
  font-size: 14px;
}
.title {
  padding: 17px 35px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.content {
  padding: 30px 35px;
}
.infoBox {
  margin-bottom: 20px;
  /deep/ .el-input {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon {
      line-height: 24px;
    }
  }
  .box_title {
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
  }
  .info {
    display: flex;
    margin-bottom: 20px;
    .name {
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .table {
    margin-bottom: 20px;
  }
}
</style>
