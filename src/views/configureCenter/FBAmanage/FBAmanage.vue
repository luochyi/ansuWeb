 <template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
      <span class='text'>FBA仓管理</span>
       <!-- <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
        <el-tab-pane label='正常仓库' name='1'></el-tab-pane>
        <el-tab-pane label='港后状态' name='2'></el-tab-pane>
      </el-tabs> -->
    </el-row>
    <el-row class="box-block flex">
      <el-col :span="6" style="border: 1px solid #D9D9D9;border-top:none;height:750px;overflow:scroll">
        <div style="background:#fff">
          <el-row style="padding:14px 34px 12px 34px;" type='flex' justify="space-between" align="middle">
            <el-col :span="3" style="margin-top:-2px">
            <span style="font-size: 14px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">国家</span>
            </el-col>
            <el-col :span="14" type="flex">
            </el-col>
          </el-row>
          <el-row class="search-box">
          </el-row>
          <el-row style="padding:0px 30px 12px 40px;display:flex;align-items:center;"  v-for="item,index in countryList" :key="index" @click.native="changecountry(item.id,index)">
            <el-row :class="index===red?'active':''" style="padding:12px;margin-bottom:20px;background: #F9F9F9;
          border-radius: 3px;width: 88%;height: 68px;font-size: 14px;font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;color: rgba(0, 0, 0, 0.8);cursor: pointer;">
          <div style="display:flex;align-items:center;margin-bottom:4px" >
            <span>目的国：</span><span>{{item.name}}</span>
          </div>
          <div style="display:flex;align-items:center;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
          color: rgba(0, 0, 0, 0.45);justify-content:space-between">
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
        <el-col :span='8' class='colbox'>
          <span class='text'>FBA仓</span>
          <el-col :span='16'>
            <el-input v-model='keyword' placeholder='请输入名称/邮编'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colbox'>
          <el-button class='orangeBtn long1' @click="search">查 询</el-button>
          <el-button class='wuBtn long1' @click="reset">重 置</el-button>
        </el-col>
      </el-row>
         <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <!-- <el-button class='stopBtn' @click="batchDel">批量删除</el-button> -->
          </el-col>
          <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="showUpload">导入FBA仓</el-button>
            <el-button class='whiteBtn' @click="dialogVisible = true;diatitle='新增FBA仓'">添加FBA仓</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column prop="name" label="仓库名"></el-table-column>
            <el-table-column prop="zip_code" label="邮编"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)">
                  修改
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="del(scope.row.id)">
                  删除
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
    </div>
    </el-col>
    </el-row>
      <el-dialog
        :title="diatitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-row>
            仓库名<el-input v-model="form.name"></el-input>
            邮编<el-input v-model="form.zipCode"></el-input>
            地址<el-input v-model="form.address" type="textarea"></el-input>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </span>
      </el-dialog>

    <el-dialog
        title="导入FBA仓库"
        :visible.sync="dialog.upload.visible"
        width="30%"
        @before-close="dialog.upload.visible = false">
      <div>
        <el-row>
          <el-upload
              class="upload-demo"
              :headers="uploadhead"
              :action="`${$baseUrl}/file/upload/file`"
              :before-remove="beforeRemove"
              :on-success="handleAvatarSuccess"
              name="file"
              :limit="1"
              :file-list="fileList">
            <el-button size="mini"  type="primary">上传Excel</el-button>
          </el-upload>
        </el-row>
        <el-row class="diabox2">
          <span @click="download">下载导入FBA仓库Excel</span>
          <div>请下载导入FBA仓库专用Excel</div>
          <div>如用其他Excel会发生对账数据错误</div>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.upload.visible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      uploadhead: {
        'Ansuex-Manage-Token': sessionStorage.getItem('token')
      },
      fileList: [],
      diatitle: '',
      dialog: {
        upload: {
          visible: false,
          formData: {
            path: null
          }
        }
      },
      dialogVisible: false,
      countryList: [],
      form: {
        name: '',
        zipCode: '',
        address: ''
      },
      keyword: '',
      visible: false,
      red: null,
      countryId: null,
      storehouseFbaId: null,
      chooseArr: [],
      total: null, // 数据总条数
      currentPage: 1,
      pageSize: 15,
      agentCode: '',
      agentName: '',
      tableData: [], // 表格数据
      Class: 1 // 分类
    }
  },
  mounted () {
    this.getData()
    this.getTemplate()
  },
  methods: {
    getData () {
      this.channelList = []
      this.$api.agent.selectCountry().then(res => {
        this.countryList = res.data
      })
      this.$api.configure.FBA.lists({
        page: this.currentPage,
        limit: this.pageSize,
        countryId: this.countryId,
        keyword: this.keyword
      }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changecountry (id, index) {
      this.red = index
      this.countryId = id
      this.getData()
    },
    handleSelectionChange (arr) {},
    search () {
      this.getData()
    },
    reset () {
      this.keyword = ''
      this.getData()
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAvatarSuccess (res, file) {
      this.dialog.upload.formData.path = res.data.path // 上传成功的回调函数
    },
    getTemplate () {
      this.$api.setting.template.lists(3).then(res => {
        if (res.data && res.data.length > 0) {
          this.templatePath = res.data[0].path
        }
      })
    },
    download () {
      // 下载模板
      window.location.href = this.$api.file.cdnPath(this.templatePath)
    },
    del (id) {
      this.$confirm('确认删除')
        .then(_ => {
          this.$api.configure.FBA.del({ storehouseFbaId: id, countryId: this.countryId }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(_ => {})
    },
    addSubmit () {
      if (this.countryId === null) {
        this.$message.error('请选择国家')
        return
      }
      if (this.diatitle === '新增FBA仓') {
        this.$api.configure.FBA.add({
          name: this.form.name,
          address: this.form.address,
          zipCode: this.form.zipCode,
          countryId: this.countryId
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.handleClose()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.diatitle === '修改FBA仓') {
        this.$api.configure.FBA.edit({
          name: this.form.name,
          address: this.form.address,
          zipCode: this.form.zipCode,
          countryId: this.countryId,
          storehouseFbaId: this.storehouseFbaId
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.handleClose()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    edit (data) {
      this.diatitle = '修改FBA仓'
      this.dialogVisible = true
      this.storehouseFbaId = data.id
      this.form.name = data.name
      this.form.zipCode = data.zip_code
      this.form.address = data.address
    },
    handleClose () {
      this.form = {
        name: '',
        zipCode: '',
        address: ''
      }
      this.dialogVisible = false
    },
    showUpload () {
      this.dialog.upload.formData.path = null
      this.fileList = []
      this.dialog.upload.visible = true
    },
    submit () {
      this.$api.configure.FBA.Import(this.dialog.upload.formData.path).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
          this.dialog.upload.visible = false
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.active{
  border:3px solid #FB4702
}
.diabox2{
  border-top:1px solid #E8EBF2;
  padding-top: 20px;
  span{
    color: #0091FF;
    cursor: pointer;
  }
  div{
    color:#FF4D4F;
  }
}
.search-font{
  width: 60px;
  height: 36px;
  background: #FB4702;
  border: 1px solid #979797;
  border-left: 0;
  border-bottom-right-radius: 18px;
  border-top-right-radius: 18px;
  text-align:center;
  line-height:36px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;color: #FFFFFF;
}
.input-box{
  width: 67%;
  height: 36px;
  background: #FFFFFF;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  border: 1px solid #979797;
  display:flex;
  justify-content:flex-start;
  padding-left:10px;
  align-items:center;
}
.search-box{
  padding:0px 30px 12px 40px;
  display:flex;
  align-items:center;
  margin-bottom:8px
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
