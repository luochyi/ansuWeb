<template>
  <div>
      <img src="@/assets/welcome.png" alt="" class="img">
      <div style="font-size:48px;color:#333333;font-weight:500">WELCOME</div>
      <div style="font-size:20px;color:#333333;font-weight:400;margin-bottom:10px">欢迎进入安速物流管理后台</div>
      <el-button @click="enter">进入</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    enter () {
      this.$router.push({ name: 'orderManager' })
    }
  }
}
</script>

<style lang="scss" scoped>
.img{
    width: 600px;
    height: 320px;
    margin-top: 120px;
}
</style>
