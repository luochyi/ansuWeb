<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">渠道设置</span>
      <el-tabs v-model="activeName" type="card"  @tab-click="handleClick">
        <el-tab-pane label="启用渠道" name="1"></el-tab-pane>
        <el-tab-pane label="停用渠道" name="0"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <el-row class="searchbox1">
        <!-- 代理名称 -->
        <el-col :span="6" class="colbox">
          <span class="text">渠道名称</span>
          <el-col :span="16">
            <el-input v-model="serviceName" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span="6" class="colbox justify-center">
          <el-button class="orangeBtn long1" @click="search">查 询</el-button>
          <el-button class="wuBtn long1" @click="reset">重 置</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div>
        <el-row
          class="searchbox1"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="12" class="left">
            <!-- <el-button class='stopBtn' v-if="activeName==='1'" @click="batchStop">批量停用</el-button>
            <el-button class='stopBtn' v-else @click="batchStop">批量启用</el-button> -->
          </el-col>
          <el-col :span="12" class="right">
            <el-button class="whiteBtn" @click="toAdd">新增渠道</el-button>
          </el-col>
        </el-row>
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- slot -->
          <template v-slot:chakan="slotData">
            {{ slotData.data.info }}<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <!-- 操作 -->
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="400"
            :resizable="false"
          >
            <template slot-scope="scope">
              <!-- <span @click="editZone(scope.row)" class="blue" v-if="fenquzhongliang">修改分区重量<span style="margin:0px 5px 0px">|</span></span> -->
              <span @click="fqjg(scope.row)" class="blue">分区价格<span style="margin:0px 5px 0px">|</span></span>
              <!-- <span @click="additional(scope.row)" class="blue">附加费<span style="margin:0px 5px 0px">|</span></span> -->
              <span  v-if="activeName === '1'" @click="stopAgent(scope.row)" class="blue">停用<span style="margin:0px 5px 0px">|</span></span>
              <span v-else-if="activeName === '0'" @click="stopAgent(scope.row)" class="blue">
                  启用<span style="margin:0px 5px 0px">|</span>
                </span>
              <span @click="edit(scope.row)" class="blue">修改</span>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
     <el-dialog
      :visible.sync="dialogStop"
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="left">
        {{dialogTitle}}
      </div>
      <div class="flex align-center">
        <div class="iconfont" style="font-size: 58px; color: #FB4702;margin-right: 20px">
          &#xe77d;
        </div>
        <div v-if="dialogTitle === '停用服务'" class="left">
          <el-row>你是否确认停用</el-row>
          <el-row>代理'{{chooseAgent.name}}'</el-row>
        </div>
        <div v-else-if="dialogTitle === '启用服务'" class="left">
          <el-row>你是否确认启用</el-row>
          <el-row>代理'{{chooseAgent.name}}'</el-row>
        </div>
        <div v-else>
          <span v-if="activeName==='1'">你是否确认停用这{{chooseArr.length}}个代理</span>
          <span v-else>你是否确认启用这{{chooseArr.length}}个代理</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="wuBtn" @click="dialogStop = false">取 消</el-button>
        <el-button class="orangeBtn" @click="stopOK">确 定</el-button>
      </span>
    </el-dialog>
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerSize="drawerSize" @handleClose='addClose' :drawerTitle="drawerTitle" @click="check(slotData)">
      <div class="dra-content">
        <!-- 内容区域 -->
        <div class="circleBox">
          <el-row style="display:flex;align-items:center">
            <el-col :span="3" style="display:flex;">
              <div style="display:flex;flex-direction: column;align-items:center">
                <div class="circle">1</div>
                <div>渠道分区</div>
              </div>
            </el-col>
            <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control !== 2 && control !== 3">
              <div class="circle1">2</div>
              <div>重量段设置</div>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control === 2 || control === 3">
              <div class="circle">2</div>
              <div>重量段设置</div>
            </el-col>
             <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control !== 3">
              <div class="circle1">3</div>
              <div>价格维护</div>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control === 3">
              <div class="circle">3</div>
              <div>价格维护</div>
            </el-col>
          </el-row>
        </div>
        <el-row style="marginTop:10px;textAlign:left">
          <!-- <el-col :span="6">代理:{{agentName}}</el-col>
          <del-col :span="6">渠道服务:{{agentServiceName}}</del-col> -->
        </el-row>
        <div v-if="inhere&&control===1">
          <el-table :data="formData.zones" :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column label="国家/分区" prop="name"></el-table-column>
              <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="zoneEdit(scope.$index)">修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click.native.prevent="zoneDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="zoneAdd()" style="marginTop:10px;float:left" class="orangeBtn">新建分区</el-button>
        </div>
        <div v-else-if="!inhere">
        <el-row style="marginTop:10px;textAlign:left;" >国家/分区名称：<el-input size="mini" style="width:200px" v-model="tempData.zone.name"></el-input></el-row>
         <el-row style="marginTop:10px;textAlign:left" v-if="control===1">
   <!-- 新增分区 -->
          <el-table :data="tempData.zone.areas" border style="width: 100%"   :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column label="国家" prop="countryId" min-width="80"  :formatter="countryformatter"></el-table-column>
            <el-table-column label="区域类型" prop="scopeType" min-width="90" >
              <template slot-scope="scope">
                <span v-if="scope.row.scopeType===1">按国家</span>
                <span v-else-if="scope.row.scopeType===2">按区域</span>
              </template>
            </el-table-column>
            <el-table-column label="邮编前缀" prop="prefixes" v-if="zoneType===1" min-width="200">
              <template slot-scope="scope">
                <span> {{ scope.row.prefixes.join(',') }} </span>
              </template>
            </el-table-column>
            <el-table-column label="fba仓库" prop="fbaIds" v-else min-width="200" :formatter="fbaformatter">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
