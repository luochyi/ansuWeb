<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">组织架构</span>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
      <el-row>
        <el-col :span="6" style="marginRight:10px">
          <span class="sub_title">部门</span><el-button class='whiteBtn'  size="mini" @click="Department= true">新增部门</el-button>
          <el-tree
            :data="orginList"
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
                  style="color:#FF0000"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="6" style="borderLeft:1px solid #D8D8D8;height:600px">
          <span class="sub_title">角色</span><el-button class='whiteBtn' @click="toAdd= true" size="mini">新增角色</el-button>
          <el-tree
            :data="roleList"
            accordion
            node-key="id"
            :expand-on-click-node="false"
            @node-click="handleroleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }" style="marginLeft:20px">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => change(data)">
                  修改名称
                </el-button>
                <el-button type="text" size="mini" @click="() => drawer= true">
                  权限
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                  style="color:#FF0000"
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
      <br>
      <el-row class='searchbox1'>
          <el-col :span='15' class='colbox'>
            <el-col :span='5'>
              <span class='text'>权限配置</span>
            </el-col>
            <el-col :span='10'>
              <el-input v-model='predictionNo' placeholder='请选择'></el-input>
            </el-col>
          </el-col>
          <el-col :span='1' class='colbox'>
            <el-button class='orangeBtn long1'>确定</el-button>
            <el-button @click="status= true" class='whiteBtn'>保存配置 </el-button>
         <el-button @click="status= true" class='whiteBtn'>查看配置 </el-button>
          </el-col>
        </el-row>
    </div>
    </div>
</el-drawer>
    <!-- 新增部门 -->
   <el-dialog title="新建部门" :visible.sync="Department" width="30%">
               <div class="input">
               <span>部门名称<el-input v-model="input" style="width:190px" placeholder="请输入部门名称"></el-input></span>
               <br>
               <br>
               <span>上级部门<el-select v-model="agentName" size="small" placeholder="无上级"></el-select></span>
               </div>
               <span slot="footer" class="Department-footer">
                 <el-button @click="Department = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="Department = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
            <!-- 新增角色 -->
   <el-dialog title="新增角色" :visible.sync="toAdd" width="30%">
               <div class="input">
               <span>角色名称<el-input v-model="input" style="width:190px" placeholder="请输入部门名称"></el-input></span>
               <br>
               <br>
               <span>上级角色<el-select v-model="agentName" size="small" placeholder="无上级"></el-select></span>
               </div>
               <span slot="footer" class="toAdd-footer">
                 <el-button @click="toAdd = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="toAdd = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      agentName: '',
      Department: false, // 新增部门
      toAdd: false, // 新增角色
      drawer: false,
      orginList: [
        {
          label: '司机部',
          children: [
            {
              label: '司机部 1',
              children: [
                {
                  label: '司机部 1-A'
                }
              ]
            }
          ]
        },
        {
          label: '操作部'
        },
        {
          label: '客服部'
        },
        {
          label: '业务部',
          children: [
            {
              label: '业务一部'
            },
            {
              label: '业务二部'
            },
            {
              label: '业务三部'
            }
          ]
        },
        {
          label: '财务部'
        },
        {
          label: '信息部'
        }
      ],
      roleList: [
        {
          label: '司机主管',
          children: [
            {
              label: '司机'
            }
          ]
        },
        {
          label: '业务总监',
          children: [
            {
              label: '业务主管',
              children: [
                {
                  label: '业务员'
                }
              ]
            }
          ]
        }
      ],
      // roleList点击部门后后调用接口获取
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    change () {},
    handleNodeClick (val) {
      console.log(val)
    },
    handleroleNodeClick (val) {},
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  height: 600px;
}
.sub_title{
  margin:20px
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
.drawera{
  width: 820px;
  height: 1080px;
  background-color: #f0f0f0;
}
.drawer{
  width: 770px;
  height: 868px;
  background-color: rgb(255, 255, 255);
  margin: 20px;
}
</style>
