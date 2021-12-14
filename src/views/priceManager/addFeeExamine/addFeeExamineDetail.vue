<template>
  <div>
    <div class="box" style="height: 50px; line-height: 50px">
      <el-row>
        <el-col :span="4">
          {{detailData.additional_amount.audit_status===0?'未申请':detailData.additional_amount.audit_status===1?'审核中':detailData.additional_amount.audit_status===2?'审核通过':'审核驳回'}}
        </el-col>
        <el-col :span="4">
          <el-button @click="auditHistory" class="orangeBtn">审核历史</el-button>
        </el-col>
      </el-row>
      </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">运单信息</span>
      </el-row>
      <div style="font-size: 22px; color: #fb4702">
        {{ detailData.waybill_no }}
      </div>
      <el-descriptions :column="4">
        <el-descriptions-item label="客户编码">{{
          detailData.customer_code
        }}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{
          detailData.customer_name
        }}</el-descriptions-item>
        <el-descriptions-item label="目的国">{{
          detailData.country_name
        }}</el-descriptions-item>
        <el-descriptions-item label="目的国邮编">{{
          detailData.zipcode
        }}</el-descriptions-item>
        <el-descriptions-item label="报关类型">{{
          detailData.trade_type === 1 ? "一般贸易报关" : "非一般贸易报关"
        }}</el-descriptions-item>
        <el-descriptions-item label="清关类型">{{
          detailData.is_separate_customs_clearance === 1 ? "是" : "否"
        }}</el-descriptions-item>
        <el-descriptions-item label="是否有保险">{{
          detailData.have_safe === 1 ? "是" : "否"
        }}</el-descriptions-item>
         <el-descriptions-item label="品名"
          ><el-button type="text" @click="itemsDrawer = true" size="mini"
            >查看</el-button
          ></el-descriptions-item
        >
        <el-descriptions-item label="材质"
          ><el-button type="text" @click="cateDrawer = true" size="mini"
            >查看</el-button
          ></el-descriptions-item
        >
        <el-descriptions-item label="客户结算重">{{
          detailData.customer_bill_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="代理结算重">{{
          detailData.customer_bill_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="渠道名称">{{
          detailData.channel_name
        }}</el-descriptions-item>
        <el-descriptions-item label="代理名称">{{
          detailData.agent_name
        }}</el-descriptions-item>
        <el-descriptions-item label="代理渠道名称">{{
          detailData.agent_channel_name
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{
          detailData.remark
        }}</el-descriptions-item>
        <el-descriptions-item label="内部备注">{{
          detailData.interior_remark
        }}</el-descriptions-item>
        <el-descriptions-item label="渠道名称">{{
          detailData.channel_name
        }}</el-descriptions-item>
        <el-descriptions-item label="渠道名称">{{
          detailData.channel_name
        }}</el-descriptions-item>
        <el-descriptions-item label="渠道名称">{{
          detailData.channel_name
        }}</el-descriptions-item>
        <el-descriptions-item label="渠道名称">{{
          detailData.channel_name
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">费用明细</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-table
          :data="amountCosts"
          border
          :header-cell-style="{ background: '#F5F5F6' }"
        >
          <el-table-column prop="name" label="费用名称" width="200">
          </el-table-column>
          <el-table-column prop="type" label="费用类型" width="200">
            <template slot-scope="scope">{{scope.row.type===1?'基础运费':scope.row.type===2?'附加费':'其他'}}</template>
          </el-table-column>
          <el-table-column prop="unitprice" label="单价" width="130">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="130">
             <template slot-scope="scope">{{scope.row.unit===1?'结算重':'票'}}</template>
          </el-table-column>
          <el-table-column prop="unit_num" label="数量" width="130">
          </el-table-column>
          <el-table-column prop="formula" label="公式" width="130">
          </el-table-column>
          <el-table-column prop="bill_amount" label="金额" width="130">
          </el-table-column>
          <el-table-column prop="bill_target" label="结算对象" width="130">
            <template slot-scope="scope">{{scope.row.bill_target===1?'客户':'代理'}}</template>
          </el-table-column>
          <el-table-column prop="bill_target_name" label="结算对象姓名">
          </el-table-column>
          <el-table-column prop="user_name" label="录价人" width="120">
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small"
                >修改</el-button
              >
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-divider></el-divider>
        <el-row style="line-height: 10px; height: 30px; font-size: 14px">
          <!-- <el-col :span="4"
            ><span style="color: #fb4702">合计应收：</span>2000元</el-col
          >
          <el-col :span="4"
            ><span style="color: #fb4702">合计应付：</span>800元</el-col
          >
          <el-col :span="4"
            ><span style="color: #fb4702">合计利润：</span>1200元</el-col
          > -->
        </el-row>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">申请追加费用</span>
      </el-row>
      <el-table
        :data="additionalAmount.costs"
        style="width: 1000px"
        border
        :header-cell-style="{ background: '#F5F5F6' }"
      >
        <el-table-column prop="name" label="费用名称" width="200">
        </el-table-column>
        <el-table-column prop="type" label="费用类型" width="120">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100">
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="130">
          <template slot-scope="scope">{{scope.row.unit===1?'结算重':'票'}}</template>
        </el-table-column>
        <el-table-column prop="unit_num" label="数量" width="100"> </el-table-column>
        <el-table-column prop="bill_target" label="结算对象" width="130">
            <template slot-scope="scope">{{scope.row.bill_target===1?'客户':'代理'}}</template>
          </el-table-column>
        <el-table-column prop="amount" label="金额" width="100">
        </el-table-column>
        <el-table-column prop="bill_target_name" label="结算对象名称" width="120">
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div style="margin-bottom:100px;line-height:60px">追加说明：{{detailData.additional_amount.explain}}</div>
    </div>
    <div class="footer">
      <!-- <span>合计追加：</span>
      ￥ -->
      <el-button class="orangeBtn" @click="adopt">通过</el-button>
      <el-button class="whiteBtn" @click="reject">驳回</el-button>
      <el-button class="batch" size="small" @click="goback">返回</el-button>
    </div>
    <!-- 查看材质 -->
    <commonDrawer :drawerVrisible="cateDrawer" drawerTitle="查看材质">
      <div class="dra-content" style="textalign: left; padding: 10px">
        <div class="table" style="margin-top: 16px">
          <div v-if="detailData.material_cates.length === 0">无</div>
          <div v-for="(item, index) in detailData.material_cates" :key="index">
            {{ detailData.material_cates[index] }} <el-divider></el-divider>
          </div>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-gray" @click="cateDrawer = false">
          <span>关闭</span>
        </button>
      </div>
    </commonDrawer>
    <!-- 查看品名 -->
    <commonDrawer :drawerVrisible="itemsDrawer" drawerTitle="查看品名">
      <div class="dra-content" style="textalign: left; padding: 10px">
        <div class="table" style="margin-top: 16px">
          <div v-if="detailData.items.length === 0">无</div>
          <div v-for="(item, index) in detailData.items" :key="index">
            {{ detailData.items[index] }} <el-divider></el-divider>
          </div>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-gray" @click="itemsDrawer = false">
          <span>关闭</span>
        </button>
      </div>
    </commonDrawer>
      <!-- 查看审核历史 -->
         <commonDrawer
             :drawerVrisible="hisDrawer" drawerTitle="审核历史"
            >
            <div class="dra-content" style="textAlign:left;padding:10px">
                <div class="table" style="margin-top:16px">
                    <el-table :data="historyData">
                      <el-table-column prop="explain" label="追加说明"></el-table-column>
                      <el-table-column prop="audit_status" label="审核状态">
                        <template slot-scope="scope">
                          {{scope.row.audit_status===1?'审核中':scope.row.audit_status===2?'审核通过':'审核驳回'}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="audit_at" label="审核时间">
                        <template slot-scope="scope">
                          {{formatDate(scope.row.audit_at,'yyyy-MM-dd')}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="audit_user" label="审核人"></el-table-column>
                      <el-table-column prop="fail_reason" label="驳回原因"></el-table-column>
                      <el-table-column prop="apply_user" label="申请人"></el-table-column>
                      <el-table-column prop="created_at" label="追加申请时间">
                        <template slot-scope="scope">
                          {{formatDate(scope.row.created_at,'yyyy-MM-dd')}}
                        </template>
                      </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <button class="btn-gray" @click="hisDrawer=false">
                <span>关闭</span>
                </button>
            </div>
      </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      input: '',
      explain: '',
      historyData: [],
      hisDrawer: false, // 历史审核抽屉
      waybillId: undefined,
      cateDrawer: false, // 品名材质
      itemsDrawer: false,
      tableData: [],
      detailData: {
        additional_amount: {},
        material_cates: [],
        items: []
      },
      amountCosts: [],
      additionalAmount: {
        costs: []
      }
    }
  },
  mounted () {
    if (this.$route.params.waybillId === undefined) {
      this.goback()
    }
    this.waybillId = this.$route.params.waybillId
    this.getData()
  },
  methods: {
    getData () {
      this.$api.cost.price.additional
        .info({ waybillId: this.waybillId })
        .then((res) => {
          this.detailData = res.data
          this.amountCosts = res.data.amount_costs
          this.additionalAmount = res.data.additional_amount
        })
    },
    goback () {
      this.$router.go(-1)
    },
    // 查看审核历史
    auditHistory () {
      this.$api.cost.price.additional.examineHistory({ waybillId: this.waybillId }).then(res => {
        this.historyData = res.data
        this.hisDrawer = true
      })
    },
    additionalAdd () {
      let params = {
        waybillId: this.waybillId,
        explain: this.explain,
        costs: this.additionalAmount.costs
      }
      this.$api.cost.price.additional.add(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.goback()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    adopt () {
      this.$api.cost.price.additional.examineAdopt({ waybillId: this.waybillId }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.goback()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reject () {
      this.dialog = true
    },
    rejectSubmit () {
      this.$api.cost.price.additional.examineReject({ waybillId: this.waybillId, rejectReason: this.rejectReason }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.goback()
        } else {
          this.$message.error(res.msg)
        }
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
  border: 1px solid #e8e8e8;
  z-index: 999;
  left: 201px;
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
/deep/.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
  width: 80px;
}
</style>
