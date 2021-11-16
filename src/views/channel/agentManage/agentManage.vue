<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>代理管理</span>
      <el-tabs v-model='activeName' type='card'  @tab-click="handleClick">
        <el-tab-pane label='启用代理' name='1'></el-tab-pane>
        <el-tab-pane label='停用代理' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 代理名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>代理名称</span>
          <el-col :span='16'>
            <el-input v-model='agentName' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 代理编码 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>代理编码</span>
          <el-col :span='16'>
            <el-input v-model='agentCode' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 代理账期 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>代理账期</span>
          <el-col :span='16'>
            <el-input v-model='agentAccount' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colbox justify-center'>
          <el-button class='orangeBtn long1' @click="search">查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button class='stopBtn' v-if="activeName==='1'" @click="batchStop">批量停用</el-button>
            <el-button class='stopBtn' v-else @click="batchStop">批量启用</el-button>
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">新增代理</el-button>
            <!-- <el-button class='whiteBtn'>列表显示设置</el-button> -->
          </el-col>
        </el-row>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="code" label="代理编码" min-width="200"></el-table-column>
            <el-table-column prop="name" label="代理名称" min-width="200"></el-table-column>
            <el-table-column prop="period_name" label="结算账期" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="toDetail(scope.row.id)">
                  查看详情
                </el-button>
<!--                <el-button v-if="activeName === '1'" type="text" @click="channelService(scope.row)">-->
<!--                  |&nbsp; 代理渠道-->
<!--                </el-button>-->
                <el-button v-if="activeName === '1'" type="text" @click="stopAgent(scope.row)">
                  |&nbsp; 停用代理
                </el-button>
                <el-button v-if="activeName === '2'" @click="stopAgent(scope.row)" type="text">
                  |&nbsp; 启用代理
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class='block'>
            <el-pagination
              :current-page.sync='currentPage'
              @size-change='sizechange'
              @current-change='currentchange'
              :pager-count='9'
              :page-size='pageSize'
              :page-sizes='[10, 20, 50, 100]'
              layout='total, prev, pager, next, sizes, jumper'
              :total='total'
            ></el-pagination>
          </div>
        </div>
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
      activeName: '1', // 标签绑定

      pageSize: 10,
      currentPage: 1,
      total: 0,

      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      agentAccount: '', // 代理账期
      tableData: [
      ],

      dialogTitle: '停用代理',
      chooseAgent: [], // 选择停用的 代理
      chooseArr: [], // 选中的代理
      dialogStop: false // 停用弹窗
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let params = {
        status: Number(this.activeName),
        page: this.currentPage,
        limit: this.pageSize,
        name: this.agentName,
        code: this.agentCode
      }
      this.$api.agent.settingAgentLists(params).then((res) => {
        console.log(res)
        this.tableData = []
        res.data.list && res.data.list.forEach(item => {
          let obj = {
            id: item.id,
            code: item.code,
            name: item.name,
            period_name: item.period_name
          }
          this.tableData.push(obj)
          this.total = res.data.total
        })
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
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
        this.dialogTitle = '停用代理'
        console.log(this.chooseAgent)
      } else if (this.activeName === '2') {
        this.dialogTitle = '启用代理'
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
    toAdd () {
      this.$router.push({ name: 'addAgent' })
    },
    channelService (val) {
      // 根据id查询代理服务
      sessionStorage.setItem('agentId', val.id)
      this.$router.push({ name: 'channelService' })
    },
    toDetail (val) {
      console.log(val)
      this.$router.push({ name: 'agentDetails', params: { id: val } })
    },
    handleClose () {
      this.dialogStop = false
    },
    handleClick (val) {
      this.status = val
      this.getData()
    },
    search () { this.getData() },
    sizechange (val) {
      this.pageSize = val
      this.getData()
    },
    currentchange (val) {
      this.currentPage = val
      this.getData()
    }
  }

}
</script>

<style lang="scss" scoped>
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
</style>
