<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span>新建货车</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
      <!-- 客户资料 -->
      <div class="infoBox">
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">货车名称</div>
            <el-col :span="16">
              <el-input v-model="formData.name" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">车牌号</div>
            <el-col :span="16">
              <el-input v-model="formData.licensePlate" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">车辆载重</div>
            <el-col :span="16">
              <el-input v-model="formData.load" type="number" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="9" class="flex  align-center">
            <div class="name">车厢大小</div>
            <span class="trucklabel">长：<el-input v-model="formData.long" type="number" style="width:100px" size="mini" placeholder="请输入" ><i slot="suffix" class="el-input__icon">米</i></el-input></span>
            <span class="trucklabel">宽：<el-input v-model="formData.wide" type="number" style="width:100px" size="mini" placeholder="请输入" ><i slot="suffix" class="el-input__icon">米</i></el-input></span>
            <span class="trucklabel">高：<el-input v-model="formData.high" type="number" style="width:100px" size="mini" placeholder="请输入" ><i slot="suffix" class="el-input__icon">米</i></el-input></span>
          </el-col>
        </el-row>
        <!--  -->
      </div>
      <!-- 按钮 -->
      <!-- 其他 -->
      <div class="infoBox">
        <el-button class="orangeBtn" @click="add">确 认</el-button>
        <el-button class="whiteBtn">取 消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'

export default {
  data () {
    return {
      formData: {
        name: '',
        licensePlate: '',
        load: '',
        long: '',
        wide: '',
        high: ''
      }
    }
  },
  created () {
  },
  methods: {
    add () {
      api.configure.car.carAdd({
        name: this.formData.name,
        licensePlate: this.formData.licensePlate,
        load: Number(this.formData.load),
        long: Number(this.formData.long),
        wide: Number(this.formData.wide),
        high: Number(this.formData.high)
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'truckManagement' }) // 添加成功后返回子公司列表
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trucklabel{
  margin:5px;
  font-size: 14px;
  }
  .title{
    padding: 17px 35px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .content{
  padding: 30px 35px;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 20px;
    .name{
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .table{
    margin-bottom: 20px;
  }
}
</style>
