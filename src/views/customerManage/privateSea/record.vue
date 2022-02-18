<template>
<div id="boxx">
<div id="box">
  <div class="add">
    <span class='text'>拜访时间</span>
      <el-input v-model="visitTime" placeholder="请选择拜访时间"></el-input>
      <span class='text'>随行人员</span>
      <el-input v-model="personnelIds" placeholder="请选择随性人员"></el-input>
      <span class='text'>拜访记录</span>
      <el-input v-model="record" type="textarea" :rows="2" placeholder="请输入拜访记录"  >
</el-input>
      <span class='text'>拜访总结</span>
      <el-input v-model="remark" type="textarea" :rows="2" placeholder="请输入拜访总结" >
</el-input>
      <el-button @click="submit" class='orangeBtn long1'>确 定</el-button>
      <el-button @click="submit" class='wuBtn long1'>取 消</el-button>
  </div>
</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      provinceOptions: [],
      dialogVisible: false,
      add: '',
      visitTime: '',
      record: '',
      remark: '',
      personnelIds: '',
      countyId: 4

    }
  },
  methods: {
    submit () {
      // 给请求参数赋值
      let resData = {
        countyId: this.countyId,
        visitTime: this.visitTime,
        record: this.record,
        remark: this.remark,
        personnelIds: this.personnelIds
      }
      // 把请求参数传输至后端，并且获取接口返回的结果res
      this.$api.customer.recordAdd(resData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'recordLists' }) // 添加成功后返回拜访记录
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    // 级联选择器选择
    handleChange (val) {
      console.log(val)
      console.log(this.provinceOptions) // 打印级联选择器的options
      this.countyId = val[2] // 区域id
    }
  }
}
</script>

<style lang="scss" scoped>
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
.el-input__inner{
  width: 390px;
}
.el-textarea__inner{
   width: 390px;
}
.el-descriptions {
  font-size: 16px;
  color: #303133;
  line-height: 22px;
}
</style>
