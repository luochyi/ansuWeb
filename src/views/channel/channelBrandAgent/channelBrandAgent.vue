 <template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
      <span class='text'>代理配置</span>
    </el-row>
    <el-row class="box-block flex">
      <el-col :span="6" style="border: 1px solid #D9D9D9;box-shadow: 8px 0px 0px -5px rgba(0, 0, 0, 0.9);border-top:none">
        <div style="height:100%;background:#fff">
          <el-row style="padding:14px 34px 12px 34px;" type='flex' justify="space-between" align="middle">
            <el-col :span="3" style="margin-top:-2px">
            <span style="font-size: 14px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">渠道</span>
            </el-col>
            <el-col :span="14" type="flex">
            <!-- <span style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #000000;">分类：</span>
            <el-select size="small" style="width:90px" v-model="Class">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select> -->
            </el-col>
          </el-row>
          <el-row class="search-box">
            <!-- <span class="input-box">
              <img alt class='logoimg' src='@/assets/search.png' style="width: 14px;height: 14px;" />
              <el-input class="elin" size="small" placeholder="请输入渠道名或编码" style="border:0" v-model="searchInput"></el-input>
            </span>
            <span class="search-font" style="">搜索</span> -->
          </el-row>
          <el-row style="padding:0px 30px 12px 40px;display:flex;align-items:center;"  v-for="item,index in channelList" :key="index" @click.native="changechannel(item.id,index)">
            <el-row :class="index===red?'active':''" style="padding:12px;margin-bottom:20px;background: #F9F9F9;
          border-radius: 3px;width: 88%;height: 68px;font-size: 14px;font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;color: rgba(0, 0, 0, 0.8);cursor: pointer;">
          <div style="display:flex;align-items:center;margin-bottom:4px" >
            <span>渠道：</span><span>{{item.name}}</span>
          </div>
          <div style="display:flex;align-items:center;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
          color: rgba(0, 0, 0, 0.45);justify-content:space-between">
            <span >编码：<span>{{item.code}}</span></span>
            <!-- <span class="num">{{num}}家代理</span> -->
          </div>
          </el-row>
          </el-row>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 主要内容 -->
    <div class='content'>
        <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 代理名称 -->
        <el-col :span='8' class='colbox'>
          <span class='text'>代理名称</span>
          <el-col :span='16'>
            <el-input v-model='agentName' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 代理编码 -->
        <el-col :span='8' class='colbox'>
          <span class='text'>代理编码</span>
          <el-col :span='16'>
            <el-input v-model='agentCode' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colbox'>
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
      </el-row>
         <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <!-- <el-button class='stopBtn' @click="batchDel">批量删除</el-button> -->
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">添加代理</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50" key="1"></el-table-column>
            <el-table-column prop="agent_name" label="代理名称" min-width="150" key="2"></el-table-column>
            <el-table-column prop="agent_status" label="代理状态" min-width="100" key="3">
              <template slot-scope="scope">
                <span v-if="scope.row.agent_status===1">正常</span>
                <span v-else-if="scope.row.agent_status===2">停用</span>
              </template>
            </el-table-column>
            <el-table-column prop="agent_service_name" label="代理服务名称" min-width="80" key="5"></el-table-column>
            <el-table-column prop="agent_service_status" label="代理服务状态" min-width="80" key="6">
              <template slot-scope="scope">
                <span v-if="scope.row.agent_service_status===1">正常</span>
                <span v-else-if="scope.row.agent_service_status===2">停用</span>
              </template>
            </el-table-column>
            <el-table-column prop="is_master" label="是否主代理" min-width="100" key="7">
              <template slot-scope="scope">
                <span v-if="scope.row.is_master===1">是</span>
                <span v-else-if="scope.row.is_master===0">否</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="300" key="17">
              <template slot-scope="scope">
                <el-button type="text" @click="masterchannel(scope.row.id)">
                  设置主渠道
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="del(scope.row.id)">
                  删除渠道服务
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
    </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      channelList: [],
      visible: false,
      red: null,
      channelId: null,
      chooseArr: [],
      total: null, // 数据总条数
      currentPage: 1,
      pageSize: 15,
      agentCode: '',
      agentName: '',
      tableData: [], // 表格数据
      Class: 1, // 分类
      options: [{
        value: 1,
        label: '全部'
      },
      {
        value: 2,
        label: '海运'
      },
      {
        value: 3,
        label: '空运'
      },
      {
        value: 4,
        label: '快递'
      },
      {
        value: 5,
        label: '铁路'
      },
      {
        value: 6,
        label: '专车'
      }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.channelList = []
      this.$api.agent.channelLists({ page: 1, limit: 50, isStart: 1 }).then(res => {
        res.data.list && res.data.list.forEach(element => {
          let obj = {
            id: element.id,
            name: element.name,
            code: element.code
          }
          this.channelList.push(obj)
        })
      })
      this.$api.agent.channelServiceLists({ channelId: this.channelId }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changechannel (id, index) {
      this.red = index
      this.channelId = id
      this.getData()
    },
    handleSelectionChange (arr) {},
    masterchannel (id) {
      this.$api.agent.channelServiceMaster({ channelServiceId: id }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    batchDel () {
      this.$confirm('确认删除')
        .then(_ => {
          console.log(1)
        })
        .catch(_ => {})
    },
    del (id) {
      this.$confirm('确认删除')
        .then(_ => {
          this.$api.agent.channelServiceDel({ channelServiceId: id }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(_ => {})
    },
    toAdd () {
    }
  }
}
</script>
<style lang="scss" scoped>
.active{
  border:3px solid #FB4702
}
.search-font{
  width: 60px;
  height: 36px;
  background: #FB4702;
  border: 1px solid #979797;
  border-left: 0;
  border-bottom-right-radius: 18px;
  border-top-right-radius: 18px;
  text-align:center;
  line-height:36px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;color: #FFFFFF;
}
.input-box{
  width: 67%;
  height: 36px;
  background: #FFFFFF;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  border: 1px solid #979797;
  display:flex;
  justify-content:flex-start;
  padding-left:10px;
  align-items:center;
}
.search-box{
  padding:0px 30px 12px 40px;
  display:flex;
  align-items:center;
  margin-bottom:8px
}
/deep/ .changebox{
    display: flex;
    align-items: center;
    height: 34px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    .el-input__inner{
        border:none
    }
}
/deep/ .el-dialog{
  text-align: start;
}
.item-box{
  display: flex;
  align-items: center;
}
.title-item{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
}
.daili1{
  display: flex;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
.title-dai{
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
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
/deep/ .el-drawer{
  background: #E8EBF2;
    .el-drawer__header{
      padding: 30px 20px;
      text-align: left;
      background: #FFFFFF;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;color: #333333;
}
}
/deep/ .elin  {
  .el-input__inner{
    border: none;
  }
}
.num{
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFBD32;
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
