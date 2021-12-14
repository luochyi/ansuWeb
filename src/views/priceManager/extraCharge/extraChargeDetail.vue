<template>
  <div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">运单信息</span>
      </el-row>
      <div style="color: #fb4e0c; font-size: 22px">
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
          detailData.is_separate_customs_clearance === 0
            ? "非单独清关"
            : "单独清关"
        }}</el-descriptions-item>
        <el-descriptions-item label="是否有保险">{{
          detailData.have_safe === 0 ? "不购买" : "购买"
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
        <el-descriptions-item label="预报渠道">{{
          detailData.channel_name
        }}</el-descriptions-item>
        <el-descriptions-item label="客户结算重">{{
          detailData.customer_bill_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="客户体积">{{
          (detailData.customer_volume / 1000000).toFixed(2) + "m³"
        }}</el-descriptions-item>
        <el-descriptions-item label="客户重量">{{
          detailData.customer_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="客户材积">{{
          detailData.customer_volume_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="客户计费重">{{
          detailData.cost_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="代理结算重">{{
          detailData.agent_bill_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="代理体积">{{(detailData.agent_volume / 1000000).toFixed(2) + "m³"
        }}</el-descriptions-item>
        <el-descriptions-item label="代理重量">{{
          detailData.agent_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="代理材积">{{
          detailData.agent_volume_weight
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{
          detailData.remark
        }}</el-descriptions-item>
        <el-descriptions-item label="内部备注">{{
          detailData.interior_remark
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">费用登记单</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-button class="orangeBtn" @click="addFee"> 添加费用 </el-button>
        <el-table
          :data="amount_costs"
          border
          :header-cell-style="{ background: '#F5F5F6' }"
        >
          <el-table-column label="费用名称" prop="name"></el-table-column>
          <el-table-column label="费用类型" prop="type">
            <template slot-scope="scope">{{
              scope.row.type === 1
                ? "基础运费"
                : scope.row.type === 2
                ? "附加费"
                : "其他"
            }}</template>
          </el-table-column>
          <el-table-column prop="price" label="单价" width="120">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="120">
            <template slot-scope="scope">
              {{
                scope.row.unit === 1
                  ? "结算重"
                  : scope.row.unit === 2
                  ? "票"
                  : "无"
              }}
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
              {{
                scope.row.bill_target === 1
                  ? "客户"
                  : scope.row.bill_target === 2
                  ? "代理"
                  : "无"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="bill_target_name"
            label="结算对象名称"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="user_name" label="录入人姓名" width="120">
          </el-table-column>
          <!-- <el-table-column prop="has_edit" label="是否允许修改" width="120">
          </el-table-column> -->
          <el-table-column prop="is_confirm" label="是否确认" width="120">
            <template slot-scope="scope">
              {{ scope.row.is_confirm === 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="is_write_off" label="是否核销" width="120">
            <template slot-scope="scope">
              {{ scope.row.is_write_off === 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                type="text"
                size="small"
                :disabled="scope.row.has_edit === false"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.has_edit === false"
                @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-col style="margin-bottom: 50px">
          <!-- <span style="color: #fb4702">附加费：</span> 2000元 -->
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <!-- <span>报价合计：</span>
      ￥ -->
      <div style="margin-left: 400px">
        <!-- <el-button class="orangeBtn">确认核单</el-button> -->
        <el-button class="whiteBtn" @click="goback">返回</el-button>
      </div>
    </div>
    <!-- 查看材质 -->
    <commonDrawer :drawerVrisible="cateDrawer" drawerTitle="查看材质">
      <div class="dra-content" style="textalign: left; padding: 10px">
        <div class="table" style="margin-top: 16px">
          <div v-if="detailData.material_cates.length === 0">
            无<el-divider></el-divider>
          </div>
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
          <div v-if="detailData.items.length === 0">
            无<el-divider></el-divider>
          </div>
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
    <el-dialog
      title="添加费用"
      :visible.sync="addFeeDia"
      width="25%"
      :before-close="diaClose"
    >
      <div style="text-align: left">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="small"
          label-width="93px"
          label-position="top"
        >
          <el-form-item label="费用名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入费用名称"
              clearable
              :style="{ width: '60%' }"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input
              v-model="formData.price"
              placeholder="请输入单价"
              clearable
              :style="{ width: '60%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="unit">
            <el-select
              v-model="formData.unit"
              placeholder="请选择单位"
              clearable
              :style="{ width: '60%' }"
            >
              <el-option
                v-for="(item, index) in unitOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公式" prop="formula">
            <el-input
              v-model="formData.formula"
              placeholder="请输入"
              clearable
              :style="{ width: '60%' }"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="结算对象" prop="billTarget">
            <el-select
              v-model="formData.billTarget"
              placeholder="请选择"
              clearable
              :style="{ width: '60%' }"
            >
              <el-option
                v-for="(item, index) in billTargetOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      input: '',
      addFeeDia: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入费用名称',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入单价',
            trigger: 'blur'
          }
        ],
        unit: [
          {
            required: true,
            message: '请选择单位',
            trigger: 'change'
          }
        ],
        formula: [
          {
            required: true,
            message: '请输入公式',
            trigger: 'blur'
          }
        ],
        billTarget: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ]
      },
      unitOptions: [
        {
          label: '结算重',
          value: 1
        },
        {
          label: '票',
          value: 2
        }
      ],
      billTargetOptions: [
        {
          label: '客户',
          value: 1
        },
        {
          label: '代理',
          value: 2
        }
      ],
      formData: {
        costId: undefined,
        name: undefined,
        price: undefined,
        unit: undefined,
        formula: undefined,
        billTarget: undefined
      },
      waybillId: undefined,
      cateDrawer: false, // 品名材质
      itemsDrawer: false,
      detailData: {
        amount_info: {},
        material_cates: [],
        items: []
      },
      amount_costs: [],
      tableData: []
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
      this.$api.cost.price.waybill
        .detail({ waybillId: this.waybillId })
        .then((res) => {
          this.detailData = res.data
          this.amount_costs = res.data.amount_costs
        })
    },
    goback () {
      this.$router.go(-1)
    },
    // 添加附加费
    addFee () {
      this.addFeeDia = true
    },
    edit (row) {
      this.addFeeDia = true
      this.formData.name = row.name
      this.formData.price = row.price
      this.formData.unit = row.unit
      this.formData.costId = row.id
      this.formData.formula = row.formula
      this.formData.billTarget = row.bill_target
      // formula
      // billTarget
    },
    del (row) {
      this.$api.cost.price.waybill
        .del({ waybillId: this.waybillId, costId: row.id })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 添加附加费
    submitForm () {
      this.$refs.elForm.validate((valid) => {
        if (!valid) return
        if (this.formData.costId === undefined) {
          this.$api.cost.price.waybill
            .add({
              waybillId: this.waybillId,
              name: this.formData.name,
              price: this.formData.price,
              unit: this.formData.unit,
              formula: this.formData.formula,
              billTarget: this.formData.billTarget
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
        } else {
          this.$api.cost.price.waybill
            .edit({
              waybillId: this.waybillId,
              costId: this.formData.costId,
              name: this.formData.name,
              price: this.formData.price,
              unit: this.formData.unit,
              formula: this.formData.formula,
              billTarget: this.formData.billTarget
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
        }
      })
    },
    diaClose () {
      this.$refs.elForm.resetFields()
      this.addFeeDia = false
    },
    resetForm () {
      this.$refs.elForm.resetFields()
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
