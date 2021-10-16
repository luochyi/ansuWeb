<template>
  <div class='main'>
    <Info :data="waybillData"></Info>
    <div class="four">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>&nbsp;&nbsp;费用登记单</span>
              <el-button class='whiteBtn ' @click="gen">生成确认单</el-button>
              <el-button class='orangeBtn long1'  @click="newRegistration">新增费用登记</el-button>
      </el-row>
      <commonTable
          :columns="columns"
          :data="tableData"
          :paginationShow="false"
      >
        <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="105"
            :resizable="false"
        >
          <template slot-scope="scoped">
            <template v-if="scoped.row.source_type === 3 && scoped.row.is_confirm === 0">
              <el-button type="text" @click="edit(scoped.row)"> 修改</el-button>
              <span style="color: #0084FF; margin: 0px 5px">|</span>
              <el-button type="text" @click="deleted(scoped.row)"> 删除</el-button>
            </template>
          </template>
        </el-table-column>
      </commonTable>
    </div>
    <el-dialog
      title="费用登记"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
          <div class="infoBox">
        <el-row class="elrow">

          <el-col :span='12' ><span>类型：</span>
            <el-select v-model="formData.amountType">
              <el-option v-for="item in options.amountType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="elrow">
          <el-col :span='12'>
            <span>费用名称：</span><el-input v-model='formData.name' placeholder='请输入费用名称'></el-input>
          </el-col>
        </el-row>
        <el-row class="elrow">
          <el-col :span='4'>
            <span>数量：</span>
            <el-input v-model='formData.num' placeholder='请输入数量' type="number"></el-input>
          </el-col>
          <el-col :span='4'>
            <span>公式：</span>
            <el-input v-model='formData.formula' placeholder='请输入公式'></el-input>
          </el-col>
        </el-row>
        <el-row class="elrow">
          <el-col :span='6'>
            <span>单价：</span>
            <el-input v-model='formData.price' placeholder='请输入单价' type="number"></el-input>
          </el-col>
          <el-col :span='6'>
            <span>类型：</span>
            <el-select v-model="formData.unit">
              <el-option v-for="item in options.unit" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="elrow">
          <el-col :span='4'>
            <el-select v-model="formData.taxType" >
              <el-option v-for="item in options.taxType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='4' v-show="formData.taxType === 1">
            <el-select v-model="formData.taxRate">
              <el-option v-for="item in options.taxRate" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="elrow">
          <el-col :span='12'>
            <span>费用类型：</span>
            <el-select v-model="formData.type" placeholder="请选择费用类型">
              <el-option v-for="item in options.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='12'>
            <span>结算对象：</span>
            <el-select v-model="formData.billTarget" placeholder="请选择结算对象">
              <el-option v-for="item in options.billTarget" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="add" v-if="costId===null">提 交</el-button>
        <el-button type="primary" @click="editSubmit" v-else>提交修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Info from '@/views/Financialexpensesicon/component/waybillInfo.vue'
