<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>对账结果</span>
        <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='全部' name='0'></el-tab-pane>
          <el-tab-pane label='未处理' name='1'></el-tab-pane>
          <el-tab-pane label='已处理' name='2'></el-tab-pane>
        </el-tabs>
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
                <el-form-item label="运单编号" prop="agentNo">
                  <el-input
                    v-model="searchForm.agentNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运单编号" prop="waybillNo">
                  <el-input
                    v-model="searchForm.waybillNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="代理渠道" prop="agentChannelName">
                  <el-input
                    v-model="searchForm.agentChannelName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="渠道" prop="channelName">
                  <el-input
                    v-model="searchForm.channelName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国家" prop="country">
                  <el-input
                    v-model="searchForm.country"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="代理目的国" prop="agentCountry">
                  <el-input
                    v-model="searchForm.agentCountry"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="处理人" prop="userName">
                  <el-input
                    v-model="searchForm.userName"
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
                    <el-button class="whiteBtn" @click="resetForm('elForm')">重置</el-button>
                  </div>
                <!-- </el-form-item> -->
            </el-col>
            </el-form>
          </el-col>

        </el-row>
        <el-divider></el-divider>
        <div class='table'>
          <el-row class='tableBtn'>
            <el-col :span='12' class='left'>
              <!-- <el-button class='batch'></el-button> -->
              <!-- <el-button class='batch'></el-button> -->
            </el-col>
            <el-col :span='20' class='right'>
              <!-- <el-button class='whiteBtn '></el-button> -->
            </el-col>
          </el-row>
          <br>
          <!-- 表格 -->
           <el-table
            :data="tableData"
            max-height="2000"
            :header-cell-style="{ background: '#F5F5F6', color: '#999999FF',fontSize:'14px' }"
            border
            tooltip-effect="light"
            >
                <el-table-column prop="agent_no" label="代理单号" width="120"></el-table-column>
                <el-table-column prop="agent_country" label="代理目的国" width="120"></el-table-column>
                <el-table-column prop="agent_channel_name" label="代理渠道名" width="150"></el-table-column>
                <el-table-column prop="agent_bill_weight" label="代理结算重" width="120"></el-table-column>
                <el-table-column prop="agent_bill_amount" label="代理收取费用" width="120"></el-table-column>
                <el-table-column prop="waybill_no" label="运单号" width="180"></el-table-column>
                <el-table-column prop="country" label="目的国"></el-table-column>
                <el-table-column prop="channel_name" label="渠道名" width="150"></el-table-column>
                <el-table-column prop="bill_weight" label="系统代理结算重" width="120"></el-table-column>
                <el-table-column prop="bill_amount" label="系统代理收取费用" width="140"></el-table-column>
                <el-table-column prop="customer_bill_weight" label="客户结算重" width="120"></el-table-column>
                <el-table-column prop="customer_bill_amount" label="客户收取费用" width="120"></el-table-column>
                <el-table-column prop="profit" label="利润"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status===1?'未处理':'已处理'}}
                    </template>
                </el-table-column>
                <el-table-column prop="user_name" label="处理人"></el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <!-- <el-button @click="check(scope.row.id)" type="text" size="small">查看详情</el-button> -->
                        <el-button type="text" @click="confirm(scope.row.id)" size="small">确认</el-button>
                    </template>
                </el-table-column>
           </el-table>
           <!-- <div style="text-align:left">
               <el-button class="orangeBtn" @click="back">返回</el-button>
           </div> -->

           <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: center; margin: 20px 0"
            :current-page="page.pageNo"
            :page-size="page.limit"
            :page-sizes="page.sizes"
            :total="page.total"
            layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '0',
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      },
      tableData: [

      ],
      payableId: undefined,
      searchForm: {
        agentNo: '',
        waybillNo: '',
        agentChannelName: '',
        channelName: '',
        country: '',
        agentCountry: null,
        userName: null
      }
    }
  },
  mounted () {
    if (this.$route.params.payableId === undefined) {
      this.$router.go(-1)
    }
    this.payableId = this.$route.params.payableId
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      let params = {
        payableId: this.payableId,
        status: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit,
        agentNo: this.searchForm.agentNo,
        waybillNo: this.searchForm.waybillNo,
        agentChannelName: this.searchForm.agentChannelName,
        channelName: this.searchForm.channelName,
        agentCountry: this.searchForm.agentCountry,
        country: this.searchForm.country,
        userName: this.searchForm.userName
      }
      this.$api.finance.payabble.agent.diversityLists(params).then(res => {
        console.log(res.data) // res是接口返回的结果
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    search () {
      this.page.pageNo = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    detail (id) {
      this.$router.push({ name: 'priceDetail', params: { waybillId: id } })
    },
    handleClick (tab, event) {
      console.log(tab, event)
      this.activeName = tab.name
      this.getData()
    },
    check (id) {
      // diversityId
      this.$api.finance.payabble.agent.info({ diversityId: id }).then(res => {})
    },
    confirm (id) {
      this.$confirm('是否确认')
        .then(_ => {
          this.$api.finance.payabble.agent.diversityConfirm({ diversityId: id }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='scss' scoped>

.dra-content{
  text-align: left;
  /deep/.cell{
  display: flex;
  justify-content:space-between;
  line-height: 40px;
}
}
/deep/ .tableBtn{
  .batch{
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
.label{
  font-size: 14px;
  padding: 5px;
  span{
    width: 100px;
  }
  /deep/.el-input__inner{
    width: 200px;
    display: inline;
  }
   .el-input{
    display: inline;
    margin-left: 10px;
  }
}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
