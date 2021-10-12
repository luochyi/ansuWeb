<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span>操作员负责仓库</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
        <el-row style="borderBottom:1px solid #E9E9E9;paddingBottom:20px">
            <el-col :span="8">仓库操作：{{ basicInfo.name }}</el-col>
            <el-col :span="8">职位：{{ basicInfo.position_name }}</el-col>
        </el-row>
        <div class="item">
            <div style="margin:20px 0 10px 0">负责仓库</div>
            <div><el-input class="elipt" size="mini"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input></div>
            <el-button class="orangeBtn">确 认</el-button>
            <el-button class="whiteBtn">取 消</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      basicInfo: {
        id: 0,
        name: '',
        position_name: ''
      }
    }
  },
  mounted () {
    this.basicInfo.id = this.$route.params.id
    this.basicInfo.name = this.$route.params.name
    this.basicInfo.position_name = this.$route.params.position_name
  },
  methods: {
    set () {
      this.$api.configure.warehouse.set({
        userId: this.basicInfo.id,
        warehouseId: 0
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'warehouseOperation' }) // 添加成功后返回列表
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
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
</style>
