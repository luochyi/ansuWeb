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
          <span class="sub_title">部门</span><el-button class='whiteBtn'  size="mini" @click="toAdd">新增部门</el-button>
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
          <span class="sub_title">角色</span><el-button class='whiteBtn' @click="toAdd" size="mini">新增角色</el-button>
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
                <el-button type="text" size="mini" @click="() => changeRole(data)">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    changeRole () {},
    toAdd () {},
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
</style>
