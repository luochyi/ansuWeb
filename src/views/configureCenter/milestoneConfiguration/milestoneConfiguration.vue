<template>
  <div>
    <el-row>
      <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
        <div class="left">
          <div class="lefta">
            <el-row type="flex" justify="flex-start" align="middle" style="marginBottom:10px"></el-row>
            <div
              style="margintop: 10px"
              class="cate text"
              :class="index === isRed ? 'active' : ''"
              v-for="(item, index) in options"
              :key="index"
              @click="changeCate(index)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="22">
        <!--  标签页 -->
        <div class="right">
          <el-row type="flex" justify="flex-start" class="title" align="middle">
            <span style="marginLeft: 20px; marginRight: 10px">里程碑配置</span>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="港前状态" name="1"></el-tab-pane>
              <el-tab-pane label="港后状态" name="2"></el-tab-pane>
              <el-tab-pane label="派件" name="3"></el-tab-pane>
              <el-tab-pane label="全部" name="4"></el-tab-pane>
            </el-tabs>
          </el-row>
          <!-- 主要内容 -->
          <div class="content">
            <!-- 搜索栏 -->
            <div>
              <el-row class="searchbox1">
                <el-col :span="10" class="colbox">
                  <el-col :span="6">
                    <span class="text">客户编码</span>
                  </el-col>
                  <el-col :span="10">
                    <el-input
                      v-model="predictionNo"
                      placeholder="请输入"
                    ></el-input>
                  </el-col>
                </el-col>
                <el-col :span="4" class="colbox">
                  <el-button class="orangeBtn long1" @click="search"
                    >查 询</el-button
                  >
                </el-col>
                <el-button @click="show = true" class="whiteBtn"
                  >新建状态
                </el-button>
              </el-row>
            </div>
            <!-- 表格 -->
            <commonTable
              :columns="columns"
              :data="tableData"
              :pager="page"
              :selection="selection"
              @handleSizeChange="handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
            >
              <el-table-column
                slot="table_oper"
                align="center"
                fixed="right"
                label="操作"
                width="112"
                :resizable="false"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="modify = true"
                    :disabled="scope.row.type === 1"
                  >
                    修改</el-button
                  >
                  <span style="color: #0084ff; margin: 0px 5px">|</span>
                  <el-button
                    type="text"
                    @click="del(scope.row)"
                    :disabled="scope.row.type === 1"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </commonTable>
          </div>
          <!-- 新建状态 -->
          <el-dialog title="新建状态" :visible.sync="show" width="30%">
            <div class="input">
              <span
                >名称&nbsp;<el-input
                  v-model="statusname"
                  style="width: 190px"
                  placeholder="请输入状态名称"
                ></el-input
              ></span>
              <br />
              <br />
              <span
                >状态&nbsp;<el-select
                  v-model="status"
                  size="small"
                  placeholder="请选择状态"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option> </el-select
              ></span>
            </div>
            <span slot="footer" class="status-footer">
              <el-button @click="show = false" class="wuBtn">取 消</el-button>
              <el-button type="primary" class="orangeBtn" @click="addSubmit"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!-- 修改 -->
          <el-dialog title="修改状态" :visible.sync="modify" width="30%">
            <div class="input">
              <span
                >名称&nbsp;<el-input
                  v-model="name"
                  style="width: 190px"
                  placeholder="请输入状态名称"
                ></el-input
              ></span>
              <br />
              <br />
              <span
                >状态&nbsp;<el-select
                  v-model="status"
                  size="small"
                  placeholder="港前状态"
                >
                  <el-options
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-options> </el-select
              ></span>
            </div>
            <span slot="footer" class="modify-footer">
              <el-button @click="modify = false" class="wuBtn">取 消</el-button>
              <el-button
                type="primary"
                @click="modify = false"
                class="orangeBtn"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!-- 删除 -->
          <el-dialog title="删除状态" :visible.sync="deletea" width="30%">
            <div class="input">
              <br /><span>你确认删除“港前状态”“以出关”吗？</span><br />
            </div>
            <span slot="footer" class="deletea-footer">
              <el-button @click="deletea = false" class="wuBtn"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="deletea = false"
                class="orangeBtn"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selection: false,
      input: '',
      isRed: 0,
      dialogVisible: false, // 对话框可见
      deletea: false, // 删除状态
      modify: false, // 修改状态
      activeName: '1', // 标签绑定
      options: [
        { name: '海运里程碑' },
        { name: '空运里程碑' },
        { name: '快件里程碑' },
        { name: '铁路里程碑' },
        { name: '专车里程碑' }
      ],
      a: 1,
      b: 9,
      show: false,
      statusname: '',
      name: '',
      status: '1',
      statusOptions: [
        {
          value: '1',
          label: '港前'
        },
        {
          value: '2',
          label: '港后'
        },
        {
          value: '3',
          label: '派件'
        }
      ],
      predictionNo: '',
      columns: [
        { prop: 'name', label: '名称', width: '327', align: 'center' },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          formatter: this.formatter
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
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.tableData = []
      let params = {
        cate: this.isRed + 1,
        status: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit
      }
      if (this.activeName === '4') {
        // 全部
        params.status = null
      }
      this.$api.configure.milestone.lists(params).then((res) => {
        console.log(res)
        res.data.list &&
          res.data.list.forEach((ele) => {
            let obj = {
              id: ele.id,
              type: ele.type,
              status: ele.status,
              name: ele.name
            }
            this.tableData.push(obj)
            this.page.total = res.data.total
          })
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
    handleClick (val) {
      this.getData()
    },
    del (data) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(data.id)
          this.$api.configure.milestone
            .del({ milestoneId: data.id })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      console.log(data.id)
    },
    search () {
      this.getData()
    },
    // 重新渲染列
    formatter (row, column, cellValue) {
      switch (row.status) {
        case 1:
          return '港前'
        case 2:
          return '港前'
        case 3:
          return '派件'
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
    changeCate (i) {
      console.log(i)
      this.isRed = i
      this.getData()
    },
    addSubmit () {
      let params = {
        name: this.statusname,
        status: Number(this.status),
        cate: this.isRed + 1
      }
      this.$api.configure.milestone.add(params).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.show = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 操作按钮列表
    editTableData (row) {}
  }
}
</script>
<style lang="scss" scoped>
.cate {
  cursor: pointer;
  margin-left: 10px;
  padding: 5px;
}
.content{
  overflow: scroll;
  height: 700px;
}
.active {
  border-left: 4px solid #fb4702;
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
/deep/ .input {
  height: 90px;
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
.right {
  // float: left;
  width: calc(100%-40px);
  margin-left: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  // margin: auto 20px;
}
.top {
  margin: 10px auto;
}
.left {
  // float: left;
  min-width: 134px;
  height: 700px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  text-align: center;
  padding: 1px;
}
::-webkit-scrollbar {
/*隐藏滚轮*/
display: none;
}
</style>
