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
            <el-button class='stopBtn'>批量停用</el-button>
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn'>新增渠道</el-button>
            <el-button class='whiteBtn'>列表显示设置</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="agentName" label="代理名称" min-width="200"></el-table-column>
            <el-table-column prop="agentCode" label="代理编号" min-width="200"></el-table-column>
            <el-table-column prop="agentAccount" label="结算账期" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="toDetail(scope.row.id)">
                  查看详情
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text">
                  停用代理
                </el-button>
                <el-button v-if="activeName === '2'" type="text">
                  启用代理
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div slot="title">
      </div>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1', // 标签绑定

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
      ]
    }
  },
  methods: {
    handleSelectionChange () {
      console.log()
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
</style>
