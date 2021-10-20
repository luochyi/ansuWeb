<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>运单费用</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>运单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='waybillNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>预报渠道</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='predictionChannel' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>目的地</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
              <span class='text'>目的地分区</span>
            </el-col>
            <el-col :span='13'>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
              <span class='text'>目的地邮编</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='zipcode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <el-button class='wuBtn long1'>展开全部</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class='tableBtn'>
          <el-col :span='20' class='right'>
            <el-button class='whiteBtn '>查询条件设置</el-button>
            <el-button class='whiteBtn '>列表显示设置</el-button>
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
          <template v-slot:chakan='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看</span>
          </template>
          <template v-slot:jianshu='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="list(slotData)">装箱清单</span>
          </template>
          <template v-slot:feiyong='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="see(slotData)">查看</span>
          </template>
          <template v-slot:jiesuan='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="details(slotData)">详情</span>
          </template>
          <template v-slot:neibu='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="remarks(slotData)">查看</span>
          </template>
          <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="152"
              :resizable="false"
          >
            <template slot-scoped="scoped">
              <el-button type="text" @click="detailspage"> 查看详情</el-button>
              <span style="color: #0084FF; margin: 0px 5px">|</span>
              <el-button type="text" @click="password= true"> 查看运单</el-button>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <!-- 清单抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle">
      <!-- 内容区域 -->
      <div class="dra-content">
        <div class="top">
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
          <el-descriptions class="margin-top" :column="2" :size="size">
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
          <el-descriptions>
            <el-descriptions-item label="亚马逊店铺商店">
              http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr
            </el-descriptions-item>
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
    <!-- 内部备注抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisibla" :drawerTitle="drawerTitla">
      <!-- 内容区域 -->
      <div class="dra-content">
        <div class="biaodan">
          <el-descriptions class="margin-top" :column="2" :size="size">
            <el-descriptions-item label="所属公司">安速深圳分公司</el-descriptions-item>
            <el-descriptions-item label="客户名称">深圳爱因美贸易科技有限公司</el-descriptions-item>
            <el-descriptions-item label="预报单号">YB202012120001</el-descriptions-item>
            <el-descriptions-item label="运单号">AS202012120001</el-descriptions-item>
            <el-descriptions-item label="业务员">张三</el-descriptions-item>
            <el-descriptions-item label="收货司机">李四</el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
          <div class="neibu">
            <span class='texta'>内部备注</span>
            <el-descriptions title="货物走以星" :column="3">
              <el-descriptions-item>2020年10月11日 14:00</el-descriptions-item>
              <el-descriptions-item label="备注人">张三-业务</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="以走以星" :column="3">
              <el-descriptions-item>2020年10月11日 14:00</el-descriptions-item>
              <el-descriptions-item label="备注人">李四-操作</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="已走以星" :column="3">
              <el-descriptions-item>2020年10月11日 14:00</el-descriptions-item>
              <el-descriptions-item label="备注人">王武-操作</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="raturn">
          <span>返回</span>
        </button>
      </div>
    </commonDrawer>
    <!-- 结算重抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisiblb" :drawerTitle="drawerTitlb">
      <!-- 内容区域 -->
      <div class="dra-content">
        <div class="jiesuan">
          <span class='texta'>AS2012090001</span>
          <br>
          <el-descriptions>
            <el-descriptions-item label="客户名称">深圳大成亚马逊贸易科技有限公司</el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
          <el-descriptions :column="1">
            <el-descriptions-item label="预报渠道">香港UPS红单5000</el-descriptions-item>
            <el-descriptions-item label="件数">6件</el-descriptions-item>
            <el-descriptions-item label="备注">走以星</el-descriptions-item>
          </el-descriptions>
          <commonTable
              :columna="columna"
              :data="tableData"
              :pager="page"
              @handleSizeChange="handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
          >
          </commonTable>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="raturn">
          <span>返回</span>
        </button>
      </div>
    </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      waybillNo: '', // 运单号
      customerName: '', // 客户名称
      customerCode: '', // 客户编号
      predictionChannel: '', // 预报渠道
      destination: '', // 目的地
      value: '',
      options: '',
      zipcode: '',
      columns: [
        { prop: 'OrderNo', label: '安速单号', width: '176', align: 'center' },
        { prop: 'name', label: '客户名称', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '客户编号', width: '80', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '审核状态', width: '94', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '106', align: 'center', type: 'slot', slotName: 'chakan' },
        { prop: 'Reviewer', label: '审核人', width: '81', align: 'center' },
        { prop: 'Ordertype', label: '订单类型', width: '101', align: 'center' },
        { prop: 'number', label: '件数', width: '123', align: 'center', type: 'slot', slotName: 'jianshu' },
        { prop: 'Chargedmagnetic', label: '带电带磁', width: '94', align: 'center' },
        { prop: 'channel', label: '预报渠道', width: '108', align: 'center' },
        { prop: 'shipping', label: '运输方式', width: '80', align: 'center' },
        { prop: 'destination', label: '目的地', width: '66', align: 'center' },
        { prop: 'warehouse', label: '目的仓', width: '94', align: 'center' },
        { prop: 'zipcode', label: '目的地邮编', width: '94', align: 'center' },
        { prop: 'surcharge', label: '附加费', width: '115', align: 'center' },
        { prop: 'Basiccost', label: '基础费用', width: '94', align: 'center' },
        { prop: 'Additionalcost', label: '附加费用', width: '94', align: 'center' },
        { prop: 'Totalcost', label: '合计费用', width: '118', align: 'center', type: 'slot', slotName: 'feiyong' },
        { prop: 'Ordertime', label: '下单时间', width: '182', align: 'center' },
        { prop: 'Customsdeclaration', label: '报关类型', width: '122', align: 'center' },
        { prop: 'clearance', label: '单独清关', width: '115', align: 'center' },
        { prop: 'Settlementweight', label: '结算重', width: '111', align: 'center', type: 'slot', slotName: 'jiesuan' },
        { prop: 'Realweight', label: '实重', width: '70', align: 'center' },
        { prop: 'Squarenumber', label: '方数', width: '70', align: 'center' },
        { prop: 'Volumeweight', label: '材积重', width: '70', align: 'center' },
        { prop: 'comments', label: '客户备注', width: '110', align: 'center' },
        { prop: 'remarks', label: '内部备注', width: '152', align: 'center', type: 'slot', slotName: 'neibu' },
        { prop: 'insured', label: '是否保险', width: '83', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [15, 50, 100],
        total: 0
      },
      columna: [
        { prop: 'number', label: '货件编号', width: '172', align: 'center' },
        { prop: 'Length', label: '长（cm）', width: '90', align: 'center', formatter: this.formatter },
        { prop: 'Width', label: '宽（cm）', width: '90', align: 'center', formatter: this.formatters },
        { prop: 'Height', label: '高（cm）', width: '90', align: 'center' },
        { prop: 'Square', label: '方数（㎡）', width: '90', align: 'center' },
        { prop: 'weight', label: '实重（kg）', width: '90', align: 'center' },
        { prop: 'Volume', label: '材积重（kg）', width: '90', align: 'center' }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.confirm.lists({
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    detailspage () {
      this.$router.push({ name: 'detailspage' })
    },
    // drawerTitle () {},
    // drawerVrisible () {},
    handleClick (val) {
      console.log(val)
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
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
.dra-content{
  width: 770px;
height: 868px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.biaodan{
  width: 696px;
  height: 285px;
  margin: 20px;
}
.top{
  float: left;
  margin: 20px;
}
.foot{
  float: left;
  margin: 60px 20px;
}
.neibu{
  float: left;
}
.jiesuan{
  margin: auto 20px;
}
.texta{
  width: 223px;
height: 25px;
font-size: 18px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #FB4E0C;
line-height: 25px;
float: left;
}

</style>
