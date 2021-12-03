<template>
    <div>
        <div class="box">
            <el-row style="line-height:50px;font-size:14px">
                <el-col :span='4'>未报价</el-col>
                <el-button class="orangeBtn">审核历史</el-button>
            </el-row>
        </div>
        <div class="box">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
                <span class='text'>运单信息</span>
            </el-row>
            <el-descriptions :column="4">
                <el-descriptions-item label="客户编码">SMJJ</el-descriptions-item>
                <el-descriptions-item label="客户名称">沙马</el-descriptions-item>
                <el-descriptions-item label="目的国">美国</el-descriptions-item>
                <el-descriptions-item label="目的国邮编">1111</el-descriptions-item>
                <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
                <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
                <el-descriptions-item label="是否有保险">是</el-descriptions-item>
                <el-descriptions-item label="品名">玩具</el-descriptions-item>
                <el-descriptions-item label="材质">带电</el-descriptions-item>
                <el-descriptions-item label="方数">30立方</el-descriptions-item>
                <el-descriptions-item label="实重">100公斤</el-descriptions-item>
                <el-descriptions-item label="材积重">90公斤</el-descriptions-item>
                <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
                <el-descriptions-item label="预报渠道">1111</el-descriptions-item>
                <el-descriptions-item label="备注">1111</el-descriptions-item>
                <el-descriptions-item label="内部备注">1111</el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="box">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
                <span class='text'>基础运价确认</span>
            </el-row>
            <el-row style="line-height:50px;font-size:14px">
                <el-col :span='4'>运费单价：18元/公斤</el-col>
                    <el-col :span='10'>单价调整：<el-input placeholder="" v-model="input" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="增加" value="1"></el-option>
                        <el-option label="减少" value="2"></el-option>
                        </el-select>
                        <template slot="append">元</template>
                    </el-input>
                    </el-col>
                <el-col :span='6'><el-button class="orangeBtn">确认</el-button></el-col>
            </el-row>
        </div>
        <div class="box">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
                <span class='text'>附加费明细</span>
            </el-row>
            <el-row style="line-height:50px;font-size:14px">
                <el-button class="orangeBtn">
                    添加附加费
                </el-button>
            </el-row>
        </div>
        <div class="footer">
            <span>报价合计：</span>
            ￥
            <el-button class="orangeBtn">确认报价</el-button>
            <el-button class="whiteBtn">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      input: '',
      waybillId: null
    }
  },
  mounted () {
    if (this.$route.params.waybillId === undefined) {
      this.$router.go(-1)
    }
    this.waybillId = this.$route.params.waybillId
    this.getData()
  },
  methods: {
    getData () {
      this.$api.cost.price.offer.detail({ waybillId: this.waybillId }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
    background: #ffffff;
    position: fixed;
    bottom: 0;
    height: 63px;
    width: 100%;
    line-height: 63px;
    // text-align: right;
}
.box{
    margin-bottom: 10px;
    padding-left: 20px;
    background: #ffffff;
    text-align: left;
}
.title{
    line-height: 40px;
    margin-bottom: 10px;
}
.input-with-select{
    width: 300px;
}
</style>
