<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>代理管理</span>
      <el-tabs v-model='activeName' type='card'>
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
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button class='stopBtn' @click="batchStop">批量停用</el-button>
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">新增渠道</el-button>
            <el-button class='whiteBtn'>列表显示设置</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="agentName" label="代理名称" min-width="200"></el-table-column>
            <el-table-column prop="agentCode" label="代理编码" min-width="200"></el-table-column>
            <el-table-column prop="agentAccount" label="结算账期" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="toDetail(scope.row.id)">
                  查看详情
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="channelService(scope.row)">
                  渠道服务
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="stopAgent(scope.row)">
                  停用代理
                </el-button>
                <el-button v-if="activeName === '2'" type="text">
                  启用代理
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class='block'>
            <el-pagination
              :current-page.sync='currentPage'
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
          <el-row>代理'{{chooseAgent.agentName}}'</el-row>
        </div>
        <div v-else>
          你是否确认停用这{{chooseArr.length}}个代理
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="wuBtn" @click="dialogStop = false">取 消</el-button>
        <el-button class="orangeBtn" @click="dialogStop = false">确 定</el-button>
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
      total: 50,

      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      agentAccount: '', // 代理账期
      tableData: [
        {
          agentName: '天图供应链',
          agentCode: 'TTGYL',
          agentAccount: '半月结'
        },
        {
          agentName: '安信国际',
          agentCode: 'AXGJ',
          agentAccount: '月结'
        },
        {
          agentName: '宝昌国际货运',
          agentCode: 'BCGJ',
          agentAccount: '月结'
        },
        {
          agentName: '百科国际',
          agentCode: 'BKGJ',
          agentAccount: '月结'
        }
      ],

      dialogTitle: '停用代理',
      chooseAgent: {}, // 选择停用的 代理
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
      this.dialogStop = true
      this.dialogTitle = '批量停用代理'
    },
    stopAgent (val) {
      this.dialogStop = true
      this.chooseAgent = val
      this.dialogTitle = '停用代理'
    },
    toAdd () {
      this.$router.push({ name: 'addAgent' })
    },
    channelService () {
      this.$router.push({ name: 'channelService' })
    },
    toDetail (val) {
      console.log(val)
    },
    handleClose () {
      this.dialogStop = false
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
