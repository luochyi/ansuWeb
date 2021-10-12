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

          this.provinceOptions = []
          this.$api.common.settingRegionAll().then(res => {
            console.log(res)
            res.data && res.data.forEach(ele => {
              let province = {
                value: ele.id,
                label: ele.name,
                children: []
              }
              if (province.value === ele.id) {
                ele.children && ele.children.forEach(eles => {
                  let city = {
                    value: eles.id,
                    label: eles.name,
                    children: []
                  }
                  if (city.value === eles.id) {
                    eles.children && eles.children.forEach(item => {
                      let county = {
                        value: item.id,
                        label: item.name
                      }
                      city.children.push(county)
                    })
                  }
                  province.children.push(city)
                })
                province.children.push()
              }
              province.children.push()
              this.provinceOptions.push(province)
            })
          })
          console.log(this.provinceOptions)
          this.$store.commit('common/setPrint', this.provinceOptions)
          console.log(this.$store)
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
