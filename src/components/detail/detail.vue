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
        :contentClassName="item.contentClassName"
        labelClassName='labelClass'
      >
        <span>{{ item.value }}</span>
        <span v-if="item.type==='slot'"><el-button type="text" @click="check(item)">查看</el-button></span>
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
    check (val) {
      this.$emit('check', val)
    }
  }
}
</script>
<style lang="scss">
.detail_box {
  background: #ffffff;
  padding-left:31px;
  padding-top: 10px;
}

.labelClass{
  color: rgba(0, 0, 0, 0.85);
}
</style>
