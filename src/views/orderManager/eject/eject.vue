<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text' style="height:43px;lineHeight:43px">出仓单</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 预报单号 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>运单号</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'>
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
            </el-input>
          </el-col>
        </el-col>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>出仓单号</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'>
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class='searchbox1'>
          <!-- 目的地 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>目的地</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 订单类型 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>订单类型</span>
          <el-col :span='16'>
            <el-select v-model='msg' placeholder='请输入'></el-select>
          </el-col>
        </el-col>
        <!-- 入仓件数 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>入仓件数</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colbox justify-center'>
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle' v-if="false">
          <el-col :span='12' class="left" >
            <el-button class='stopBtn'>批量导出Excel</el-button>
          </el-col>
          <!-- <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">新增</el-button>
          </el-col> -->
        </el-row>
        <commonTable
          :columns="columns"
          :data="tableData"
          :selection="selection"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
             <!-- slot -->
          <template v-slot:yewuyuan="slotData">
            {{ slotData.data.ywy
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <template v-slot:piaoshu="slotData">
            {{ slotData.data.num
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <template v-slot:diver="slotData">
            {{ slotData.data.diver
            }}&nbsp;<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <!-- <template v-slot:status="slotData">
            {{ slotData.data.status
            }}
          </template>
          <template v-slot:spr="slotData">
            {{ slotData.data.spr
            }}
          </template> -->
          <!-- 操作 -->
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="300"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span @click="download(scope.row)" class="blue" v-if="scope.row.has_assign_drivers === 2">下载Excel&nbsp;|&nbsp;</span>
              <span @click="checkWaybill(scope.row)" class="blue">运单明细</span>
               <span @click="detail(scope.row)" v-if="scope.row.has_assign_drivers===2" class="blue">&nbsp;|&nbsp;查看送货司机</span>
                <span @click="setDriver(scope.row)" v-else class="blue">&nbsp;|&nbsp;配置司机</span>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <commonDrawer :drawerVrisible="drawerVrisible"  :drawerTitle="drawerTitle" :drawerSize='drawerSize' style="textAlign:left">
          <div class="dra-content">
            <el-descriptions  :column="2">
              <el-descriptions-item label="出仓单号" contentClassName='titledes'>{{ejectData.eject_no}}</el-descriptions-item>
              <el-descriptions-item label="出仓日期" contentClassName='titledes'>
                  {{formatDate(ejectData.eject_time,'yyyy-MM-dd hh:mm:ss')}}
              </el-descriptions-item>
              <el-descriptions-item label="出仓渠道">{{ejectData.channel_name}}</el-descriptions-item>
              <el-descriptions-item label="出仓代理">{{ejectData.agent_name}}</el-descriptions-item>
              <el-descriptions-item label="总计运单数">{{ejectData.waybill_count}}</el-descriptions-item>
              <el-descriptions-item label="总计货件数">{{ejectData.item_count}}</el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
          <div v-if="!choosed">
             <el-descriptions :title='"出仓单"+(index+1)' :column="3" v-for="item,index in drivers" :key='index'>
               <template slot="extra">
                <!-- <el-button type="text" size="small" @click="del(index)">删除</el-button> -->
              </template>
              <el-descriptions-item label="运输司机">{{item.driverName}}</el-descriptions-item>
              <el-descriptions-item label="送货票数">{{item.waybillIds.length}}</el-descriptions-item>
              <el-descriptions-item label="送货数量">{{item.cargoes_num}}</el-descriptions-item>
          </el-descriptions>
            <el-button v-if="add" class="addbtn" size="mini" round @click="addDriver">添加出仓司机</el-button>
            <div v-else style="color:#979797;marginTop:50px">
              司机信息
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="'司机：'+item.driver_name" v-for="item,index in drivearr" :key="index" :name="index+1">
                  <el-row>
                    <el-col>仓库地址：{{item.agent_address}}</el-col>
                    <el-col>运单数：{{item.waybill_count}}</el-col>
                    <el-col>货件数：{{item.item_count}}</el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
          </div>
          </div>

          <div v-else>
            <el-form label-width="120px">
              <el-form-item label="选择司机">
                <el-select v-model="form.driverId" size="mini" @change="changedrive">
                  <el-option  v-for="item in driverOption" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择仓库地址">
                <el-select v-model="form.agentAddressId" size="mini">
                  <el-option  v-for="item in warehouseOption" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-table :data="waybillsList" empty-text='无可配置运单'  @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="waybill_no" label="运单编号"></el-table-column>
              <el-table-column prop="cargoes_num" label="货件数"></el-table-column>
            </el-table>
             <div style="marginTop:20px">
               <el-button type="primary" size="mini" @click="chooseok()" v-show="this.waybillsList.length!=0">确定</el-button>
               <el-button type="info" size="mini" @click="cancel">取消</el-button>
             </div>
          </div>
          </div>

          <!-- 抽屉底部按钮 -->
          <div slot="footer">
            <button class="btn-orange" @click="submit()"  v-if="add">
              <span> <i class="el-icon-circle-check"></i>提交</span>
            </button>
            <button class="btn-gray" @click="addClose"  v-if="add">
              <span>取消</span>
            </button>
            <button class="btn-gray" @click="addClose"  v-else>
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
      selection: false,
      activeNames: ['1'],
      drivearr: [],
      add: false,
      drawerVrisible: false,
      drawerTitle: '配置司机',
      drawerSize: '50%',
      choosed: false, // 是否在选择司机
      drivers: [],
      ejectId: null,
      warehouseOption: [], // 仓库选择
      driverOption: [],
      form: {
        agentAddressId: null,
        driverId: null, // 选择司机
        waybillIds: [], // 配置司机选择的运单id
        driverName: '',
        cargoes_num: 0
      },
      msg: '',
      ejectData: {
        eject_no: null,
        eject_time: null,
        channel_name: null,
        agent_name: null,
        waybill_count: null,
        item_count: null
      }, // 出仓单信息
      waybillsList: [], // 所有运单
      columns: [
        { prop: 'eject_no', label: '出仓单号', width: '200', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '250', align: 'center' },
        { prop: 'agent_name', label: '代理名称', width: '200', align: 'center' },
        { prop: 'eject_time', label: '出仓时间', width: '200', align: 'center', formatter: this.formatters },
        { prop: 'waybill_count', label: '运单数', width: '100', align: 'center' },
        { prop: 'item_count', label: '货件数', width: '100', align: 'center' },
        { prop: 'volume', label: '方数', width: '100', align: 'center', formatter: this.formatters },
        { prop: 'bill_weight', label: '结算重', width: '100', align: 'center' },
        { prop: 'has_assign_drivers', label: '是否配置司机', width: '100', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
    this.$api.configure.driver.select().then(res => {
      this.driverOption = res.data
    })
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.ejectLists({ limit: this.page.limit, page: this.page.pageNo }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total // 数据总量
      })
    },
    addDriver () {
      this.choosed = true
      this.$api.agent.agentSelectAddress({ agentId: this.ejectData.agent_id }).then(res => {
        console.log(res)
        this.warehouseOption = res.data
      })
    },
    setDriver (row) {
      // this.ejectData = row
      this.add = true
      this.drawerVrisible = true
      this.ejectId = row.id
      this.$api.Ordermanagement.ejectInfo({ ejectId: row.id }).then(res => {
        console.log(res.data.waybills)
        this.ejectData = res.data
        this.waybillsList = res.data.waybills
        this.drawerVrisible = true
      })
    },
    del (index) {
      console.log(index)
      this.drivers.splice(index, 1)
    },
    // 查看
    checkWaybill (val) {
      console.log(val)
      this.$router.push({
        name: 'ejectWaybill',
        params: {
          id: val.id,
          eject_time: val.eject_time,
          eject_no: val.eject_no,
          channel_name: val.channel_name,
          agent_name: val.agent_name
        }
      })
    },
    detail (val) {
      this.drawerVrisible = true
      this.add = false
      this.$api.Ordermanagement.ejectInfo({ ejectId: val.id }).then(res => {
        console.log(res.data.drivers)
        this.ejectData = res.data
        this.drivearr = res.data.drivers
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      val && val.forEach(item => {
        this.form.waybillIds.push(item.id)
        this.form.cargoes_num += item.cargoes_num
      })
    },
    handleChange () {},
    changedrive (val) {
      console.log(val)
      let obj = this.driverOption.find(ele => {
        return ele.id === val
      })
      this.form.driverName = obj.name
    },
    // 选择司机确定
    chooseok () {
      if (this.form.driverId === null) {
        this.$message.error('请选择司机')
        return
      }
      if (this.form.agentAddressId === null) {
        this.$message.error('请选择仓库地址')
        return
      }
      if (this.form.waybillIds.length === 0) {
        this.$message.error('请选择一条运单')
        return
      }
      this.choosed = false
      this.drivers.push(this.form)
      console.log(this.drivers)
      console.log(this.waybillsList)
      // 对出仓单的运单数组操作 this.waybillsList
      for (let i = 0; i < this.form.waybillIds.length; i++) {
        for (let j = 0; j < this.waybillsList.length; j++) {
          if (this.form.waybillIds[i] === this.waybillsList[j].id) {
            this.waybillsList.splice(j, 1)
          }
        }
      }
      // 选择司机数据清空
      this.form = {
        agentAddressId: null,
        driverId: null, // 选择司机
        waybillIds: [], // 配置司机选择的运单id
        driverName: '',
        cargoes_num: 0
      }
    },
    cancel () {
      this.choosed = false
      // 对出仓单的运单数组操作 this.waybillsList
      // 选择司机数据清空
      this.form = {
        agentAddressId: null,
        driverName: '',
        driverId: null, // 选择司机
        waybillIds: [], // 配置司机选择的运单id
        cargoes_num: 0
      }
    },
    // 提交
    submit () {
      let obj = {
        ejectId: this.ejectId,
        drivers: this.drivers
      }
      this.$api.Ordermanagement.orderEjectDriver(obj).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.addClose()
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClick (tab, event) { console.log(tab, event) },
    // 操作按钮列表
    editTableData (row) {},
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
      this.drivers = []
      this.cancel()
    },
    download (row) {
      this.$api.Ordermanagement.ejectExportDriver({
        ejectId: row.id
      }).then(res => {
        this.downloadBlob(res, '出仓单.xlsx')
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      if (row.has_assign_drivers === 1) {
        return '否'
      } else {
        return '是'
      }
    },
    formatters (row, column, cellValue) {
      switch (column.property) {
        case 'eject_time':
          return this.formatDate(row.eject_time, 'yyyy-MM-dd hh:mm:ss')
        case 'volume':
          return (row.volume / 1000000).toFixed(2) + 'm³'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dra-content{
  padding-left: 10px;
  padding-top:10px ;
  font-size: 14px;
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
.unit{
    line-height: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FE822F;
    margin-right: 10px;
}
.expend {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  .el-dialog__body{
    border-top: 1px solid rgba(0,0,0,0.06);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
.titledes{
  color:#FB4702;
  font-size: 18px;
}
.addbtn{
  color: #FB4702;
  border-color: #FB4702;
}
</style>
