<template>
  <div>
    <div class="box">
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col :span="4">{{
          detailData.audit_status === 0
            ? "未改货"
            : detailData.audit_status === 1
            ? "审核中"
            : detailData.audit_status === 2
            ? "审核通过"
            : "审核驳回"
        }}</el-col>
        <el-col :span="4" v-show="detailData.audit_status > 1"
          >审核人：{{ detailData.audit_user_name }}</el-col
        >
        <el-col :span="4" v-show="detailData.audit_status === 3"
          >驳回原因：{{ detailData.fail_reason }}</el-col
        >
        <!-- <el-button class="orangeBtn" @click="auditHistory">审核历史</el-button> -->
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">改货说明</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col>{{ detailData.explain }}</el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">修改重量</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col
          ><span style="color: #fb4e0c; font-size: 22px">预报单号</span
          ><span> &nbsp;客户名称：{{ customerName }}</span></el-col
        >
        <el-col>
          运单号：<el-input
            style="width: 200px; margin-right: 10px"
            size="mini"
          ></el-input
          ><el-button class="orangeBtn">查询</el-button>
        </el-col>
        <el-button class="orangeBtn" @click="cargos" :disabled="formData.cargoes.ids.length === 0"> 批量修改尺寸 </el-button>
        <el-button class="whiteBtn" @click="editHistory"> 改重记录 </el-button>
        <el-table
          :data="cargoes"
          border
          @selection-change="chooseRow"
          style="width: 1100px; margin-bottom: 100px"
          :header-cell-style="{ background: '#F5F5F6' }"
        >
          <el-table-column fixed type="selection" > </el-table-column>
          <el-table-column fixed prop="cargo_no" label="货件编号" width="200">
          </el-table-column>
          <el-table-column prop="length" label="长" width="120">
          </el-table-column>
          <el-table-column prop="width" label="宽" width="120">
          </el-table-column>
          <el-table-column prop="height" label="高" width="120">
          </el-table-column>
          <el-table-column prop="volume" label="方数" width="180">
            <template slot-scope="scope">
              {{ (scope.row.volume / 1000000).toFixed(2) + "m³" }}
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="实重"> </el-table-column>
          <el-table-column prop="volume_weight" label="材积重" width="100">
          </el-table-column>
          <!-- <el-table-column prop="zhouchang" label="周长" width="120">
          </el-table-column> -->
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="cargo(scope)" type="text" size="small"
                >修改重量</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div class="footer">
      <!-- <span>报价合计：</span>
      ￥ -->
      <el-button class="orangeBtn" @click="adopt" v-if="detailData.audit_status<2">确认改货</el-button>
      <el-button class="whiteBtn" @click="reject" v-if="detailData.audit_status<2">驳回改货</el-button>
      <el-button class="whiteBtn" @click="calc">计算费用</el-button>
      <el-button class="whiteBtn" @click="goback">取消</el-button>
    </div>
    <commonDrawer
      :drawerVrisible="hisDrawer"
      drawerTitle="改重历史"
      drawerSize="60%"
    >
      <div class="dra-content" style="textalign: left; padding: 10px">
        <div class="table" style="margin-top: 16px">
          <el-table :data="hisData">
            <el-table-column prop="audit_status" label="审核状态" width="120">
              <template slot-scope="scope">
                {{
                  scope.row.audit_status === 0
                    ? "未改货"
                    : scope.row.audit_status === 1
                    ? "审核中"
                    : scope.row.audit_status === 2
                    ? "审核通过"
                    : "审核驳回"
                }}
              </template>
            </el-table-column>
            <el-table-column prop="audit_at" label="审核时间" width="120">
              <template slot-scope="scope">
                {{ formatDate(scope.row.audit_at, "yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="audit_user" label="审核人" width="120">
            </el-table-column>
            <el-table-column prop="fail_reason" label="驳回原因" width="120">
            </el-table-column>
            <el-table-column prop="explain" label="改货说明" width="200">
            </el-table-column>
            <el-table-column
              prop="before_bill_weight"
              label="改前结算重"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="after_bill_weight"
              label="改后结算重"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="created_at" label="申请时间" width="120">
              <template slot-scope="scope">
                {{ formatDate(scope.row.created_at, "yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-gray" @click="hisDrawer = false">
          <span>关闭</span>
        </button>
      </div>
    </commonDrawer>
    <el-dialog
      title="改重"
      :visible.sync="cargoDia"
      width="27%"
      :before-close="cargoClose"
    >
      <div style="text-align: left">
        <el-form
          ref="elForm"
          :model="rowData"
          size="small"
          label-width="20px"
          label-position="left"
        >
          <el-form-item label="长" prop="field101">
            <el-input
              v-model="rowData.length"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="宽" prop="field103">
            <el-input
              v-model="rowData.width"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="高" prop="field102">
            <el-input
              v-model="rowData.height"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="重" prop="field104">
            <el-input
              v-model="rowData.weight"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" @click="cargoClose">取消</el-button>
        <el-button  class="orangeBtn" @click="cargoSubmit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
            title="批量改货"
            :visible.sync="cargosDia"
            width="26%">
          <span style="textAlign:left;marginLeft:20px">
              <el-row><el-checkbox v-model="formData.cargoes.lengthSwitch">长</el-checkbox><el-input size="mini" :style="{ width: '80%' }" type="Number" v-model="formData.cargoes.length" :disabled="!formData.cargoes.lengthSwitch" class="ipt"><template slot="append">cm</template></el-input></el-row>
              <el-row><el-checkbox v-model="formData.cargoes.widthSwitch">宽</el-checkbox><el-input size="mini" :style="{ width: '80%' }" type="Number" v-model="formData.cargoes.width" :disabled="!formData.cargoes.widthSwitch" class="ipt"><template slot="append">cm</template></el-input></el-row>
              <el-row><el-checkbox v-model="formData.cargoes.heightSwitch">高</el-checkbox><el-input size="mini" :style="{ width: '80%' }" type="Number" v-model="formData.cargoes.height" :disabled="!formData.cargoes.heightSwitch" class="ipt"><template slot="append">cm</template></el-input></el-row>
              <el-row><el-checkbox v-model="formData.cargoes.weightSwitch">重</el-checkbox><el-input size="mini" :style="{ width: '80%' }" type="Number" v-model="formData.cargoes.weight" :disabled="!formData.cargoes.weightSwitch" class="ipt"><template slot="append">kg</template></el-input></el-row>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="cargosClose">取 消</el-button>
              <el-button class="orangeBtn" type="primary" @click="cargosSubmit">确 定</el-button>
          </span>
    </el-dialog>
    <commonDrawer
      :drawerVrisible="calcDrawer"
      drawerTitle="计算费用"
      drawerSize="80%"
    >
      <div class="dra-content" style="textalign: left; padding: 10px">
        <div class="box">
          <el-row type="flex" justify="flex-start" class="title" align="middle">
            <span class="text">改货前费用</span>
          </el-row>
          <el-row style="line-height: 50px; font-size: 14px">
            <el-descriptions v-if="calcDrawer">
                <el-descriptions-item label="计价方式">{{calcData.before_offer.type===1?'单价':calcData.before_offer.type===2?'金额':'首续重'}}</el-descriptions-item>
                <el-descriptions-item label="单价/金额">{{calcData.before_offer.price}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.before_offer.type===3"  label="首重">{{calcData.before_offer.first_weight}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.before_offer.type===3"  label="首重金额">{{calcData.before_offer.first_weight_price}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.before_offer.type===3"  label="续重">{{calcData.before_offer.additional_weight}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.before_offer.type===3"  label="续重金额">{{calcData.before_offer.additional_weight_price}}</el-descriptions-item>
                <el-descriptions-item label="调价类型">{{calcData.before_offer.adjust_type===1?'增加':'减少'}}</el-descriptions-item>
                <el-descriptions-item label="调价金额">{{calcData.before_offer.adjust_price}}</el-descriptions-item>
                <el-descriptions-item label="结算重">{{calcData.before_offer.bill_weight}}</el-descriptions-item>
                <el-descriptions-item label="计费重">{{calcData.before_offer.cost_weight}}</el-descriptions-item>
                <el-descriptions-item label="运费">{{calcData.before_offer.amount}}</el-descriptions-item>
            </el-descriptions>

          </el-row>
        </div>
        <div class="box">
          <el-row type="flex" justify="flex-start" class="title" align="middle">
            <span class="text">改货后费用</span>
          </el-row>
          <el-row style="line-height: 50px; font-size: 14px">
            <el-descriptions v-if="calcDrawer">
                <el-descriptions-item label="计价方式">{{calcData.after_offer.type===1?'单价':calcData.before_offer.type===2?'金额':'首续重'}}</el-descriptions-item>
                <el-descriptions-item label="单价/金额">{{calcData.after_offer.price}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.after_offer.type===3" label="首重">{{calcData.after_offer.first_weight}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.after_offer.type===3"  label="首重金额">{{calcData.after_offer.first_weight_price}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.after_offer.type===3" label="续重">{{calcData.after_offer.additional_weight}}</el-descriptions-item>
                <el-descriptions-item v-if="calcData.after_offer.type===3" label="续重金额">{{calcData.after_offer.additional_weight_price}}</el-descriptions-item>
                <el-descriptions-item label="调价类型">{{calcData.after_offer.adjust_type===1?'增加':'减少'}}</el-descriptions-item>
                <el-descriptions-item label="调价金额">{{calcData.after_offer.adjust_price}}</el-descriptions-item>
                <el-descriptions-item label="结算重">{{calcData.after_offer.bill_weight}}</el-descriptions-item>
                <el-descriptions-item label="计费重">{{calcData.after_offer.cost_weight}}</el-descriptions-item>
                <el-descriptions-item label="运费">{{calcData.after_offer.amount}}</el-descriptions-item>
            </el-descriptions>
          </el-row>
        </div>
      </div>
       <div class="dra-content" style="textalign: left; padding: 10px">
         <el-row type="flex" justify="flex-start" class="title" align="middle">
            <span class="text">附加费明细</span>
          </el-row>
         <el-table :data="calcData.costs">
           <el-table-column label="费用名称" prop="name"></el-table-column>
           <el-table-column label="费用类型" prop="type">
              <template slot-scope="scope">
               {{scope.row.type===1?'基础运费':scope.row.type===2?'附加费':'其他'}}
             </template>
           </el-table-column>
           <el-table-column label="单价" prop="price"></el-table-column>
           <el-table-column label="单位" prop="unit">
             <template slot-scope="scope">
               {{scope.row.unit===1?'结算重':'票'}}
             </template>
           </el-table-column>
           <el-table-column label="改前单位数量" prop="before_unit_num"></el-table-column>
           <el-table-column label="改前费用" prop="before_amount"></el-table-column>
           <el-table-column label="改后单位数量" prop="after_unit_num"></el-table-column>
           <el-table-column label="改后费用" prop="after_amount"></el-table-column>
         </el-table>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-gray" @click="calcDrawer = false">
          <span>关闭</span>
        </button>
      </div>
    </commonDrawer>
    <el-dialog
      title="驳回理由"
      :visible.sync="rejectDia"
      width="30%"
      >
      <div>
        <el-input type="textarea" v-model="failReason" :rows="5"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDia=false">取 消</el-button>
        <el-button type="primary" @click="rejectSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      input: '',
      failReason: '',
      rejectDia: false,
      hisDrawer: false, // 改重历史抽屉
      hisData: [],
      waybillId: null,
      tableData: [],
      detailData: {},
      cargoes: [],
      cargoDia: false,
      cargosDia: false,
      calcDrawer: false,
      calcData: {},
      rowData: {
        index: undefined,
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined
      },
      formData: {
        cargoes: {
          ids: [],
          length: null,
          width: null,
          height: null,
          weight: null,
          lengthSwitch: false,
          widthSwitch: false,
          heightSwitch: false,
          weightSwitch: false
        }
      }
    }
  },
  mounted () {
    if (this.$route.params.waybillId === undefined) {
      this.$router.go(-1)
    }
    this.waybillId = this.$route.params.waybillId
    this.customerName = this.$route.params.customerName
    this.getData()
  },
  methods: {
    getData () {
      this.$api.cost.price.cargo
        .info({ waybillId: this.waybillId })
        .then((res) => {
          this.detailData = res.data
          this.cargoes = res.data.cargoes
        })
    },
    editHistory () {
      this.$api.cost.price.cargo
        .history({ waybillId: this.waybillId })
        .then((res) => {
          this.hisData = res.data
          this.hisDrawer = true
        })
    },
    // 逐个改重
    cargo (scope) {
      console.log(scope)
      this.rowData.index = scope.$index
      this.cargoDia = true
      this.rowData.length = scope.row.length
      this.rowData.width = scope.row.width
      this.rowData.height = scope.row.height
      this.rowData.weight = scope.row.weight
    },
    // 逐个改重提交
    cargoSubmit () {
      this.cargoes[this.rowData.index].length = this.rowData.length
      this.cargoes[this.rowData.index].width = this.rowData.width
      this.cargoes[this.rowData.index].height = this.rowData.height
      this.cargoes[this.rowData.index].weight = this.rowData.weight
      this.cargoDia = false
    },
    cargoClose () {
      this.cargoDia = false
    },
    cargos () {
      this.formData.cargoes.length = null
      this.formData.cargoes.width = null
      this.formData.cargoes.height = null
      this.formData.cargoes.weight = null
      this.formData.cargoes.lengthSwitch = false
      this.formData.cargoes.widthSwitch = false
      this.formData.cargoes.heightSwitch = false
      this.formData.cargoes.weightSwitch = false
      this.cargosDia = true
    },
    // 选择货物
    chooseRow (val) {
      this.formData.cargoes.ids = []
      val && val.forEach((item) => {
        this.formData.cargoes.ids.push(item.cargo_id)
      })
      console.log(this.formData)
    },
    // 批量改重提交
    cargosSubmit () {
      this.cargoes.forEach((item, key) => {
        this.formData.cargoes.ids.forEach(id => {
          if (item.cargo_id === id) {
            if (this.formData.cargoes.lengthSwitch && this.formData.cargoes.length) {
              this.cargoes[key].length = this.formData.cargoes.length
            }
            if (this.formData.cargoes.widthSwitch && this.formData.cargoes.width) {
              this.cargoes[key].width = this.formData.cargoes.width
            }
            if (this.formData.cargoes.heightSwitch && this.formData.cargoes.height) {
              this.cargoes[key].height = this.formData.cargoes.height
            }
            if (this.formData.cargoes.weightSwitch && this.formData.cargoes.weight) {
              this.cargoes[key].weight = this.formData.cargoes.weight
            }
          }
        })
      })
      this.cargosDia = false
    },
    cargosClose () {
      this.cargosDia = false
    },
    // 通过
    adopt () {
      let cargoSpecs = []
      this.cargoes.forEach(ele => {
        let obj = {
          cargoId: ele.cargo_id,
          length: ele.length,
          width: ele.width,
          height: ele.height,
          weight: ele.weight
        }
        cargoSpecs.push(obj)
      })
      console.log(cargoSpecs)
      this.$api.cost.price.cargo
        .adopt({
          waybillId: this.waybillId,
          cargoSpecs: cargoSpecs
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.goback()
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 驳回
    reject () {
      this.rejectDia = true
    },
    // 驳回提交
    rejectSubmit () {
      this.$api.cost.price.cargo
        .reject({
          waybillId: this.waybillId,
          failReason: this.failReason
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.goback()
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 计算费用
    calc () {
      let cargoSpecs = []
      this.cargoes.forEach(ele => {
        let obj = {
          cargoId: ele.cargo_id,
          length: ele.length,
          width: ele.width,
          height: ele.height,
          weight: ele.weight
        }
        cargoSpecs.push(obj)
      })
      console.log(cargoSpecs)
      this.$api.cost.price.cargo
        .calc({
          waybillId: this.waybillId,
          cargoSpecs: cargoSpecs
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.calcData = res.data
            this.calcDrawer = true
          } else {
            this.$message.error(res.msg)
          }
        })
    },
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
.ipt{
    width: 200px;
    margin-left: 10px;
    margin-top: 5px;
}
</style>
