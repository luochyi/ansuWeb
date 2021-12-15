<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">组织架构</span>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
      <el-row>
        <el-col :span="6" style="marginRight: 10px">
          <span class="sub_title">部门</span>
          <el-button class="whiteBtn" size="mini" @click="showAddDepartment" >新增部门</el-button>
          <el-tree
            :data="organizationList"
            accordion
            node-key="id"
            :props="{label: 'name'}"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="departmentChange(data)">
                  修改
                </el-button>
                <el-popconfirm title="这是一段内容确定删除吗？" @confirm="departmentDel(data)" v-if="data.children === null">
                  <el-button type="text" size="mini" slot="reference">删除</el-button>
                </el-popconfirm>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="6" style="borderLeft: 1px solid #d8d8d8; height: 600px">
          <span class="sub_title">角色</span>
          <el-button class="whiteBtn" @click="showAddRole" size="mini">新增角色</el-button>
          <el-tree
            :data="roleList"
            accordion
            node-key="id"
            :props="{label: 'name'}"
            :expand-on-click-node="false"
            @node-click="handleroleNodeClick"
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              style="marginLeft: 20px"
            >
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="roleChange(data)">
                  修改
                </el-button>
                <el-popconfirm title="这是一段内容确定删除吗？" @confirm="roleDel(data)" v-if="data.children === null">
                  <el-button type="text" size="mini" slot="reference">删除</el-button>
                </el-popconfirm>
                <el-button
                  type="text"
                  size="mini"
                  @click="showAuth(data)"
                >
                  权限
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
      </el-row>
    </div>
    <!--抽屉-->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="drawera">
        <el-row type="flex" justify="flex-start" class="title" align="middle">
          <el-col :span="6" class="colbox">
            <span class="text">角色权限</span>
          </el-col>
          <el-col :span="12" class="colbox">
          </el-col>
          <el-col :span="6" class="colbox">
            <el-button class="orangeBtn" @click="auth">确定</el-button>
          </el-col>
        </el-row>
        <div class="drawer">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="管理端配置" name="first">
              <div>
                <el-checkbox v-model="formData.hasManage">web管理端</el-checkbox>
              </div>
              <div v-show="formData.hasManage">
                <el-tree ref="menuTree" :data="menus" node-key="id" :props="{label: 'name'}" show-checkbox></el-tree>
              </div>
            </el-tab-pane>
            <el-tab-pane label="司机端" name="second">
              <el-checkbox v-model="formData.hasDriver">司机端</el-checkbox>
              <div v-show="formData.hasDriver">
                <el-checkbox v-model="formData.driver.isManage">司机主管</el-checkbox>
              </div>
            </el-tab-pane>
            <el-tab-pane label="仓库端" name="third">
              <el-checkbox v-model="formData.hasWarehouse">仓库端</el-checkbox>
            </el-tab-pane>
            <el-tab-pane label="业务员端" name="fourth">
              <el-checkbox v-model="formData.hasSales">业务员端</el-checkbox>
              <div v-show="formData.hasSales">
                <el-checkbox v-model="formData.sales.departmentData">部门数据</el-checkbox>
              </div>
            </el-tab-pane>
          </el-tabs>
          <br />
        </div>
      </div>
    </el-drawer>
    <!-- 新增部门 -->
    <el-dialog :title="dialog.department.title" :visible.sync="dialog.department.visabled" :before-close="departmentClose" width="30%">
      <div class="input">
        <span style="color:red">*</span>
        <span
          >部门名称<el-input
            v-model="dialog.department.formData.name"
            style="width: 190px"
            placeholder="请输入部门名称"
          ></el-input
        ></span>
        <br />
        <br />
        <span style="color:red">*</span>
        <span
          >上级部门
          <el-cascader
            filterable
            :options="organizationList"
            v-model="dialog.department.formData.parentId"
            :props="{ checkStrictly: true,expandTrigger: 'hover', value: 'id', label: 'name'}"
            @change="handleChange"
            clearable
          ></el-cascader
        ></span>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="departmentClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="departmentSubmit" class="orangeBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增角色 -->
    <el-dialog :title="roleTitle" :visible.sync="toAdd" width="30%">
      <div class="input">
        <span style="color:red">*</span>
        <span>角色名称
          <el-input
            v-model="formRole.name"
            style="width: 190px"
            placeholder="请输入角色名称"
          ></el-input>
        </span>
        <br />
        <br />
        <span style="color:red">*</span>
        <span>上级角色
          <el-cascader
            filterable
            :options="roleList"
            v-model="formRole.parentId"
            :props="{ checkStrictly: true, expandTrigger: 'hover', value: 'id', label: 'name' }"
            @change="handleChange"
            clearable
          ></el-cascader>
        </span>
      </div>
      <span slot="footer" class="toAdd-footer">
        <el-button @click="toAddClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" class="orangeBtn" @click="roleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { positionDelete } from '../../../api/configure'

