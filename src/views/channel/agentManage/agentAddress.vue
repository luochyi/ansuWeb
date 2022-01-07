<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>代理管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <el-row :gutter="15">
        <el-col>
          <el-form
            class="elForm"
            ref="elForm"
            size="small"
            :model="searchForm"
            label-width="93px"
            label-position="top"
          >
             <el-col :span="6">
                <el-form-item label="代理编码" prop="code">
                  <el-input
                    v-model="searchForm.code"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
             <el-col :span="6">
                <el-form-item label="代理名称" prop="name">
                  <el-input
                    v-model="searchForm.name"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
             <el-col :span="6">
          <!-- <el-form-item size="large"> -->
          <div class="searchBtn">
            <el-button class="orangeBtn" @click="search">查询</el-button>
            <el-button class="whiteBtn" @click="resetForm('elForm')"
              >重置</el-button
            >
          </div>
          <!-- </el-form-item> -->
        </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 表格 -->
      <div>
        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="code" label="代理编码" min-width="200"></el-table-column>
            <el-table-column prop="name" label="代理名称" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="showAddress(scope.row.id)">
                  仓库地址
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
      <commonDrawer
          :drawerVrisible="drawer.visabled"
          drawerSize="50%"
          :drawerTitle="drawer.title"
      >
        <div style='margin:13px;background:#fff;text-align:left'>
          <el-button class='orangeBtn' style='margin:10px' @click="toAdd">新增地址</el-button>
          <commonTable
            :columns="drawer.columns"
            :data="drawer.tableData"
            :pager="drawer.page"
            :selection="false"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
          <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="156"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <el-button type="text" @click="toEdit(scoped.row)"> 编辑 </el-button>
              <span style="color: #0084FF; margin: 0px 5px">|</span>
              <el-popconfirm title="确认删除该地址？" @confirm="addressDelete(scoped.row)">
                <span class="blue" slot="reference"> 删除</span>
              </el-popconfirm>
            </template>
          </el-table-column>
        </commonTable>
        </div>
        <!-- 抽屉底部按钮 -->
        <div slot="footer">
          <button class="btn-gray" @click="drawer.visabled=false">
            <span>取消</span>
          </button>
        </div>
      </commonDrawer>

      <el-dialog :visible.sync="dialog.visabled" :title="dialog.title"  width="30%">
        <el-form ref="addressForm" :model="dialog.formData" :rules="dialog.rules" size="medium" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="dialog.formData.name" placeholder="请输入姓名"
                      :style="{width: '80%'}"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="dialog.formData.phone" placeholder="请输入手机号"
                      :style="{width: '80%'}"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="countyId">
            <el-cascader
                filterable
                v-model="dialog.formData.countyId"
                :options="options"
                clearable
                :props="{value: 'id', label: 'name', expandTrigger: 'hover'}"
                :style="{width: '80%'}"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="dialog.formData.address" type="textarea" placeholder="请输入详细地址"
                      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '80%'}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialog.visabled = false">取消</el-button>
          <el-button type="primary" @click="addressSubmit">确定</el-button>
        </div>
      </el-dialog>
    </div>
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
      searchForm: {
        code: '',
        name: '',
        periodName: ''
      },
      typeOptions: [
        {
          label: 'FBA运单',
          value: 1
        }, {
          label: '非FBA运单',
          value: 2
        }
      ],
      drawer: {
        agentId: false,
        visabled: false,
        title: '代理地址',
        tableData: [],
        columns: [
          { prop: 'name', label: '姓名', align: 'center' },
          { prop: 'phone', label: '手机号', align: 'center' },
          { prop: 'address', label: '地址', align: 'center' }
        ],
        page: {
          pageNo: 1,
          limit: 10,
          sizes: [10, 20, 50],
          total: 0
        }
      },
      dialog: {
        visabled: false,
        title: '',
        formData: {
          addressId: null,
          name: null,
          phone: null,
          countyId: null,
          address: null
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          countyId: [
            { required: true, message: '请选择地区', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ]
        }
      },
      dialogTitle: '停用代理',
      chooseAgent: [], // 选择停用的 代理
      chooseArr: [], // 选中的代理
      dialogStop: false, // 停用弹窗
      options: []
    }
  },
  created () {
    this.getData()
    this.getRegion()
  },
  methods: {
    getData () {
      let params = {
        page: this.currentPage,
        limit: this.pageSize,
        name: this.searchForm.name,
        code: this.searchForm.code,
        periodName: this.searchForm.periodName
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
    getRegion () {
      this.$api.common.settingRegionAll().then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.options = res.data
        } else {
          return this.$message({
            message: res.msg,
            customClass: 'message_reject',
            center: true,
            iconClass: 'icons'
          })
        }
      })
    },
    addressSubmit () {
      this.$refs.addressForm.validate(valid => {
        if (!valid) {
          return
        }
        if (this.dialog.formData.addressId != null) {
          this.$api.agent.agentAddressEdit({
            addressId: this.dialog.formData.addressId,
            agentId: this.drawer.agentId,
            countyId: this.dialog.formData.countyId[2],
            name: this.dialog.formData.name,
            phone: this.dialog.formData.phone,
            address: this.dialog.formData.address
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg) // 成功提示
              this.dialog.visabled = false
              this.getAddress()
            } else {
              this.$message.error(res.msg) // 错误提示
            }
          })
        } else {
          this.$api.agent.agentAddressAdd({
            agentId: this.drawer.agentId,
            countyId: this.dialog.formData.countyId[2],
            name: this.dialog.formData.name,
            phone: this.dialog.formData.phone,
            address: this.dialog.formData.address
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg) // 成功提示
              this.dialog.visabled = false
              this.getAddress()
            } else {
              this.$message.error(res.msg) // 错误提示
            }
          })
        }
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.drawer.page.limit = val // 设置当前页容量为val
      this.getAddress() // 重新渲染表格
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.drawer.page.pageNo = val // 设置当前页码为val
      this.getAddress() // 重新渲染表格
    },
    toAdd () {
      this.dialog.title = '添加代理仓库地址'
      this.dialog.formData = {
        addressId: null,
        name: null,
        phone: null,
        countyId: null,
        address: null
      }
      this.dialog.visabled = true
    },
    toEdit (val) {
      console.log(val)
      this.dialog.title = '编辑代理仓库地址'
      this.dialog.formData = {
        addressId: val.id,
        name: val.name,
        phone: val.phone,
        countyId: [val.province_id, val.city_id, val.county_id],
        address: val.base_address
      }
      this.dialog.visabled = true
    },
    addressDelete (val) {
      this.$api.agent.agentAddressDelete({
        addressId: val.id
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.dialog.visabled = false
          this.getAddress()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    search () {
      this.currentPage = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    showAddress (agentId) {
      this.drawer.agentId = Number(agentId)
      this.getAddress()
    },
    getAddress () {
      this.$api.agent.agentAddressLists({
        agentId: this.drawer.agentId,
        page: this.drawer.page.pageNo,
        limit: this.drawer.page.limit
      }).then(res => {
        this.drawer.tableData = res.data.list
        this.drawer.page.total = res.data.total
        this.drawer.visabled = true
      })
    },
    handleClose () {
      this.dialogStop = false
    },
    handleClick (val) {
      this.status = val
      this.getData()
    },
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
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
.text{
  line-height: 50px;
  height: 50px;
}
</style>
