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
        </el-col>
        </el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :header-cell-style="{ background: '#F5F5F6', color: '#999999FF',fontSize:'14px' }"
        border
        tooltip-effect="light"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作" width="80">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="digTitle" :visible.sync="diaShow" :before-close="addClose" width="60%">
      <div class="input">
          <el-row>
                <el-col :span="6">
                    <span
                        >上级菜单<el-cascader
                            :options="menuOptions"
                            v-model="parentId"
                            :props="{ checkStrictly: true }"
                            @change="handleChange"
                            clearable
                        ></el-cascader
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >路由名称<el-input
                            v-model="routerName"
                            style="width: 190px"
                            placeholder="请输入路由名称"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >路由地址<el-input
                            v-model="path"
                            style="width: 190px"
                            placeholder="请输入路由地址"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >是否隐藏<el-input
                            v-model="hidden"
                            style="width: 190px"
                            placeholder="是否隐藏"
                        ></el-input
                        ></span>
                </el-col>
            </el-row>
             <el-row style="marginTop:20px">
                <el-col :span="12">
                    <span
                        >前段文件路径<el-input
                            v-model="component"
                            style="width: 390px"
                            placeholder="请输入文件路径"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >排序<el-input
                            v-model="sort"
                            style="width: 190px"
                            placeholder="请输入排序"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="6">
                    <span
                        >类型<el-select
                            v-model="type"
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
                <el-col :span="12">
                    <span
                        >展示名称<el-input
                            v-model="title"
                            style="width: 190px"
                            placeholder="请输入展示名称"
                        ></el-input
                        ></span>
                </el-col>
                <el-col :span="12">
                    <span
                        >图标<el-input
                            v-model="icon"
                            style="width: 390px"
                            placeholder="请输入图标路径"
                        ></el-input
                        ></span>
                </el-col>
            </el-row>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="addClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="addSubmit()" class="orangeBtn"
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

      parentId: null,
      routerName: '',
      path: '',
      hidden: '',
      component: '',
      sort: null,
      type: null,
      title: '',
      icon: '',
      typeOptions: [
        { value: 1, label: '目录' },
        { value: 2, label: '菜单' },
        { value: 3, label: '按钮' }
      ],
      menuOptions: [],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {},
    addMenu () {
      this.diaShow = true
      this.digTitle = '新增菜单'
    },
    addSubmit () {},
    addClose () { this.diaShow = false },
    handleChange (val) {},
    handleEdit () {}
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
  height: 200px;
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
.contenta {
  margin: 10px;
}
</style>
