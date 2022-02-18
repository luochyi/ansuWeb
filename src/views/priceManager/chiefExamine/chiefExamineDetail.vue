<template>
    <div>
        <div class="box">
            <el-row style="line-height:50px;font-size:14px">
                <el-col :span='4'>{{detailData.offer.audit_status===0?'未报价':detailData.offer.audit_status===1?'审核中':detailData.offer.audit_status===2?'审核通过':'审核驳回'}}</el-col>
                <el-col :span='4' v-show="detailData.offer.audit_status>1">审核人：{{detailData.offer.audit_name}}</el-col>
                <el-button class="orangeBtn" @click="auditHistory">审核历史</el-button>
            </el-row>
        </div>
        <div class="box">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
                <span class='text'>运单信息</span>
            </el-row>
            <span style="color:#FB4E0C;font-size:22px">{{detailData.waybill_no}}</span>
            <el-descriptions :column="4">
                <el-descriptions-item label="客户简称">{{detailData. customer_code}}</el-descriptions-item>
                <el-descriptions-item label="客户名称">{{detailData.customer_name}}</el-descriptions-item>
                <el-descriptions-item label="目的国">{{detailData.country_name}}</el-descriptions-item>
                <el-descriptions-item label="目的国邮编">{{detailData.zipcode}}</el-descriptions-item>
                <el-descriptions-item label="报关类型">{{detailData.trade_type===1?'一般贸易报关':'非一般贸易报关'}}</el-descriptions-item>
                <el-descriptions-item label="清关类型">{{detailData.is_separate_customs_clearance===1?'单独清关':'非单独清关'}}</el-descriptions-item>
                <el-descriptions-item label="是否有保险">{{detailData.have_safe===1?'购买':'不购买'}}</el-descriptions-item>
                <el-descriptions-item label="品名"><el-button type="text" @click="itemsDrawer = true" size="mini">查看</el-button></el-descriptions-item>
                <el-descriptions-item label="材质"><el-button type="text" @click="cateDrawer = true" size="mini">查看</el-button></el-descriptions-item>
                <el-descriptions-item label="方数">{{detailData.volume}}</el-descriptions-item>
                <el-descriptions-item label="实重">{{detailData.weight}}</el-descriptions-item>
                <el-descriptions-item label="材积重">{{detailData.volume_weight}}</el-descriptions-item>
                <el-descriptions-item label="结算重">{{detailData.bill_weight}}</el-descriptions-item>
                <el-descriptions-item label="预报渠道">{{detailData.channel_name}}</el-descriptions-item>
                <el-descriptions-item label="备注">{{detailData.remark}}</el-descriptions-item>
                <el-descriptions-item label="内部备注">{{detailData.interior_remark}}</el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="box">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
                <span class='text'>基础运价确认</span>
            </el-row>
            <!-- 计价方式单价、未确认、未审核 -->
            <el-row style="line-height:50px;font-size:14px" v-if="detailData.offer.type===1&&!isSub&&detailData.offer.audit_status===0">
                <el-col :span='4'>运费单价：{{detailData.offer.price+'元/公斤'}}</el-col>
                    <el-col :span='10'>单价调整：<el-input placeholder="" v-model="adjust.adjustPrice" class="input-with-select">
                        <el-select v-model="adjust.adjustType" slot="prepend" placeholder="请选择" style="width:100px">
                        <el-option label="增加" value="1"></el-option>
                        <el-option label="减少" value="2"></el-option>
                        </el-select>
                        <template slot="append">元</template>
                    </el-input>
                    </el-col>
                <el-col :span='6'><el-button class="orangeBtn" @click="submit()">确认</el-button></el-col>
            </el-row>
            <!-- 计价方式非单价、未确认、未审核 -->
            <el-row style="line-height:50px;font-size:14px" v-else-if="detailData.offer.type>1&&!isSub&&detailData.offer.audit_status===0">
                <el-col :span='4'>运费模式：{{detailData.offer.type===2?'金额':'首续重'}}</el-col>
                <el-col :span='4'>运费单价：{{detailData.offer.price+'元/公斤'}}</el-col>
                <el-col :span='6'><el-button class="orangeBtn">确认</el-button></el-col>
            </el-row>
            <!-- 计价方式单价，确认，未审核 -->
            <el-row style="line-height:50px;font-size:14px" v-else-if="detailData.offer.type===1&&isSub&&detailData.offer.audit_status===0">
                <el-col :span='4'>运费单价：{{detailData.offer.price+'元/公斤'}}</el-col>
                    <el-col :span='10'>单价调整：{{adjust.adjustType===1?'增加 ':'减少 '}}{{adjust.adjustPrice+'元/公斤'}}</el-col>
            </el-row>
            <!-- 计价方式单价，已审核 -->
            <el-row style="line-height:50px;font-size:14px" v-else-if="detailData.offer.type===1&&detailData.offer.audit_status>0">
                <el-col :span='4'>运费单价：{{detailData.offer.price+'元/公斤'}}</el-col>
                    <el-col :span='10'>单价调整：{{detailData.offer.adjust_type===1?'增加 ':'减少 '}}{{detailData.offer.adjust_price+'元/公斤'}}</el-col>
            </el-row>
            <!-- 计价方式其他，已确认 -->
            <el-row style="line-height:50px;font-size:14px" v-else-if="detailData.offer.type > 1&&isSub">
                <el-col :span='4'>运费模式：{{detailData.offer.type===2?'金额':'首续重'}}</el-col>
                <el-col :span='4'>运费单价：{{detailData.offer.price+'元/公斤'}}</el-col>
            </el-row>
            <!-- 不可报价 -->
            <el-row style="line-height:50px;font-size:14px" v-else>
                <el-col>请先确认基础运价</el-col>
            </el-row>
        </div>
        <div class="box" style="margin-bottom:50px">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
                <span class='text'>附加费明细</span>
            </el-row>
            <el-row style="line-height:50px;font-size:14px">
                <el-button class="orangeBtn" @click="addFee" v-if="detailData.offer.audit_status===0">
                    添加附加费
                </el-button>
                <el-table :data="detailData.offer.surcharges">
                    <el-table-column prop="name" label="费用名称"></el-table-column>
                    <el-table-column prop="price" label="单价"></el-table-column>
                    <el-table-column prop="unit" label="单位">
                        <template slot-scope="scope">
                            <span v-if="scope.row.unit===1">结算重</span>
                            <span v-else-if="scope.row.unit===2">票</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
        <div class="footer">
            <!-- <span>报价合计：</span>
            ￥ -->
            <div style="margin-left:400px"><el-button @click="adopt" class="orangeBtn">通过审核</el-button>
            <el-button @click="reject" class="whiteBtn">驳回审核</el-button>
            <el-button @click="back" class="whiteBtn">返 回</el-button></div>
        </div>
        <!-- 查看审核历史 -->
         <commonDrawer
             :drawerVrisible="hisDrawer" drawerTitle="审核历史"
            >
            <div class="dra-content" style="textAlign:left;padding:10px">
                <div class="table" style="margin-top:16px">
                    <el-table :data="historyData"></el-table>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <!-- <button class="btn-orange" @click="submit()" >
                <span> <i class="el-icon-circle-check"></i>提交</span>
                </button> -->
                <button class="btn-gray" @click="hisDrawer=false">
                <span>关闭</span>
                </button>
            </div>
        </commonDrawer>
        <!-- 查看材质 -->
         <commonDrawer
             :drawerVrisible="cateDrawer" drawerTitle="查看材质"
            >
            <div class="dra-content" style="textAlign:left;padding:10px">
                <div class="table" style="margin-top:16px">
                        <div v-if="detailData.material_cates.length===0">无<el-divider></el-divider></div>
                        <div v-for="item,index in detailData.material_cates" :key="index">{{detailData.material_cates[index]}} <el-divider></el-divider></div>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <button class="btn-gray" @click="cateDrawer=false">
                <span>关闭</span>
                </button>
            </div>
        </commonDrawer>
        <!-- 查看品名 -->
         <commonDrawer
             :drawerVrisible="itemsDrawer" drawerTitle="查看品名"
            >
            <div class="dra-content" style="textAlign:left;padding:10px">
                <div class="table" style="margin-top:16px">
                    <div v-if="detailData.items.length===0">无<el-divider></el-divider></div>
                    <div v-for="item,index in detailData.items" :key="index">{{detailData.items[index]}} <el-divider></el-divider></div>
                </div>
            </div>
            <!-- 抽屉底部按钮 -->
            <div slot="footer">
                <button class="btn-gray" @click="itemsDrawer=false">
                <span>关闭</span>
                </button>
            </div>
        </commonDrawer>
        <el-dialog
          title="驳回原因"
          :visible.sync="rejectShow"
          width="30%"
          >
          <span><el-input type="textarea" v-model="rejectReason" :rows="5"></el-input></span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="rejectShow = false">取 消</el-button>
            <el-button type="primary" @click="rejectSubmit">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      rejectShow: false,
      rejectReason: '',
      addFeeDia: false,
      adjustResDia: false, // 调价理由框
      hisDrawer: false, // 历史审核抽屉
      cateDrawer: false, // 品名材质
      itemsDrawer: false,
      isSub: false, // 是否确认基础运价
      waybillId: null,
      detailData: {
        offer: {}
      },
      surcharges: [], // 附加费
      historyData: []
    }
  },
  mounted () {
    if (this.$route.params.waybillId === undefined) {
      this.$router.go(-1)
    }
    this.waybillId = this.$route.params.waybillId
    this.getData()
  },
  methods: {
    getData () {
      this.$api.cost.price.offer.directorDetail({ waybillId: this.waybillId }).then(res => {
        this.detailData = res.data
        this.surcharges = res.data.offer.surcharges
      })
    },
    back () {
      this.$router.go(-1)
    },
    // 查看审核历史
    auditHistory () {
      this.$api.cost.price.offer.history({ waybillId: this.waybillId }).then(res => {
        this.historyData = res.data
        this.hisDrawer = true
      })
    },
    adopt () {
      this.$api.cost.price.examine.directorAdopt({ waybillId: this.waybillId }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.back()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reject () {
      this.rejectShow = true
    },
    rejectSubmit () {
      this.$api.cost.price.examine.directorrReject({ waybillId: this.waybillId, rejectReason: this.rejectReason }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.back()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
    background: #ffffff;
    position: fixed;
    bottom: 0;
    height: 63px;
    width: 100%;
    line-height: 63px;
    z-index: 999;
}
.box{
    margin-bottom: 10px;
    padding-left: 20px;
    background: #ffffff;
    text-align: left;
}
.title{
    line-height: 40px;
    margin-bottom: 10px;
}
.input-with-select{
    width: 300px;
}
</style>
