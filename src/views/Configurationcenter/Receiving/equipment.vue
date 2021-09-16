<template>
<div id='boxx'>
    <div class="box">
    <!--  top -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>设备列表</span>
      <el-tabs v-model='activeName' type='card'>
        <el-tab-pane label='使用中' name='1'></el-tab-pane>
        <el-tab-pane label='停用' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
     <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='texta'>安速观澜仓设配列表</span>
    </el-row>
    </div>
    <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='8' class='colbox'>
            <el-col :span='7'>
              <span class='text'>设备名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='8' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
          <el-col :span='8' class="left">
          <el-button @click="device" class='orangeBtn long2' icon="el-icon-circle-plus-outline">添加设备</el-button>
        </el-col>
        </el-row>
     </div>
           <div>
        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column  prop="name"  label="设备名称"  width="200"> </el-table-column>
             <el-table-column  prop="connection"  label="设备连接"  width="700"> </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="221">
              <template slot-scoped="scoped">
                <el-button type="text" @click="dialogVisible =true"> 修改名称</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button  type="text" @click="link"> 复制链接 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="equipment = true"> 停用设备 </el-button>
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
              layout='total, sizes, prev, pager, next, jumper'
              :total='150'>
              </el-pagination>
          </div>
        </div>
      </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          name: '王小虎',
          connection: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          connection: '上海市普陀区金沙江路 1517 弄'
        },
        {
          name: '王小虎',
          connection: '上海市普陀区金沙江路 1519 弄'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style>
.text{
    width: 100px;
    margin: 17px;
}
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.texta{

width: 162px;
height: 30px;
font-size: 18px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #FB4702;
margin: 17px;
}

</style>
