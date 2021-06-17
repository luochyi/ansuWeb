<template>
    <div>
        <!-- 分区价格抽屉（卡派） -->
    <el-drawer
      :visible.sync="drawerKapai"
      :before-close="handleClose"
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
                <span class="daili1">{{cannelCode}}</span>
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
          <el-button type="info" plain size="small" @click="recordsDrawer = false" style="margin-right:10px">返 回</el-button>
       </div>
      </div>
    </el-drawer>
    </div>
</template>
<script>
export default {
  props: {
    drawerKapai: Boolean
  },
  data () {
    return {
      recordsDrawer: false, // 历史价格
      wrong: 0, // 错误提示默认0，1:未填满表格，2：最大与最小重量问题
      dialogAfter: false, // 下一步弹框(去第三步时)
      weightSetting: '重量段设置', // 重量段设置标题
      startTime: '2020年12月15日 18:00', // controlKP=5,生效时间
      date: '2020年12月15日 18:00 - 2020年12月20日 18:00', // 维护价格时间
      dateNow: '', // 渠道当前价格的时间
      timeChange: 1, // 价格维护时间选择
      cannel: '以星特快海派包邮UPS派送', // 渠道
      priceToFee: [],
      effectTime: '', // 生效时间
      effectDate: '', // 生效日期
      cannelCode: 'YXTK以星特快', // 渠道编码
      agent: '深圳天图供应链有限公司', // 代理
      kapaiName: '', // 卡派分区名称
      kapaiArr: [], // 新增卡派勾选表格数组
      agentCode: 'SZTT深圳天图', // 代理编码
      unit: '', // 渠道重量段的单位选择
      // 查看历史记录表
      inputTable: [{
        date: '2020年9月11日 16:00 -2020年10月11日 17:00',
        inputPeople: '张三'
      }],
      // 价格按金额表格
      priceData: [{
        country: '美国',
        zeroToOne: '',
        twoToThree: '',
        fourTofive: ''
      }],
      // 维护价格表格
      priceTable: [
        {
          country: '美国',
          quality1: '12元',
          quality2: '11.5元',
          quality3: '9元'
        }
      ],
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
      ],
      // 第一步新增表格
      Data: [
        {
          FBAwarehouse: 'IND9',
          FBAaddress: '11 California Avenue, USA',
          FBAmail: '234242424'
        }
      ],
      // 渠道重量段
      weightTableData: [{
        section: '区间1',
        min: '',
        max: '',
        pricingMethod: '',
        change: 0
      }],
      feeMaintain: '价格维护', // 价格维护标题
      controlKP: 1, // 卡派控制变量
      setting: '设置分区' // 设置分区标题
    }
  },
  methods: {
    handleClose () {
      let data = 1
      this.$emit('handleClose', data)
    },
    // 分区价格抽屉（卡派）上一步
    lastKP () {
      if (this.controlKP > 1) {
        this.controlKP = this.controlKP - 1
      }
    },
    // 新建待生效价格
    addToBePrice () {
      this.controlKP = 6
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
    // 卡派勾选表格
    kapaiChange (val) {
      console.log(val)
      this.kapaiArr = val
    },
    // 排除地区邮编查看
    excludeBtn () {},
    // 新增卡派
    addKapai () {
      this.controlKP = 4
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
    // 查看价格曲线图
    checkDiagram () {
      this.$router.push({ name: 'diagram' })
    },
    // 新建待生效价格--确认
    effectConfirm () {
      this.controlKP = 7
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    // 新建待生效价格前往历史价格抽屉
    ToRecordsDrawer () {
      this.cancelKapai()
      this.recordsDrawer = true
    },
    // 确认
    confirmFive () {
      this.controlKP = 5
    },
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
    updataPrice () {},
    // 取消（关闭）卡派抽屉
    cancelKapai () {
      this.controlKP = 1
      this.handleClose()
    },
    // 偏远地区邮编查看
    remoteBtn () {},
    // 亚马逊仓库查看
    AmazonWarehouseBtn  () {},
    // 修改
    modify () {},
    // 删除
    Delete () {},
    addExp () {
      this.control = 4
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
