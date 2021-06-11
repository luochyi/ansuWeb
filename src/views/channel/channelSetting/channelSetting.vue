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
            <el-select v-model='channelType' placeholder='请选择' style="width:100%">
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
            <el-select v-model='DeliveryType' placeholder='请输入' style="width:100%">
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
            <el-table-column prop="calculationRules" label="计算规则" min-width="100" key="11">
              <template slot-scope="scope">
                <el-button type="text" @click="chcek(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="channelScore" label="渠道评分" min-width="100" key="12"></el-table-column>
            <el-table-column prop="acceptGoods" label="接受货物" min-width="100" key="13"></el-table-column>
            <el-table-column prop="transportTime" label="运输时间" min-width="150" key="14"></el-table-column>
            <el-table-column prop="channelInfo" label="渠道简介" min-width="100" key="15">
              <template slot-scope="scope">
                <el-button type="text" @click="cannelChcek(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="inputPeople" label="录价人" min-width="100" key="16">
              <template slot-scope="scope">
                <el-button type="text" @click="recordsChcek(scope.row)">查看记录</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="250" key="17">
              <template slot-scope="scope">
                <el-button type="text" @click="openPartition(scope.row)">
                  分区价格
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="visibleSurcharge = true">
                  附加费
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="stopAgent(scope.row)">
                  停用
                </el-button>
                <el-button type="text">
                  修改
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
      <!-- 渠道简介抽屉 -->
    <el-drawer
      title="修改渠道简介"
      :visible.sync="drawer"
      size="50%">
      <div style="padding:0px 26px 26px 26px;margin-top:-6px;">
        <el-row style="background:#fff;text-align:left;padding:26px;">
          <el-row>
            <el-col :span="2" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              渠道
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道：</span><span>{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道编码：</span><span>{{cannelCode}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:20px">
            <el-col>
              <span style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">渠道简介</span>
            </el-col>
          </el-row>

          <!-- 寄送规则 -->
          <el-row style="margin-top:16px;font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 600;
          color: rgba(0, 0, 0, 0.65);">
            <el-col :span="6">
              寄送规则
            </el-col>
          </el-row>
          <el-row style="height:200px">
            <template>
              <div class="content edit_container">
                <quill-editor
                style="height:100px"
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
                <!-- <button v-on:click="saveHtml">保存</button> -->
              </div>
            </template>
          </el-row>

          <!-- 注意事项 -->
          <el-row style="margin-top:16px;font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 600;
          color: rgba(0, 0, 0, 0.65);">
            <el-col :span="6">
              注意事项
            </el-col>
          </el-row>
          <el-row style="margin-top:12px;">
            <el-col :span="5" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
            color: rgba(0, 0, 0, 0.65);">是否有注意事项</el-col>
            <el-col :span="19"></el-col>
            <template>
              <el-radio-group v-model="radio">
                <el-radio :label="1">有注意事项</el-radio>
                <el-radio :label="2">无注意事项</el-radio>
              </el-radio-group>
            </template>
          </el-row>
          <el-row style="height:200px">
            <template>
              <div class="content edit_container">
                <quill-editor
                style="height:100px"
                    v-model="note"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
                <!-- <button v-on:click="saveHtml">保存</button> -->
              </div>
            </template>
          </el-row>
          <el-row style="margin-top:16px;font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 600;
          color: rgba(0, 0, 0, 0.65);">
            <el-col :span="6">
              特殊要求
            </el-col>
          </el-row>
          <el-row style="margin-top:12px">
            <el-col :span="5" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 500;
            color: rgba(0, 0, 0, 0.65);">是否有特殊要求</el-col>
            <el-col :span="19"></el-col>
            <template>
              <el-radio-group v-model="Require">
                <el-radio :label="1">有特殊要求</el-radio>
                <el-radio :label="2">无特殊要求</el-radio>
              </el-radio-group>
            </template>
          </el-row>
          <el-row style="margin-top:16px;font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 600;
          color: rgba(0, 0, 0, 0.65);">
            <el-col :span="6">
              温馨提示
            </el-col>
          </el-row>
          <el-row style="margin-top:12px">
            <el-col :span="5" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 500;
            color: rgba(0, 0, 0, 0.65);">是否有温馨提示</el-col>
            <el-col :span="19"></el-col>
            <template>
              <el-radio-group v-model="tip">
                <el-radio :label="1">有温馨提示</el-radio>
                <el-radio :label="2">无温馨提示</el-radio>
              </el-radio-group>
            </template>
          </el-row>
        </el-row>
        <div class="drawer_btn">
          <el-button class='orangeBtn' size="small" style="margin-right:10px">确定</el-button>
           <!-- icon="el-icon-success" -->
          <el-button class="wuBtn" size="small">取消</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- 历史价格抽屉 -->
    <el-drawer
      title="历史价格"
      :visible.sync="recordsDrawer"
      size="50%">
      <div style="padding:0px 26px 26px 26px;margin-top:-6px;">
        <el-row style="background:#fff;text-align:left;padding:26px;">
          <el-row>
            <el-col :span="2" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              渠道
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道：</span><span>{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道编码：</span><span>{{cannelCode}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:16px">
            <el-col :span="4" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              历史价格明细
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <div class="table">
          <el-table ref="multipleTable" :data="inputTable" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="date" label="时间" min-width="400" key="1"></el-table-column>
            <el-table-column prop="inputPeople" label="录价人" min-width="100" key="2"></el-table-column>
            <el-table-column label="操作" min-width="100" key="3">
              <template slot-scope="scope">
                <el-button type="text" @click="price(scope.row)">查看价格</el-button>
              </template>
            </el-table-column>
          </el-table>
            </div>
          </el-row>
        </el-row>
        <div class="drawer_btn">
          <el-button type="info" plain size="small" @click="recordsDrawer = fasle" style="margin-right:10px">返 回</el-button>
       </div>
      </div>
    </el-drawer>
    <!-- 维护价格抽屉 -->
    <el-drawer
      title="维护价格"
      :visible.sync="priceDrawer"
      size="50%">
      <div style="padding:0px 26px 26px 26px;margin-top:-6px;">
        <el-row style="background:#fff;text-align:left;padding:26px;">
          <el-row>
            <el-col :span="2" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              代理
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道：</span><span>{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道编码：</span><span>{{cannelCode}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">代理：</span><span>{{agent}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">代理编码：</span><span>{{agentCode}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:16px">
            <el-col :span="4" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              渠道价格
            </el-col>
            <el-col :span="20" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
            <span>时间：</span><span style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
            color: rgba(0, 0, 0, 0.65);">{{date}}</span>
            </el-col>
          </el-row>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin-top:20px">
            价格按单价</el-row>
          <el-row style="margin-top:16px">
            <div class="table">
          <el-table ref="multipleTable" :data="priceTable" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="country"  min-width="60" key="1"></el-table-column>
            <el-table-column prop="quality1" label="0-20 公斤" min-width="60" key="1"></el-table-column>
            <el-table-column prop="quality2" label="21-50 公斤" min-width="60" key="1"></el-table-column>
            <el-table-column prop="quality3" label="100-MAX 公斤" min-width="60" key="1"></el-table-column>
          </el-table>
            </div>
          </el-row>
          <div>
            <el-row style="margin-top:28px">
              <el-col :span="4" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
                color: rgba(0, 0, 0, 0.8);">
                价格生效时间
              </el-col>
              <el-col :span="18">
                <template>
                <el-radio-group v-model="timeChange">
                  <el-radio :label="1">次日中午12:00生效</el-radio>
                  <el-radio :label="2">当日下午18:00生效</el-radio>
                  <el-radio :label="3">自定义时间</el-radio>
                </el-radio-group>
              </template>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <div class="drawer_btn">
          <el-button type="info" plain size="small" @click="priceDrawer = fasle" style="margin-right:10px">返 回</el-button>
        </div>
      </div>
    </el-drawer>
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
    <!-- 分区价格抽屉（快递） -->
    <el-drawer
      title="设置分区"
      :visible.sync="drawerPartitionExpress"
      :wrapperClosable='false'
      size="50%">
      <div style="padding:0px 26px 26px 26px;margin-top:-6px;">
        <el-row style="background:#fff;text-align:left;padding:26px">
          <el-row style="display:flex;align-items:center">
            <el-col :span="3" style="display:flex;" v-if="control === 1 || control === 2 || control === 3 || control === 4">
              <div style="display:flex;flex-direction: column;align-items:center">
                <div class="circle">1</div>
                <div>渠道分区</div>
              </div>
            </el-col>
            <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control !== 2 && control !== 3">
              <div class="circle1">2</div>
              <div>重量段设置</div>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control === 2 || control === 3">
              <div class="circle">2</div>
              <div>重量段设置</div>
            </el-col>
             <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control !== 3">
              <div class="circle1">3</div>
              <div>价格维护</div>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="control === 3">
              <div class="circle">3</div>
              <div>价格维护</div>
            </el-col>
          </el-row>
          <!-- 快递显示 -->
          <div v-if="control === 1">
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:20px">
            <el-col>
              <span class="title-dai">渠道</span>
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
            <el-table-column prop="partitionPostcode" label="分区邮编" min-width="130"></el-table-column>
            <el-table-column prop="exclude" label="排除地区邮编" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.exclude}}</span>&nbsp;
                <el-button @click="excludeBtn(scope.row)" type="text">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="remote" label="偏远地区邮编" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.remote}}</span>&nbsp;
                <el-button type="text" @click="remoteBtn(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="AmazonWarehouse" label="亚马逊仓库" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AmazonWarehouse}}</span>&nbsp;
                <el-button type="text" @click="AmazonWarehouseBtn(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="modify(scope.row)">修改</el-button>
                <span style="color:#0084FF"> | </span>
                <el-button type="text" @click="Delete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn long1" icon="el-icon-circle-plus-outline" @click="addExp" style="width:110px">新增分区</el-button>
          </el-row>
          </div>
          <!-- 新增快递分区 -->
          <div v-if="control === 4">
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:20px">
            <el-col>
              <span class="title-dai">分区信息</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;" class="fenqu">
              <el-col :span="4" style="text-align:right">分区名称&nbsp;&nbsp;</el-col>
              <el-col :span="8">
                <el-input size="small" placeholder="请选择" style="width:100%" v-model="name"></el-input>
              </el-col>
          </el-row>
          <el-row style="margin-top:20px;" class="fenqu">
              <el-col :span="4" style="text-align:right">寄送地区邮编&nbsp;&nbsp;</el-col>
              <el-col :span="8">
                <template>
                  <el-radio-group v-model="post">
                    <el-radio :label="1">固定邮编</el-radio>
                    <el-radio :label="2">连号邮编</el-radio>
                  </el-radio-group>
                </template>
              </el-col>
          </el-row>
          <el-row style="margin-top:20px;" class="fenqu" v-if="post === 2">
              <el-col :span="4" style="text-align:right">连号邮编&nbsp;&nbsp;</el-col>
              <el-col :span="5" style="margin-right:40px">
                <el-input size="small" placeholder="请输入起始邮编" style="width:100%" v-model="startPost"></el-input>
              </el-col>
              <el-col :span="5">
                <el-input size="small" placeholder="请输入结束邮编" style="width:100%" v-model="endPost"></el-input>
              </el-col>
          </el-row>
          <el-row style="margin-top:20px;" class="fenqu">
              <el-col :span="4" style="text-align:right">地区邮编&nbsp;&nbsp;</el-col>
              <el-col :span="16">
                <el-input type="textarea" rows="4" size="small" placeholder="请输入邮编" style="width:100%" v-model="areaPost"></el-input>
              </el-col>
          </el-row>
          <el-row style="margin-top:6px">
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="12" style="font-size: 12px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FF4D4F;">
              注：邮编之间用,（英文逗号）做分割
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;" class="fenqu">
              <el-col :span="4" style="text-align:right">排除地区邮编&nbsp;&nbsp;</el-col>
              <el-col :span="16">
                <el-input type="textarea" rows="4" size="small" placeholder="请输入邮编" style="width:100%" v-model="excludePost"></el-input>
              </el-col>
          </el-row>
          <el-row style="margin-top:20px;margin-bottom:16px">
            <el-col>
              <span class="title-dai">该邮编下FBA仓</span>
            </el-col>
          </el-row>
          <!-- 抽屉表格 -->
          <div class="table">
          <el-table ref="multipleTable" :data="expressTableData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="FBAwarehouse" label="FBA仓" min-width="80"></el-table-column>
            <el-table-column prop="FBAaddress" label="FBA仓地址" min-width="400"></el-table-column>
            <el-table-column prop="FBAmail" label="FBA仓邮编" min-width="130"></el-table-column>
          </el-table>
          </div>
       </div>
       </el-row>
       <div class="drawer_btn">
         <el-button class="whiteBtn long1" plain size="small" @click="lastBtn" style="margin-right:20px" v-if="control > 1 && control !== 4">
            上一步
          </el-button>
          <!-- 新增下一步 -->
          <el-button class="orangeBtn long1" plain size="small" @click="control = 2" style="margin-right:20px" v-if="control === 4">
            下一步
          </el-button>
          <el-button class="orangeBtn long1" plain size="small" @click="controlBtn" style="margin-right:20px" v-if="control < 3 && control !== 4">
            下一步
          </el-button>
          <el-button type="info long1" plain size="small" @click="PartitionExpressFasle" style="margin-right:20px" v-if="control !== 4">
            取 消
          </el-button>
          <!-- 新增取消 -->
          <el-button type="info long1" plain size="small" @click="control = 1" style="margin-right:20px" v-if="control === 4">
            取 消
          </el-button>
       </div>
      </div>
    </el-drawer>
    <!-- 分区价格抽屉（卡派） -->
    <el-drawer
      :visible.sync="drawerKapai"
      size="50%">
      <div slot="title" v-if="controlKP === 1">{{setting}}</div>
      <div slot="title" v-if="controlKP === 2">{{weightSetting}}</div>
      <div slot="title" v-if="controlKP === 3 || controlKP === 5">{{feeMaintain}}</div>
      <div style="padding:0px 26px 26px 26px;margin-top:-6px;">
        <el-row style="background:#fff;text-align:left;padding:26px">
          <el-row style="display:flex;align-items:center">
            <el-col :span="3" style="display:flex;"
            v-if="controlKP === 1 || controlKP === 2 || controlKP === 3 || controlKP === 4 || controlKP === 5">
              <div style="display:flex;flex-direction: column;align-items:center">
                <div class="circle">1</div>
                <div>渠道分区</div>
              </div>
            </el-col>
            <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="" v-if="controlKP < 6">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;"
            v-if="controlKP !== 2 && controlKP !== 3 && controlKP !== 5 && controlKP < 6">
              <div class="circle1">2</div>
              <div>重量段设置</div>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;"
            v-if="controlKP === 2 || controlKP === 3 || controlKP === 5">
              <div class="circle">2</div>
              <div>重量段设置</div>
            </el-col>
             <el-col :span="2">
              <img src="@/assets/jiantou.png" alt="" v-if="controlKP < 6">
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;"
            v-if="controlKP !== 3 && controlKP !== 5 && controlKP < 6">
              <div class="circle1">3</div>
              <div>价格维护</div>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;flex-direction: column;" v-if="controlKP === 3 || controlKP === 5">
              <div class="circle">3</div>
              <div>价格维护</div>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px" v-if="controlKP < 6"></el-row>

          <!--卡派显示1 -->
          <div v-if="controlKP === 1">
          <el-row style="margin-top:20px">
            <el-col>
              <span class="title-dai">渠道</span>
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
          <el-row style="height: 1px;background:#E9E9E9;margin:26px 0"></el-row>
          <!-- 抽屉表格 -->
          <div class="table">
          <el-table ref="multipleTable" :data="drawerTableData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="aimCountry" label="目的国" min-width="80" key="5"></el-table-column>
            <el-table-column prop="partitionName" label="分区名称" min-width="100" key="6"></el-table-column>
            <el-table-column prop="AmazonWarehouse" label="亚马逊仓库" min-width="300" key="7">
              <template slot-scope="scope">
                <span>{{scope.row.AmazonWarehouse}}</span>&nbsp;
                <el-button type="text" @click="kapaiCheck(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="kapaiModify(scope.row)">修改</el-button>
                <span style="color:#0084FF"> | </span>
                <el-button type="text" @click="kapaiDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn long1" icon="el-icon-circle-plus-outline" @click="addKapai" style="width:110px">新增分区</el-button>
          </el-row>
          </div>

          <!-- 卡派显示2 -->
          <div v-if="controlKP === 2">
          <el-row style="margin-top:20px">
            <el-col>
              <span class="title-dai">渠道</span>
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
          <el-row style="height: 1px;background:#E9E9E9;margin:26px 0"></el-row>
          <el-row style="margin-top:20px;margin-bottom:16px;display:flex;align-items:center">
            <el-col :span="5">
              <span class="title-dai">渠道重量段</span>
              <span><i class="el-icon-warning" style="color:#FB4702;margin-left:16px"></i></span>
            </el-col>
              <el-col :span="15" style="display:flex;justify-content:flex-end">
                  <el-select size="small" v-model="unit">
                    <el-option
                    value="1"
                    label="单价">
                    </el-option>
                    <el-option
                    value="2"
                    label="金额">
                    </el-option>
                    <el-option
                    value="3"
                    label="首续重">
                    </el-option>
                  </el-select>
                  <!-- <i class="el-icon-arrow-down"></i> -->
              </el-col>
          </el-row>
          <!-- 抽屉表格 -->
          <div class="table">
          <el-table ref="multipleTable" :data="weightTableData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="section" label="区间" min-width="80" key="5">
            </el-table-column>
            <el-table-column prop="min" label="最低重量" min-width="100" key="6">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.min" placeholder="请输入最低重量"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="max" label="最高重量" min-width="100" key="7">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.max" placeholder="请输入最高重量"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="pricingMethod" label="计价方式" min-width="100" key="8">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.pricingMethod" placeholder="请选择计价方式"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="80" key="9">
              <template slot-scope="scope">
                <el-button type="text" @click="confirm(scope.row)" v-if="scope.row.change === 0">确认</el-button>
                <span v-if="scope.row.change === 1">
                  <el-button type="text" @click="weightModify(scope.row)">修改</el-button>
                  <span> ｜ </span>
                  <el-button type="text" @click="visibleTable = true">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FF0000;margin-top:10px"
          v-if="wrong === 1">
            请将表格输入完整
          </el-row>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FF0000;margin-top:10px"
          v-if="wrong === 2">
            错误，最高重量不能等于或小于最低重量
          </el-row>
          </div>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn long1" icon="el-icon-circle-plus-outline" @click="addSection" style="width:110px">新增分区</el-button>
          </el-row>
          </div>

          <!-- 第三步                             33333333333333-->
          <div v-if="controlKP === 3">
            <el-row style="margin-top:20px">
              <el-col>
                <span class="title-dai">渠道</span>
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
                <span class="title-dai">维护渠道价格</span>
              </el-col>
            </el-row>
            <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin:20px 0 16px 0">
              价格按金额
            </el-row>
            <div class="table">
          <el-table ref="multipleTable" :data="priceData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="country" label="" min-width="80" key="1"></el-table-column>
            <el-table-column prop="zeroToOne" label="0-1 公斤" min-width="80" key="2"></el-table-column>
            <el-table-column prop="twoToThree" label="2-3 公斤" min-width="100" key="3"></el-table-column>
            <el-table-column prop="fourTofive" label="4-5 公斤" min-width="130" key="4"></el-table-column>
          </el-table>
          </div>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin:20px 0 16px 0">
              价格首续重
            </el-row>
            <div class="table">
          <el-table ref="multipleTable" :data="priceData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="country" label="" min-width="80" key="1"></el-table-column>
            <el-table-column prop="zeroToOne" label="0-1 公斤" min-width="80" key="2"></el-table-column>
            <el-table-column prop="twoToThree" label="2-3 公斤" min-width="100" key="3"></el-table-column>
            <el-table-column prop="fourTofive" label="4-5 公斤" min-width="130" key="4"></el-table-column>
          </el-table>
          </div>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin:20px 0 16px 0">
              价格按单价
            </el-row>
            <div class="table">
          <el-table ref="multipleTable" :data="priceData" border  tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="country" label="" min-width="80" key="1"></el-table-column>
            <el-table-column prop="zeroToOne" label="0-1 公斤" min-width="80" key="2"></el-table-column>
            <el-table-column prop="twoToThree" label="2-3 公斤" min-width="100" key="3"></el-table-column>
            <el-table-column prop="fourTofive" label="4-5 公斤" min-width="130" key="4"></el-table-column>
          </el-table>
          </div>
          </div>
          <!-- 新增分区卡派 -->
          <div v-if="controlKP === 4">
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:20px">
            <el-col>
              <span class="title-dai">分区信息</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;" class="fenqu flex">
              <el-col :span="10">
                <span>分区名称&nbsp;&nbsp;</span>
                <el-input size="small" placeholder="请选择" style="width:90%;margin-bottom:16px;" v-model="kapaiName"></el-input>
              </el-col>
          </el-row>
          <el-row style="margin-bottom:16px;font-size: 12px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
          color: #FF4D4F;" v-if="kapaiArr.length === 0">注：请勾选卡车派送的FBA仓</el-row>
          <!-- 抽屉表格 -->
          <div class="table">
          <el-table ref="multipleTable" :data="Data" border  tooltip-effect="dark" style="width: 100%" @selection-change="kapaiChange" :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="50" key="1"></el-table-column>
            <el-table-column prop="FBAwarehouse" label="FBA仓" min-width="80" key="2"></el-table-column>
            <el-table-column prop="FBAaddress" label="FBA仓地址" min-width="400" key="3"></el-table-column>
            <el-table-column prop="FBAmail" label="FBA仓邮编" min-width="130" key="4"></el-table-column>
          </el-table>
          </div>
          </div>
          <!-- 新建待生效价格之前 -->
          <div v-if="controlKP === 5">
            <el-row style="margin-top:20px">
              <el-col>
                <span class="title-dai">渠道</span>
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
            <el-row style="margin-top:20px">
              <el-col :span="4" >
                <span class="title-dai">渠道价格</span>
              </el-col>
              <el-col :span="10">
                <span style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: rgba(0, 0, 0, 0.65);">
                  价格生效时间：{{startTime}}
                </span>
              </el-col>
            </el-row>
            <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin:20px 0 16px 0">
              价格按金额
            </el-row>
            <div class="table">
              <el-table ref="multipleTable" :data="priceData" border  tooltip-effect="dark" style="width: 100%"
                :header-cell-style="{background: '#F5F5F6'}">
                <el-table-column prop="country" label="" min-width="80" key="1"></el-table-column>
                <el-table-column prop="zeroToOne" label="0-20 公斤" min-width="80" key="2"></el-table-column>
                <el-table-column prop="twoToThree" label="21-50 公斤" min-width="100" key="3"></el-table-column>
                <el-table-column prop="fourTofive" label="51-100 公斤" min-width="130" key="4"></el-table-column>
                <el-table-column prop="fourTofive" label="100-MAX 公斤" min-width="130" key="5"></el-table-column>
              </el-table>
          </div>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn long1" @click="addToBePrice" style="width:130px">
              新建待生效价格
            </el-button>
          </el-row>
          </div>
          <!-- 新建待生效价格  -->
          <div v-if="controlKP === 6">
            <el-row>
            <el-col :span="2" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              代理
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道：</span><span>{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道编码：</span><span>{{cannelCode}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">代理：</span><span>{{agent}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">代理编码：</span><span>{{agentCode}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:16px">
            <el-col :span="4" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              渠道价格
            </el-col>
            <el-col :span="20" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
            <span>时间：</span><span style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
            color: rgba(0, 0, 0, 0.65);">{{date}}</span>
            </el-col>
          </el-row>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin-top:20px">
            价格按单价</el-row>
          <el-row style="margin-top:16px">
            <div class="table">
          <el-table ref="multipleTable" :data="priceTable" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="country"  min-width="60" key="1"></el-table-column>
            <el-table-column prop="quality1" label="0-20 公斤" min-width="60" key="2"></el-table-column>
            <el-table-column prop="quality2" label="21-50 公斤" min-width="60" key="3"></el-table-column>
            <el-table-column prop="quality3" label="100-MAX 公斤" min-width="60" key="4"></el-table-column>
          </el-table>
            </div>
          </el-row>
            <el-row style="margin-top:28px">
              <el-col :span="4" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
                color: rgba(0, 0, 0, 0.8);">
                价格生效时间
              </el-col>
              <el-col :span="18">
                <template>
                <el-radio-group v-model="timeChange">
                  <el-radio :label="1">次日中午12:00生效</el-radio>
                  <el-radio :label="2">当日下午18:00生效</el-radio>
                  <el-radio :label="3">自定义时间</el-radio>
                </el-radio-group>
              </template>
              </el-col>
            </el-row>
            <el-row style="margin-top:28px;display:flex;align-items:center">
              <el-col :span="4" style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
                color: rgba(0, 0, 0, 0.8);">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生效时间
              </el-col>
              <el-col :span="8">
                <template>
                    <el-date-picker
                    size="small"
                      v-model="effectDate"
                      type="date"
                      placeholder="请选择日期">
                    </el-date-picker>
                </template>
              </el-col>
              <el-col :span="8">
                <template>
                  <el-time-picker
                  size="small"
                  v-model="effectTime"
                  placeholder="任意时间点">
                </el-time-picker>
              </template>
              </el-col>
            </el-row>
          </div>
          <div v-if="controlKP === 7">
            <el-row style="display:flex;align-items:center">
            <el-col :span="2" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              渠道
            </el-col>
            <el-col :span="22" style="text-align:right">
              <el-button class="orangeBtn long1" plain size="small" @click="checkDiagram" style="width:130px">
                查看价格曲线图
              </el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道：</span><span>{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道编码：</span><span>{{cannelCode}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 1px;background:#E9E9E9;margin-top:20px"></el-row>
          <el-row style="margin-top:16px">
            <el-col :span="4" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
              渠道当前价格
            </el-col>
            <el-col :span="20" style="font-size: 16px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;
            color: rgba(0, 0, 0, 0.85);">
            <span>时间：</span><span style="font-size: 16px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
            color: rgba(0, 0, 0, 0.65);">{{dateNow}}</span>
            </el-col>
          </el-row>
          <el-row style="font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #FB6024;margin-top:20px">
            价格按金额</el-row>
          <el-row style="margin-top:16px">
            <div class="table">
              <el-table ref="multipleTable" :data="priceToFee" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
                :header-cell-style="{background: '#F5F5F6'}">
                <el-table-column prop="country"  min-width="60" key="1"></el-table-column>
                <el-table-column prop="quality1" label="0-20 公斤" min-width="60" key="2"></el-table-column>
                <el-table-column prop="quality2" label="21-50 公斤" min-width="60" key="3"></el-table-column>
                <el-table-column prop="quality3" label="100-MAX 公斤" min-width="60" key="4"></el-table-column>
              </el-table>
            </div>
          </el-row>
          <el-row style="margin-top:16px;">
            <el-button class="orangeBtn long1" @click="updataPrice" style="width:130px">
              更新待生效价格
            </el-button>
            <el-button class="whiteBtn long1" @click="ToRecordsDrawer" style="width:130px">
              历史价格
            </el-button>
          </el-row>
          </div>
        </el-row>
        <!-- 新建待生效价格前--确认取消按钮 -->
        <div class="drawer_btn" v-if="controlKP === 6">
          <el-button class="orangeBtn long1" plain size="small" @click="effectConfirm" style="margin-right:20px">
            确 认
          </el-button>
          <el-button type="info long1" plain size="small" @click="cancelKapai" style="margin-right:20px">
            取 消
          </el-button>
        </div>
        <!-- 新建待生效价格后--确认取消按钮 -->
        <div class="drawer_btn" v-if="controlKP === 7" style>
          <el-button type="info" plain size="small" @click="controlKP = 5" style="margin-right:20px">
            返 回
          </el-button>
        </div>
        <!-- 按钮 -->
       <div class="drawer_btn" v-if="controlKP < 6">
         <el-button class="orangeBtn long1" plain size="small"  style="margin-right:20px" @click="confirmFive" v-if="controlKP === 3">
            确 认
          </el-button>
         <el-button class="orangeBtn long1" plain size="small" @click="afterKP" style="margin-right:20px" v-if="controlKP < 3 && controlKP !== 4">
            下一步
         </el-button>
          <el-button class="whiteBtn long1" plain size="small" @click="lastKP" style="margin-right:20px"
            v-if="controlKP > 1 && controlKP !== 4 && controlKP !== 5 && controlKP !== 7">
            上一步
          </el-button>
          <el-button class="whiteBtn long1" plain size="small" @click="controlKP = 3" style="margin-right:20px"
            v-if="controlKP === 5">
            上一步
          </el-button>
          <!-- 新增后卡派下一步 -->
          <el-button class="orangeBtn long1" plain size="small" @click="controlKP = 2" style="margin-right:20px" v-if="controlKP === 4">
            下一步
          </el-button>
          <el-button type="info long1" plain size="small" @click="cancelKapai" style="margin-right:20px" v-if="controlKP !== 4 && controlKP !== 7">
            取 消
          </el-button>
          <!-- 新增取消 -->
          <el-button type="info long1" plain size="small" @click="controlKP = 1" style="margin-right:20px" v-if="controlKP === 4">
            取 消
          </el-button>
       </div>
      </div>
    </el-drawer>
    <!-- 下一步弹框 -->
          <el-dialog
            title="更新报价"
            :visible.sync="dialogAfter"
            width="30%">
            <span>您修改了渠道“的价格段”请修改对应的报价</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogAfter = false" size="small" style="width:80px;margin-top:-2px;margin-right:20px" class='wuBtn'>
                取 消
              </el-button>
              <el-button class='orangeBtn' @click="dialogAfter = false" size="small" style="width:80px;margin-top:10px">确 定</el-button>
            </span>
          </el-dialog>
    <!-- 删除表格行 -->
    <el-dialog
      title="提示"
      :visible.sync="visibleTable"
      center
      top="6%"
      width="30%">
      <el-row style="width:100%;text-align:center;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;color: rgba(0, 0, 0, 0.65);">
        确定删除此附加费吗？
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleTable = false" size="small" style="width:80px;margin-top:-2px;margin-right:20px" class='wuBtn'>
          取 消
        </el-button>
        <el-button class='orangeBtn' @click="visibleTable = false" size="small" style="width:80px;margin-top:10px">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除分区 -->
    <el-dialog
      title="删除分区"
      :visible.sync="dialogDelete"
      center
      width="30%">
      <el-row style="width:100%;text-align:center;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;color: rgba(0, 0, 0, 0.65);">
        确定删除该分区吗？
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false" size="small" style="width:80px;margin-top:-2px;margin-right:20px" class='wuBtn'>
          取 消
        </el-button>
        <el-button class='orangeBtn' @click="dialogDelete = false" size="small" style="width:80px;margin-top:10px">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 渠道附加费抽屉 -->
    <el-drawer
      title="渠道附加费"
      :visible.sync="visibleSurcharge"
      :wrapperClosable='false'
      :before-close="surchargeClose"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      priceToFee: [],
      dateNow: '', // 渠道当前价格的时间
      effectTime: '', // 生效时间
      effectDate: '', // 生效日期
      setting: '设置分区', // 设置分区标题
      weightSetting: '重量段设置', // 重量段设置标题
      feeMaintain: '价格维护', // 价格维护标题
      timeChange: 1, // 价格维护时间选择
      startTime: '2020年12月15日 18:00', // controlKP=5,生效时间
      modifyText: '', // 修改代理费用的内容
      additionalData: [], // 代理附加表格
      agentInput: '', // 代理附加费输入框
      valueList: [], // 代理附加费选择的值
      // 代理附加费选框
      checkList: [{
        label: '带电',
        add: '增加',
        className: '纺织品品名'
      }],
      surchargeName: '', // 附加费名称
      additional: 0, // 附加控制变量
      wrong: 0, // 错误提示默认0，1:未填满表格，2：最大与最小重量问题
      dialogDelete: false, // 删除分区
      drawerPartitionExpress: false, // 分区价格抽屉(快递)
      tip: 1, // 温馨提示
      Require: 1, // 特殊要求
      radio: 1, // 注意事项
      modules: {
        toolbar: [
          // ['bold', 'italic', 'underline', 'strike'],
          // ['blockquote', 'code-block'],
          // [{ 'header': 1 }, { 'header': 2 }],
          // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          // [{ 'script': 'sub'}, { 'script': 'super' }],
          // [{ 'indent': '-1'}, { 'indent': '+1' }],
          // [{ 'direction': 'rtl' }],
          // [{ 'size': ['small', false, 'large', 'huge'] }],
          // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          // [{ 'color': [] }, { 'background': [] }],
          // [{ 'font': [] }],
          // [{ 'align': [] }],
          // ['clean'],
          // ['image','video']
        ]
      },
      content: '<p></p>',
      note: '<p><p>',
      editorOption: {
        theme: 'snow'
      },

      visibleSurcharge: false, // 附加费

      // 价格首续重
      continuationData: [{
      }],

      // 价格按金额表格
      priceData: [{
        country: '美国',
        zeroToOne: '',
        twoToThree: '',
        fourTofive: ''
      }],

      control: 1, // 快递控制变量
      dialogAfter: false, // 下一步弹框
      visibleTable: false, // 快点表格删除
      controlKP: 1, // 卡派控制变量
      weightTableData: [{
        section: '区间1',
        min: '',
        max: '',
        pricingMethod: '',
        change: 0
      }], // 渠道重量段

      drawerKapai: false, // 分区价格抽屉（卡派）
      addDrawerKapai: false, // 新增卡派抽屉
      // 卡派表格
      kapaiName: '', // 卡派分区名称
      kapaiArr: [], // 新增卡派勾选表格数组
      Data: [
        {
          FBAwarehouse: 'IND9',
          FBAaddress: '11 California Avenue, USA',
          FBAmail: '234242424'
        }
      ],
      name: '', // 分区名称（新增快递）
      startPost: '', // 起始邮编
      endPost: '', // 结束邮编
      post: 1, // 寄送地区邮编
      areaPost: '', // 输入地区邮编
      excludePost: '', // 排除地区邮编
      expressTableData: [], // 新增分区(快递)表格
      priceTable: [
        {
          country: '美国',
          quality1: '12元',
          quality2: '11.5元',
          quality3: '9元'
        }
      ], // 维护价格表格
      date: '2020年12月15日 18:00 - 2020年12月20日 18:00', // 维护价格时间
      agent: '深圳天图供应链有限公司', // 代理
      agentCode: 'SZTT深圳天图', // 代理编码
      cannelCode: 'YXTK以星特快', // 渠道编码
      cannel: '以星特快海派包邮UPS派送', // 渠道
      drawer: false, // 简介查看
      recordsDrawer: false, // 查看记录抽屉
      priceDrawer: false, // 维护价格抽屉
      activeName: '1', // 标签绑定

      pageSize: 10,
      currentPage: 1,
      total: 50,

      channelName: '', // 渠道名称
      channelCode: '', // 渠道编码
      channelEngLish: '', // 渠道英文
      channelType: '', // 渠道分类
      unit: '',
      // 抽屉表格
      drawerTableData: [
        {
          aimCountry: '美国',
          partitionPostcode: '100000-49999',
          partitionName: '美东',
          exclude: '1012312…',
          remote: '2012312',
          AmazonWarehouse: 'ONT8'
        }
      ], // 抽屉表格
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
      inputTable: [{
        date: '2020年9月11日 16:00 -2020年10月11日 17:00',
        inputPeople: '张三'
      }], // 查看历史记录表
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
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    saveHtml (event) {
      alert(this.content)
    },

    // 重量设置2确认
    confirm (val) {
      if (val.max === '' || val.min === '' || val.pricingMethod === '') {
        this.wrong = 1
        return
      }
      console.log(val)
      if (val.max < val.min || val.max === val.min) {
        this.wrong = 2
        return
      }
      if (val.max !== '' && val.min !== '' && val.pricingMethod !== '') {
        val.change = 1
        this.addSection()
      }
    },
    // 更新待生效价格
    updataPrice () {},
    // 查看价格曲线图
    checkDiagram () {
      this.$router.push({ name: 'diagram' })
    },
    // 新建待生效价格前往历史价格抽屉
    ToRecordsDrawer () {
      this.cancelKapai()
      this.recordsDrawer = true
    },
    // 取消（关闭）卡派抽屉
    cancelKapai () {
      this.controlKP = 1
      this.drawerKapai = false
    },
    // 新建待生效价格--确认
    effectConfirm () {
      this.controlKP = 7
    },
    // 新建待生效价格
    addToBePrice () {
      this.controlKP = 6
    },
    // 确认
    confirmFive () {
      this.controlKP = 5
    },
    // 附加费确定
    fuJFConfirm () {
      this.visibleSurcharge = false
      this.additional = 0
    },
    // 修改代理附加费
    modifyAdditional () {
      this.additional = 2
    },
    // 代理附加费添加取消
    addCancel () {
      this.additional = 0
      this.valueList = []
      this.agentInput = ''
    },
    // 代理附加费取消
    cancelSurcharge () {
      this.visibleSurcharge = false
      this.additional = 0
    },
    // 代理附加费选择
    valueChange (val) {
      console.log(val)
    },
    // 关闭代理附加费抽屉
    surchargeClose () {
      this.visibleSurcharge = false
      this.additional = 0
    },
    // 新增附加费
    addAdditional () {
      this.additional = 1
    },
    // 重量修改
    weightModify () {},
    // 新增区间
    addSection () {
      let obj = {
        section: '', // 区间
        min: '',
        max: '',
        pricingMethod: '',
        change: 0
      }
      obj.section = '区间' + Number(this.weightTableData.length + 1)
      this.weightTableData.push(obj)
      this.wrong = 0
    },

    // 分区价格抽屉（快递）下一步
    controlBtn () {
      if (this.control < 3) {
        this.control = this.control + 1
      }
    },
    // 分区价格抽屉（卡派）下一步
    afterKP () {
      if (this.controlKP < 3) {
        this.controlKP = this.controlKP + 1
        if (this.controlKP === 3) {
          this.dialogAfter = true
        }
      }
    },
    // 分区价格抽屉（卡派）上一步
    lastKP () {
      if (this.controlKP > 1) {
        this.controlKP = this.controlKP - 1
      }
    },
    // 分区价格抽屉（快递）上一步
    lastBtn () {
      if (this.control > 1) {
        this.control = this.control - 1
      }
    },
    // 新增后卡派下一步
    addKPafter () {},
    // 取消分区价格抽屉（快递）
    PartitionExpressFasle () {
      this.drawerPartitionExpress = false
      this.control = 1
    },
    // 新增卡派
    addKapai () {
      this.controlKP = 4
    },
    // 卡派勾选表格
    kapaiChange (val) {
      console.log(val)
      this.kapaiArr = val
    },
    // 卡派查看
    kapaiCheck () {},
    // 卡派修改
    kapaiModify () {},
    // 卡派删除
    kapaiDelete () {},
    // 新增快递
    addExp () {
      this.control = 4
    },
    // 删除分区
    Delete () {
      this.dialogDelete = true
    },
    add (event) {
      console.log(event)
    },
    // 查看
    chcek () {},
    // 渠道简介查看
    cannelChcek () {
      this.drawer = true
    },
    // 维护价格抽屉
    price () {
      this.priceDrawer = true
    },
    // 查看记录（录价人）
    recordsChcek (val) {
      this.recordsDrawer = true
    },
    // 分区价格
    openPartition () {
      this.drawerKapai = true
      // this.drawerPartitionExpress =true
    },
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
      // this.$router.push({ name: 'addAgent' })
      this.$router.push({ name: 'addChannel' })
    },
    handleClose () {
      this.dialogStop = false
    }
  }
}
</script>

<style lang="scss" scoped>
.inputClass{
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 32px;
}
/deep/ .el-checkbox {
  .el-checkbox__input.is-checked .el-checkbox__inner,
       .el-checkbox__input.is-indeterminate .el-checkbox__inner {
         background-color: #FB4702 !important;
         border-color: #FB4702 !important;
       }
       .el-checkbox__label {
         font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.75);
       }
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
/deep/ .table .el-input__inner{
        border:none
    }

// 添加颜色类
 /deep/  .el-radio__input.is-checked + .el-radio__label { // 字体颜色
       color: rgba(0, 0, 0, 0.65) !important;
   }
/deep/   .el-radio__input.is-checked .el-radio__inner { // 选框颜色
       background: #FB4702 !important;
       border-color: #FB4702 !important;
   }
.fenqu{
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
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
.item-text{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
/deep/ .el-drawer{
  padding-top: 0px;
  background: #E8EBF2;
    .el-drawer__header{
      padding: 30px 20px;
      text-align: left;
      background: #FFFFFF;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;color: #333333;
}
.el-drawer__body{
      margin-top: -6px;
      padding-top: 0px;
      overflow: scroll;
    }
.drawer_btn{
      display: flex;
      width:100%;
      padding-left: 20px;
      align-items: center;
      justify-content: flex-start;
      margin-top: 26px;
      // margin-left: -26px;
      margin-bottom: -26px;
      // width: 100%;
      box-sizing: border-box;
      height: 60px;
      background: #FFFFFF;
      box-sizing: border-box;
    }
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
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
}
</style>
