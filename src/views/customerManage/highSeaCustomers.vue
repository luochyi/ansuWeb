<template>
  <div id="msg"  >
    <!-- 写页面的地方，直接使用elementui组件就可以渲染上去 -->
    {{ msg }}
    <el-divider ></el-divider>
      <div>
        <div class="from">
      <!-- 这个是表单组件，只是用于讲解用法，和实际样式不同 -->
       <el-form :inline="true"  :model="formInline" class="demo-form-inline" >
        <el-form-item label="客户名称">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          <el-col :span='15' class='colbox' >
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
          <el-popover
            placement="top"
            width="640"
            height="845"
            v-model="visible">
           <div style="text-align: left; margin: 53 124">
              <el-form-item label="客户名称">
                <el-input  placeholder="请输入内容"></el-input> </el-form-item>
               <el-form-item label="客户地址"> </el-form-item>
           <el-input placeholder="客户地址"></el-input>
           <el-input type="textarea" :rows="2" placeholder="详细地址" v-model="textarea"></el-input>
           <el-button type="primary" size="mini" @click="visible = false" >确定</el-button>
           <el-button size="mini" type="text" @click="visible = false">取消</el-button>
               </div>
           <el-button slot="reference" class='orangeBtn long2'>⊕ 添加客户</el-button>
            </el-popover>
          </el-col>
        </el-form-item>
      </el-form>
        </div>
     <el-tag color="#FEF4E1">批量转入私海</el-tag>
     <el-tag type="success" color="#FEF4E1">批量指派客户</el-tag>
    </div>

    <div>
      <!-- 这个是表格组件，只是用于讲解用法，和实际样式不同 -->
      <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column  prop="name"  label="客户名称"  width="289"> </el-table-column>
    <el-table-column  prop="address"  label="客户地址"  width="707"></el-table-column>
    <el-table-column  fixed="right"  label="操作"  width="169">
      <template slot-scope="open">
        <el-button @click="open" type="text" size="small">转入私海&emsp;|</el-button>
        <el-button type="text" size="small">指派业务</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <div>
      <!-- 分页 -->
      <el-pagination
        background
         layout=" total, sizes, prev, pager, next, jumper"
        :total="150">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false, // 抽屉
      centerDialogVisible: false, // 对话框
      input: '', // 输入框
      // 写数据的地方，用于渲染到页面，可以抽一下午看看vue入门
      msg: '公海客户',
      formInline: {
        user: '',
        region: ''
      },
      popover: {
        name: '',
        region: '',
        type: ''
      },

      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小花',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }

}
</script>

<style>
/* 写样式的地方，可以百度一下elementui怎么更改样式，要使用/deep/给组件改样式*/
.mainbox{
  width: 1191px;
  height: 854px;
  border:red solid 1px;
  /* border-color: white; */
  background-color: white;
  padding: 1rem;
}
</style>
