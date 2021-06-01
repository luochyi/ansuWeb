 <template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 0px">
      <span class='text'>代理配置</span>
    </el-row>
    <el-row>
      <el-col :span="6" style="height:100%;border-right: 1px solid #D9D9D9;box-shadow: 8px 0px 6px -5px rgba(0, 0, 0, 0.2);">
        <div style="height:100%;background:#fff">
          <el-row style="padding:14px 34px 12px 34px;" type='flex' justify="space-between" align="middle">
            <el-col :span="3">
            <span style="font-size: 14px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">渠道</span>
            </el-col>
            <el-col :span="14" type="flex">
            <span style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #000000;">分类：</span>
            <el-select size="small" style="width:90px" v-model="Class">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
            </el-col>
          </el-row>
          <el-row style="padding:0px 30px 12px 40px;display:flex;align-items:center;margin-bottom:8px">
            <span style="width: 67%;height: 36px;background: #FFFFFF;border-top-left-radius: 18px;border-bottom-left-radius: 18px;
            border: 1px solid #979797;display:flex;justify-content:flex-start;padding-left:10px;align-items:center">
            <img alt class='logoimg' src='@/assets/search.png' style="width: 14px;height: 14px;" />
            </span>
            <span style="width: 60px;height: 36px;background: #FB4702;border: 1px solid #979797;border-left: 0;border-bottom-right-radius: 18px;
            border-top-right-radius: 18px;text-align:center;line-height:36px;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;color: #FFFFFF;">搜索</span>
          </el-row>
          <el-row style="padding:0px 30px 12px 40px;display:flex;align-items:center;">
            <el-row style="padding:12px;margin-bottom:20px;background: #F9F9F9;
          border-radius: 3px;width: 88%;height: 68px;border: 1px solid #E9E9E9;font-size: 14px;font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;color: rgba(0, 0, 0, 0.8);">
          <div style="display:flex;align-items:center;margin-bottom:4px">
            <span>渠道：</span><span>{{delivery}}</span>
          </div>
          <div style="display:flex;align-items:center;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
          color: rgba(0, 0, 0, 0.45);">
            <span>编码：</span><span>{{code}}</span>
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
        <!-- 渠道名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>代理名称</span>
          <el-col :span='16'>
            <el-input v-model='agentName' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 渠道编码 -->
        <el-col :span='6' class='colbox'>
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
            <el-button class='stopBtn' @click="batchStop">批量移除</el-button>
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">新增代理</el-button>
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
    </el-col>
    </el-row>
    <!-- 弹窗 -->
    <!-- <el-dialog
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
    </el-dialog> -->
  </div>
</template>

<script>
export default{
  data () {
    return {
      code: 'JP_hp1',
      delivery: '日本快船-佐川派送', // 送货方式
      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      currentPage: 1,
      pageSize: 15,
      tableData: [], // 表格数据
      Class: '', // 分类
      options: [{
        value: '1',
        label: '全部'
      },
      {
        value: '2',
        label: '海运'
      },
      {
        value: '3',
        label: '空运'
      },
      {
        value: '4',
        label: '快递'
      },
      {
        value: '5',
        label: '铁路'
      },
      {
        value: '6',
        label: '专车'
      }
      ]
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


