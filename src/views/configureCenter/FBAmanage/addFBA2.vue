<template>
  <div class="content">
    <div class="adtitile">新建FBA仓</div>
    <div>
      <!-- el-icon-search -->
      <div>
        <el-input class="elipt" size="mini" placeholder="FBA仓名称"></el-input>
      </div>
      <div>
        <el-input class="elipt" size="mini" placeholder="FBA仓邮编"></el-input>
      </div>
      <div>
        <el-input
          style="width: 287px; marginbottom: 10px"
          type="textarea"
          size="mini"
          placeholder="FBA仓地址"
        ></el-input>
      </div>
      <div>
        <el-button class="orangeBtn">保 存</el-button>
        <el-button class="whiteBtn">取 消</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
        <!-- slot -->
      <template v-slot:chakan='slotData'>
         {{slotData.data.info}}<span style="color:#0084FF;cursor:pointer" @click="check(slotData)">查看</span>
      </template>
      <!-- 操作 -->
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="150"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-button
            class="edit-bgc"
            icon="el-icon-edit"
            @click="editTableData(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </commonTable>
    <!-- 抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle">
      <div class="dra-content">
        <!-- 内容区域 -->
        <button>1</button>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="addClose">
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawerVrisible: true, // 控制抽屉显示隐藏
      drawerTitle: 'biaoti', // 抽屉标题
      columns: [
        { prop: 'date', label: '日期', width: '150', align: 'center' },
        {
          prop: 'name',
          label: '姓名',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        { prop: 'info', label: '人员信息', width: '150', align: 'center', type: 'slot', slotName: 'chakan' },
        {
          prop: 'address',
          label: '地址',
          align: 'center',
          formatter: this.formatters
        }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 1,
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    this.tableData = [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        info: 'xiaohu'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        info: 'xiaohu'
      }
    ]
    this.page.total = 2
  },
  methods: {
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
    },
    formatters (row, column, cellValue) {
      return row.address + '测试'
    },
    // 改变页面大小处理
    handleSizeChange (val) {},
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        {
          date: '2016-05-03',
          name: '王小虎111',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    },
    // 查看
    check (val) {
      console.log(val.data)
    },
    // 操作按钮列表
    editTableData (row) {},
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.adtitile {
  color: #000000a6;
  font-weight: 500;
  font-size: 18px;
  margin-left: -150px;
  margin-bottom: 8px;
}
.elipt {
  width: 287px;
  height: 40px;
  margin: 3px;
  line-height: 40px;
}
.el-input__iconyellow {
  color: #ffbd32ff;
}

</style>
