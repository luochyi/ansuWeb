<template>
  <div class="bg">
    <div class="loginHead">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="loginContent">
      <img src="../assets/logo.png" alt="">
      <div class="fontbox">
        <el-row><span class="loginTitle">安速货运</span></el-row>
        <el-row><span class="loginTip">专注于亚马逊头程运输</span></el-row>
      </div>
      <div>
        <el-input v-model="loginForm.username" placeholder="账号"></el-input>
        <el-input v-model="loginForm.password" placeholder="密码" show-password style="marginTop:20px"></el-input>
        <el-button class="longbtn" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
    </div>
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

<style lang="scss" scoped>
.bg{
  background-color: #E8EBF2;
  height: 100vh;
}
.loginHead{
  background-color: #FFFFFF;
  height: 100px;
  width: 100%;
  text-align: left;
  img{
    width: 88px;
    height: 42px;
    margin:29px 0 0 55px
  }
}
.loginContent{
  text-align: left;
  width: 286px;
  height: 448px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  margin-top: 97px ;
  margin-left: 40%;
  padding:35px 50px 0 50px;
  img{
    width: 105px;
    height: 50px;
    margin-bottom:20px ;
  }
  .fontbox{
    padding-bottom: 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid #E9E9E9;
  }
  .loginTitle{
    font-size: 26px;
    font-weight: 600;
  }
  .loginTip{
    font-size: 20px;
    font-weight: normal;
  }
  .longbtn{
    width: 100%;
    background: #FA6400;
    height: 40px;
    color: #FFFFFF;
    margin-top: 30px;
  }
}
</style>>
