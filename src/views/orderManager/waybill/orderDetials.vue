<template>
    <div>
        <!-- 扣货详情 （v-if=""）-->
        <div>
            <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 6px;">
                <span class='text' style="color:#FF0000">扣货件详情</span>
            </el-row>
            <el-row class="titleReason">
                <span>扣货原因：{{titleReason}}</span>
            </el-row>
        </div>
        <!-- 不扣货详情 -->
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:17px 0">
            <span class='text'>订单详情</span>
        </el-row>
        <el-row class="box">
            <el-row style="display:flex;align-items:center;margin-bottom:20px">
                <el-col :span="6">
                    <span class="item" style="width:90px">运单号：</span>
                    <span class="item">{{wayBill}}</span>
                </el-col>
                <el-col :span="6">
                    <span class="item" style="width:120px">预报单号：</span>
                    <span class="item">{{forecastNo}}</span>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-button class="whiteBtn" @click="drawer = true" size="small">页面显示设置</el-button>
                </el-col>
            </el-row>
                <!-- 客户信息 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">客户信息</span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户名称：</span>
                            <span class="item2">{{name}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">客户编号：</span>
                            <span class="item2">{{customerCode}}</span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 业务员 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">业务员</span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">所属业务员：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">业务员手机：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">业务员职位：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">上级领导：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 收货信息 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">收货信息</span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">收货司机：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">司机职位：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">司机手机：</span>
                            <span class="item2"></span>
                        </el-col>
                            <el-col :span="8" style="margin-top:8px">
                                <span class="item1">收货时间：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8" style="margin-top:8px">
                                <span class="item1">收货件数：</span>
                                <span class="item2"></span>
                            </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 预报信息 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">预报信息</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">下单时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">货好时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">邮寄方式：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">预报件数：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">预报渠道：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                 <!-- 入库入仓 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">入库入仓</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">入库时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">入库件数：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">入仓件数：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">入仓时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">入仓员：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">入仓渠道：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text" @click="modify = true">修改</el-button>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 重量尺寸 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">重量尺寸</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">实重：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">方数：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">材积重：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">结算重：</span>
                                <span class="item2"></span>
                                <el-button type="text" style="padding:0" @click="changeAsettlement = true">查看</el-button>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货重量：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货方数：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">改货材积重：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货重量：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货结算重：</span>
                                <span class="item2"></span>
                                <el-button type="text" style="padding:0" @click="changeAsettlement = true">查看</el-button>
                            </el-col>
                        </el-row>
                        <!-- <el-col :span="8">
                            <span class="item1">代理结算重：</span>
                            <span class="item2"></span>
                        </el-col> -->
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 物流 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">物流</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">目的国：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">目的地：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">目的地邮编：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 产品信息 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">产品信息</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">装箱清单：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看装箱清单</el-button>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">品名：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看</el-button>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">总申报价值：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 申报信息 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">申报信息</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">单独清关：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">报关类型：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">发票：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看发票</el-button>
                        </el-col>
                        <el-col :span="8" style="margin-top:-20px">
                            <span class="item1">保险：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">购买保险</el-button>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1" style="margin-top:-20px">VAT税号：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1" style="margin-top:-20px">递延：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 备注 -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">备注</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户备注：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:-10px">
                            <span class="item1">内部备注：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看详情</el-button>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="line"></el-row>
                <!-- 货件编号（FBA） -->
                <el-row>
                    <el-row>
                        <span class="headerTitle">货件编号（12件）</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户备注：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">下载FBA贴条</el-button>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">内部备注：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">下载FBA贴条</el-button>
                        </el-col>
                    </el-row>
                </el-row>
                <!-- 货件编号（非FBA） -->
                <el-row v-if="a === false">
                    <el-row>
                        <span class="headerTitle">货件编号（12件）</span>
                        <span class="item-info"></span>
                    </el-row>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户备注：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">下载FBA贴条</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <span class="item1">内部备注：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">下载FBA贴条</el-button>
                        </el-col>
                    </el-row>
                </el-row>
        </el-row>
        <el-drawer
            :visible.sync="drawer"
            size="50%">
            <div slot="title" class="headTitle">页面显示设置</div>
           <el-row class="" style="padding:26px;text-align:left;background:#fff;margin-top:26px">
               <el-row style="display:flex;align-items:center">
                   <el-col :span="11" style="display:flex;align-items:center">
                        <span class="formTitle">字段集名称&nbsp;&nbsp;</span>
                        <span>
                            <el-input size="small" style="width:100%" v-model="fieldName" placeholder="请输入"></el-input>
                        </span>
                   </el-col>
                   <el-col :span="8">
                       <el-button size="small" class="orangeBtn">查 询</el-button>
                   </el-col>
               </el-row>
               <!-- 抽屉表格 -->
          <div class="table" style="margin-top:16px">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="tableChange"
          :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="字段集名称" min-width="130"></el-table-column>
            <el-table-column prop="display" label="是否显示" min-width="100">
                <template>
                    <div style="display:flex;align-items:center">
                        <div style="width: 8px;height: 8px;background: #32AF05;border-radius: 50%;margin-right:8px"></div>
                        <span>显示</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="expand" label="默认展开/收缩" :width="120">
                <template v-slot="scope">
                    <el-table :data="scope.row.view_detail" :row-class-name="tableRowClassName" :header-cell-style="{ background: '#EDF6FF' }">
                        <el-table-column prop="goods_name" label="开票商品名称" min-width="120">
                        </el-table-column>
                        <el-table-column prop="tax_name" label="税收分类">
                        </el-table-column>
                        <el-table-column prop="unit" label="单位">
                        </el-table-column>
                        <el-table-column prop="unit_price" label="单价">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="顺序" min-width="150">
                <template>
                    <span>{{(num+1)}}</span>
                </template>
            </el-table-column>
          </el-table>
          </div>
           </el-row>
        </el-drawer>
        <!-- 入仓入库-入仓渠道修改 -->
        <el-dialog
            title="入仓渠道修改"
            :visible.sync="modify"
            top="12%"
            width="30%">
            <div class="line" style="margin-top:-20px;margin-bottom:40px"></div>
            <el-row class="Flexcenter">
                <span class="item1">去仓渠道：</span>
                <el-input placeholder="请输入去仓渠道" size="small" style="width:60%">
                    <i slot="suffix" class="search" style="line-height:32px;margin-right:6px">&#xe9a1;</i>
                </el-input>
                <!-- <el-button type="text" style="margin-left:20px">确认</el-button>
                <span style="color:#0084FF">｜</span>
                <el-button type="text">取消</el-button> -->
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-row class="line"></el-row>
                <el-button class="wuBtn" @click="fileError = false" size="small">取 消</el-button>
                <el-button class="orangeBtn" @click="fileError = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-drawer
            :visible.sync="changeAsettlement"
            size="50%">
            <div slot="title" class="headTitle">改货结算重</div>
            <div class="body">
                <el-row class="orderId">{{orderId}}</el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">客户名称：</span>
                    <span class="item2">{{name}}</span>
                </el-row>
                <el-row class="line"></el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">预报渠道：</span>
                    <span class="item2">{{forecastChannel}}</span>
                </el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">件数：</span>
                    <span class="item2">{{number}}</span>
                </el-row>
                <el-row style="margin-top:16px">
                    <span class="item1">备注：</span>
                    <span class="item2">{{note}}</span>
                </el-row>
                <div class="table" style="margin-top:16px">
                    <el-table ref="multipleTable" :data="changeSettlementTable" border  tooltip-effect="dark" style="width: 100%" @selection-change="tableChange"
                    :header-cell-style="{background: '#F5F5F6'}">
                    <el-table-column prop="orderNum" label="货件编号" min-width="180" key="1"></el-table-column>
                    <el-table-column prop="long" label="长（cm）" key="2"></el-table-column>
                    <el-table-column prop="width" label="宽（cm）" key="3"></el-table-column>
                    <el-table-column prop="high" label="高（cm）" key="4"></el-table-column>
                    <el-table-column prop="squareNumber" label="方数（m³）" key="5"></el-table-column>
                    <el-table-column prop="realWeight" label="实重（kg）" key="6"></el-table-column>
                    <el-table-column prop="volumeWeight" label="材积重（kg）" min-width="120" key="7"></el-table-column>
                    </el-table>
                </div>
                <el-row style="font-size: 14px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #333333;margin-top:16px">
                    <span>合计结算重：<span>{{total}}</span>公斤</span>
                </el-row>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      total: '10000元 ', // 已确认金额
      titleReason: '10万元的货款没结清', // 扣货原因
      note: '走以星',
      changeAsettlement: false, // 改货结算重
      number: 6, // 件数
      // 改货结算重表格
      changeSettlementTable: [
        {
          orderNum: 'FBA15RY33MN8U000001',
          long: '10.1',
          width: '10.1',
          high: '10.1',
          squareNumber: '100.1',
          realWeight: '28.5',
          volumeWeight: '30'
        }
      ],
      forecastChannel: '香港UPS红单5000', // 预报渠道
      orderId: 'AS2012090001', // 改货结算重orderId
      fieldName: '',
      num: 0,
      drawer: false, // 页面显示设置
      change: 1, // 变量改变
      // 预报信息列表
      predictionList: [{
        date: '2020年12月09日 15:00',
        goodsTime: '今日 16:00-17:00',
        mailingMethod: '上门取件',
        orderType: 'FBA订单'
      }],
      receivingDriver: '李四', // 收货司机
      salesman: '张三', // 所属业务员
      // 业务员列表
      tableData: [
        {
          name: '客户信息'
        },
        {
          name: '业务员'
        }
      ], // 表格数据
      modify: false, // 去仓渠道修改弹窗
      wayBill: 'AS202012120001', // 运单号
      customerInfo: '深圳大成亚马逊贸易科技有限公司', // 客户信息
      name: '深圳大成亚马逊贸易科技有限公司', // 客户名称
      customerCode: 'DCYMX', // 客户编码
      forecastNo: 'YB202012120001' // 预报单号
    }
  },
  methods: {
    // 关闭抽屉
    handleClose () {},
    // 抽屉表格
    tableChange () {}
  }
}
</script>
<style lang="scss" scoped>
.titleReason{
    font-size: 14px;
    background: #fff;
    margin-bottom: 26px;
    text-align: left;
    padding: 20px 0 26px 42px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.body{
    text-align:left;
    background: #fff;
    margin-top: 26px;
    padding: 20px 30px;
}
.orderId{
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FB4702;
}
.search{
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #000000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.line{
    height: 1px;
    background: #E9E9E9;
    margin: 14px 0 20px 0;
}
.formTitle{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
/deep/ .el-drawer{
  padding-top: 0px;
  background: #E8EBF2;
    .el-drawer__header{
      padding: 30px 26px;
      text-align: left;
      background: #FFFFFF;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;color: #333333;
      margin-bottom: 6px;
}
.el-drawer__rtl{
    padding:0;
    margin:0;
}
.el-drawer__body{
      margin-top: -6px;
      padding: 0px 26px;
      overflow: scroll;
    }
}
.button{
    margin-left: 14px;
}
.item1{
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.item2{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.item-info{
    margin-left:26px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.headerTitle{
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
}
.box{
    background: #fff;
    padding: 14px 44px;
    text-align: left;
}
.item{
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FB4E0C;
}
</style>
