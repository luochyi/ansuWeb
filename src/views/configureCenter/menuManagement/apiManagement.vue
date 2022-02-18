<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>api管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 表格 -->
      <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
        <el-col class="right">
          <el-button @click="showAdd" class='orangeBtn long2' icon="el-icon-circle-plus-outline">新建接口</el-button>
        </el-col>
      </el-row>
      <div>
        <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            :header-cell-style="{ background: '#F5F5F6', color: '#999999FF',fontSize:'14px' }"
            border
            tooltip-effect="light"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="id" label="Id" width="180">
          </el-table-column>
          <el-table-column prop="name" label="接口名称">
          </el-table-column>
          <el-table-column prop="path" label="接口地址">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="showEdit(scope.row)">修改</el-button>
              <el-popconfirm
                  title="确定删除这个接口吗？"
                  @confirm="del(scope.row.id)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="digTitle" :visible.sync="diaShow" :before-close="close" width="60%">
      <div class="input">
        <el-row>
          <el-col :span="6">
                    <span
                    >上级接口&nbsp;<el-cascader
                        :options="tableData"
                        v-model="formData.parentId"
                        :show-all-levels="false"
                        :props="{  checkStrictly: true, expandTrigger: 'hover', label: 'name', value: 'id' }"
                        clearable filterable
                    ></el-cascader
                    ></span>
          </el-col>
          <el-col :span="6">
                    <span
                    >接口名称&nbsp;<el-input
                        v-model="formData.apiName"
                        style="width: 190px"
                        placeholder="请输入接口名称"
                    ></el-input
                    ></span>
          </el-col>
          <el-col :span="12">
                    <span
                    >接口地址&nbsp;<el-input
                        v-model="formData.apiPath"
                        style="width: 390px"
                        placeholder="请输入接口地址"
                    ></el-input
                    ></span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="close" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="submit" class="orangeBtn"
        >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../../api/api'

export default {
  data () {
    return {
      digTitle: '',
      diaShow: false,
      diaType: 1,
      tableData: [],
      opteions: [],
      formData: {
        apiId: 0,
        parentId: [],
        apiName: '',
        apiPath: ''
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      api.configure.api.all().then((res) => {
        this.tableData = res.data
      })
    },
    del (val) {
      this.$api.configure.api.del(Number(val)).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    showAdd () {
      this.digTitle = '新建接口'
      this.diaShow = true
      this.diaType = 1
      this.formData.parentId = []
      this.formData.apiName = ''
      this.formData.apiPath = ''
    },
    showEdit (val) {
      this.digTitle = '修改接口'
      this.diaShow = true
      this.diaType = 2
      this.formData.parentId = this.cascaderData(this.tableData, val.parent_id)
      this.formData.apiName = val.name
      this.formData.apiPath = val.path
      this.formData.apiId = val.id
    },
    submit () {
      switch (this.diaType) {
        case 1: // 新增
          this.add()
          break
        case 2: // 修改
          this.edit()
          break
      }
    },
    add () {
      if (!this.formData.parentId) {
        this.$message.error('请选择上级接口') // 错误提示
        return
      }
      this.$api.configure.api.add({
        parentId: Number(this.formData.parentId.slice(-1)),
        apiName: this.formData.apiName,
        apiPath: this.formData.apiPath
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
          this.close()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    close () {
      this.diaShow = false
    },
    edit () {
      if (!this.formData.parentId) {
        this.$message.error('请选择上级接口') // 错误提示
        return
      }
      this.$api.configure.api.edit({
        apiId: this.formData.apiId,
        parentId: Number(this.formData.parentId.slice(-1)),
        apiName: this.formData.apiName,
        apiPath: this.formData.apiPath
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
          this.close()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    cascaderData (val, id) {
      for (let i in val) {
        if (val[i].id === id) {
          return [id]
        }
        if (val[i].children) {
          let res = this.cascaderData(val[i].children, id)
          if (res.length > 0) {
            res.unshift(val[i].id)
            return res
          }
        }
      }
      return []
    }
  }

}

</script>
<style lang="scss" scoped>
/deep/ .searchbox1{
  .batch{
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
/deep/ .el-dialog{
  text-align: left;
}
//biankuang
/deep/ .el-dialog__body {
  padding: 10px 15px;
  border-top:1px solid rgba(0, 0, 0, 0.06);
  border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
  padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
/deep/ .input{
  height: 90px;
}
/deep/ .title{
  height: 56px;
  font-size: 16px;
}
.el-icon-circle-check{
  width: 66px;
  height: 58px;
  font-size: 58px;
  color: #FB4702;
}
</style>
