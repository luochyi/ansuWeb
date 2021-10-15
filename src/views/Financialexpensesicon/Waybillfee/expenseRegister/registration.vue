<template>
  <div class='main'>
    <div class="two">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>运单信息</span>
      </el-row>
      <el-descriptions class="margin-top" title="AS202012120001" :column="2" :size="size">
        <el-descriptions-item label="客户名称">深圳沙马家具贸易有限公司</el-descriptions-item>
        <el-descriptions-item label="业务员">张三</el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" column="4" :size="size">
        <el-descriptions-item label="目的国">美国</el-descriptions-item>
        <el-descriptions-item label="目的国邮编">19999</el-descriptions-item>
        <el-descriptions-item label="申报价值">1000美元</el-descriptions-item>
        <el-descriptions-item label="品名">玩具</el-descriptions-item>
        <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
        <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
        <el-descriptions-item label="是否有保险">有保险</el-descriptions-item>
        <el-descriptions-item label="货物">带电</el-descriptions-item>
        <el-descriptions-item label="预报渠道">以星特快UPS派送</el-descriptions-item>
        <el-descriptions-item label="入仓渠道">以星特快UPS派送</el-descriptions-item>
        <el-descriptions-item label="出仓渠道">以星特快UPS派送</el-descriptions-item>
        <el-descriptions-item label="入仓代理">天图供应链有限公司</el-descriptions-item>
        <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
        <el-descriptions-item label="改货重">10公斤</el-descriptions-item>
        <el-descriptions-item label="出仓重">70公斤</el-descriptions-item>
        <el-descriptions-item label="代理结算重">80公斤</el-descriptions-item>
        <el-descriptions-item label="货物数量">12件</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="备注">走以星</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="内部备注">走以星报美森</el-descriptions-item>
      </el-descriptions>
    </div>
    <br>
    <br>
    <div class="three">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>登记费用</span>
      </el-row>
      <div class="infoBox">
        <el-row>
          <el-col :span='2'>
            <el-select v-model="formData.amountType">
              <el-option v-for="item in options.amountType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='4'>
            <el-input v-model='formData.name' placeholder='费用名称'></el-input>
          </el-col>
          <el-col :span='2'>
            <el-input v-model='formData.num' placeholder='数量' type="number"></el-input>
          </el-col>
          <el-col :span='3'>
            <el-input v-model='formData.formula' placeholder='公式'></el-input>
          </el-col>
          <el-col :span='2'>
            <el-input v-model='formData.price' placeholder='单价' type="number"></el-input>
          </el-col>
          <el-col :span='2'>
            <el-select v-model="formData.unit">
              <el-option v-for="item in options.unit" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='2'>
            <el-select v-model="formData.taxType" >
              <el-option v-for="item in options.taxType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='2' v-show="formData.taxType === 1">
            <el-select v-model="formData.taxRate">
              <el-option v-for="item in options.taxRate" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='7'>
            <el-select v-model="formData.type" placeholder="费用名称">
              <el-option v-for="item in options.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='7'>
            <el-select v-model="formData.billTarget" placeholder="结算对象">
              <el-option v-for="item in options.billTarget" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="add">确定</el-button>
            <el-button class='whiteBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <br>
    <div class="four">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>费用登记单</span>
        <el-button @click="gen">生成确认单</el-button>
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
              <el-button type="text" @click="detailspage"> 修改</el-button>
              <span style="color: #0084FF; margin: 0px 5px">|</span>
              <el-button type="text" @click="deleted(scoped.row)"> 删除</el-button>
            </template>
          </template>
        </el-table-column>
      </commonTable>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
        { prop: 'amount_type', label: '类型', width: '56', align: 'center', formatter: this.formatter },
        { prop: 'name', label: '费用名称', width: '56', align: 'center' },
        { prop: 'type', label: '费用类型', width: '56', align: 'center', formatter: this.formatter },
        { prop: 'bill_target_name', label: '结算对象', width: '56', align: 'center' },
        { prop: 'price', label: '单价', width: '56', align: 'center' },
        { prop: 'unit', label: '单位', width: '56', align: 'center', formatter: this.formatter },
        { prop: 'unit_num', label: '数量', width: '56', align: 'center' },
        { prop: 'amount', label: '费用', width: '56', align: 'center' },
        { prop: 'tax_amount', label: '税金', width: '56', align: 'center' },
        { prop: 'bill_amount', label: '结算费用', width: '56', align: 'center' },
        { prop: 'user_name', label: '登记员', width: '56', align: 'center' },
        { prop: 'is_confirm', label: '是否生成确认', width: '56', align: 'center', formatter: this.formatter },
        { prop: 'is_write_off', label: '是否核销', width: '56', align: 'center', formatter: this.formatter }
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
    deleted (row) {
      this.$api.finance.fare.enrolment.deleted({
        waybillId: Number(this.basicInfo.waybillId),
        costId: row.id
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
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

.first {
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}

.right {
  float: left;
  width: 1028px;
  height: 988px;
  background: #E8EBF2;
  border-radius: 4px;
  border: 1px solid #E8E8E8;
  margin: auto 20px;
}

.one {
  background: #FFFFFF;
  width: 988px;
  height: 63px;
}

.two {
  height: 371px;
  background: #FFFFFF;
  width: 988px;
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
  width: 988px;
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
  width: 988px;
}

.four {
  height: 402px;
  background: #FFFFFF;
  width: 988px;
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
