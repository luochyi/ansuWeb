<template>
  <div class="detail_box">
    <el-descriptions
    :title="detailTitle"
    :column="3"
    >
      <el-descriptions-item
        v-for="(item, index) in detailData"
        :key="index"
        :label="item.label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'commonDetail',
  props: {
    detailTitle: String,
    detailData: Array
  },
  methods: {
    handleClose () {
      // this.$emit('handleClose', 'Close')
    }
  }
}
</script>
<style lang="scss">
.detail_box {
  width: 100%;
}
</style>
