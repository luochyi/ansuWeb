<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">代理服务</span>
      <el-tabs v-model="activeName" type="card"  @tab-click="handleClick">
        <el-tab-pane label="启用代理" name="1"></el-tab-pane>
        <el-tab-pane label="停用代理" name="2"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <el-row class="searchbox1">
        <!-- 代理名称 -->
        <el-col :span="6" class="colbox">
          <span class="text">服务名称</span>
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
            <el-button class='stopBtn' v-if="activeName==='1'" @click="batchStop">批量停用</el-button>
            <el-button class='stopBtn' v-else @click="batchStop">批量启用</el-button>
          </el-col>
          <el-col :span="12" class="right">
            <el-button class="whiteBtn" @click="toAdd">新增代理服务</el-button>
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
            {{ slotData.data.info
            }}<span
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
            width="500"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span @click="editZone(scope.row)" class="blue" v-if="fenquzhongliang">修改分区重量<span style="margin:0px 5px 0px">|</span></span>
              <span @click="fqjg(scope.row)" class="blue">分区价格<span style="margin:0px 5px 0px">|</span></span>
              <span @click="additional(scope.row)" class="blue">附加费<span style="margin:0px 5px 0px">|</span></span>
              <span  v-if="activeName === '1'" @click="stopAgent(scope.row)" class="blue">停用<span style="margin:0px 5px 0px">|</span></span>
              <span v-else-if="activeName === '2'" @click="stopAgent(scope.row)" class="blue">
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
        <div v-if="dialogTitle === '停用代理'" class="left">
          <el-row>你是否确认停用</el-row>
          <el-row>代理'{{chooseAgent.name}}'</el-row>
        </div>
        <div v-else-if="dialogTitle === '启用代理'" class="left">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: null,
      dialogStop: false,
      dialogTitle: '停用代理',
      activeName: '1', // 标签绑定
      serviceName: null,
      fenquzhongliang: true,
      chooseAgent: [], // 选择停用的 代理
      chooseArr: [], // 选中的代理
      columns: [
        {
          prop: 'name',
          label: '代理服务名称',
          width: '400',
          align: 'center'
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'cate',
          label: '代理分类',
          width: '300',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'type',
          label: '派送类型',
          width: '300',
          align: 'center',
          formatter: this.formatters
        }
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
  created () {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    getData () {
      this.tableData = []
      let params = {
        agentId: this.id,
        name: this.serviceName,
        status: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit
      }
      this.$api.agent.agentServiceLists(params).then(res => {
        res.data.list && res.data.list.forEach(e => {
          let obj = {
            id: e.id,
            name: e.name,
            cate: e.cate,
            type: e.type,
            has_price: e.has_price,
            material_cates: e.material_cates
          }
          this.tableData.push(obj)
        })
      })
    },
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
    stopAgent (val) {
      this.dialogStop = true
      this.chooseAgent = val
      if (this.activeName === '1') {
        this.dialogTitle = '停用服务'
        console.log(this.chooseAgent)
      } else if (this.activeName === '2') {
        this.dialogTitle = '启用服务'
      }
    },
    stopOK () {
      let obj = []
      if (this.chooseArr.length !== 0) {
        this.chooseArr && this.chooseArr.forEach(e => {
          obj.push(e.id)
        })
      } else {
        obj.push(this.chooseAgent.id)
      }
      if (this.activeName === '1') {
        this.$api.agent.disabled({ agentIds: obj }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.dialogStop = false
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.activeName === '2') {
        this.$api.agent.enabled({ agentIds: obj }).then(res => {
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
    toAdd () {},
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
      switch (row.cate) {
        case 1:
          return '快递'
        case 2:
          return '卡派'
        default:
          break
      }
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
    // 查看
    check (val) {
      console.log(val.data)
    },
    // 操作按钮列表
    editTableData (row) {},
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
    },
    handleClose () {
      this.dialogStop = false
    },
    search () {
      this.getData()
    },
    handleClick (val) {
      // this.activeName = val
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
