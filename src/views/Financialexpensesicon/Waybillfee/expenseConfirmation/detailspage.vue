<template>
  <div>
    <div class="content">
      <div class="one" v-if="waybillAmount.fare.audit_status === 3">
        <div class="reason">驳回原因：{{ waybillAmount.fare.fail_reason }}</div>
      </div>
      <br>
      <div class="two">
        <Info :waybillId="waybillId">
        </Info>
      </div>
      <br>
      <div class="four">
        <el-row type='flex' justify='flex-start' class='title' align='middle'>
          <span class='text'>基础运价确认</span>
        </el-row>
        <div class="infoBox">
          <el-row class="info">
            <el-col>
              <div class="name" style="marginTop:5px">运费模式：{{ waybillAmount.type === 1 ? '单价' : waybillAmount.type === 2 ? '金额' : '首续重' }}</div>
            </el-col>
            <el-col :span="10" class="flex align-center" v-if="waybillAmount.type === 1">
              <div class="name">单价调整：</div>
              <el-col :span="10">
                <el-input placeholder="请输入" v-model="formData.adjustPrice" type="Number" style="width:195px" :disabled="!hasEdit">
                  <template slot="prepend">
                    <el-select v-model="formData.adjustType" style="width:80px">
                      <el-option v-for="item in options.adjustType" :key="item.value" :value="item.value"
                                 :label="item.label"></el-option>
                    </el-select>
                  </template>
                  <i slot="suffix" class="el-input__icon">元</i>
                </el-input>
              </el-col>
            </el-col>
            <el-col :span="10" class="flex align-center">
              <el-col :span='6'>
                <el-select v-model="formData.taxType" :disabled="!hasEdit">
                  <el-option v-for="item in options.taxType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span='6' v-show="formData.taxType === 1">
                <el-select v-model="formData.taxRate" :disabled="!hasEdit">
                  <el-option v-for="item in options.taxRate" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </div>
      <br>
      <div class="five">
        <el-row type='flex' justify='flex-start' class='title' align='middle'>
          <span class='text'>附加费用明细</span>
        </el-row>
        <el-row>
          <commonTable
              :columns="columns"
              :data="formData.surcharges"
              :paginationShow="false"
          >
            <el-table-column
                slot="table_oper"
                align="center"
                fixed="right"
                label="操作"
                width="152"
                :resizable="false"
            >
              <template slot-scope="scoped" v-if="hasEdit">
                <el-button type="text" @click="edit(scoped.$index, scoped.row)"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="del(scoped.$index)"> 删除</el-button>
              </template>
            </el-table-column>
          </commonTable>
        </el-row>
      </div>
      <br>
      <div class="six">
        <el-row style="float: left;">
          <el-button class="orangeBtn" @click="dialogAddPrice" v-if="hasEdit">添加附加费</el-button>
        </el-row>
        <el-row style="float: right;">
          <el-button class="orangeBtn" icon="el-icon-circle-check" @click="formData.adjustPrice && formData.adjustPrice !== '0' ? showRemark() : offer()" v-if="hasEdit">确认报价</el-button>
          <el-button class="wthBtn">取消</el-button>
        </el-row>
      </div>
    </div>
    <!-- 费用登记 -->
    <el-dialog
        title="附加费"
        :visible.sync="dialog.price"
        width="30%">
      <div>
        <div class="infoBox">
          <el-row class="elrow">
            <el-col :span='12'>
              <span>费用名称：</span><el-input v-model='dialog.priceForm.name' placeholder='请输入费用名称'></el-input>
            </el-col>
          </el-row>
          <el-row class="elrow">
            <el-col :span='4'>
              <span>数量：</span>
              <el-input v-model='dialog.priceForm.num' placeholder='请输入数量' type="number"></el-input>
            </el-col>
          </el-row>
          <el-row class="elrow">
            <el-col :span='6'>
              <span>单价：</span>
              <el-input v-model='dialog.priceForm.price' placeholder='请输入单价' type="number"></el-input>
            </el-col>
            <el-col :span='6'>
              <span>类型：</span>
              <el-select v-model="dialog.priceForm.unit">
                <el-option v-for="item in options.unit" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="elrow" style="marginTop:10px">
            <el-col :span='4'>
              <el-select v-model="dialog.priceForm.taxType" >
                <el-option v-for="item in options.taxType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span='4' v-show="dialog.priceForm.taxType === 1">
              <el-select v-model="dialog.priceForm.taxRate">
                <el-option v-for="item in options.taxRate" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.price = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="dialog.priceForm.priceIndex === null">提 交</el-button>
        <el-button type="primary" @click="editSubmit" v-else>提交修改</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="改价理由"
        :visible.sync="dialog.remark"
        width="30%">
      <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入改价理由"
          maxlength="255"
          v-model="formData.customerRemark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.remark = false">取 消</el-button>
        <el-button type="primary" @click="offer">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Info from '../../component/waybillInfo'
