
<template>
<div id='boxx'>
   <el-row type='flex' justify='flex-start' class='title' align='middle' >
      <span class='text'>新建员工账号</span>
    </el-row>
  <div class="box">
    <!--  标签页 -->
   <el-descriptions class="margin-top" :column="4" direction="vertical">
   <el-descriptions-item label="员工姓名">
       <el-input style="width: 200px" v-model="formData.name" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="员工手机">
        <el-input style="width: 200px" v-model="formData.phone" placeholder="请输入"></el-input>
        </el-descriptions-item>
         </el-descriptions>
        <el-descriptions class="margin" :column="4" direction="vertical">
   <el-descriptions-item label="部门" >
     <el-cascader
         :options="departments"
         v-model="formData.departmentId"
         :show-all-levels="false"
         :props="{  checkStrictly: true, expandTrigger: 'hover', label: 'name', value: 'id' }"
         clearable filterable
     ></el-cascader>
   </el-descriptions-item>
   <el-descriptions-item label="职位" >
     <el-cascader
         :options="positions"
         v-model="formData.positionId"
         :show-all-levels="false"
         :props="{  checkStrictly: true, expandTrigger: 'hover', label: 'name', value: 'id' }"
         clearable filterable
     ></el-cascader>
   </el-descriptions-item>
   </el-descriptions>
         <el-descriptions class="margin-top" :column="4" direction="vertical">
   <el-descriptions-item label="登陆账号" >
       <el-input style="width: 200px" v-model="formData.username" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="登陆密码">
       <el-input style="width: 200px" placeholder="请输入" v-model="formData.password" show-password></el-input>
   </el-descriptions-item>
   <!-- <el-descriptions-item label="确认密码">
       <el-input style="width: 200px" placeholder="请输入" v-model="formData.confirmPassword" show-password></el-input>
   </el-descriptions-item> -->
   </el-descriptions>
   <el-form >
    <el-form-item size="large">
    <el-button type="primary" @click="add" class="orangeBtn long2">确定</el-button>
    <!-- <el-button class='whiteBtn long2' @click="back" style="color:rgba(251, 71, 2, 1)">取消</el-button> -->
    </el-form-item>
   </el-form>
  </div>
  <!-- 生成随机密码 -->
   <el-dialog title="生成随机密码" :visible.sync="password" width="30%">
               <div class="input" >
               <br><span>随机密码：LDKDLJ3432</span><br>
               </div>
               <span slot="footer" class="password-footer">
                <el-button  @click="password = false" class='orangeBtn'>复制密码</el-button>
                 <el-button @click="password = false" class='wuBtn'>返回</el-button>
               </span>
            </el-dialog>
</div>
</template>

<script>

export default {
  data () {
    return {
      // 单选框
      password: false, // 生成随机密码
      formData: {
        name: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        departmentId: [],
        positionId: []
      },
      departments: [], // 部门信息
      positions: [] // 职位信息
    }
  },
  mounted () {
    this.department()
    this.position()
  },
  methods: {
    department () {
      this.$api.configure.departmentAll().then(res => {
        this.departments = res.data
      })
    },
    position () {
      this.$api.configure.positionAll().then(res => {
        this.positions = res.data
      })
    },
    back () { this.$router.push({ name: 'Employeeaccount' }) },
    add () {
      if (!this.formData.departmentId) {
        this.$message.error('请选择部门') // 错误提示
        return
      }
      if (!this.formData.positionId) {
        this.$message.error('请选择职位') // 错误提示
        return
      }
      this.$api.configure.personnel.add({
        name: this.formData.name,
        phone: this.formData.phone,
        username: this.formData.username,
        password: this.formData.password,
        confirmPassword: this.formData.confirmPassword,
        departmentId: Number(this.formData.departmentId.slice(-1)),
        positionId: Number(this.formData.positionId.slice(-1))
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'Employeeaccount' }) // 添加成功后返回
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    font-size: 16px;
    font-weight: 500;
    margin: 17px;
}
.box{
  height: 400px;
  margin: 25px;
background: #FFFFFF;
}
#boxx{
height: 914px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.boxa{
    width:1191px ;
    height: 300px;
    border: 1px solid #E9E9E9;
}
.top{
  border-top:1px solid #E9E9E9;
}
.el-form{
  margin: 10px;
    text-align: left;
}
.el-dialog{
  text-align: left;
}
.el-dialog{
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
.el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
.el-dialog__body {
    padding: 10px 15px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
.el-dialog__header {
    padding: 10px 10px ;
}
.el-dialog__footer{
  padding: 5px 10px ;
}
</style>
