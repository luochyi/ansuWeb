<template>
    <div>
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
            <el-collapse accordion>
                <!-- 客户信息 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">客户信息</span>
                            <span class="item-info">{{customerInfo}}</span>
                    </template>
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
                </el-collapse-item>
                <!-- 业务员 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">业务员</span>
                            <span class="item-info">{{salesman}}</span>
                    </template>
                    <el-row style="margin-top:10px" v-for="(item, index) in salesmanList" :key="index">
                        <el-col :span="8">
                            <span class="item1">所属业务员：</span>
                            <span class="item2">{{item.name}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">业务员手机：</span>
                            <span class="item2">{{item.tel}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">业务员职位：</span>
                            <span class="item2">{{item.position}}</span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">上级领导：</span>
                            <span class="item2">{{item.superior}}</span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 收货司机 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">收货司机</span>
                            <span class="item-info">{{receivingDriver}}</span>
                    </template>
                    <el-row style="margin-top:10px" v-for="(item, index) in receivingDriverList" :key="index">
                        <el-col :span="8">
                            <span class="item1">收货司机：</span>
                            <span class="item2">{{item.name}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">司机手机：</span>
                            <span class="item2">{{item.tel}}</span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 预报信息 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">预报信息</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px" v-for="(item, index) in predictionList" :key="index">
                        <el-col :span="8">
                            <span class="item1">预报时间：</span>
                            <span class="item2">{{item.data}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">货号时间：</span>
                            <span class="item2">{{item.goodsTime}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">邮寄方式：</span>
                            <span class="item2">{{item.mailingMethod}}</span>
                        </el-col>
                        <el-col :span="8" style="margin-top:8px">
                            <span class="item1">订单类型：</span>
                            <span class="item2">{{item.orderType}}</span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                 <!-- 产品件数 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">产品件数</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">预报时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">货号时间：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">邮寄方式：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8" style="margin-top:16px">
                            <span class="item1">订单类型：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 仓库 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">仓库</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">入库人：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">入仓人：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">出仓人：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 重量尺寸 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">重量尺寸</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">预报重量：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">预报方数：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">实重：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">实方：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">材积重：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">结算重：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">改货方数：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货重量：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">改货材积重：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-col :span="8">
                            <span class="item1">改货结算重：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">代理结算重：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 渠道 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">渠道</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-row style="margin-bottom:8px">
                            <el-col :span="8">
                                <span class="item1">预报渠道：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">入仓渠道：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8" v-if="change === 1">
                                <span class="item1">出仓渠道：</span>
                                <span class="item2"></span>
                                <el-button class="button" type="text">修改</el-button>
                            </el-col>
                            <el-col :span="8" v-if="change === 2">
                                <span class="item1">出库渠道：</span>
                                <span class="item2"></span>
                                <el-button class="button" type="text">修改</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8" v-if="change === 1">
                                <span class="item1">出仓代理：</span>
                                <span class="item2"></span>
                                <el-button class="button" type="text">修改</el-button>
                            </el-col>
                            <el-col :span="8" v-if="change === 2">
                                <span class="item1">出库代理：</span>
                                <span class="item2"></span>
                                <el-button class="button" type="text">修改</el-button>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-collapse-item>
                <!-- 物流 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">物流</span>
                            <span class="item-info"></span>
                    </template>
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
                            <el-col :span="8" v-if="change === 1">
                                <span class="item1">派送类型：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-row v-if="change === 1">
                            <el-col :span="8">
                                <span class="item1">派送状态：</span>
                                <span class="item2"></span>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">转单号</span>
                                <span class="item2"></span>
                                <el-button class="button" type="text">查看官网</el-button>
                                <span style="color:#0084FF">｜</span>
                                <el-button type="text">修改</el-button>
                            </el-col>
                            <el-col :span="8">
                                <span class="item1">提号单：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-collapse-item>
                <!-- 产品信息 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">产品信息</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">产品数量：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看装箱清单</el-button>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">品名：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看</el-button>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">申报价值：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 申报信息 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">申报信息</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">是否单独清关：</span>
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
                        <el-col :span="8">
                            <span class="item1">保险：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">购买保险</el-button>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 费用 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">费用</span>
                            <span class="item-info">已确认：<span>{{total}}</span></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">费用确认：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">撤回</el-button>
                            <span style="color:#0084FF">｜</span>
                            <el-button type="text">补录</el-button>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 备注 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">备注</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户备注：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">内部备注：</span>
                            <span class="item2"></span>
                            <el-button class="button" type="text">查看详情</el-button>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <!-- 货件编号 -->
                <el-collapse-item>
                    <template slot="title">
                            <span class="headerTitle">货件编号（12件）</span>
                            <span class="item-info"></span>
                    </template>
                    <el-row style="margin-top:10px">
                        <el-col :span="8">
                            <span class="item1">客户备注：</span>
                            <span class="item2"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="item1">内部备注：</span>
                            <span class="item2"></span>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </el-row>
        <el-drawer
            :visible.sync="drawer"
            size="50%"
            :before-close="handleClose">
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
                    <span>{{(num++)}}</span>
                </template>
            </el-table-column>
          </el-table>
          </div>
           </el-row>
        </el-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      total: '10000元 ', // 已确认金额
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
      // 收货司机列表
      receivingDriverList: [{
        name: '李四',
        tel: '15990589231'
      }],
      salesman: '张三', // 所属业务员
      // 业务员列表
      salesmanList: [{
        name: '张三',
        tel: '15990589493',
        position: '普通业务员',
        superior: '高飞'
      }],
      tableData: [
        {
          name: '客户信息'
        },
        {
          name: '业务员'
        }
      ], // 表格数据
      wayBill: 'AS202012120001', // 运单号
      customerInfo: '深圳大成亚马逊贸易科技有限公司', // 客户信息
      name: '深圳大成亚马逊贸易科技有限公司', // 客户名称
      customerCode: 'DCYMX', // 客户编码
      forecastNo: 'YB202012120001' // 预报单号
    }
  },
  methods: {
    // 关闭抽屉
    handleClose () {}
  }
}
</script>
<style lang="scss" scoped>
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
    color: rgba(0, 0, 0, 0.85);
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
