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
                    <el-button class="whiteBtn" size="small">页面显示设置</el-button>
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
                            <el-col :span="8">
                                <span class="item1">出仓渠道：</span>
                                <span class="item2"></span>
                                <el-button class="button" type="text">修改</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <span class="item1">出仓代理：</span>
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
                            <el-col :span="8">
                                <span class="item1">派送类型：</span>
                                <span class="item2"></span>
                            </el-col>
                        </el-row>
                        <el-row>
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
    </div>
</template>
<script>
export default {
  data () {
    return {
      total: '10000元 ', // 已确认金额
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
      wayBill: 'AS202012120001', // 运单号
      customerInfo: '深圳大成亚马逊贸易科技有限公司', // 客户信息
      name: '深圳大成亚马逊贸易科技有限公司', // 客户名称
      customerCode: 'DCYMX', // 客户编码
      forecastNo: 'YB202012120001' // 预报单号
    }
  }
}
</script>
<style lang="scss" scoped>
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
