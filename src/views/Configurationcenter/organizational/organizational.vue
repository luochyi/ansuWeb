<template>
<div id='boxx'>
    <div class="box">
    <!--  top -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>组织架构</span>
    </el-row>
    <div class="left">
       <span class='text'>部门</span>
       <el-button style="color:rgba(251, 71, 2, 1)">新建部门</el-button>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="right">
    </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        label: '司机部 '
      },
      {
        label: '操作部'
      },
      {
        label: '客服部'
      },
      {
        label: '业务部 ',
        children: [{
          label: '业务一部'
        },
        {
          label: '业务二部'
        },
        {
          label: '业务三部'
        }]
      },
      {
        label: '财务部',
        children: [{

        }]
      },
      {
        label: '信息部'
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style>
.left{
  width: 320px;
  height: 840px;
  border-right: 1px solid #E8E8E8;
  margin: 30px;
}
.el-tree{
  margin: 17px 30px;
}

.text{
width: 100px;
font-weight: 500;
color: #333333;
font-size: 16px;
}
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}

</style>