export default {
  components: {
    Info
  },
  data () {
    return {
      waybillData: {
        code: 'AS20201111',
        customerName: 'XXX公司', // 客户名称
        salesman: '张三', // 业务员
        country: '中国', // 目的国
        postalCode: '11111', // 目的国邮编
        price: '2000美元', // 申报价值
        cate: '玩具', // 品名
        declareType: '一般贸易', // 报关类型
        clearanceType: '单独清关', // 清关类型
        isInsurance: 1, // 是否保险 0否1是
        goods: '带电', // 货物
        prediction: '以星特快UPS派送', // 预报渠道
        warehousing: '以星特快UPS派送', // 入仓渠道
        outwarehouse: '以星特快UPS派送', // 出仓渠道
        WarehousingAgent: '以星特快UPS派送', // 入仓代理
        settlementWeight: '100公斤', // 结算重
        changeWeight: '100公斤', // 改货重
        outWeight: '100公斤', // 出仓重
        agentWeight: '100公斤', // 代理结算重
        num: '10', // 货物数量
        remarks: '走以星', // 备注
        inRemarks: '走以星报美森'// 内部备注
      },
      dialogVisible: false, // 新增费用登记
      costId: null,
      basicInfo: {
        waybillId: 0
      },
      options: {
        amountType: [{ value: 1, label: '收入' }, { value: 2, label: '支出' }],
        unit: [{ value: 1, label: '公斤' }, { value: 2, label: '票' }, { value: 3, label: '品名' }, { value: 4, label: '箱子' }],
        taxType: [{ value: 1, label: '含税' }, { value: 2, label: '包税' }, { value: 3, label: '无税' }],
        taxRate: [{ value: 3, label: '3%' }, { value: 7, label: '7%' }, { value: 12, label: '12%' }],
        type: [{ value: 1, label: '运费' }, { value: 2, label: '附加费' }, { value: 3, label: '其他' }],
        billTarget: [{ value: 1, label: '客户' }, { value: 2, label: '代理' }]
      },
      formData: {
        amountType: 1,
        name: '',
        num: null,
        formula: '',
        price: null,
        unit: 2,
        type: 2,
        taxType: 1,
        taxRate: 3,
        billTarget: null
      },
      columns: [
        { prop: 'amount_type', label: '类型', align: 'center', formatter: this.formatter },
        { prop: 'name', label: '费用名称', align: 'center' },
        { prop: 'type', label: '费用类型', align: 'center', formatter: this.formatter },
        { prop: 'bill_target_name', label: '结算对象', align: 'center' },
        { prop: 'price', label: '单价', align: 'center' },
        { prop: 'unit', label: '单位', align: 'center', formatter: this.formatter },
        { prop: 'unit_num', label: '数量', align: 'center' },
        { prop: 'amount', label: '费用', align: 'center' },
        { prop: 'tax_amount', label: '税金', align: 'center' },
        { prop: 'bill_amount', label: '结算费用', align: 'center' },
        { prop: 'user_name', label: '登记员', align: 'center' },
        { prop: 'is_confirm', label: '是否生成确认', align: 'center', formatter: this.formatter },
        { prop: 'is_write_off', label: '是否核销', align: 'center', formatter: this.formatter }
      ],
      tableData: []
    }
  },
  mounted () {
    this.basicInfo.waybillId = this.$route.params.id
    this.getData()
  },
  methods: {
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'amount_type':
          return row.amount_type === 1 ? '收入' : '支出'
        case 'type':
          return this.getOptionsLabel(this.options.type, row.type)
        case 'unit':
          return this.getOptionsLabel(this.options.unit, row.unit)
        case 'is_confirm':
          return row.is_confirm === 1 ? '已生成' : '未生成'
        case 'is_write_off':
          return row.is_write_off === 1 ? '已核销' : '未核销'
      }
    },
    getOptionsLabel (array, value) {
      for (let i in array) {
        if (array[i].value === value) {
          return array[i].label
        }
      }
      return ''
    },
    getData () {
      this.$api.finance.fare.enrolment.all({
        waybillId: Number(this.basicInfo.waybillId)
      }).then(res => {
        this.tableData = res.data
      })
    },
    edit (data) {
      // console.log(data)
      this.costId = data.id
      this.formData.amountType = data.amount_type
      this.formData.name = data.name
      this.formData.num = data.unit_num
      this.formData.formula = data.formula
      this.formData.price = data.price
      this.formData.unit = data.unit
      this.formData.type = data.type
      this.formData.taxType = data.tax_type
      this.formData.taxRate = data.tax_rate
      this.formData.billTarget = data.bill_target
      this.dialogVisible = true
    },
    add () {
      this.$api.finance.fare.enrolment.add({
        waybillId: Number(this.basicInfo.waybillId),
        enrolmentDatas: [{
          amountType: Number(this.formData.amountType),
          name: this.formData.name,
          unitNum: Number(this.formData.num),
          formula: this.formData.formula,
          price: Number(this.formData.price),
          unit: Number(this.formData.unit),
          type: Number(this.formData.type),
          taxType: Number(this.formData.taxType),
          taxRate: Number(this.formData.taxRate),
          billTarget: Number(this.formData.billTarget)
        }]
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    editSubmit () {
      this.$api.finance.fare.enrolment.edit({
        waybillId: Number(this.basicInfo.waybillId),
        costId: Number(this.costId),
        amountType: Number(this.formData.amountType),
        name: this.formData.name,
        unitNum: Number(this.formData.num),
        formula: this.formData.formula,
        price: Number(this.formData.price),
        unit: Number(this.formData.unit),
        type: Number(this.formData.type),
        taxType: Number(this.formData.taxType),
        taxRate: Number(this.formData.taxRate),
        billTarget: Number(this.formData.billTarget)
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
          this.handleClose()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    deleted (row) {
      this.$api.finance.fare.enrolment.deleted({
        waybillId: Number(this.basicInfo.waybillId),
        costId: row.id
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
          this.handleClose()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    gen () {
      this.$api.finance.fare.confirm.customer.gen(this.basicInfo.waybillId).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
      this.costId = null
      this.formData = {
        amountType: 1,
        name: '',
        num: null,
        formula: '',
        price: null,
        unit: 2,
        type: 2,
        taxType: 1,
        taxRate: 3,
        billTarget: null
      }
    },
    newRegistration () {
      this.dialogVisible = true
    }
  }
}

</script>
<style lang="scss" scoped>
.title {
  height: 56px;
  font-size: 16px;
}

.left {
  float: left;
  width: 212px;
  height: 1877px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E8E8E8;
  text-align: left;
}
.elrow{
  margin: 20px;
}
.first {
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}
/deep/.el-dialog__body{
  height: 400px;
}
.one {
  background: #FFFFFF;
  width: 988px;
  height: 63px;
}

.el-descriptions {
  margin: auto 30px;
}

.title .text {
  width: 100px;
}

.three {
  height: 520px;
  background: #FFFFFF;
  // width: 988px;
}

.infoBox {
  margin-bottom: 20px;

  /deep/ .el-input {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }

    .el-input__icon {
      line-height: 24px;
    }
  }

  .box_title {
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }

  .info {
    display: flex;
    margin-bottom: 10px;
    margin: 20px;

    .name {
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 14px 0;
}

.three {
  height: 195px;
  background: #FFFFFF;
  // width: 988px;
}

.four {
  height: 402px;
  background: #FFFFFF;
  // width: 988px;
}

/deep/ .el-dialog {
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .el-dialog__header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

}

/deep/ .el-dialog {
  text-align: left;
  width: 988px;
}
.long1{
  width: 120px;
}
//biankuang
/deep/ .el-dialog__body {
  padding: 10px 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/deep/ .el-dialog__header {
  padding: 10px 10px;
}

/deep/ .el-dialog__footer {
  padding: 5px 10px;
}

.el-col-24 {
  width: 130px;
}
</style>
