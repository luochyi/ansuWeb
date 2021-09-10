<template>
  <div>
    <el-button @click="add">新增</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    add () {
      this.$router.push({ name: 'addTruck' })
    }
  }
}
</script>

<style>

</style>