export default {
  data () {
    return {
      activeName: 'first',
      organizationName: null,
      parentId: [],
      digTitle: '',
      roleTitle: '',
      editId: null,
      roleId: null,
      department: false, // 新增部门
      toAdd: false, // 新增角色
      roleType: null,
      departmentType: null,
      drawer: false,
      organizationList: [],
      roleList: [],
      roleName: null,
      roleParentId: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // }
      formData: {
        positionId: 0,
        hasManage: false,
        manage: {
          menuIds: []
        },
        hasDriver: false,
        driver: {
          isManage: false
        },
        hasWarehouse: false,
        hasSales: false,
        sales: {
          departmentData: false
        }
      },
      menus: [],
      formRole: {
        roleId: null,
        parentId: [],
        name: null
      },
      dialog: {
        department: {
          visabled: false,
          title: null,
          type: null,
          formData: {
            departmentId: null,
            name: null,
            parentId: null
          }
        }
      }
    }
  },
  mounted () {
    this.getData()
    this.getRoleData()
    this.menu()
  },
  methods: {
    getData () {
      this.organizationList = [] // el-tree的数据
      this.$api.configure.departmentAll().then((res) => {
        this.organizationList = res.data
      })
    },
    // 获取角色
    getRoleData () {
      this.roleList = [] // el-tree的数据
      this.$api.configure.positionAll().then((res) => {
        this.roleList = res.data
      })
    },
    departmentClose () {
      this.dialog.department.visabled = false
    },
    toAddClose () {
      this.toAdd = false
      this.roleParentId = []
      this.roleName = null
    },
    roleSubmit () {
      let parentId = 0
      if (this.formRole.parentId) {
        parentId = Number(this.formRole.parentId.slice(-1))
      }
      switch (this.roleType) {
        case 1:
          this.$api.configure.positionAdd({
            name: this.formRole.name,
            parentId: parentId
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.toAddClose()
              this.getRoleData()
            } else {
              this.$message.error(res.msg)
            }
          })
          return
        case 2:
          this.$api.configure.positionEdit({
            positionId: this.formRole.roleId,
            name: this.formRole.name,
            parentId: parentId
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getRoleData()
              this.toAddClose()
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    },
    departmentSubmit () {
      let parentId = 0
      if (this.dialog.department.formData.parentId) {
        parentId = Number(this.dialog.department.formData.parentId.slice(-1))
      }
      switch (this.dialog.department.type) {
        case 1:
          this.$api.configure.departmentAdd({
            name: this.dialog.department.formData.name,
            parentId: parentId
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
              this.departmentClose()
            } else {
              this.$message.error(res.msg)
            }
          })
          return
        case 2:
          this.$api.configure.departmentEdit({
            departmentId: this.dialog.department.formData.departmentId,
            name: this.dialog.department.formData.name,
            parentId: parentId
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
              this.departmentClose()
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    },
    showAddRole () {
      this.formRole.name = null
      this.formRole.roleId = null
      this.formRole.parentId = []
      this.roleTitle = '新增角色'
      this.roleType = 1
      this.toAdd = true
    },
    showAddDepartment () {
      // department
      this.dialog.department.formData.name = null
      this.dialog.department.formData.parentId = null
      this.dialog.department.title = '新增部门'
      this.dialog.department.type = 1
      this.dialog.department.visabled = true
    },
    roleChange (data) {
      this.formRole.name = data.name
      this.formRole.roleId = data.id
      this.formRole.parentId = this.cascaderData(this.roleList, data.parent_id)
      this.roleTitle = '修改角色'
      this.roleType = 2
      this.toAdd = true
    },
    departmentChange (data) {
      this.dialog.department.formData.name = data.name
      this.dialog.department.formData.departmentId = data.id
      this.dialog.department.formData.parentId = this.cascaderData(this.organizationList, data.parent_id)
      this.dialog.department.title = '修改角色'
      this.dialog.department.type = 2
      this.dialog.department.visabled = true
    },
    departmentDel (data) {
      this.$api.configure.departmentDelete(data.id).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    roleDel (data) {
      this.$api.configure.positionDelete(data.id).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getRoleData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleChange (val) {
      console.log(val)
      console.log(this.organizationList)
    },

    handleNodeClick (val) {
    },
    handleroleNodeClick (val) {},
    // 删除部门
    remove (node, data) {
      console.log(data)
      // 删除无接口
    },
    menu () {
      this.$api.configure.menu.all().then(res => {
        this.menus = res.data
      })
    },
    showAuth (data) {
      this.formData.positionId = data.id
      this.$api.company.position.getSuth(data.id).then(res => {
        this.formData.hasManage = res.data.has_manage === 1
        this.formData.hasDriver = res.data.has_driver === 1
        this.formData.hasWarehouse = res.data.has_warehouse === 1
        this.formData.driver.isManage = res.data.driver.is_manage === 1
        this.formData.hasSales = res.data.has_sales === 1
        res.data.manage.menu_ids.forEach(menuId => {
          this.$refs.menuTree.setChecked(menuId, true)
        })
      })
      this.drawer = true
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
    },
    auth () {
      this.$api.company.position.auth({
        positionId: this.formData.positionId,
        auth: {
          hasManage: this.formData.hasManage ? 1 : 0,
          manage: {
            menuIds: this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())
          },
          hasDriver: this.formData.hasDriver ? 1 : 0,
          driver: {
            isManage: this.formData.driver.isManage ? 1 : 0
          },
          hasWarehouse: this.formData.hasWarehouse ? 1 : 0,
          hasSales: this.formData.hasSales ? 1 : 0
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.drawer = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  height: 600px;
}
.sub_title {
  margin: 20px;
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
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
.drawera{
  text-align: left;
  margin-left:10px ;
}
</style>
