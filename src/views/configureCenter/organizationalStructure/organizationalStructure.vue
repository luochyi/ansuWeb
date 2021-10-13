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
          <span class="sub_title">部门</span
          ><el-button class="whiteBtn" size="mini" @click="department = true;digTitle='新增部门'"
            >新增部门</el-button
          >
          <el-tree
            :data="organizationList"
            accordion
            node-key="id"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => change(data)">
                  修改名称
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                  style="color: #ff0000"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="6" style="borderLeft: 1px solid #d8d8d8; height: 600px">
          <span class="sub_title">角色</span
          ><el-button class="whiteBtn" @click="toAdd = true" size="mini"
            >新增角色</el-button
          >
          <el-tree
            :data="roleList"
            accordion
            node-key="id"
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
                <el-button type="text" size="mini" @click="() => roleChange(data)">
                  修改名称
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="showAuth(data)"
                >
                  权限
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                  style="color: #ff0000"
                >
                  删除
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
          <span class="text">角色权限</span>
        </el-row>
        <div class="drawer">
          <br />
          <el-row class="searchbox1">
            <el-col :span="15" class="colbox">
              <el-col :span="5">
                <span class="text">权限配置</span>
              </el-col>
              <el-col :span="10">
                <!-- <el-input v-model="name" placeholder="请选择"></el-input> -->
                <el-checkbox v-model="formData.hasManage">web管理端</el-checkbox>
                <div v-show="formData.hasManage">
                  <el-tree ref="menuTree" :data="menus" node-key="id" :props="{label: 'name'}" show-checkbox></el-tree>
                </div>
                <el-checkbox v-model="formData.hasDriver">司机端</el-checkbox>
                <div v-show="formData.hasDriver">
                  <el-checkbox v-model="formData.driver.isManage">司机主管</el-checkbox>
                </div>
                <el-checkbox v-model="formData.hasWarehouse">仓库端</el-checkbox>
                <el-checkbox v-model="formData.hasSales">业务员端</el-checkbox>
              </el-col>
            </el-col>
            <el-col :span="1" class="colbox">
              <el-button @click="auth">确定</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>
    <!-- 新增部门 -->
    <el-dialog :title="digTitle" :visible.sync="department" :before-close="departmentClose" width="30%">
      <div class="input">
        <span
          >部门名称<el-input
            v-model="organizationName"
            style="width: 190px"
            placeholder="请输入部门名称"
          ></el-input
        ></span>
        <br />
        <br />
        <span
          >上级部门<el-cascader
            :key="isResouceShow"
            :options="organizationOptions"
            v-model="parentId"
            :props="{ checkStrictly: true }"
            @change="handleChange"
            clearable
          ></el-cascader
        ></span>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="departmentClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="addSubmit()" class="orangeBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增角色 -->
    <el-dialog :title="roleTitle" :visible.sync="toAdd" width="30%">
      <div class="input">
        <span
          >角色名称<el-input
            v-model="roleName"
            style="width: 190px"
            placeholder="请输入角色名称"
          ></el-input
        ></span>
        <br />
        <br />
        <span
          >上级角色<el-cascader
            :key="isRoleShow"
            :options="roleOptions"
            v-model="roleParentId"
            :props="{ checkStrictly: true }"
            @change="handleChange"
            clearable
          ></el-cascader
        ></span>
      </div>
      <span slot="footer" class="toAdd-footer">
        <el-button @click="toAddClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" class="orangeBtn" @click="addRoleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      organizationName: null,
      parentId: [],
      digTitle: '',
      roleTitle: '',
      editId: null,
      roleId: null,
      department: false, // 新增部门
      isResouceShow: 0,
      isRoleShow: 0,
      toAdd: false, // 新增角色
      drawer: false,
      organizationList: [],
      organizationOptions: [],
      roleOptions: [],
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
        hasSales: false
      },
      menus: []
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
      this.organizationOptions = [] // 级联选择器的选项数据
      this.$api.configure.departmentAll().then((res) => {
        console.log(res)
        res.data &&
          res.data.forEach((element) => {
            let obj = {
              value: element.id,
              label: element.name,
              parent_id: element.parent_id,
              children: []
            }
            if (obj.value === element.id) {
              element.children &&
                element.children.forEach((item) => {
                  let objs = {
                    value: item.id,
                    label: item.name,
                    parent_id: item.parent_id,
                    children: []
                  }
                  obj.children.push(objs)
                  if (objs.value === item.id) {
                    item.children &&
                      item.children.forEach((e) => {
                        let objss = {
                          value: e.id,
                          label: e.name,
                          parent_id: e.parent_id
                        }
                        objs.children.push(objss)
                      })
                  }
                })
            }
            this.organizationList.push(obj)
            console.log(this.organizationList)
          })
      })
      this.$api.configure.departmentAll().then((res) => {
        console.log(res)
        res.data &&
          res.data.forEach((element) => {
            let obj = {
              value: element.id,
              label: element.name,
              children: []
            }
            if (obj.value === element.id) {
              element.children &&
                element.children.forEach((item) => {
                  let objs = {
                    value: item.id,
                    label: item.name
                  }
                  obj.children.push(objs)
                })
            }
            this.organizationOptions.push(obj)
            console.log(this.organizationOptions)
          })
      })
    },
    // 获取角色
    getRoleData () {
      this.roleList = [] // el-tree的数据
      this.roleOptions = [] // 级联选择器的选项数据
      this.$api.configure.positionAll().then((res) => {
        console.log(res)
        res.data &&
          res.data.forEach((element) => {
            let obj = {
              value: element.id,
              label: element.name,
              children: []
            }
            if (obj.value === element.id) {
              element.children &&
                element.children.forEach((item) => {
                  let objs = {
                    value: item.id,
                    label: item.name,
                    children: []
                  }
                  obj.children.push(objs)
                  if (objs.value === item.id) {
                    item.children &&
                      item.children.forEach((e) => {
                        let objss = {
                          value: e.id,
                          label: e.name
                        }
                        objs.children.push(objss)
                      })
                  }
                })
            }
            this.roleList.push(obj)
            console.log(this.roleList)
          })
      })
      this.$api.configure.positionAll().then((res) => {
        console.log(res)
        res.data &&
          res.data.forEach((element) => {
            let obj = {
              value: element.id,
              label: element.name,
              children: []
            }
            if (obj.value === element.id) {
              element.children &&
                element.children.forEach((item) => {
                  let objs = {
                    value: item.id,
                    label: item.name
                  }
                  obj.children.push(objs)
                })
            }
            this.roleOptions.push(obj)
            console.log(this.roleOptions)
          })
      })
    },
    // 新增部门
    addSubmit () {
      if (this.digTitle === '新增部门') {
        let pid
        if (this.parentId.length === 0) {
          pid = 0
        }
        if (this.parentId.length === 1) {
          pid = this.parentId[0]
        }
        if (this.parentId.length === 2) {
          pid = this.parentId[1]
        }
        if (this.parentId.length === 3) {
          pid = this.parentId[2]
        }

        let resData = {
          name: this.organizationName,
          parentId: pid
        }
        this.$api.configure.departmentAdd(resData).then((res) => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.departmentClose()
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.digTitle === '修改部门') {
        let pid
        if (this.parentId.length === 0) {
          pid = 0
        }
        if (this.parentId.length === 1) {
          pid = 0
        }
        if (this.parentId.length === 2) {
          pid = this.parentId[0]
        }
        if (this.parentId.length === 3) {
          pid = this.parentId[1]
        }
        let resData = {
          departmentId: this.editId,
          name: this.organizationName,
          parentId: pid
        }
        this.$api.configure.departmentEdit(resData).then((res) => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.departmentClose()
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    departmentClose () {
      this.department = false
      this.parentId = []
      this.organizationName = null
    },
    toAddClose () {
      this.toAdd = false
      this.roleParentId = []
      this.roleName = null
    },
    // 新增角色
    addRoleSubmit () {
      let pid
      if (this.roleParentId.length === 0) {
        pid = 0
      }
      if (this.roleParentId.length === 1) {
        pid = this.roleParentId[0]
      }
      if (this.roleParentId.length === 2) {
        pid = this.roleParentId[1]
      }
      if (this.roleParentId.length === 3) {
        pid = this.roleParentId[2]
      }

      let resData = {
        name: this.roleName,
        parentId: pid
      }
      this.$api.configure.positionAdd(resData).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.toAddClose()
          this.getRoleData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 修改部门名称
    change (data) {
      this.parentId = []
      console.log(data)
      this.editId = data.value // 编辑ID
      if (data.parent_id === 0) {
        this.parentId = [0]
      } else {
        // this.parentId = [0]
        // this.parentId.push(data.parent_id)
        let pid = data.parent_id
        this.$api.configure.departmentAll().then((res) => {
          console.log(res)
          res.data && res.data.forEach(element => {
            // 第一级
            let first = {
              value: element.id,
              label: element.name,
              parent_id: element.parent_id,
              children: element.children
            }
            first.children && first.children.forEach(item => {
              // 第二级
              let second = {
                value: item.id,
                label: item.name,
                parent_id: item.parent_id,
                children: item.children
              }
              console.log(second)
              if (second.value === pid) {
                console.log(second.parent_id)
                this.parentId.push(second.parent_id)
                this.parentId.push(data.parent_id)
                // 这是选中第三级时
                console.log(this.parentId)
              } else if (pid === second.parent_id) {
                this.parentId = []
                this.parentId.push(first.value)
                console.log(this.parentId)
              }
            })
          })
        })
      }
      console.log(this.parentId)
      this.department = true
      this.digTitle = '修改部门'
      this.organizationName = data.label
    },
    roleChange (data) {
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
      this.formData.positionId = data.value
      this.$api.company.position.getSuth(data.value).then(res => {
        this.formData.hasManage = res.data.has_manage === 1
        this.formData.hasDriver = res.data.has_driver === 1
        this.formData.hasDriver = res.data.has_driver === 1
        this.formData.driver.isManage = res.data.driver.is_manage === 1
        this.formData.hasSales = res.data.has_sales === 1
        res.data.manage.menu_ids.forEach(menuId => {
          this.$refs.menuTree.setChecked(menuId, true)
        })
      })
      this.drawer = true
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
  },
  watch: {
    // 解决级联选择器报错
    organizationOptions: {
      handler (newVal) {
        if (newVal.length === 0) {
          ++this.isResouceShow
        }
      }
    },
    roleOptions: {
      handler (newVal) {
        if (newVal.length === 0) {
          ++this.isRoleShow
        }
      }
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
.drawera {
  width: 820px;
  height: 1080px;
  background-color: #f0f0f0;
}
.drawer {
  width: 770px;
  height: 868px;
  background-color: rgb(255, 255, 255);
  margin: 20px;
}
</style>
