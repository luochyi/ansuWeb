<template>
  <div><button @click="add">ADD</button></div>
</template>

<script>
export default {
  methods: {
    add () {
      this.$router.push({ name: 'addFBA' })
    }
  }
}
</script>

<style>

</style>