export default {
  components: { Info },
  data () {
    return {
      waybillId: 0,
      hasEdit: true,
      waybillAmount: {
        additionalWeight: null,
        additionalWeightPrice: null,
        amount: null,
        customerBillWeight: null,
        firstWeight: null,
        firstWeightPrice: null,
        price: null,
        type: null,
        fare: {
          audit_status: null,
          fail_reason: null
        }
      },
      columns: [
        { prop: 'name', label: '费用名称', width: '176', align: 'center' },
        { prop: 'price', label: '单价', width: '176', align: 'center' },
        { prop: 'unit', label: '单位', width: '176', align: 'center', formatter: this.formatter },
        { prop: 'num', label: '数量', width: '176', align: 'center' },
        { prop: 'amount', label: '费用', width: '176', align: 'center', formatter: this.formatter },
        { prop: 'tax', label: '税金', width: '176', align: 'center', formatter: this.formatter },
        { prop: 'bill_amount', label: '结算费用', width: '176', align: 'center', formatter: this.formatter }
      ],
      formData: {
        waybillId: 0,
        adjustType: 1,
        adjustPrice: null,
        taxType: 1,
        taxRate: 3,
        customerRemark: '',
        surcharges: []
      },
      options: {
        adjustType: [{ value: 1, label: '增加' }, { value: 2, label: '减少' }, { value: 3, label: '乘以' }],
        amountType: [{ value: 1, label: '收入' }, { value: 2, label: '支出' }],
        unit: [{ value: 1, label: '公斤' }, { value: 2, label: '票' }, { value: 3, label: '品名' }, { value: 4, label: '箱子' }],
        taxType: [{ value: 1, label: '含税' }, { value: 2, label: '包税' }, { value: 3, label: '无税' }],
        taxRate: [{ value: 3, label: '3%' }, { value: 7, label: '7%' }, { value: 12, label: '12%' }],
        type: [{ value: 1, label: '运费' }, { value: 2, label: '附加费' }, { value: 3, label: '其他' }],
        billTarget: [{ value: 1, label: '客户' }, { value: 2, label: '代理' }]
      },
      dialog: {
        remark: false,
        price: false,
        priceForm: {
          priceIndex: null,
          name: null,
          price: null,
          num: null,
          unit: null,
          taxType: null,
          taxRate: null
        }
      },
      textarea: '',
      confirm: false,
      Tips: false,
      active: 0, // 步骤条
      value1: 1,
      size: '',
      Deletedestination: false, // 删除目的国
      activeName: '1', // 标签绑定
      Approvaldetails: false // 审批详情
    }
  },
  mounted () {
    this.waybillId = this.$route.params.waybillId
    this.formData.waybillId = this.waybillId
    this.getAmount()
  },
  methods: {
    getAmount () {
      this.$api.finance.fare.waybill.amount(this.waybillId).then(res => {
        this.waybillAmount = {
          additionalWeight: res.data.additional_weight,
          additionalWeightPrice: res.data.additional_weight_price,
          amount: res.data.amount,
          customerBillWeight: res.data.customer_bill_weight,
          firstWeight: res.data.first_weight,
          firstWeightPrice: res.data.first_weight_price,
          price: res.data.price,
          type: res.data.type,
          fare: {
            audit_status: res.data.fare.audit_status,
            fail_reason: res.data.fare.fail_reason
          }
        }
        if (res.data.fare.audit_status > 0) {
          if (res.data.fare.audit_status === 1 || res.data.fare.audit_status === 2) {
            this.hasEdit = false
          }
          this.formData.taxRate = res.data.fare.tax_rate
          this.formData.taxType = res.data.fare.tax_type
          this.formData.adjustPrice = res.data.fare.adjust_price
          this.formData.adjustType = res.data.fare.adjust_type
          if (res.data.fare.surcharges) {
            this.formData.surcharges = []
            res.data.fare.surcharges.forEach(item => {
              this.formData.surcharges.push({
                name: item.name,
                type: 2,
                price: item.price,
                num: item.unit_num,
                unit: item.unit,
                taxType: item.tax_type,
                taxRate: item.tax_rate
              })
            })
          }
        }
      })
    },
    dialogAddPrice () {
      this.dialog.price = true
      this.dialog.priceForm = {
        priceIndex: null,
        name: null,
        type: 2,
        price: null,
        num: null,
        unit: null,
        taxType: null,
        taxRate: null
      }
    },
    add () {
      this.formData.surcharges.push({
        name: this.dialog.priceForm.name,
        type: 2,
        price: this.dialog.priceForm.price,
        num: this.dialog.priceForm.num,
        unit: this.dialog.priceForm.unit,
        taxType: this.dialog.priceForm.taxType,
        taxRate: this.dialog.priceForm.taxRate
      })
      this.dialog.price = false
    },
    editSubmit () {
      this.formData.surcharges[this.dialog.priceForm.priceIndex] = {
        name: this.dialog.priceForm.name,
        type: 2,
        price: this.dialog.priceForm.price,
        num: this.dialog.priceForm.num,
        unit: this.dialog.priceForm.unit,
        taxType: this.dialog.priceForm.taxType,
        taxRate: this.dialog.priceForm.taxRate
      }
      this.dialog.price = false
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'unit':
          return this.getOptionsLabel(this.options.unit, row.unit)
        case 'amount':
          return row.price * row.num
        case 'tax':
          return row.taxType === 1 ? (row.price * row.num / 100.0 * row.taxRate).toFixed(2) : 0
        case 'bill_amount':
          return (row.price * row.num - ((row.price * row.num / 100.0 * row.taxRate).toFixed(2))).toFixed(2)
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
    del (index) {
      this.formData.surcharges.splice(index, 1)
    },
    edit (index, row) {
      this.dialog.price = true
      this.dialog.priceForm = {
        priceIndex: index,
        name: row.name,
        price: row.price,
        num: row.num,
        unit: row.unit,
        taxType: row.taxType,
        taxRate: row.taxRate
      }
    },
    showRemark () {
      if (this.formData.adjustPrice && this.formData.adjustPrice !== '') {
        this.dialog.remark = true
      }
    },
    offer () {
      if (this.waybillAmount.fare.audit_status === 3) {
        this.$api.finance.fare.confirm.reOffer(this.formData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg) // 成功提示
            this.getAmount()
            this.dialog.remark = false
          } else {
            this.$message.error(res.msg) // 错误提示
          }
        })
      } else {
        this.$api.finance.fare.confirm.offer(this.formData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg) // 成功提示
            this.getAmount()
            this.dialog.remark = false
          } else {
            this.$message.error(res.msg) // 错误提示
          }
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.title{
 height: 56px;
 font-size: 16px;
}
.first{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}
.right{
float: left;
height: 1337px;
background: #E8EBF2;
border-radius: 4px;
border: 1px solid #E8E8E8;
margin: auto 20px;
}
.one{
    background: #FFFFFF ;
    height:63px ;
}
.two{
    height: auto;
    background: #FFFFFF ;
}
.el-descriptions{
    margin: auto  30px;
}
.title .text {
    width: 100px;
}
.three{
    height:520px ;
    background: #FFFFFF ;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 10px;
    margin: 20px;
    .name{
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
.four{
    background: #FFFFFF ;
}
.five{
    height:136px ;
    background: #FFFFFF ;
}
.six{
    height:63px ;
    background: #FFFFFF ;
    margin-top: 20px;
}
/deep/ .el-dialog{
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

}
/deep/ .el-dialog{
  text-align: left;
  width: 988px;
}
//biankuang
/deep/ .el-dialog__body {
    padding: 10px 15px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
.el-col-24{
  width: 130px;
}
.reason{
  line-height: 63px;
  text-align: left;
  padding-left: 10px;
}
</style>
