<template>
    <div>
        <el-row class="box">
            <!-- 第一行 -->
            <el-row>
                <el-col :span="6" class="item">
                    <span class="item-box">运单号&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.wayBillNo" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">目的地&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.destination" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">发票状态&nbsp;&nbsp;</span>
                    <el-select placeholder="请选择" class="input" v-model="form.invoiceStatus" size="small"></el-select>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">渠道&nbsp;&nbsp;</span>
                    <el-select placeholder="请选择" class="input" v-model="form.channel" size="small"></el-select>
                </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row  style="margin-top:18px">
                <el-col :span="6" class="item">
                    <span class="item-box">预报时间&nbsp;&nbsp;</span>
                    <el-select placeholder="请选择" class="input" v-model="form.forecastTime" size="small"></el-select>
                </el-col>
               <el-col :span="6" class="item">
                    <span class="item-box">运单类型&nbsp;&nbsp;</span>
                    <el-select placeholder="请选择" class="input" v-model="form.orderType" size="small"></el-select>
                </el-col>
                <el-col :span="6" class="item">
                    <span class="item-box">预报单号&nbsp;&nbsp;</span>
                    <el-input placeholder="请输入" class="input" v-model="form.forecastOrderNo" size="small"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button size="small" class="orangeBtn" style="margin-right:10px">查 询</el-button>
                    <el-button size="small" class="wuBtn" style="margin-right:10px">重 置</el-button>
                    <el-button size="small" class="wuBtn">展开全部</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <div class="table" style="margin-top:26px">
            <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange"
                :header-cell-style="{background: '#F5F5F6'}">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="forecastNo" label="预报单号" min-width="100"></el-table-column>
                <el-table-column prop="orderType" label="运单类型" min-width="100"></el-table-column>
                <el-table-column prop="forecastDate" label="预报日期" min-width="120"></el-table-column>
                <el-table-column prop="goodsNo" label="货件编码" min-width="160">
                    <template slot-scope="scope">
                        <span class="forecastNo">{{scope.row.goodsNo}}</span>
                        <el-popover
                            placement="bottom"
                            width="200"
                            trigger="click">
                            <span>{{scope.row.goodsNo}}</span>
                            <el-button slot="reference" type="text">全部</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="forecastStatus" label="预报状态" min-width="80">
                    <template>
                        <div style="display:flex;align-items:center">
                            <div style="width: 7px;height: 7px;border-radius: 50%;background: #3CBB00;"></div>
                            <span style="margin-left:10px">已预报</span>
                        </div>
                        <div style="display:flex;align-items:center">
                            <div style="width: 7px;height: 7px;border-radius: 50%;background: #FF0000;"></div>
                            <span style="margin-left:10px">未预报</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="channel" label="渠道" min-width="120"></el-table-column>
                <el-table-column prop="startPosition" label="起运地" min-width="80"></el-table-column>
                <el-table-column prop="destination" label="目的地" min-width="80"></el-table-column>
                <el-table-column prop="forecastNum" label="预报件数" min-width="160">
                    <template slot-scope="scope">
                        <span class="forecastNo">{{scope.row.forecastNum}}</span>
                        <span class="electrified">带电</span>
                        <el-button type="text" @click="packingList(scope.row)">装箱清单</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="insurance" label="保险" min-width="80"></el-table-column>
                <el-table-column prop="remarks" label="备注" min-width="120"></el-table-column>
                <el-table-column label="操作" min-width="240">
                    <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)">查看详情</el-button>
                        <span class="buttonFen">｜</span>
                        <el-button type="text" @click="input(scope.row)">录入详情</el-button>
                        <span class="buttonFen">｜</span>
                        <el-button type="text" @click="cancelOrder(scope.row)">取消运单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div class='block'>
              <span class="block-title">共搜索到{{ total }}条数据</span>
              <el-pagination
                :current-page.sync='currentPage'
                :pager-count='9'
                :page-size='pageSize'
                :page-sizes='[10, 20, 50, 100, 200, 500]'
                layout='prev, pager, next, sizes, jumper'
                :total='total'
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
            <el-drawer
            :visible.sync="drawer"
            size="50%"
            :before-close="handleClose">
                <div slot="title" class="headTitle">装箱清单</div>
                <el-row class="" style="padding:26px;text-align:left;background:#fff;margin-top:26px;position:relative">
                    <el-row style="display:flex;align-items:center" class="drawerHead">
                        <span>箱数：</span>
                        <span>{{boxNum}}</span>箱
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="12" class="form-item">
                            <span>所属公司：</span>
                        <span>{{company}}</span>
                        </el-col>
                        <el-col :span="12" class="form-item">
                            <span>客户名称：</span>
                        <span>{{customerName}}</span>
                        </el-col>
                    </el-row>
                    <!-- 第二行 -->
                    <el-row style="margin-top:16px">
                        <el-col :span="12" class="form-item">
                            <span>预报单号：</span>
                        <span>{{forecastOrderNo}}</span>
                        </el-col>
                        <el-col :span="12" class="form-item">
                            <span>运单号：</span>
                        <span>{{orderNo}}</span>
                        </el-col>
                    </el-row>
                    <el-row style="height:1px;background:#E9E9E9;margin:30px 0"></el-row>
                    <el-row class="wu" v-if="change === 1">暂无装箱清单</el-row>
                    <div>
                        <el-row class="form-item">
                            <span class="item-title">
                                箱子1:<span>{{boxIndex}}</span>
                            </span>
                            <span>23423423234{{no}}</span>
                        </el-row>
                        <el-row class="product">产品：</el-row>
                        <el-row class="form-item">
                            <span class="no">保温杯2020款{{product}}</span>
                            <div class="label">带电</div>
                            <span class="no" style="color:#FB4702">12件{{no}}</span>
                            <el-button type="text" @click="isShow = !isShow">查看详情</el-button>
                        </el-row>
                        <el-row style="background: #F9F9F9;border-radius: 14px;padding:20px" v-if="isShow">
                            <el-col :span="6">
                                <div class="img-box" style="">
                                    <img src="@/assets/logo.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <!-- 1 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="12" class="detials-item">
                                        <span>产品中文名：</span>
                                        <span>保温杯{{ChineseName}}</span>
                                    </el-col>
                                    <el-col :span="12" class="detials-item">
                                        <span>产品英文名：</span>
                                        <span>vacuum cup{{EnglishName}}</span>
                                    </el-col>
                                </el-row>
                                <!-- 2 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="12" class="detials-item">
                                        <span>材质中文名：</span>
                                        <span>材质中文名：不锈钢、塑料{{ChineseQuality}}</span>
                                    </el-col>
                                    <el-col :span="12" class="detials-item">
                                        <span>材质英文名：</span>
                                        <span>stainless steel、Plastic{{EnglishQuality}}</span>
                                    </el-col>
                                </el-row>
                                <!-- 3 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="12" class="detials-item">
                                        <span>用途中文名：</span>
                                        <span>容器、杯子{{ChinesePurpose}}</span>
                                    </el-col>
                                    <el-col :span="12" class="detials-item">
                                        <span>材质英文名：</span>
                                        <span>container、cup{{EnglishPurpose}}</span>
                                    </el-col>
                                </el-row>
                                <!-- 4 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="12" class="detials-item">
                                        <span>海关编码：</span>
                                        <span>{{customsCode}}</span>
                                    </el-col>
                                    <el-col :span="12" class="detials-item">
                                        <span>申报价值：</span>
                                        <span>{{declaredValue}}</span>
                                    </el-col>
                                </el-row>
                                <!-- 5 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="12" class="detials-item">
                                        <span>产品品牌：</span>
                                        <span>{{brand}}</span>
                                    </el-col>
                                    <el-col :span="12" class="detials-item">
                                        <span>产品型号：</span>
                                        <span>{{model}}</span>
                                    </el-col>
                                </el-row>
                                <!-- 6 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="12" class="detials-item">
                                        <span>产品重量：</span>
                                        <span>{{weight}}</span>
                                    </el-col>
                                    <el-col :span="12" class="detials-item">
                                        <span>亚马逊ASIN：</span>
                                        <span>{{Amazon}}</span>
                                    </el-col>
                                </el-row>
                                <!-- 7 -->
                                <el-row style="display:flex;align-items:center;margin-bottom:14px">
                                    <el-col :span="24" class="detials-item">
                                        <span>亚马逊链接：</span>
                                        <span>{{AmazonLink}}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="height:1px;background:#E9E9E9;margin:30px 0"></el-row>
                    </div>
                </el-row>
                <div class="el-drawer-button">
                    <el-button class="orangeBtn" @click="drawer = false">返 回</el-button>
                </div>
            </el-drawer>
            <!-- 气泡货件编码 -->
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogFile: false, // 批量归档对话框
      isShow: false, // 控制抽屉详情
      company: '安速深圳分公司', // 所属公司
      change: 0,
      customerName: '深圳爱因美贸易科技有限公司', // 客户名称
      forecastOrderNo: 'YB202012120001', // 预报单号
      orderNo: 'AS202012120001', // 运单号
      boxNum: '12',
      drawer: false, // 装箱清单
      fileError: true,
      number: 0, // 选择批量归档件数
      form: {
        WayBillNo: '', // 运单号
        invoiceStatus: '', // 发票状态
        channel: '', // 渠道
        destination: '', // 目的地
        forecastTime: '', // 预报时间
        orderType: '', // 运单类型
        forecastOrderNo: '' // 预报单号
      },
      total: 50, // 表格数据总条数
      currentPage: 1,
      pageSize: 10,
      // 表格数据
      tableData: [
        {
          forecastNo: '84920582',
          orderType: 'FBA运单',
          forecastDate: '2021年12月12日',
          goodsNo: 'FBA15R7L7KR0',
          forecastStatus: '已预报',
          channel: '以星卡派快船',
          startPosition: '深圳',
          destination: '美国NT98',
          forecastNum: '12件',
          insurance: '无保险',
          remarks: '走以星报美森'
        }
      ]
    }
  },
  methods: {
    // 表格选择
    handleSelectionChange () {},
    // 打开表格的装箱清单
    packingList () {
      this.drawer = true
    },
    // 表格查看全部
    checkAll () {},
    // 录入详情
    input () {},
    // 取消运单
    cancelOrder () {},
    // 查看详情
    check () {
      this.$router.push({ name: 'predictionDetials' })
    },
    // 抽屉点击查看详情
    checkDrawer () {
    //   this.isShow = !this.isShow
    },
    // 装箱清单关闭
    handleClose () {
      this.drawer = false
    },
    // 批量导出
    Export () {},
    // 查询条件设置
    toAdd () {},
    // 选择页码
    handleCurrentChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.product{
    margin:16px 0 2px 0;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}
.item-title{
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    margin-right:24px;
    color: #FB4702;
}
.img-box{
    width: 88px;
    padding: 6px;
    height: 88px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #D3D3D3;
    img{
        width: 100%;
        height: 100%;
    }
}
.no{
    font-size: 14px;
    margin-right:16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.label{
    font-size: 10px;
    margin: 0 16px 0 6px;
    font-family: PingFangSC-Regular, PingFang SC;
    background: #FB4702;
    border-radius: 20px;
    padding:2px 10px;
    color:#fff;
    font-weight: 400;
    color: #FFFFFF;
}
.wu{
    text-align: center;
    padding-top: 20px;
    padding-bottom: 44%;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
}
.detials-item{
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
}
.form-item{
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.drawerHead{
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FB4E0C;
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
.el-drawer-button{
        position: absolute;
        background: #fff;
        padding: 26px 20px;
        bottom: 0px;
        margin-left: -25px;
        display: flex;
        width: 100%;
}
}
.buttonFen{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0084FF;
}
.number{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    }
.block{
    display: flex;
    align-items: center;
    .block-title{
        margin-right: 20px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
    }
}
.forecastNo{
    font-size: 14px;
    margin-right: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
}
.electrified{
    padding: 4px 10px;
    margin-right: 10px;
    width: 44px;
    height: 22px;
    background: #FB4E0B;
    border-radius: 13px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
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
.line{
    height: 1px;
    background: #E9E9E9;
    margin: 18px 0;
}
.input{
    width: 70%;
}
.box{
    background: #fff;
    padding: 14px 32px;
    text-align: left;
}
.item{
    display: flex;
    align-items: center;
}
.item-box{
    text-align: right;
    width: 70px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
</style>
