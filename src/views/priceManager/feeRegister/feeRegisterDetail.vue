<template>
  <div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">运单信息</span>
      </el-row>
      <div style="color:#FB4E0C;font-size:22px">{{detailData.waybill_no}}</div>
      <el-descriptions :column="4">
        <el-descriptions-item label="客户编码">{{detailData.customer_code}}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{detailData.customer_name}}</el-descriptions-item>
        <el-descriptions-item label="目的国">{{detailData.country_name}}</el-descriptions-item>
        <el-descriptions-item label="目的国邮编">{{detailData.zipcode}}</el-descriptions-item>
        <el-descriptions-item label="报关类型">{{detailData.trade_type===1?'一般贸易报关':'非一般贸易报关'}}</el-descriptions-item>
        <el-descriptions-item label="清关类型">{{detailData.is_separate_customs_clearance===0?'非单独清关':'单独清关'}}</el-descriptions-item>
        <el-descriptions-item label="是否有保险">{{detailData.have_safe===0?'不购买':'购买'}}</el-descriptions-item>
        <el-descriptions-item label="品名">{{detailData.items}}</el-descriptions-item>
        <el-descriptions-item label="材质">{{detailData.material_cates}}</el-descriptions-item>
        <el-descriptions-item label="预报渠道">{{detailData.channel_name}}</el-descriptions-item>
        <el-descriptions-item label="代理名称">{{detailData.agent_name}}</el-descriptions-item>
        <el-descriptions-item label="代理渠道">{{detailData.agent_channel_name}}</el-descriptions-item>

        <el-descriptions-item label="客户结算重">{{detailData.customer_bill_weight}}</el-descriptions-item>
        <el-descriptions-item label="客户体积">{{detailData.customer_volume}}</el-descriptions-item>
        <el-descriptions-item label="客户重量">{{detailData.customer_weight}}</el-descriptions-item>
        <el-descriptions-item label="客户材积">{{detailData.customer_volume_weight}}</el-descriptions-item>
        <el-descriptions-item label="客户计费重">{{detailData.cost_weight}}</el-descriptions-item>
        <el-descriptions-item label="代理结算重">{{detailData.agent_bill_weight}}</el-descriptions-item>
        <el-descriptions-item label="代理体积">{{detailData.agent_volume}}</el-descriptions-item>
        <el-descriptions-item label="代理重量">{{detailData.agent_weight}}</el-descriptions-item>
        <el-descriptions-item label="代理材积">{{detailData.agent_volume_weight}}</el-descriptions-item>
        <el-descriptions-item label="备注">{{detailData.remark}}</el-descriptions-item>
        <el-descriptions-item label="内部备注">{{detailData.interior_remark}}</el-descriptions-item>

      </el-descriptions>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">申请追加费用</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col :span="4"><span style="color:#FB4702">合计应收：</span>{{detailData.amount_info.receivable}}元</el-col>
        <el-col :span="4"><span style="color:#FB4702">合计应付：</span>{{detailData.amount_info.account_payable}}元</el-col>
        <el-col :span="4"><span style="color:#FB4702">合计利润：</span>{{detailData.amount_info.receivable-detailData.amount_info.account_payable}}元</el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">费用登记单</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-button class="orangeBtn" @click="addFee"> 添加费用 </el-button>
        <el-table :data="amount_costs"  border :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column fixed prop="type" label="类型" width="200">
          </el-table-column>
          <el-table-column  prop="name" label="费用名称" width="200">
          </el-table-column>
          <el-table-column prop="type" label="费用类型" width="120">
            <template slot-scope="scope">
              {{scope.row.type===1?'基础运费':scope.row.type===2?'附加费':'其他'}}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" width="120">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="120">
            <template slot-scope="scope">
              {{scope.row.unit===1?'结算重':scope.row.unit===2?'票':'无'}}
            </template>
          </el-table-column>
          <el-table-column prop="unit_num" label="单位数量" width="120">
          </el-table-column>
          <el-table-column prop="formula" label="公式" width="120">
          </el-table-column>
          <el-table-column prop="bill_amount" label="金额" width="120">
          </el-table-column>
          <el-table-column prop="bill_target" label="结算对象" width="120">
            <template slot-scope="scope">
              {{scope.row.bill_target===1?'客户':scope.row.bill_target===2?'代理':'无'}}
            </template>
          </el-table-column>
          <el-table-column prop="bill_target_name" label="结算对象名称" width="120">
          </el-table-column>
          <el-table-column prop="user_name" label="录入人姓名" width="120">
          </el-table-column>
          <!-- <el-table-column prop="has_edit" label="是否允许修改" width="120">
          </el-table-column> -->
          <el-table-column prop="is_confirm" label="是否确认" width="120">
            <template slot-scope="scope">
              {{scope.row.is_confirm===1?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column prop="is_write_off" label="是否核销" width="120">
            <template slot-scope="scope">
              {{scope.row.is_write_off===1?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作"  width="200">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                :disabled='scope.row.has_edit===false'
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button type="text" size="small" :disabled='scope.row.has_edit===false'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col  style="margin-bottom:50px"><span style="color:#FB4702">附加费：</span>
            2000元</el-col>
      </el-row>
    </div>
    <div class="footer">
      <!-- <span>报价合计：</span>
      ￥ -->
      <el-button class="orangeBtn">确认核单</el-button>
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
      waybillId: undefined,
      detailData: {},
      amount_costs: [],
      tableData: [
        {
          name: '偏远地区附加费',
          type: '附加费',
          unitprice: '80元',
          unit: '公斤',
          num: '10',
          price: '800元',
          man: '张三'
        }, {
          name: '偏远地区附加费',
          type: '附加费',
          unitprice: '80元',
          unit: '公斤',
          num: '10',
          price: '800元',
          man: '张三'
        }, {
          name: '偏远地区附加费',
          type: '附加费',
          unitprice: '80元',
          unit: '公斤',
          num: '10',
          price: '800元',
          man: '张三'
        }, {}, {}, {}, {}, {}, {}, {}, {}
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.cost.price.enrolment.detail({ waybillId: this.waybillId }).then(res => {
        this.detailData = res.data
        this.amount_costs = res.data.amount_info.amount_costs
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  height: 63px;
  width: 100%;
  line-height: 63px;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.35);
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #E8E8E8;
  z-index: 999;
  // text-align: right;
}
.box {
  margin-bottom: 10px;
  padding-left: 20px;
  background: #ffffff;
  text-align: left;
}
.title {
  line-height: 40px;
  margin-bottom: 10px;
}
.input-with-select {
  width: 300px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
/deep/.el-input-group__append .el-button, .el-input-group__append .el-select, .el-input-group__prepend .el-button, .el-input-group__prepend .el-select{
    width:80px;
}
</style>
