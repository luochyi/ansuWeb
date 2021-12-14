<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">菜单管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
        <el-col :span='24' class="right">
          <el-button @click="addMenu" class='orangeBtn long2' icon="el-icon-circle-plus-outline">新建菜单</el-button>
          <el-button @click="apiManage" class='orangeBtn long2' icon="el-icon-circle-plus-outline">api管理</el-button>
        </el-col>
        </el-row>
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
        <el-table-column prop="name" label="路由名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路由path" width="180">
        </el-table-column>
        <el-table-column prop="hidden" label="是否隐藏" width="180">
        </el-table-column>
        <!-- <el-table-column prop="component" label="文件路径"></el-table-column> -->
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <div v-if="scope.row.type===1">目录</div>
            <div v-else-if="scope.row.type===2">菜单</div>
            <div v-else>按钮</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="展示名称"></el-table-column>
        <el-table-column label="操作" width="80">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="editMenu(scope.row)">修改</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="digTitle" :visible.sync="diaShow" :before-close="close" width="60%">
      <div class="input">
          <el-row>
                <el-col :span="6">
                    <span
                        >上级菜单&nbsp;<el-cascader
                            :options="tableData"
                            v-model="formData.parentId"
                            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'title', value: 'id' }"
                            clearable filterable
                    ></el-cascader
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >路由名称&nbsp;<el-input
                            v-model="formData.name"
                            style="width: 190px"
                            placeholder="请输入路由名称"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="12">
                    <span
                        >路由地址&nbsp;<el-input
                            v-model="formData.path"
                            style="width: 390px"
                            placeholder="请输入路由地址"
                        ></el-input
                        ></span>
                </el-col>

            </el-row>
             <el-row style="marginTop:20px">
                <!-- <el-col :span="12">
                    <span
                        >前段文件路径&nbsp;<el-input
                            v-model="formData.component"
                            style="width: 390px"
                            placeholder="请输入文件路径"
                        ></el-input
                        ></span>
                </el-col> -->
                 <el-col :span="12">
                    <span
                        >图标&nbsp;<el-input
                            v-model="formData.icon"
                            style="width: 390px"
                            placeholder="请输入图标路径"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >排序&nbsp;<el-input
                            v-model="formData.sort"
                            style="width: 190px"
                            placeholder="请输入排序"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >类型&nbsp;<el-select
                            v-model="formData.type"
                            style="width: 190px"
                            placeholder="请选择类型"
                        >
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select
                        ></span>
                </el-col>
            </el-row>
            <el-row style="marginTop:20px">
                <el-col :span="6">
                    <span
                        >展示名称&nbsp;<el-input
                            v-model="formData.title"
                            style="width: 190px"
                            placeholder="请输入展示名称"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >是否隐藏&nbsp;<el-select
                        v-model="formData.hidden"
                        style="width: 190px"
                        placeholder="是否隐藏"
                    >
                            <el-option
                                v-for="item in hiddenOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select
                        ></span>
                </el-col>

            </el-row>
        <el-row>
          <el-col :span="24" style="margin:40px">
            <el-transfer
                filterable
                filter-placeholder="请输入接口名称"
                v-model="formData.apis"
                 :titles="['所有api接口', '已选择api接口']"
                :data="apis"
                :props="{key:'id',label:'name'}">
            </el-transfer>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="close" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="submit()" class="orangeBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      digTitle: '',
      diaShow: false,
      diaType: 1, // 1=添加 2=修改

      typeOptions: [
        { value: 1, label: '目录' },
        { value: 2, label: '菜单' },
        { value: 3, label: '按钮' }
      ],
      hiddenOptions: [
        { value: 0, label: '显示' },
        { value: 1, label: '隐藏' }
      ],
      tableData: [],
      apis: [],
      formData: {
        menuId: 0,
        parentId: [],
        name: '',
        path: '',
        hidden: 0,
        component: '',
        sort: 100,
        type: 1,
        title: '',
        icon: '',
        apis: []
      }
    }
  },
  mounted () {
    this.getData()
    this.getApiSelect()
  },
  methods: {
    getData () {
      this.$api.configure.menu.all().then(res => {
        this.tableData = res.data
      })
    },
    getApiSelect () {
      this.$api.configure.api.select().then(res => {
        this.apis = res.data
      })
    },
    addMenu () {
      this.diaShow = true
      this.digTitle = '新增菜单'
      this.diaType = 1

      this.formData.menuId = 0
      this.formData.parentId = []
      this.formData.name = ''
      this.formData.path = ''
      this.formData.hidden = 0
      this.formData.component = ''
      this.formData.sort = 100
      this.formData.type = 1
      this.formData.title = ''
      this.formData.icon = ''
      this.formData.apis = []
    },
    editMenu (val) {
      this.$api.configure.menu.info(val.id).then(res => {
        if (res.code === 0) {
          this.diaShow = true
          this.digTitle = '修改菜单'
          this.diaType = 2

          this.formData.menuId = val.id
          this.formData.parentId = this.cascaderData(this.tableData, res.data.parent_id)
          this.formData.name = res.data.name
          this.formData.path = res.data.path
          this.formData.hidden = res.data.hidden
          this.formData.component = res.data.component
          this.formData.sort = res.data.sort
          this.formData.type = res.data.type
          this.formData.title = res.data.title
          this.formData.icon = res.data.icon
          this.formData.apis = res.data.apis
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    apiManage () {
      this.$router.push({ name: 'apiManagement' }) // 添加成功后返回子公司列表
    },
    submit () {
      switch (this.diaType) {
        case 1:
          this.add()
          break
        case 2:
          this.edit()
          break
      }
    },
    add () {
      if (!this.formData.parentId) {
        this.$message.error('请选择上级接口') // 错误提示
        return
      }
      this.$api.configure.menu.add({
        parentId: Number(this.formData.parentId.slice(-1)),
        name: this.formData.name,
        path: this.formData.path,
        hidden: this.formData.hidden,
        component: this.formData.component,
        sort: this.formData.sort,
        type: this.formData.type,
        title: this.formData.title,
        icon: this.formData.icon,
        apis: this.formData.apis
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
    edit () {
      if (!this.formData.parentId) {
        this.$message.error('请选择上级接口') // 错误提示
        return
      }
      this.$api.configure.menu.edit({
        menuId: this.formData.menuId,
        parentId: Number(this.formData.parentId.slice(-1)),
        name: this.formData.name,
        path: this.formData.path,
        hidden: this.formData.hidden,
        component: this.formData.component,
        sort: Number(this.formData.sort),
        type: this.formData.type,
        title: this.formData.title,
        icon: this.formData.icon,
        apis: this.formData.apis
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
    close () { this.diaShow = false },
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
/deep/ .searchbox1 {
  .batch {
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #fef4e1;
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
/deep/ .el-dialog {
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
/deep/ .el-dialog {
  text-align: left;

}
//biankuang
/deep/ .el-dialog__body {
  padding: 10px 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  height: 600px;
}
/deep/ .el-dialog__header {
  padding: 10px 10px;
}
/deep/ .el-dialog__footer {
  padding: 5px 10px;
}
/deep/ .input {
  height: 90px;
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
/deep/.el-transfer-panel{
  // height: 300px;
  max-height: 400px;
}
/deep/.el-transfer{
  margin: 20;
  }
.contenta {
  margin: 10px;
}
</style>
