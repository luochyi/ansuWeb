<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>费用登记</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='search.customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="searchReset">重 置</el-button>
            <!-- <el-button class='wuBtn long1'>展开全部</el-button> -->
          </el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row class='searchbox1'>
          <el-col :span='10' class="left">
            <el-button class='stopBtn' @click="Batchregistration">批量登记费用</el-button></el-col>
            <el-col :span='12' class='right'>
                <!-- <el-button class='whiteBtn '>查询条件设置</el-button>
              <el-button class='whiteBtn '>列表显示设置</el-button> -->
            </el-col>
          </el-row>
          <br>
          <!-- 组件 -->
    <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
    <!-- slot -->
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="226"
        :resizable="false"
      >
         <template slot-scope="scoped">
          <el-button type="text" @click="registration(scoped.row)"> 费运登记</el-button>
                <span style="color: #0084FF; margin: 0px 5px" v-if="scoped.row.status > 1">|</span>
                <el-button type="text" @click="showDrawerCargoes(scoped.row)" v-if="scoped.row.status > 1"> 修改尺寸 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="waybillInfo(scoped.row)"> 查看详情 </el-button>
        </template>
      </el-table-column>
    </commonTable>
      </div>
    </div>
     <!-- 修改尺寸抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle">
       <!-- 内容区域 -->
      <div class="dra-content">
        <div class="adopt">
              <span class='texta'>箱子：FBA1342342525001</span>
              <br>
              <span class='text'>产品：</span>
              <br>
              <span class='text'>保温杯2020款
                <el-button class='whiteBtn '>12件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  隐藏详情
                </el-button>
              </span>
        </div>
        <div class="biaodan">
      <el-descriptions class="margin-top"  :column="2" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
   <el-descriptions >
    <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
        </div>
         <div class="foot">
           <span class='text'>保温杯2019款
                <el-button class='whiteBtn'>10件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  查看详情
                </el-button>
              </span>
              <br>
              <span class='text'>保温杯漫威联名版
                <el-button class='whiteBtn '>10件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  查看详情
                </el-button>
              </span>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="addClose">
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>

    <commonDrawer
        :drawerVrisible="drawer.visabled.cargoes" drawerTitle="客户改重" :drawerSize='drawer.size.cargoes'
        size="50%">
      <div class="dra-content" style="textAlign:left;padding:10px">
        <el-row class="orderId">{{drawer.data.cargoes.waybill_no}}</el-row>
        <el-row style="margin-top:16px">
          <span class="item1">客户名称：</span>
          <span class="item2">{{drawer.data.cargoes.customer_name}}</span>
        </el-row>
        <el-row><el-button @click="edit()" class="orangeBtn" :disabled="drawer.formData.cargoes.ids.length === 0">批量修改</el-button></el-row>
        <el-row class="line"></el-row>
        <!-- <el-row style="margin-top:16px">
            <span class="item1">预报渠道：</span>
            <span class="item2">{{forecastChannel}}</span>
        </el-row>
        <el-row style="margin-top:16px">
            <span class="item1">件数：</span>
            <span class="item2">{{number}}</span>
        </el-row> -->
        <div class="table" style="margin-top:16px">
          <el-table ref="multipleTable" :data="drawer.data.cargoes.tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange"
                    :header-cell-style="{background: '#F5F5F6'}" @row-dblclick="showCargoEdit">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="cargo_no" label="货件编号" min-width="180"></el-table-column>
            <el-table-column prop="length" label="长（cm）"></el-table-column>
            <el-table-column prop="width" label="宽（cm）"></el-table-column>
            <el-table-column prop="height" label="高（cm）"></el-table-column>
            <el-table-column prop="weight" label="重（kg）"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="drawer.visabled.cargoes = false">
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>
    <el-dialog
        title="改货重"
        :visible.sync="dialog.visable.cargo"
        width="26%">
            <span style="textAlign:left;marginLeft:20px">
                <el-row><el-input size="mini" type="Number" v-model="drawer.formData.cargo.length" class="ipt"><template slot="prepend">长</template><template slot="append">cm</template></el-input></el-row>
                <el-row><el-input size="mini" type="Number" v-model="drawer.formData.cargo.width" class="ipt"><template slot="prepend">宽</template><template slot="append">cm</template></el-input></el-row>
                <el-row><el-input size="mini" type="Number" v-model="drawer.formData.cargo.height" class="ipt"><template slot="prepend">高</template><template slot="append">cm</template></el-input></el-row>
                <el-row><el-input size="mini" type="Number" v-model="drawer.formData.cargo.weight" class="ipt"><template slot="prepend">重</template><template slot="append">kg</template></el-input></el-row>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visable.cargo = false">取 消</el-button>
                <el-button class="orangeBtn" type="primary" @click="cargoEdit">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog
        title="批量改货"
        :visible.sync="dialog.visable.cargoes"
        width="26%">
          <span style="textAlign:left;marginLeft:20px">
              <el-row><el-checkbox v-model="drawer.formData.cargoes.lengthSwitch">长</el-checkbox><el-input size="mini" type="Number" v-model="drawer.formData.cargoes.length" :disabled="!drawer.formData.cargoes.lengthSwitch" class="ipt"><template slot="append">cm</template></el-input></el-row>
              <el-row><el-checkbox v-model="drawer.formData.cargoes.widthSwitch">宽</el-checkbox><el-input size="mini" type="Number" v-model="drawer.formData.cargoes.width" :disabled="!drawer.formData.cargoes.widthSwitch" class="ipt"><template slot="append">cm</template></el-input></el-row>
              <el-row><el-checkbox v-model="drawer.formData.cargoes.heightSwitch">高</el-checkbox><el-input size="mini" type="Number" v-model="drawer.formData.cargoes.height" :disabled="!drawer.formData.cargoes.heightSwitch" class="ipt"><template slot="append">cm</template></el-input></el-row>
              <el-row><el-checkbox v-model="drawer.formData.cargoes.weightSwitch">重</el-checkbox><el-input size="mini" type="Number" v-model="drawer.formData.cargoes.weight" :disabled="!drawer.formData.cargoes.weightSwitch" class="ipt"><template slot="append">kg</template></el-input></el-row>
          </span>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialog.visable.cargoes = false">取 消</el-button>
              <el-button class="orangeBtn" type="primary" @click="batchChange">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0, // 数据数量
      pageSize: 10, // 默认当前条数
      currentPage: 1, // 当前页码
      size: 'small',
      activeName: '1',
      waybillNo: '', // 运单号
      customerName: '', // 客户名称
      customerCode: '', // 客户编码
      predictionChannel: '', // 预报渠道
      destination: '', // 目的地
      zipcode: '', // 目的地邮编

      drawerVrisible: false, // 控制抽屉显示隐藏
      drawerTitle: '装箱清单', // 抽屉标题

      columns: [
        { prop: 'waybill_no', label: '运单号', width: '140', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '193', align: 'center' },
        { prop: 'customer_code', label: '客户编号', width: '118', align: 'center' },
        { prop: 'type', label: '订单类型', width: '90', align: 'center', formatter: this.formatter },
        { prop: 'status', label: '运单状态', width: '90', align: 'center', formatter: this.formatter },
        { prop: 'cargoes_num', label: '件数', width: '90', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '84', align: 'center' },
        { prop: 'channel_code', label: '渠道编码', width: '109', align: 'center' },
        { prop: 'created_at', label: '下单时间', width: '89', align: 'center', formatter: this.formatter },
        { prop: 'trade_type', label: '贸易类型', width: '84', align: 'center', formatter: this.formatter },
        { prop: 'is_separate_customs_clearance', label: '单独清关', width: '109', align: 'center', formatter: this.formatter },
        { prop: 'bill_weight', label: '客户结算重', width: '107', align: 'center' },
        { prop: 'agent_delivery_bill_weight', label: '代理结算重', width: '82', align: 'center' },
        { prop: 'have_safe', label: '是否投保', width: '137', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [15, 50, 100],
        total: 0
      },
      drawer: {
        visabled: {
          cargoes: false
        },
        size: {
          cargoes: '50%'
        },
        data: {
          cargoes: {
            waybillId: 0,
            customer_name: null,
            waybill_no: null,
            tableData: []
          }
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
          },
          cargo: {
            id: null,
            length: null,
            width: null,
            height: null,
            weight: null
          }
        }
      },
      dialog: {
        visable: {
          cargo: false,
          cargoes: false
        }
      },
      search: {
        customerName: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.waybill.lists({
        customerName: this.search.customerName,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    searchReset () {
      this.search.customerName = null
    },
    registration (row) {
      this.$router.push({ name: 'registration', params: row })
    },
    Batchregistration () {
      this.$router.push({ name: 'Batchregistration' })
    },
    handleClick (val) {
      console.log(val)
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'status':
          switch (row.status) {
            case 2:
              return '已入仓'
            case 3:
              return '已出库'
            case 4:
              return '已出仓'
            case 5:
              return '运输'
            case 6:
              return '已签收'
          }
          return ''
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm:ss')
        case 'trade_type':
          return row.created_at === 2 ? '非一般贸易报关' : '一般贸易报关'
        case 'is_separate_customs_clearance':
          return row.is_separate_customs_clearance === 1 ? '单独清关' : '非单独清关'
        case 'have_safe':
          return row.have_safe === 1 ? '投保' : '不投保'
      }
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val // 设置当前页容量为val
      this.getData() // 重新渲染表格
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val // 设置当前页码为val
      this.getData() // 重新渲染表格
    },
    // 操作按钮列表
    editTableData (row) {},
    // 查看
    check (val) {
      console.log(val.data)
      this.drawerVrisible = true
    },
    // 装箱清单
    list (val) {
      console.log(val.data)
      this.drawerVrisible = true
    },
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
    },
    // 返回抽屉
    raturn () {
      this.drawerVrisibla = false
    },
    // 内部备注
    remarks (val) {
      console.log(val.data)
      this.drawerVrisibla = true
    },
    // 结算备注
    details (val) {
      console.log(val.data)
      this.drawerVrisiblb = true
    },
    waybillInfo (row) {
      this.$router.push({ name: 'waybillDetail', params: { id: row.id } })
    },
    showDrawerCargoes (row) {
      this.drawer.data.cargoes.waybillId = row.id
      this.drawer.data.cargoes.customer_name = row.customer_name
      this.drawer.data.cargoes.waybill_no = row.waybill_no
      this.$api.order.waybill.cargoSpec.agentGet(row.id).then(res => {
        this.drawer.data.cargoes.tableData = res.data.cargoes
      })
      this.drawer.visabled.cargoes = true
    },
    selectionChange (val) {
      this.drawer.formData.cargoes.ids = []
      val && val.forEach((item) => {
        this.drawer.formData.cargoes.ids.push(item.id)
      })
    },
    showCargoEdit (row, column) {
      if (!column.property) {
        return
      }
      this.drawer.formData.cargo.id = row.id
      this.drawer.formData.cargo.length = row.length
      this.drawer.formData.cargo.width = row.width
      this.drawer.formData.cargo.height = row.height
      this.drawer.formData.cargo.weight = row.weight
      this.dialog.visable.cargo = true
    },
    cargoEdit () {
      this.drawer.data.cargoes.tableData.forEach((item, key) => {
        if (item.id === this.drawer.formData.cargo.id) {
          this.drawer.data.cargoes.tableData[key].length = this.drawer.formData.cargo.length
          this.drawer.data.cargoes.tableData[key].width = this.drawer.formData.cargo.width
          this.drawer.data.cargoes.tableData[key].height = this.drawer.formData.cargo.height
          this.drawer.data.cargoes.tableData[key].weight = this.drawer.formData.cargo.weight
        }
      })
      this.dialog.visable.cargo = false
    },
    batchChange () {
      this.drawer.data.cargoes.tableData.forEach((item, key) => {
        this.drawer.formData.cargoes.ids.forEach(id => {
          if (item.id === id) {
            if (this.drawer.formData.cargoes.lengthSwitch && this.drawer.formData.cargoes.length) {
              this.drawer.data.cargoes.tableData[key].length = this.drawer.formData.cargoes.length
            }
            if (this.drawer.formData.cargoes.widthSwitch && this.drawer.formData.cargoes.width) {
              this.drawer.data.cargoes.tableData[key].width = this.drawer.formData.cargoes.width
            }
            if (this.drawer.formData.cargoes.heightSwitch && this.drawer.formData.cargoes.height) {
              this.drawer.data.cargoes.tableData[key].height = this.drawer.formData.cargoes.height
            }
            if (this.drawer.formData.cargoes.weightSwitch && this.drawer.formData.cargoes.weight) {
              this.drawer.data.cargoes.tableData[key].weight = this.drawer.formData.cargoes.weight
            }
          }
        })
      })
      this.dialog.visable.cargoes = false
    },
    edit () {
      this.drawer.formData.cargoes.length = null
      this.drawer.formData.cargoes.width = null
      this.drawer.formData.cargoes.height = null
      this.drawer.formData.cargoes.weight = null
      this.drawer.formData.cargoes.lengthSwitch = false
      this.drawer.formData.cargoes.widthSwitch = false
      this.drawer.formData.cargoes.heightSwitch = false
      this.drawer.formData.cargoes.weightSwitch = false
      this.dialog.visable.cargoes = true
    },
    submit () {
      let cargoSpecs = []
      this.drawer.data.cargoes.tableData.forEach(item => {
        cargoSpecs.push({
          cargoId: item.id,
          length: item.length,
          width: item.width,
          height: item.height,
          weight: item.weight
        })
      })
      this.$api.order.waybill.cargoSpec.agentEdit({
        waybillId: this.drawer.data.cargoes.waybillId,
        cargoSpecs: cargoSpecs
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
          this.drawer.visabled.cargoes = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.sub_title{
  margin:20px
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
/deep/ .searchbox1{
  .stopBtn{
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #FEF4E1;
    border-radius: 4px;

    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
/deep/ .tableBtn{
  .batch{
    float: right;
    height: 30px;
    line-height: 32px;
    background: #FEF4E1;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
}
</style>
