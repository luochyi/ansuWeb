<template>
  <div class="content">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">订单详情</span>
      </el-row>
        <commonDetail
            :detailTitle='orderTitle'
            :detailData='order'
            @check='checkData'
        ></commonDetail>
        <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderTitle: '订单信息',
      order: [
        {
          label: '订单编号',
          value: 'AXC1232',
          contentClassName: 'boxclass', // 设置单独样式
          type: 'button' // 查看按钮
        },
        {
          label: '订单编号',
          value: 'AXC1232'
        },
        {
          label: '订单编号',
          value: 'AXC1232'
        }, {
          label: '订单编号',
          value: 'AXC1232'
        }
      ]
    }
  },
  methods: {
    checkData (data) {
      console.log(data)
    }
  },
  mounted () {
    // this.$api
  }
}
</script>

<style lang="scss" scoped>

</style>>
