<template>
  <div class="content">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">订单详情</span>
      </el-row>
      <!-- 订单信息 -->
        <commonDetail
            :detailTitle='orderTitle'
            :detailData='order'
            @check='checkData'
        ></commonDetail>
        <el-divider></el-divider>
        <!-- 客户信息 -->
        <commonDetail
            :detailTitle='customerTitle'
            :detailData='customer'
            @check='checkData'
        ></commonDetail>
        <el-divider></el-divider>
        <!-- 返回list -->
        <el-button class="orangeBtn" @click="back">返 回</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderTitle: '订单信息', // 设置box的标题
      order: [
        {
          label: '订单编号', // 详情信息的label
          value: 'AXC1232', // 详情信息的值
          contentClassName: 'boxClass', // 设置单独样式
          type: 'button' // 查看按钮
        },
        {
          label: '订单编号',
          value: 'AXC1232'
        },
        {
          label: '订单编号',
          value: 'AXC1232'
        },
        {
          label: '订单编号',
          value: 'AXC1232'
        }
      ],
      // 第二块数据
      customerTitle: '客户信息',
      customer: [
        {
          label: '客户姓名',
          value: 'AXC1232'
        },
        {
          label: '客户姓名',
          value: 'AXC1232'
        },
        {
          label: '客户姓名',
          value: 'AXC1232'
        },
        {
          label: '客户姓名',
          value: 'AXC1232'
        }
      ]
    }
  },
  methods: {
    checkData (data) {
      console.log(data)
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.$api.getDetail({ id: this.$route.params.id }).then(res => {
      // 把获取值赋值
    })
  }
}
</script>

<style>
  .boxClass{
    color:red
  }
</style>>
