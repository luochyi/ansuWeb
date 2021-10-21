<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">客户账号</span>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="启用" name="1"></el-tab-pane>
        <el-tab-pane label="停用" name="2"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <div class="content">
        <el-row class="searchbox1">
          <el-col :span="8" class="colbox">
            <el-col :span="7">
              <span class="text">客户名称</span>
            </el-col>
            <el-col :span="16">
              <el-input v-model="input" placeholder="请输入"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-col :span="8">
              <span class="text">客户编号</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="customerCode" placeholder="请输入"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8" class="colbox">
            <el-button class="orangeBtn long1">查 询</el-button>
            <el-button class="wuBtn long1">重 置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <div>
        <el-row
          class="searchbox1"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="12" class="left">
            <el-button class="orangeBtn long1 left" @click="addAccount">新建账号</el-button>
          </el-col>
        </el-row>
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="238"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="addAccount"> 编辑详情</el-button>
              <span style="color: #0084ff; margin: 0px 5px">|</span>
              <el-button type="text" @click="resetP(scope.row)">
                重置密码
              </el-button>
              <span style="color: #0084ff; margin: 0px 5px">|</span>
              <el-button
                v-if="activeName === '1'"
                type="text"
                @click="openDisable(scope.row)"
              >
                停用账户
              </el-button>
              <el-button v-else-if="activeName === '2'" type="text" @click="openEnable(scope.row)">
                启用账户
              </el-button>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <!-- 重置密码 -->
    <el-dialog title="生成随机密码" :visible.sync="password" width="30%">
      <div class="input"><br /><span>随机密码：{{randomPSW}}</span><br /></div>
      <span slot="footer" class="password-footer">
        <el-button type="primary" @click="copy" :data-clipboard-text="randomPSW" class="orangeBtn" id="copyBtn"
          >复制密码</el-button
        >
        <el-button @click="password = false" class="wuBtn">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 停用账号 -->
    <el-dialog :title="diaTitle" :visible.sync="ableShow" width="30%">
      <div class="input">
        <br /><span
          ><i class="el-icon-circle-check"></i
          >您是否确认{{diaTitle}}客户{{username}}的账号</span
        ><br />
      </div>
      <span slot="footer" class="stopAgent-footer">
        <el-button @click="ableShow = false" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="stopSubmit()" class="orangeBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      // 输入框
      name: '', // 客户名称
      input: '',
      code: '', // 客户编码
      customerCode: '',
      username: '',
      userId: null,
      // 分页
      diaTitle: '',
      dialogVisible: false, // 对话框可见
      ableShow: false, // 停用账号
      password: false, // 重置密码
      chooseAgent: {}, // 选择停用
      activeName: '1', // 标签绑定
      randomPSW: '',
      columns: [
        { prop: 'name', label: '客户名称', width: '289', align: 'center' },
        {
          prop: 'code',
          label: '客户编码',
          width: '316',
          align: 'center'
        },
        {
          prop: 'username',
          label: '登录账号',
          width: '309',
          align: 'center'
        },
        {
          prop: 'status',
          label: '账户状态',
          width: '228',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'personnel_name',
          label: '业务',
          align: 'center'
        }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      }
    }
  },
  mounted () {
    this.getData()
  },
  beforeDestory () {
    this.data.clipboard.destroy()
  },
  methods: {
    getData () {
      let params = {
        status: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit
      }
      this.$api.customer.customerLists(params).then((res) => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    addAccount () {
      this.$router.push({ name: 'addAccount' })
    },
    handleClick (val) {
      console.log(val)
      this.getData()
    },
    openDisable (data) {
      this.userId = data.id
      this.username = data.name
      this.ableShow = true
      this.diaTitle = '停用'
    },
    openEnable (data) {
      this.userId = data.id
      this.username = data.name
      this.ableShow = true
      this.diaTitle = '启用'
    },
    stopSubmit () {
      let arr = []
      arr.push(this.userId)
      if (this.activeName === '1') {
        this.$api.customer.disabled({ customerIds: arr }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.ableShow = false
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$api.customer.enabled({ customerIds: arr }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.ableShow = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    resetP (data) {
      this.$api.customer.resetpsw({ customerId: data.id }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.password = true
          this.randomPSW = res.data.password
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    copy () {
      const clipboard = new Clipboard('#copyBtn')
      clipboard.on('success', (e) => {
        this.$message.success('复制成功！')
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$message.error('复制失败！该浏览器不支持复制！')
        // 释放内存
        clipboard.destroy()
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val &&
        val.forEach((item) => {
          this.chooseArr.push(item)
        })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (row.status) {
        case 1:
          return '启用'
        case 2:
          return '停用'
        default:
          break
      }
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
    // 操作按钮列表
    editTableData (row) {}
  }
}
</script>
<style lang="scss" scoped>
.long1{
  width: 100px;
}
/deep/ .searchbox1 {
  .batch {
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #fef4e1;
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
/deep/ .el-dialog {
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
/deep/ .el-dialog {
  text-align: left;
}
//biankuang
/deep/ .el-dialog__body {
  padding: 10px 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
  padding: 10px 10px;
}
/deep/ .el-dialog__footer {
  padding: 5px 10px;
}
/deep/ .input {
  height: 90px;
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
.el-icon-circle-check {
  width: 66px;
  height: 58px;
  font-size: 58px;
  color: #fb4702;
}
</style>
