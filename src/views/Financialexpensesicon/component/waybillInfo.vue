<template>
  <div class="waybillInfo">
    <el-descriptions class="margin-top" title="运单信息" :column="3">
      <el-descriptions-item label="客户名称">{{ info.customer_name }}</el-descriptions-item>
      <el-descriptions-item label="运单编号">{{ info.waybill_no }}</el-descriptions-item>
      <el-descriptions-item label="业务员">{{ info.salesman_name }}</el-descriptions-item>
      <el-descriptions-item label="渠道">{{ info.channel_name }}</el-descriptions-item>
      <el-descriptions-item label="出仓渠道">{{ info.real_channel_name }}</el-descriptions-item>
      <el-descriptions-item label="出仓代理">{{ info.real_agent_name }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="发票信息" :column="3" v-if="info.invoice.has_invoice === 1">
      <el-descriptions-item label="申报价值">{{ info.invoice.declared_value + info.invoice.currency_name }}</el-descriptions-item>
      <el-descriptions-item label="品名">{{ info.invoice.items.length > 0 ? info.invoice.items[0].zh_name : ''}}</el-descriptions-item>
      <el-descriptions-item label="报关类型">{{ info.invoice.trade_type === 1  ? '一般贸易报关' : '非一般贸易报关'  }}</el-descriptions-item>
      <el-descriptions-item label="清关类型">{{ info.invoice.is_separate_customs_clearance === 1  ? '单独清关' : '非单独清关' }}</el-descriptions-item>
      <el-descriptions-item label="是否有保险">{{ info.invoice.have_safe  === 1 ? '投保' : '不投保' }}</el-descriptions-item>
      <el-descriptions-item label="货物材质">{{ info.invoice.material_cates.length > 0 ? info.invoice.material_cates[0].name : '' }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="重量信息" :column="3">
      <el-descriptions-item label="客户结算重">{{ info.bill_weight }}</el-descriptions-item>
      <el-descriptions-item label="客户改货重">{{ info.customer_bill_weight }}</el-descriptions-item>
      <el-descriptions-item label="出仓重">{{ info.agent_bill_weight }}</el-descriptions-item>
      <el-descriptions-item label="代理结算重">{{ info.agent_delivery_bill_weight }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="寄送地址" :column="3" v-if="info.type === 1">
      <el-descriptions-item label="目的国">{{ info.fba_address.country_name }}</el-descriptions-item>
      <el-descriptions-item label="仓库">{{ info.fba_address.fba_name }}</el-descriptions-item>
      <el-descriptions-item label="邮编">{{ info.fba_address.zip_code }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="寄送地址" :column="3" v-if="info.type === 2">
      <el-descriptions-item label="联系人">{{ info.address.name }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{ info.address.phone }}</el-descriptions-item>
      <el-descriptions-item label="联系邮箱">{{ info.address.email }}</el-descriptions-item>
      <el-descriptions-item label="国家">{{ info.address.country_name }}</el-descriptions-item>
      <el-descriptions-item label="地址">{{ info.address.address }}</el-descriptions-item>
      <el-descriptions-item label="邮编">{{ info.address.zip_code }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="其他" :column="1">
      <el-descriptions-item label="备注">{{ info.remark }}</el-descriptions-item>
      <el-descriptions-item label="内部备注">{{ info.interior_remark }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    waybillId: Number
  },
  data () {
    return {
      info: {
        type: 0,
        waybill_no: '',
        customer_name: '',
        customer_code: '',
        salesman_name: '',
        salesman_position_name: '',
        salesman_phone: '',
        driver_name: '',
        driver_position_name: '',
        driver_phone: '',
        created_at: '',
        good_time: '',
        receive_type: 1,
        box_count: 4,
        channel_name: '美国航空',
        fba_address: {
          country_name: '',
          fba_name: '',
          zip_code: ''
        },
        address: {
          country_name: '',
          zip_code: '',
          name: '',
          country_area_code: 0,
          phone: '',
          email: '',
          address: ''
        },
        remark: '',
        interior_remark: '',
        bill_weight: '',
        customer_bill_weight: '',
        agent_bill_weight: '',
        agent_delivery_bill_weight: '',
        real_channel_name: '',
        real_agent_name: '',
        invoice: {
          vat: '',
          trade_type: 0,
          is_deferred: 0,
          is_separate_customs_clearance: 0,
          amazon_reference_id: '',
          declared_value: '0',
          currency_name: '',
          items: [],
          material_cates: [],
          have_safe: 1,
          has_invoice: 1
        }
      }
    }
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.waybillInfo(this.waybillId).then(res => {
        this.info = res.data
      })
    }
  },
  watch: {
    waybillId () {
      console.log(this.waybillId)
      this.getData()
    }
  }
}
</script>

<style>
.two {
  height: 371px;
  background: #ffffff;
  padding: 10px;
  text-align: left;
  margin-bottom: 10px;
}
</style>
