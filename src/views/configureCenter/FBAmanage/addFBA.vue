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
    <!-- 组件 -->
    <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
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
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle">
      <div slot="footer">
        <button class="btn-orange" @click="addSubmit()">
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
      drawerVrisible: true,
      drawerTitle: 'btbt',
      columns: [
        { prop: 'date', label: '日期', width: '150', align: 'center' },
        {
          prop: 'name',
          label: '姓名',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'address',
          label: '地址',
          align: 'center',
          formatter: this.formatters
        },
        { prop: 'button', label: '链接', align: 'center' }
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
        button: '<a>11</a>'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        button: '<a>11</a>'
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
    // 操作按钮列表
    editTableData (row) {}
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
.btn-orange,
.btn-gray {
    cursor: pointer;
    height: 34px;
    font-size: 14px;
    outline: none;
    border: none;
    color: #ffffff;
    border-radius: 4px;
    transition: 0.2s;
    margin-right: 8px;
    padding: 0 20px;
    i {
        padding-right: 3px;
    }
    &:hover {
        opacity: 0.8;
    }
}
.btn-orange {
    background: #fb4702;
}
.btn-gray {
    background: #c2c2c2;
}
</style>