<!--                <el-button type="text" @click="areaEdit(scope.$index)">修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>-->
                <el-button type="text" @click.native.prevent="areaDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <!-- 添加 -->
          <el-table :data="addZone" v-if="addTable" border style="width: 100%"  :show-header="false">
            <el-table-column label="国家" min-width="80">
              <template slot-scope="scope">
                <el-select v-model="scope.row.countryId" @change='countrychange'>
                  <el-option v-for="item in countryOptions" :key="item.value" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="区域类型" min-width="90">
              <template slot-scope="scope">
                <el-select v-model="scope.row.scopeType" @change='scopeTypechange'>
                  <el-option v-for="item in areaOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="邮编前缀" min-width="200" v-if="zoneType===1&&scopeType">
              <template slot-scope="scope">
                  <el-select
                  v-model="scope.row.prefixes"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请输入邮编前缀">
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="fba仓库" min-width="200" v-else-if="zoneType===2&&scopeType">
               <template slot-scope="scope">
                  <el-select
                  v-model="scope.row.fbaIds"
                  multiple
                  placeholder="请选择fba仓">
                  <el-option v-for="item in FbaOptions" :key='item.id' :value="item.id" :label="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="fba仓库" min-width="200" v-else>
               <template slot-scope="scope">
                  <el-select
                  disabled
                  v-model="scope.row.fbaIds"
                  multiple
                  placeholder="按国家">
                  <el-option v-for="item in FbaOptions" :key='item.id' :value="item.id" :label="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button @click="addZoneSubmit(scope.row)" type="text">确认</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="cancl1(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="addTable=true" style="marginTop:10px;" class="orangeBtn">新建分区</el-button>
        </el-row>
        </div>
  <!-- 设置重量区间 -->
        <el-row style="marginTop:10px;textAlign:left" v-if="control===2">
          <el-table :data="formData.weights" border style="width: 100%"   :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column label="序号" min-width="80">
              <template slot-scope="scope">
                区间{{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column label="最小重量" prop="minWeight" min-width="80" ></el-table-column>
            <el-table-column label="最大重量" prop="maxWeight" min-width="90" :formatter="columnFormat"></el-table-column>
            <el-table-column label="计价方式" prop="priceType" min-width="200" :formatter="columnFormat"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
<!--                 <el-button type="text" @click="weightEdit(scope.$index)">修改</el-button>
                 <span style="color: #0084FF; margin: 0px 5px">|</span>-->
                <el-button type="text" @click.native.prevent="weightDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <!-- 添加 -->
          <el-table :data="tempData.weights" v-if="addweightsTable" border style="width: 100%"  :show-header="false">
            <el-table-column label="区间" min-width="80">新区间</el-table-column>
            <el-table-column label="最低重量" min-width="90">
              <template slot-scope="scope">
                <el-input v-model="scope.row.minWeight"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="最高重量" min-width="90">
              <template slot-scope="scope">
                 <el-input v-model="scope.row.maxWeight"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="计价方式" min-width="200">
              <template slot-scope="scope">
                  <el-select
                  v-model="scope.row.priceType"
                  placeholder="请输入计价方式">
                  <el-option v-for="item in priceTypeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button @click="weightSubmit(scope.$index)" type="text">确认</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="cancl(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="weightAdd" style="marginTop:10px" class="orangeBtn">新建重量段</el-button>
        </el-row>
 <!-- 价格维护 -->
        <el-row style="marginTop:10px;textAlign:left" v-if="control===3">
          <span class="tips" v-show="tempData.unitPrices.length > 0">价格按单价</span>
          <el-table :data="tempData.unitPrices" v-show="tempData.unitPrices.length > 0" border style="width: 100%"   :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column  min-width="100" prop="name" :formatter="columnFormat"></el-table-column>
            <el-table-column v-for="(item, index) in tempData.unitWeights" :key="index" :label="item.weight.minWeight+'-'+(item.weight.maxWeight === 99999999 ? 'MAX' : item.weight.maxWeight)+'公斤'" min-width="150" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.cols[item.weightIndex].price"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <span class="tips" v-show="tempData.firstPrices.length > 0">价格首续重</span>
          <el-table :data="tempData.firstPrices" v-show="tempData.firstPrices.length > 0" border style="width: 100%"   :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column  min-width="100" prop="name" :formatter="columnFormat"></el-table-column>
            <el-table-column v-for="(item,index) in tempData.firstWeights" :key="index" :label="item.weight.minWeight+'-'+(item.weight.maxWeight === 99999999 ? 'MAX' : item.weight.maxWeight)+'公斤'" min-width="150" >
              <el-table-column label="首重重量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.cols[item.weightIndex].firstWeight"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="首重价格">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.cols[item.weightIndex].firstWeightPrice"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="续重重量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.cols[item.weightIndex].additionalWeight"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="续重价格">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.cols[item.weightIndex].additionalWeightPrice"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <span class="tips" v-show="tempData.amountPrices.length > 0">价格按金额</span>
          <el-table :data="tempData.amountPrices" v-show="tempData.amountPrices.length > 0" border style="width: 100%"   :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column  min-width="100" prop="name" :formatter="columnFormat"></el-table-column>
            <el-table-column v-for="(item,index) in tempData.amountWeights" :key="index" :label="item.weight.minWeight+'-'+(item.weight.maxWeight === 99999999 ? 'MAX' : item.weight.maxWeight)+'公斤'" min-width="150" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.cols[item.weightIndex].price"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="nextPrev(1)" v-if="control===1&&inhere">
          下一步
        </button>
        <button class="btn-orange" @click="submitfenqu" v-else-if="!inhere">
          确定
        </button>
        <button class="btn-orange" @click="nextPrev(1)" v-else-if="control===2">
          下一步
        </button>
        <button class="btn-orange" @click="submit()" v-else-if="control===3">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="whiteBtn" @click="nextPrev(-1)" v-if="control!==1" style="marginRight:10px">
          上一步
        </button>
        <button class="btn-gray" @click="addClose" v-if="inhere">
          <span>取消</span>
        </button>
        <button class="btn-gray" @click="addCancl" v-else>
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zoneType: null, // 派件类型 1快递 2卡派
      saveData: [],
      control: 1,
      firstPrices: [], // 首续重
      amounts: [], // 金额
      unitPrices: [], // 单价
      inhere: true,
      addTable: false,
      drawerSize: '50%',
      drawerVrisible: false,
      drawerTitle: '设置分区',
      agentName: '',
      agentServiceName: '',
      fenquData: [], // 分区
      priceTypeOptions: [
        // 计价方式
        {
          value: 1,
          label: '单价'
        },
        {
          value: 2,
          label: '金额'
        }, {
          value: 3,
          label: '首续重'
        }
      ],
      zoneData: [],
      weights: [], // 重量数组
      addweights: [ // 新增重量段
        { minWeight: '', maxWeight: '', priceType: null }
      ],
      addweightsTable: false,
      addZone: [
        {
          countryId: '',
          scopeType: null,
          prefixes: [],
          fbaIds: []
        }
      ],
      countryOptions: [],
      FbaOptions: [],
      areaOptions: [
        {
          value: 1,
          label: '按国家'
        },
        {
          value: 2,
          label: '按区域'
        }
      ],
      id: null,
      scopeType: true,
      zonename: '',
      dialogStop: false,
      dialogTitle: '停用代理',
      activeName: '1', // 标签绑定
      serviceName: null,
      fenquzhongliang: true,
      chooseAgent: null, // 选择停用的 代理
      chooseArr: [], // 选中的代理
      columns: [
        {
          prop: 'name',
          label: '渠道名称',
          width: '200',
          align: 'center'
        },
        {
          prop: 'code',
          label: '渠道编码',
          width: '220',
          align: 'center'
        },
        {
          prop: 'en_name',
          label: '英文名',
          width: '220',
          align: 'center'
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'cate',
          label: '渠道分类',
          width: '220',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'type',
          label: '派送类型',
          align: 'center',
          formatter: this.formatters
        },
        {
          prop: 'score',
          label: '渠道评分',
          align: 'center'
        },
        {
          prop: 'currency_name',
          label: '币种',
          align: 'center'
        }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      tempData: {
        zone: { zoneIndex: -1, name: '', areas: [] },
        weights: [{ weightIndex: -1, minWeight: 0, maxWeight: 99999999, priceType: null }],
        unitWeights: [],
        unitPrices: [],
        amountWeights: [],
        amountPrices: [],
        firstWeights: [],
        firstPrices: []
      },
      formData: {
        channelId: null,
        zones: [],
        weights: [],
        unitPrices: [],
        amounts: [],
        firstPrices: [],
        planTime: ''
      }
    }
  },
  created () {
    // 获取代理id
    this.id = Number(sessionStorage.getItem('agentId'))
    this.getData()
    // 国家
    this.$api.agent.selectCountry().then(res => {
      this.countryOptions = res.data
    })
  },
  methods: {
    getData () {
      this.tableData = []
      let params = {
        isStart: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit
      }
      this.$api.agent.channelLists(params).then(res => {
        this.tableData = res.data.list
      })
    },
    // 分区价格
    fqjg (data) {
      console.log(data)
      this.formData.channelId = data.id
      this.drawerVrisible = true
      if (data.type === 1) {
        this.zoneType = 1
      } else if (data.type === 2) {
        this.zoneType = 2
      }
    },
    // 停用
    batchStop () {
      if (this.chooseArr.length < 1) {
        return this.$message({
          message: '选中的代理不能为空',
          customClass: 'message_reject',
          center: true,
          iconClass: 'icons'
        })
      }
      if (this.activeName === '1') {
        this.dialogTitle = '批量停用代理'
      } else {
        this.dialogTitle = '批量启用代理'
      }
      this.dialogStop = true
    },
    // 停用
    stopAgent (val) {
      this.dialogStop = true
      this.chooseAgent = val
      if (this.activeName === '1') {
        this.dialogTitle = '停用服务'
        console.log(this.chooseAgent)
      } else if (this.activeName === '0') {
        this.dialogTitle = '启用服务'
      }
    },
    // 区域类型切换
    scopeTypechange (data) {
      console.log(data)
      if (data === 1) {
        this.scopeType = false
        console.log(this.scopeType)
      } else if (data === 2) {
        this.scopeType = true
        console.log(this.scopeType)
      }
    },
    // 添加分区（子集菜单）
    addfenqu () {
      this.inhere = false
    },
    // 添加分区
    submitfenqu () {
      this.inhere = true
      this.fenquData.push({ fenqu: this.zonename })
      this.addZone = [
        {
          countryId: '',
          scopeType: null,
          prefixes: [],
          fbaIds: []
        }
      ]
      this.zoneData.forEach(ele => {
        let obj = {
          countryId: ele.countryId,
          scopeType: ele.scopeType,
          prefixes: ele.prefixes,
          fbaIds: ele.fbaIds
        }
        this.saveData.push(obj)
        this.zoneData = []
        this.zonename = ''
        console.log(this.saveData)
      })
      if (this.tempData.zone.zoneIndex !== -1) {
        this.formData.zones[this.tempData.zone.zoneIndex] = this.tempData.zone
      } else {
        this.formData.zones.push(this.tempData.zone)
      }
    },
    // 停用启用
    stopOK () {
      // let obj = []
      // if (this.chooseArr.length !== 0) {
      //   this.chooseArr && this.chooseArr.forEach(e => {
      //     obj.push(e.id)
      //   })
      // } else {
      //   obj.push(this.chooseAgent.id)
      // }
      if (this.activeName === '1') {
        this.$api.agent.channelDisabled({ channelId: Number(this.chooseAgent.id) }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.dialogStop = false
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.activeName === '0') {
        this.$api.agent.channelEnabled({ channelId: Number(this.chooseAgent.id) }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.dialogStop = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 下一步
    nextPrev (data) {
      this.control += data
      if (this.control === 3) {
        this.amounts = []
        this.firstPrices = []
        this.unitPrices = []
        for (let i = 0; i < this.weights.length; i++) {
          this.fenquData.forEach(ele => {
            let obj = {
              fenqu: ele.fenqu,
              price: '',
              minWeight: ele.minWeight,
              maxWeight: ele.maxWeight
            }
            if (this.weights[i].priceType === 1) {
              this.unitPrices.push(obj)
            } else if (this.weights[i].priceType === 2) {
              this.amounts.push(obj)
            } else if (this.weights[i].priceType === 3) {
              this.firstPrices.push(obj)
            }
          })
        }

        this.tempData.unitWeights = []
        this.tempData.amountWeights = []
        this.tempData.firstWeights = []
        this.formData.weights.forEach((weight, weightIndex) => {
          switch (weight.priceType) {
            case 1: // 单价
              this.tempData.unitWeights.push({ weightIndex: weightIndex, weight: weight })
              break
            case 2: // 金额
              this.tempData.amountWeights.push({ weightIndex: weightIndex, weight: weight })
              break
            case 3: // 首续重
              this.tempData.firstWeights.push({ weightIndex: weightIndex, weight: weight })
              break
          }
        })

        this.tempData.unitPrices = []
        this.tempData.amountPrices = []
        this.tempData.firstPrices = []
        this.formData.zones.forEach((zone, zoneIndex) => {
          if (this.tempData.unitWeights.length > 0) {
            let cols = {}
            this.tempData.unitWeights.forEach(item => {
              cols[item.weightIndex] = { price: null }
            })
            this.tempData.unitPrices.push({ zoneIndex: zoneIndex, cols: cols })
          }
          if (this.tempData.amountWeights.length > 0) {
            let cols = {}
            this.tempData.amountWeights.forEach(item => {
              cols[item.weightIndex] = { price: null }
            })
            this.tempData.amountPrices.push({ zoneIndex: zoneIndex, cols: cols })
          }
          if (this.tempData.firstWeights.length > 0) {
            let cols = {}
            this.tempData.firstWeights.forEach(item => {
              cols[item.weightIndex] = { firstWeight: null, firstWeightPrice: null, additionalWeight: null, additionalWeightPrice: null }
            })
            this.tempData.firstPrices.push({ zoneIndex: zoneIndex, cols: cols })
          }
        })
      }
    },
    toAdd () {
      this.$router.push({ name: 'addChannel' })
    },
    // 国家id类型 只传国家和区域类型
    addZoneSubmit (data) {
      console.log(data)
      let obj = {
        countryId: data.countryId,
        scopeType: data.scopeType,
        prefixes: data.prefixes,
        fbaIds: data.fbaIds
      }
      this.zoneData.push(obj)
      this.tempData.zone.areas.push(obj)
      this.cancl1()
    },
    addCancl () {
      this.inhere = true
      this.cancl1()
      this.zoneData = []
    },
    // 取消
    cancl1 () {
      this.addZone = [
        {
          countryId: '',
          scopeType: null,
          prefixes: [],
          fbaIds: []
        }
      ]
      this.addTable = false
    },
    // 重量提交
    addWSubmit (data) {
      console.log(data)
      let obj = {
        minWeight: data.minWeight,
        maxWeight: data.maxWeight,
        priceType: data.priceType
      }
      this.weights.push(obj)
      this.cancl()
    },
    // 取消新增重量
    cancl () {
      this.addweights = [ // 新增重量段
        { minWeight: '', maxWeight: '', priceType: null }
      ]
      this.addweightsTable = false
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (row.cate) {
        case 1:
          return '海运'
        case 2:
          return '空运'
        case 3:
          return '快递'
        case 4:
          return '铁路'
        case 5:
          return '专车'
        default:
          break
      }
    },
    reset () {
      this.serviceName = ''
      this.getData()
    },
    formatters (row, column, cellValue) {
      switch (row.type) {
        case 1:
          return '快递'
        case 2:
          return '卡派'
        default:
          break
      }
    },
    countrychange (data) {
      console.log(data)
      this.$api.agent.selectFba({ countryId: data }).then(res => {
        this.FbaOptions = res.data
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      console.log(val)
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.getData()
    },
    // checkbox选中获取数据
    handleSelectionChange (val) {
      console.log(val)
    },
    deleteRowe (index, rows) {
      rows.splice(index, 1)
    },
    deleteRowa (index, rows) {
      rows.splice(index, 1)
    },
    columnFormat (row, col) {
      switch (col.property) {
        case 'maxWeight':
          return row.maxWeight === 99999999 ? 'MAX' : row.maxWeight
        case 'priceType':
          return row.priceType === 1 ? '单价' : row.priceType === 2 ? '金额' : '首续重'
        case 'name':
          return this.formData.zones[row.zoneIndex].name
      }
    },
    // 查看
    check (val) {
      console.log(val.data)
    },
    indexMethod (index) {
      return index * 2
    },
    // 操作按钮列表
    editTableData (row) {},
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
      this.control = 1
      this.zoneData = []
      this.inhere = true
      this.zonename = ''
      this.saveData = []
      this.fenquData = []
    },
    handleClose () {
      this.dialogStop = false
    },
    search () {
      this.getData()
    },
    handleClick (tab, event) {
      console.log(this.activeName)
      this.getData()
    },
    fbaformatter (row, col) {
      console.log(row.fbaIds)
      let arr = []
      row.fbaIds.forEach(element => {
        for (let i = 0; i < this.FbaOptions.length; i++) {
          if (this.FbaOptions[i].id === element) {
            arr.push(this.FbaOptions[i].name)
          }
        }
      })
      let string = arr.toString()
      console.log(string)
      return string
    },
    countryformatter (row, col) {
      console.log(row.countryId)
      for (let i = 0; i < this.countryOptions.length; i++) {
        if (this.countryOptions[i].id === row.countryId) {
          return this.countryOptions[i].name
        }
      }
    },
    zoneAdd () {
      this.inhere = false
      this.tempData.zone = { zoneIndex: -1, name: '', areas: [] }
    },
    zoneDel (index) {
      this.formData.zones.splice(index, 1)
    },
    zoneEdit (index) {
      this.inhere = false
      this.tempData.zone = this.formData.zones[index]
      this.tempData.zone.zoneIndex = index
    },
    areaDel (index) {
      this.tempData.zone.areas.splice(index, 1)
    },
    weightDel (index) {
      this.formData.weights.splice(index, 1)
    },
    weightAdd () {
      this.addweightsTable = true
      this.tempData.weight = [{ weightIndex: -1, maxWeight: 0, priceType: null }]
    },
    weightSubmit (index) {
      this.addweightsTable = false
      let weight = this.tempData.weights[index]
      if (weight.weightIndex !== -1) {
        this.formData.weights[weight.weightIndex] = weight
      } else {
        this.formData.weights.push(weight)
      }
      this.tempData.weights = [{ weightIndex: -1, maxWeight: 0, priceType: null }]
    },
    submit () {
      this.formData.unitPrices = []
      if (this.tempData.unitPrices.length > 0) {
        this.tempData.unitPrices.forEach(item => {
          for (let weightIndex in item.cols) {
            this.formData.unitPrices.push({ zoneIndex: item.zoneIndex, weightIndex: Number(weightIndex), price: item.cols[weightIndex].price })
          }
        })
      }
      this.formData.amounts = []
      if (this.tempData.amountPrices.length > 0) {
        this.tempData.amountPrices.forEach(item => {
          for (let weightIndex in item.cols) {
            this.formData.amounts.push({ zoneIndex: item.zoneIndex, weightIndex: Number(weightIndex), price: item.cols[weightIndex].price })
          }
        })
      }
      this.formData.firstPrices = []
      if (this.tempData.firstPrices.length > 0) {
        this.tempData.firstPrices.forEach(item => {
          for (let weightIndex in item.cols) {
            this.formData.firstPrices.push({ zoneIndex: item.zoneIndex, weightIndex: Number(weightIndex), firstWeight: item.cols[weightIndex].firstWeight, firstWeightPrice: item.cols[weightIndex].firstWeightPrice, additionalWeight: item.cols[weightIndex].additionalWeight, additionalWeightPrice: item.cols[weightIndex].additionalWeightPrice })
          }
        })
      }
      this.$api.agent.channelPriceAdd(this.formData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.drawerVrisible = false
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dra-content{
  padding-top:10px ;
  padding-left:10px ;
}
.blue{
    color: #0084FFFF;
    font-size: 14px;
    cursor: pointer;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.circleBox{
  margin: 20px 0 0 10px;
  padding-bottom: 30px;
  border-bottom:1px solid #E8EBF2;
}
.circle1{
  margin-bottom: 10px;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  text-align:center;
  line-height:34px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.35);
}
.circle{
  margin-bottom: 10px;
  width: 34px;
  height: 34px;
  background: #FB4702;
  border-radius: 50%;
  text-align:center;
  line-height:34px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.tips{
  color:#FB6024;
  font-size: 14px;
}
</style>
