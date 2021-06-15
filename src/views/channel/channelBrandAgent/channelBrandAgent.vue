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
          <el-row  style="padding:0px 30px 12px 40px;display:flex;align-items:center;margin-bottom:8px">
            <span class="input" style="width: 67%;height: 36px;background: #FFFFFF;border-top-left-radius: 18px;border-bottom-left-radius: 18px;
            border: 1px solid #979797;display:flex;justify-content:flex-start;padding-left:10px;align-items:center">
              <img alt class='logoimg' src='@/assets/search.png' style="width: 14px;height: 14px;" />
              <el-input class="elin" size="small" placeholder="请输入渠道名或编码" style="border:0" v-model="searchInput"></el-input>
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
          color: rgba(0, 0, 0, 0.45);justify-content:space-between">
            <span >编码：<span>{{code}}</span></span>
            <span class="num">{{num}}家代理</span>
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
            <el-button class='stopBtn' @click="batchStop">批量移除</el-button>
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">添加代理</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50" key="1"></el-table-column>
            <el-table-column prop="agentName" label="代理名称" min-width="150" key="2"></el-table-column>
            <el-table-column prop="agentCode" label="代理编码" min-width="100" key="3"></el-table-column>
            <el-table-column prop="agentType" label="是否主代理" min-width="80" key="5"></el-table-column>
            <el-table-column prop="DeliveryType" label="派送类型" min-width="80" key="6"></el-table-column>
            <el-table-column prop="isFuel" label="是否含燃料" min-width="100" key="7"></el-table-column>
            <el-table-column prop="isTax" label="是否含税" min-width="80" key="8"></el-table-column>
            <el-table-column prop="isClearCustoms" label="是否含清关费" min-width="100" key="9"></el-table-column>
            <el-table-column prop="volume" label="材积除" min-width="100" key="10"></el-table-column>
            <el-table-column prop="calculationRules" label="计算规则" min-width="100" key="11">
              <template v-stol="scope">
                <el-button type="text" style="font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #0084FF;">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="channelScore" label="渠道评分" min-width="100" key="12"></el-table-column>
            <el-table-column prop="acceptGoods" label="接受货物" min-width="100" key="13"></el-table-column>
            <el-table-column prop="transportTime" label="运输时间" min-width="150" key="14"></el-table-column>
            <el-table-column prop="channelInfo" label="渠道简介" min-width="100" key="15">
              <template v-stol="scope">
                <el-button type="text" style="font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #0084FF;">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="inputPeople" label="录价员" min-width="100" key="16">
              <template v-stol="scope">
                <el-button type="text" style="font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #0084FF;">
                  查看记录
                </el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="360" key="17">
              <template slot-scope="scope">
                <el-button type="text" @click="toPartition">
                  分区价格
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="visibleSurcharge = true">
                  附加费
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text">
                  停用
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text">
                  修改
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="stopAgent(scope.row)">
                  主渠道
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text">
                  启用渠道
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 渠道附加费抽屉 -->
    <el-drawer
      title="渠道附加费"
      :visible.sync="visibleSurcharge"
      :wrapperClosable='false'
      size="50%">
      <div style="padding:0px 26px 26px 26px;margin-top:-6px;">
        <div v-if="additional === 0">
          <el-row style="background:#fff;text-align:left;padding:26px">
          <el-row >
              <el-col>
                <span class="title-dai">代理</span>
              </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
            <el-col :span="10" class="item-box">
              <span class="title-item">渠道：</span>
              <span class="daili1">{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-box">
              <span class="title-item">渠道编码：</span>
              <span class="daili1">{{cannel}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:26px">
            <el-col>
              <span class="title-dai">代理附加费</span>
            </el-col>
          </el-row>
          <!-- 抽屉表格 -->
          <div class="table" style="margin-top:16px">
          <el-table ref="multipleTable" :data="additionalData" border  tooltip-effect="dark" style="width: 100%" @selection-change="kapaiChange" :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="additionalName" label="附加费名称" min-width="130" key="2"></el-table-column>
            <el-table-column prop="condition" label="起收条件" min-width="250" key="3"></el-table-column>
            <el-table-column prop="fee" label="收取费用" min-width="150" key="4"></el-table-column>
          </el-table>
          </div>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn" icon="el-icon-circle-plus-outline" @click="addAdditional" style="width:130px">
              新增附加费
            </el-button>
            <el-button class="orangeBtn" @click="modifyAdditional" style="width:130px">
              修改附加费
            </el-button>
          </el-row>
        </el-row>
        </div>
        <!-- 点击新增附加费 -->
        <div v-if="additional === 1">
          <el-row style="background:#fff;text-align:left;padding:26px">
            <el-row >
                <el-col>
                  <span class="title-dai">代理</span>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="10" class="item-box">
                <span class="title-item">渠道：</span>
                <span class="daili1">{{cannel}}</span>
              </el-col>
              <el-col :span="10" class="item-box">
                <span class="title-item">渠道编码：</span>
                <span class="daili1">{{cannel}}</span>
              </el-col>
            </el-row>
            <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
            <el-row style="margin-top:20px">
              <el-col>
                <span class="title-dai">代理附加费</span>
              </el-col>
            </el-row>
              <el-row style="display:flex;align-items:center;margin-top:20px;margin-bottom:16px">
                <span class="secondaryTitle" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;color: rgba(0, 0, 0, 0.65);">附加费名称</span>
                <el-col :span="8" class="changebox" style="margin-left:10px">
                  <el-input placeholder="请输入" v-model="surchargeName" size="small" style=""></el-input>
                  <img src="@/assets/search.png" alt="" style="width: 13px;height: 13px;opacity: 0.65;margin-right:10px">
                </el-col>
              </el-row>
              <template>
                <div style="display:flex;align-items:center">
                  <el-checkbox-group v-model="valueList" @change="valueChange">
                    <el-checkbox v-for="(item, label) in checkList" :key="label" :label="label">&nbsp;&nbsp;{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                  <div v-for="(item, index) in checkList" :key="index" style="display:flex;align-items:center">
                    <span style="width:140px;text-align:right;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;
                                 font-weight: 400;color: rgba(0, 0, 0, 0.45);">
                      {{item.add}}
                    </span>
                    <el-input class="inputClass" style="margin-left:10px;width:80%;margin-right:20px" v-model="agentInput" size="small">
                      <i slot="suffix" style="margin-right: 10px;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;">元/公斤</i>
                    </el-input>
                    <span style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #0091FF;
                                 width:110px;cursor:pointer">
                      {{item.className}}
                    </span>
                  </div>
                </div>
              </template>
           </el-row>
        </div>
        <div v-if="additional === 2">
          <el-row style="background:#fff;text-align:left;padding:26px">
            <el-row >
              <el-col>
                <span class="title-dai">纺织品品名管理</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="10" class="item-box">
                <span class="title-item">渠道：</span>
                <span class="daili1">{{cannel}}</span>
              </el-col>
              <el-col :span="10" class="item-box">
                <span class="title-item">渠道编码：</span>
                <span class="daili1">{{cannel}}</span>
              </el-col>
            </el-row>
            <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
            <el-row style="font-size: 12px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FF4D4F;margin:16px">
              注：品名之间用,（英文逗号）做分割
            </el-row>
            <el-row>
              <el-input type="textarea" rows="21" v-model="modifyText"></el-input>
            </el-row>
          </el-row>
        </div>
      </div>
      <el-row style="background:#fff;text-align:left;padding:26px">
        <el-button class="orangeBtn long1" plain size="small"  @click="fuJFConfirm" style="margin-right:20px">
            确 认
        </el-button>
        <el-button type="info long1" plain size="small" @click="cancelSurcharge" style="margin-right:20px" v-if="additional === 0">
            取 消
        </el-button>
        <el-button type="info long1" plain size="small" @click="addCancel" style="margin-right:20px" v-if="additional === 1">
            取 消
        </el-button>
        <!-- 修改附加费取消 -->
        <el-button type="info long1" plain size="small" @click="addCancel" style="margin-right:20px" v-if="additional === 2">
            取 消
        </el-button>
      </el-row>
    </el-drawer>
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
    <!-- 分区价格抽屉 -->
    <el-drawer
      title="设置分区"
      :visible.sync="drawer"
      size="50%">
      <div style="padding:0px 26px 26px 26px;margin-top:-6px">
        <el-row style="background:#fff;text-align:left;padding:26px">
          <el-row style="display:flex;align-items:center">
            <el-col :span="3" style="display:flex;">
              <div style="display:flex;flex-direction: column;align-items:center">
                <div class="circle">1</div>
                <div>渠道分区</div>
              </div>
            </el-col>
            <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;">
              <div class="circle1">2</div>
              <div>重量段设置</div>
            </el-col>
             <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;">
              <div class="circle1">3</div>
              <div>价格维护</div>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:20px">
            <el-col>
              <span class="title-dai">代理</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
              <el-col :span="10" class="item-box">
                <span class="title-item">渠道：</span>
                <span class="daili1">{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-box">
                <span class="title-item">渠道编码：</span>
                <span class="daili1">{{cannel}}</span>
            </el-col>
            <el-col :span="4" style="margin-top: -6px">
              <el-button class='whiteBtn' size="small" @click="dialogVisible = true">复制分区</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
            <el-col :span="10" class="item-box">
                <span class="title-item">代理：</span>
                <span class="daili1">{{agent}}</span>
            </el-col>
            <el-col :span="10" class="item-box">
                <span class="title-item">代理编码：</span>
                <span class="daili1">{{agentCode}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin:26px 0"></el-row>
          <!-- 抽屉表格 -->
          <div class="table">
          <el-table ref="multipleTable" :data="drawerTableData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="aimCountry" label="目的国" min-width="80"></el-table-column>
            <el-table-column prop="partitionName" label="分区名称" min-width="100"></el-table-column>
            <el-table-column prop="partitionPostcode" label="分区邮编" min-width="80"></el-table-column>
            <el-table-column prop="exclude" label="排除地区邮编" min-width="110"></el-table-column>
            <el-table-column prop="remote" label="偏远地区邮编" min-width="110"></el-table-column>
            <el-table-column prop="AmazonWarehouse" label="亚马逊仓库" min-width="100"></el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="modify(scope.row)">修改</el-button>
                <span style="color:#0084FF"> | </span>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn long1" icon="el-icon-circle-plus-outline" style="width:110px">新增分区</el-button>
          </el-row>
      </el-row>
      </div>
    </el-drawer>
    <!-- 复制分区 -->
    <el-dialog
      title="复制分区"
      :visible.sync="dialogVisible"
      left
      width="30%">
      <span style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: rgba(0, 0, 0, 0.65);">
        请选择需要复制代理的分区
      </span>
      <el-row style="margin-top:16px">
            <el-col :span="16" class="changebox">
              <el-input placeholder="请选择" v-model="changeAgent" size="small" style="">
              </el-input>
              <img src="@/assets/search.png" alt="" style="width: 13px;height: 13px;opacity: 0.65;margin-right:10px">
            </el-col>
        </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" style="width:80px;margin-top:-2px" class='wuBtn long1'>取 消</el-button>
        <el-button class='orangeBtn long1' @click="dialogVisible = false" size="small" style="width:80px;margin-top:10px">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog
      :visible.sync="dialogStop"
      width="30%">
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
    <component :is="partitionName" :drawerKapai="dialogPartitionTrue" @handleClose="handleClose"></component>
  </div>
</template>
<script>
import dialogPartition from './component/dialogPartition.vue'
export default {
  components: {
    dialogPartition
  },
  data () {
    return {
      dialogPartitionTrue: false, // 父组建传给子组建的变量
      partitionName: 'dialogPartition',
      agentInput: '', // 代理附加费输入框
      valueList: [], // 代理附加费选择的值
      checkList: [{
        label: '带电',
        add: '增加',
        className: '纺织品品名'
      }],
      surchargeName: '', // 附加费名称
      additionalData: [], // 附加费抽屉表格
      additional: 0, //
      visibleSurcharge: false, // 附加费
      chooseArr: {},
      dialogTitle: '', // 停用弹窗的可变字段
      dialogStop: false,
      changeAgent: '', // 请选择需要复制怼代理分区
      dialogVisible: false, // 复制弹窗
      agentCode: 'SZTT深圳天图', // 代理编码
      agent: '深圳天图供应链有限公司', // 代理
      cannel: '以星特快海派包邮UPS派送', // 渠道
      cannelCode: 'YXTK以星特快', // 渠道编码
      drawer: false, // 分区价格弹窗
      searchInput: '', // 搜索输入内容
      num: 3, // 代理数量
      total: 50, // 数据总条数
      code: 'JP_hp1',
      delivery: '日本快船-佐川派送', // 送货方式
      agentName: '', // 代理名称
      currentPage: 1,
      pageSize: 15,
      drawerTableData: [
        {
          aimCountry: '中国'
        }
      ], // 抽屉表格
      tableData: [
        {
          agentName: '天图供应链',
          agentCode: 'USAUSP',
          agentType: '主代理',
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
      ], // 表格数据
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
  },
  methods: {
    // 代理附加费添加取消
    addCancel () {
      this.additional = 0
      this.valueList = []
      this.agentInput = ''
    },
    // 代理附加费选择
    valueChange (val) {
      console.log(val)
    },
    // 新增附加费
    addAdditional () {
      this.additional = 1
    },
    // 修改代理附加费
    modifyAdditional () {
      this.additional = 2
    },
    // 代理附加费取消
    cancelSurcharge () {
      this.visibleSurcharge = false
      this.additional = 0
    },
    // 附加费表格多选
    kapaiChange () {},
    // 附加费抽屉确认
    fuJFConfirm () {},
    // 修改
    modify () {},
    toAdd () {
      this.$router.push({ name: 'newlyAddedAgent' })
    },
    batchStop () {
    },
    handleSelectionChange () {},
    toPartition () {
      this.dialogPartitionTrue = true
    },
    handleClose (val) {
      this.dialogPartitionTrue = false
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
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
