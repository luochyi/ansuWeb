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
        <el-descriptions-item label="品名"><el-button type="text" @click="itemsDrawer = true" size="mini">查看</el-button></el-descriptions-item>
        <el-descriptions-item label="材质"><el-button type="text" @click="cateDrawer = true" size="mini">查看</el-button></el-descriptions-item>
        <el-descriptions-item label="预报渠道">{{detailData.channel_name}}</el-descriptions-item>
        <el-descriptions-item label="计费重">{{detailData.cost_weight}}</el-descriptions-item>
        <el-descriptions-item label="备注">{{detailData.remark}}</el-descriptions-item>
        <el-descriptions-item label="内部备注">{{detailData.interior_remark}}</el-descriptions-item>

      </el-descriptions>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">应收合计</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col :span="4"><span style="color:#FB4702">基础运费：</span>{{detailData.amount.base_amount}}元</el-col>
        <el-col :span="4"><span style="color:#FB4702">附加费：</span>{{detailData.amount.surcharge_amount}}元</el-col>
        <el-col :span="4"><span style="color:#FB4702">其他费用：</span>{{detailData.amount.other_amount}}元</el-col>
        <el-col :span="4"><span style="color:#FB4702">合计费用：</span>{{Number(detailData.amount.base_amount) + Number(detailData.amount.surcharge_amount) + Number(detailData.amount.other_amount)}}元</el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">费用登记单</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-button class="orangeBtn" @click="addFee"> 添加费用 </el-button>
        <!-- <el-button class="orangeBtn" @click="gen"> 生成费用确认单 </el-button> -->
        <el-table :data="amount_costs"  border :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column  prop="name" label="费用名称" width="200">
          </el-table-column>
          <el-table-column prop="price" label="单价" width="220">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="220">
            <template slot-scope="scope">
              {{scope.row.unit===1?'结算重':scope.row.unit===2?'票':'无'}}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="220">
          </el-table-column>
          <el-table-column prop="user_name" label="录入人姓名" width="220">
          </el-table-column>
          <!-- <el-table-column prop="has_edit" label="是否允许修改" width="220">
          </el-table-column> -->
          <el-table-column prop="is_confirm" label="是否确认" width="220">
            <template slot-scope="scope">
              {{scope.row.is_confirm===1?'是':'否'}}
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
        <el-col  style="margin-bottom:50px">
          <!-- <span style="color:#FB4702">附加费：</span>
            2000元 -->
            </el-col>
      </el-row>
    </div>
    <div class="footer">
      <!-- <span>报价合计：</span>
      ￥ -->
      <div style="margin-left:400px">
      <el-button class="orangeBtn">确认核单</el-button>
      <el-button class="whiteBtn" @click="goback()">取消</el-button>
      </div>
    </div>
    <el-dialog
            title="添加费用"
            :visible.sync="addFeeDia"
            width="25%"
            :before-close="diaClose">
            <div style="text-align:left">
                <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="93px" label-position="top">
                    <el-form-item label="费用名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入费用名称" clearable :style="{width: '60%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="单价" prop="price">
                        <el-input v-model="formData.price" placeholder="请输入单价" clearable :style="{width: '60%'}"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit">
                        <el-select v-model="formData.unit" placeholder="请选择单位" clearable :style="{width: '60%'}">
                        <el-option v-for="(item, index) in unitOptions" :key="index" :label="item.label" :value="item.value"
                            :disabled="item.disabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                    </el-form>
            </div>
    </el-dialog>
    <!-- 查看材质 -->
         <commonDrawer
             :drawerVrisible="cateDrawer" drawerTitle="查看材质"
            >
            <div class="dra-content" style="textAlign:left;padding:10px">
                <div class="table" style="margin-top:16px">
                        <div v-if="detailData.material_cates.length===0">无</div>
                        <div v-for="item,index in detailData.material_cates" :key="index">{{detailData.material_cates[index]}} <el-divider></el-divider></div>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <button class="btn-gray" @click="cateDrawer=false">
                <span>关闭</span>
                </button>
            </div>
        </commonDrawer>
        <!-- 查看品名 -->
         <commonDrawer
             :drawerVrisible="itemsDrawer" drawerTitle="查看品名"
            >
            <div class="dra-content" style="textAlign:left;padding:10px">
                <div class="table" style="margin-top:16px">
                    <div v-if="detailData.items.length===0">无</div>
                    <div v-for="item,index in detailData.items" :key="index">{{detailData.items[index]}} <el-divider></el-divider></div>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <button class="btn-gray" @click="itemsDrawer=false">
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
      waybillId: undefined,
      addFeeDia: false,
      cateDrawer: false, // 品名材质
      itemsDrawer: false,
      detailData: {
        amount: {}
      },
      amount_costs: [],
      formData: {
        name: undefined,
        price: undefined,
        unit: undefined
      },
      tableData: [],
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
      rules: {
        name: [{
          required: true,
          message: '请输入费用名称',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入单价',
          trigger: 'blur'
        }],
        unit: [{
          required: true,
          message: '请选择单位',
          trigger: 'change'
        }]
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
      this.$api.cost.price.waybill.detail({ waybillId: this.waybillId }).then(res => {
        this.detailData = res.data
        this.amount_costs = res.data.amount.surcharges
      })
    },
    // 添加附加费
    addFee () {
      this.addFeeDia = true
    },
    // 添加附加费
    submitForm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.$api.cost.price.waybill.add({
          waybillId: this.waybillId,
          name: this.formData.name,
          price: this.formData.price,
          unit: this.formData.unit
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    diaClose () {
      this.$refs.elForm.resetFields()
      this.addFeeDia = false
    },
    resetForm () {
      this.$refs.elForm.resetFields()
    },
    // gen () {
    //   this.$api.cost.price.waybill.gen({
    //     waybillId: this.waybillId
    //   }).then(res => {
    //     if (res.code === 0) {
    //       this.$message.success(res.msg)
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   })
    // },
    goback () {
      this.$router.go(-1)
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
