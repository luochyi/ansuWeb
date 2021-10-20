<template>
 <div>
        <!-- 输入框-->
        <el-form :model="loginForm" label-width="0px" style="marginTop:200px">
          <!-- 用户名 -->
          <el-form-item>
            <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"  style="width:200px"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item>
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" style="width:200px"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item>
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>
export default {
  data () {
    return {
      provinceOptions: [],
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      let params = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      this.$api.common.login(params).then((res) => {
        if (res.code === 0) {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('id', res.data.personnel.id)
          sessionStorage.setItem('name', res.data.personnel.name)
          this.$router.push({ name: 'orderManager' })
        } else {
          this.$message.error('账号密码错误')
        }
      })
    }
  }
}
</script>

<style>
</style>
