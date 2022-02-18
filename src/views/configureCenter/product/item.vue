<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>品名</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <el-col :span='2' class='colboxx justify-center'>
          <el-button @click="showAdd" class='orangeBtn long3'> 新增品名</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
<commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      :selection="false"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="126"
        :resizable="false"
        >
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="changeDefault(scope.row.id)"> 设置默认</el-button> -->
          <el-button type="text" @click="showEdit(scope.row)"> 修改</el-button>
        </template>
      </el-table-column>
      </commonTable>
    </div>
    <el-dialog
      :title="dialog.item.title"
      :visible.sync="dialog.item.visable"
      width="30%">
      <el-form ref="itemForm" :model="dialog.item.formData" :rules="dialog.item.rules" size="medium" label-width="100px">
        <el-form-item label="中文名" prop="zhName">
          <el-input v-model="dialog.item.formData.zhName" placeholder="请输入中文名" clearable
                    :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="enName">
          <el-input v-model="dialog.item.formData.enName" placeholder="请输入英文名" clearable
                    :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.item.visable = false">取 消</el-button>
        <el-button type="primary" @click="itemSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: {
        item: {
          visable: false,
          title: undefined,
          formData: {
            itemId: undefined,
            zhName: undefined,
            enName: undefined
          },
          rules: {
            zhName: [
              { required: true, message: '请输入中文名', trigger: 'blur' }
            ],
            enName: [
              { required: true, message: '请输入英文名', trigger: 'blur' }
            ]
          }
        }
      },
      columns: [
        { prop: 'zh_name', label: '中文名', align: 'center' },
        { prop: 'en_name', label: '英文名', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      }

    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.setting.product.item.lists({ page: this.page.pageNo, limit: this.page.limit }).then((res) => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    showAdd () {
      this.dialog.item.formData = {
        itemId: undefined,
        zhName: undefined,
        enName: undefined
      }
      this.dialog.item.title = '新增品名'
      this.dialog.item.visable = true
    },
    showEdit (row) {
      this.dialog.item.formData = {
        itemId: row.id,
        zhName: row.zh_name,
        enName: row.en_name
      }
      this.dialog.item.title = '修改品名'
      this.dialog.item.visable = true
    },
    itemSubmit () {
      this.$refs.itemForm.validate(valid => {
        if (!valid) {
          return
        }
        if (this.dialog.item.formData.itemId) {
          this.$api.setting.product.item.edit({
            itemId: this.dialog.item.formData.itemId,
            zhName: this.dialog.item.formData.zhName,
            enName: this.dialog.item.formData.enName
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
              this.dialog.item.visable = false
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$api.setting.product.item.add({
            zhName: this.dialog.item.formData.zhName,
            enName: this.dialog.item.formData.enName
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
              this.dialog.item.visable = false
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
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

}
.title .text{
    width: 250px;
    text-align:left;
    margin: 17px;
}
.title .texta{
    width: 250px;
    text-align:left;
    margin: 32px;
    color:#FB4702 ;
    font-size: 18px;
    line-height: 25px;
    font-family: PingFangSC-Semibold, PingFang SC;
}
/deep/ .el-dialog{
  text-align: left;
}
//biankuang

/deep/ .input{
  height: 80px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.searchbox1 .colbox .text {
    width: 90px;
}
.colbox{
    width: 300px;
}
.colboxa {
width: 200px;
}

</style>
