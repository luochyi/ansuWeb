<template>
  <div>
     <div class="left">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
         <span class='text'>费用登记单</span>
        </el-row>
       <div class="first">
       <span class='text'>登记员：李小彬</span><br>
        <el-button type="text" @click="Deletedestination= true"> 删除 </el-button>
       </div>
      </div>
     <div class="right">
      <div class="one">
      <el-button @click="Approvaldetails= true" class='whiteBtn' style="margin:15px; float: left; ">费用概览 </el-button>
      </div>
      <br>
      <div class="two">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>运单信息</span>
     </el-row>
       <span class='text' style="float: left;">正在对这43笔运单批量登记费用</span>

    </div>
    <br>
    <br>
      <div class="three">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>登记费用</span>
     </el-row>
     <div class="infoBox">
         <el-row>
          <el-col :span='2'>
              <el-select v-model="value" placeholder="收入">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
            <el-col :span='4'>
              <el-select v-model="value" placeholder="费用名称">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
            <el-col :span='2'>
              <el-input v-model='waybillNo' placeholder='数量'></el-input>
            </el-col>
             <el-col :span='3'>
              <el-input v-model='waybillNo' placeholder='公式'></el-input>
            </el-col>
            <el-col :span='2'>
              <el-input v-model='waybillNo' placeholder='单价'></el-input>
            </el-col>
            <el-col :span='2'>
              <el-select v-model="value" placeholder="票">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
             <el-col :span='2'>
              <el-select v-model="value" placeholder="RMB">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
             <el-col :span='2'>
              <el-select v-model="value" placeholder="含税">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
             <el-col :span='2'>
              <el-select v-model="value" placeholder="3%">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
         </el-row>
         <el-row>
             <el-col :span='7'>
              <el-select v-model="value" placeholder="费用名称">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
             </el-col>
               <el-col :span='7'>
              <el-select v-model="value" placeholder="结算对象">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
             </el-col>
               <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>确定</el-button>
            <el-button class='whiteBtn long1'>重 置</el-button>
          </el-col>
         </el-row>
      </div>
    </div>
    <br>
      <div class="four">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>费用登记单</span>
     </el-row>
        <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
     >
       <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="105"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="detailspage"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="cutoff = true"> 删除 </el-button>
        </template>
      </el-table-column>
     </commonTable>
    </div>
  </div>
   <!-- 生成账单 -->
    <el-dialog title="无法生产账单" :visible.sync="cutoff" width="30%">
               <div class="input" >
               <br><span><i class="el-icon-circle-close"></i>您是否确认删除费用为800的带电附加费</span><br>
               </div>
               <span slot="footer" class="cutoff-footer">
                    <el-button class='wuBtn '>取消</el-button>
                 <el-button type="primary" @click="cutoff = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: '',
      confirm: false,
      Tips: false,
      active: 0, // 步骤条
      cutoff: false, // 删除费用
      value1: 1,
      options1: [
        {
          value: 1,
          label: '收入'
        },
        {
          value: 2,
          label: '支出'
        }
      ],
      options2: [
        {
          value: 1,
          label: '票'
        },
        {
          value: 2,
          label: '减少'
        },
        {
          value: 3,
          label: '乘以'
        }
      ],
      options3: [
        {
          value: 1,
          label: 'RMB'
        },
        {
          value: 2,
          label: '减少'
        },
        {
          value: 3,
          label: '乘以'
        }
      ],
      size: '',
      Deletedestination: false, // 删除目的国
      activeName: '1', // 标签绑定
      Approvaldetails: false, // 审批详情
      columns: [
        { prop: 'OrderNo', label: '类型', width: '56', align: 'center' },
        { prop: 'OrderNo', label: '费用名称', width: '122', align: 'center' },
        { prop: 'name', label: '费运类型', width: '85', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '结算对象', width: '110', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '币种', width: '66', align: 'center' },
        { prop: 'salesman', label: '单价', width: '66', align: 'center', type: 'slot', slotName: 'chakan' },
        { prop: 'Reviewer', label: '单位', width: '54', align: 'center' },
        { prop: 'Ordertype', label: '数量', width: '54', align: 'center' },
        { prop: 'number', label: '费用', width: '81', align: 'center', type: 'slot', slotName: 'jianshu' },
        { prop: 'Chargedmagnetic', label: '税金', width: '54', align: 'center' },
        { prop: 'channel', label: '结算费用', width: '81', align: 'center' },
        { prop: 'shipping', label: '录入人', width: '66', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 1,
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    this.tableData = [
      { OrderNo: 'AS123123423412313', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
    ]
    this.page.total = 2
  },
  methods: {
    handleClick (val) {
      console.log(val)
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
    },
    formatters (row, column, cellValue) {
      return row.address + '测试'
    },
    // 改变页面大小处理
    handleSizeChange (val) {

    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        { date: '2016-05-03', name: '王小虎111', address: '上海市普陀区金沙江路 1518 弄' }
      ]
    },
    // 操作按钮列表
    editTableData (row) {}
  }

}

</script>
<style lang="scss" scoped>
.title{
 height: 56px;
 font-size: 16px;
}
.left{
  float: left;
  width: 212px;
  height: 1877px;
  background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
text-align:left;
}
.first{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}
.right{
float: left;
width: 1028px;
height: 988;
background: #E8EBF2;
border-radius: 4px;
border: 1px solid #E8E8E8;
margin: auto 20px;
}
.one{
    background: #FFFFFF ;
    width: 988px;
    height:63px ;
}
.two{
    height:106px ;
    background: #FFFFFF ;
    width: 988px;
}
.el-descriptions{
    margin: auto  30px;
}
.title .text {
    width: 100px;
}
.three{
    height:195px ;
    background: #FFFFFF ;
    width: 988px;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 10px;
    margin: 20px;
    .name{
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0;
}
.four{
    height:376px ;
    background: #FFFFFF ;
    width: 988px;
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

}
/deep/ .el-dialog{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

}
/deep/ .el-dialog{
  text-align: left;
}
//biankuang
/deep/ .el-dialog__body {
    padding: 20px 25px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
.el-col-24{
  width: 130px;
}
</style>
