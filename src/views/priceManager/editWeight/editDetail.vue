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
        <el-button class="orangeBtn"> 批量修改尺寸 </el-button>
        <el-button class="whiteBtn" @click="editHistory"> 改重记录 </el-button>
        <el-table
          :data="cargoes"
          border
          style="width: 1100px; margin-bottom: 100px"
          :header-cell-style="{ background: '#F5F5F6' }"
        >
          <el-table-column fixed type="selection"> </el-table-column>
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
      <span>报价合计：</span>
      ￥
      <el-button class="orangeBtn">确认改货</el-button>
      <el-button class="whiteBtn">驳回改货</el-button>
      <el-button class="whiteBtn">取消</el-button>
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
          :model="formData"
          size="small"
          label-width="20px"
          label-position="left"
        >
          <el-form-item label="长" prop="field101">
            <el-input
              v-model="formData.length"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="宽" prop="field103">
            <el-input
              v-model="formData.width"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="高" prop="field102">
            <el-input
              v-model="formData.height"
              placeholder="请输入"
              clearable
              :style="{ width: '80%' }"
            >
            <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="重" prop="field104">
            <el-input
              v-model="formData.weight"
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
        <el-button @click="cargoClose">取消</el-button>
        <el-button type="primary" @click="cargoSubmit">确定</el-button>
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
      hisDrawer: false, // 改重历史抽屉
      hisData: [],
      waybillId: null,
      tableData: [],
      detailData: {},
      cargoes: [],
      cargoDia: false,
      formData: {
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined
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
    cargo (scope) {
      console.log(scope)
      // let index = scope.$index
      this.cargoDia = true
      this.formData.length = scope.row.length
      this.formData.width = scope.row.width
      this.formData.height = scope.row.height
      this.formData.weight = scope.row.weight
    },
    cargoSubmit () {},
    cargoClose () {
      this.cargoDia = false
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
