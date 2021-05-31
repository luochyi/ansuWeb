<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>渠道配置</span>
      <el-tabs v-model='activeName' type='card'>
        <el-tab-pane label='启用渠道' name='1'></el-tab-pane>
        <el-tab-pane label='停用渠道' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>

     <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 渠道名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>渠道名称</span>
          <el-col :span='16'>
            <el-input v-model='channelName' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 渠道编码 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>渠道编码</span>
          <el-col :span='16'>
            <el-input v-model='channelCode' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 渠道英文 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>渠道英文</span>
          <el-col :span='16'>
            <el-input v-model='channelEngLish' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 渠道分类 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>渠道分类</span>
          <el-col :span='16'>
            <el-select v-model='channelType' placeholder='请选择'>
              <el-option
                v-for="item in channelTypeOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
         <!-- 派送类型 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>派送类型</span>
          <el-col :span='16'>
            <el-select v-model='DeliveryType' placeholder='请输入'>
              <el-option
                v-for="item in DeliveryTypeOpts"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
            <el-table-column type="selection" width="50" key="1"></el-table-column>
            <el-table-column prop="channelName" label="渠道名称" min-width="150" key="2"></el-table-column>
            <el-table-column prop="channelCode" label="渠道编码" min-width="100" key="3"></el-table-column>
            <el-table-column prop="channelEngLish" label="渠道英文" min-width="100" key="4"></el-table-column>
            <el-table-column prop="channelType" label="渠道分类" min-width="80" key="5"></el-table-column>
            <el-table-column prop="DeliveryType" label="派送类型" min-width="80" key="6"></el-table-column>
            <el-table-column prop="isFuel" label="是否含燃料" min-width="100" key="7"></el-table-column>
            <el-table-column prop="isTax" label="是否含税" min-width="80" key="8"></el-table-column>
            <el-table-column prop="isClearCustoms" label="是否含清关" min-width="100" key="9"></el-table-column>
            <el-table-column prop="volume" label="材积除" min-width="100" key="10"></el-table-column>
            <el-table-column prop="calculationRules" label="计算规则" min-width="100" key="11"></el-table-column>
            <el-table-column prop="channelScore" label="渠道评分" min-width="100" key="12"></el-table-column>
            <el-table-column prop="acceptGoods" label="接受货物" min-width="100" key="13"></el-table-column>
            <el-table-column prop="transportTime" label="运输时间" min-width="150" key="14"></el-table-column>
            <el-table-column prop="channelInfo" label="渠道简介" min-width="100" key="15"></el-table-column>
            <el-table-column prop="inputPeople" label="录价人" min-width="100" key="16"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150" key="17">
              <template slot-scope="scope">
                <el-button type="text">
                  分区价格
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text">
                  附加费
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text">
                  修改
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="stopAgent(scope.row)">
                  停用渠道
                </el-button>
                <el-button v-if="activeName === '2'" type="text">
                  启用渠道
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
    <!-- 弹窗 -->
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
        <div v-if="dialogTitle === '停用渠道'" class="left">
          <el-row>你是否确认停用</el-row>
          <el-row>渠道'{{chooseAgent.agentName}}'</el-row>
        </div>
        <div v-else>
          你是否确认停用这{{chooseArr.length}}个渠道
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

      channelName: '', // 渠道名称
      channelCode: '', // 渠道编码
      channelEngLish: '', // 渠道英文
      channelType: '', // 渠道分类
      channelTypeOpts: [
        {
          id: 1,
          name: '海运'
        }, {
          id: 2,
          name: '空运'
        }, {
          id: 3,
          name: '快递'
        }, {
          id: 4,
          name: '铁路'
        }, {
          id: 5,
          name: '专车'
        }
      ],
      DeliveryType: '', // 派送类型
      DeliveryTypeOpts: [
        {
          id: 1,
          name: '快递'
        }, {
          id: 2,
          name: '卡派'
        }
      ],
      tableData: [
        {
          channelName: '美国空派-普货',
          channelCode: 'USAUSP',
          channelEngLish: 'USAairport',
          channelType: '海运',
          DeliveryType: 'UPS',
          isFuel: '含燃料费',
          isTax: '含税',
          isClearCustoms: '含清关费',
          volume: '除5000',
          calculationRules: '',
          channelScore: '4.3',
          acceptGoods: '带电',
          transportTime: '9-11个工作日',
          channelInfo: '',
          inputPeople: '李小彬'
        }
      ],

      dialogTitle: '停用渠道',
      chooseAgent: {}, // 选择停用的 渠道
      chooseArr: [], // 选中的渠道
      dialogStop: false // 停用弹窗
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    getData () {
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
          message: '选中的渠道不能为空',
          customClass: 'message_reject',
          center: true,
          iconClass: 'icons'
        })
      }
      this.dialogStop = true
      this.dialogTitle = '批量停用渠道'
    },
    stopAgent (val) {
      this.dialogStop = true
      this.chooseAgent = val
      this.dialogTitle = '停用渠道'
    },
    toAdd () {
      this.$router.push({ name: 'addAgent' })
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
