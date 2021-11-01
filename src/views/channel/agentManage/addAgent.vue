<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span>新建代理</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
      <!-- 客户资料 -->
      <div class="infoBox">
        <el-row class="box_title left">
          客户资料
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex  align-center">
            <div class="name">代理编码</div>
            <el-col :span="16">
              <el-input v-model="agentCode" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex align-center">
            <div class="name">代理名称</div>
            <el-col :span="16">
              <el-input v-model="agentName" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">公司地址</div>
            <el-col :span="20">
              <el-cascader
                v-model="companyAddres"
                :options="options"
                clearable
                :props="{value: 'id', label: 'name'}"
                @change="handleChange"></el-cascader>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">详细地址</div>
            <el-col :span="20">
              <el-input v-model="address" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <!-- 代理联系人资料 -->
      <div class="infoBox">
        <el-row class="box_title left">
          代理联系人资料
        </el-row>
        <el-row class="table">
          <el-table :data="contactsData" border style="width: 100%" @selection-change="handleSelectionChange"  :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column
      type="selection"
      width="55">
    </el-table-column>
            <el-table-column label="姓名" prop="name" min-width="150"></el-table-column>
            <el-table-column label="职位" prop="type" min-width="150" :formatter="formatter"></el-table-column>
            <el-table-column label="联系电话" prop="phone" min-width="150"></el-table-column>
            <el-table-column label="微信" prop="wechat" min-width="150"></el-table-column>
            <el-table-column label="QQ" prop="qq" min-width="150"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="text">修改信息</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click.native.prevent="deleteRow(scope.$index, contactsData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <!-- 添加 -->
          <el-table :data="addContacts" v-if="contactAdd" border style="width: 100%"  :show-header="false">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="姓名" min-width="150">
              <template slot-scope="scope"><el-input v-model="scope.row.name"></el-input></template>
            </el-table-column>
            <el-table-column label="职位" min-width="150">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type">
                  <el-option v-for="item in positionOpts" :value="item.id" :key="item.id" :label="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" min-width="150">
              <template slot-scope="scope"><el-input v-model="scope.row.phone"></el-input></template>
            </el-table-column>
            <el-table-column label="微信" min-width="150">
              <template slot-scope="scope"><el-input v-model="scope.row.wechat"></el-input></template>
            </el-table-column>
            <el-table-column label="QQ" min-width="150">
              <template slot-scope="scope"><el-input v-model="scope.row.qq"></el-input></template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button @click="addlxr(scope.row)" type="text">确认</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="cancl(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="left">
          <el-button @click="contactAdd=true" class="orangeBtn">新建联系人</el-button>
          <!-- <el-button class="whiteBtn" @click="lotDel()">批量删除</el-button> -->
        </el-row>
      </div>
      <!-- 收货地址 -->
      <div class="infoBox">
        <el-row class="box_title left">
          收货地址
        </el-row>
        <el-row class="table">
          <el-table :data="wareData" border style="width: 100%" @selection-change="handleSelectionChange2"  :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column
      type="selection"
      width="55">
    </el-table-column>
            <el-table-column label="仓库负责人" prop="name" min-width="80"></el-table-column>
            <el-table-column label="负责人电话" prop="phone" min-width="90" ></el-table-column>
            <el-table-column label="地址" prop="address" min-width="300"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="text">修改信息</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click.native.prevent="deleteRowe(scope.$index, wareData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <!-- 添加 -->
          <el-table :data="addWare" v-if="contactWare" border style="width: 100%"  :show-header="false">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="仓库负责人" min-width="70">
              <template slot-scope="scope"><el-input v-model="scope.row.name"></el-input></template>
            </el-table-column>
            <el-table-column label="负责人电话" min-width="90">
              <template slot-scope="scope"><el-input v-model="scope.row.phone"></el-input></template>
            </el-table-column>
            <el-table-column label="地址" min-width="200">
              <template slot-scope="scope"><el-cascader
                v-model="warecountyId"
                :options="options"
                clearable
                :props="{value: 'id', label: 'name'}"
                @change="handleChange"></el-cascader>
                <el-input v-model="scope.row.address" style="width:50%" placeholder="请输入详细地址"></el-input></template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button @click="addWaresubmit(scope.row)" type="text">确认</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="cancl1(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="left">
          <el-button @click="contactWare=true" class="orangeBtn">新建收货地址</el-button>
          <!-- <el-button class="whiteBtn" @click="lotDel()">批量删除</el-button> -->
        </el-row>
      </div>
      <!-- 代理账期 -->
      <div class="infoBox">
        <el-row class="box_title left">
          代理账期
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">结算账期</div>
            <el-col :span="20" class="left">
              <el-select v-model="agentAccount" placeholder="请选择" >
                <el-option
                  v-for="item in accountOpts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <!-- 其他 -->
      <div class="infoBox">
        <el-row class="box_title left">
          代理账期
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-start">
            <div class="name">代理备注</div>
            <el-col :span="20" class="left">
              <el-input v-model="remark" placeholder="请输入" type="textarea" rows="5"></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <!-- 按钮 -->
      <!-- 其他 -->
      <div class="infoBox">
        <el-button @click="addSubmit" class="orangeBtn">确 认</el-button>
        <el-button class="whiteBtn" @click="back">取 消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contactAdd: false,
      contactWare: false,
      index: 0,
      arr: [],
      edit: false,
      warecountyId: null,
      addContacts: [{
        name: '',
        type: '',
        phone: '',
        wechat: '',
        qq: '',
        id: null
      }],
      agentName: '',
      agentCode: '', // 代理编码
      companyAddres: [], // 公司地址
      options: [], // 地址三级联动
      address: '', // 详细地址
      contactsData: [
      ], // 代理联系人资料
      wareData: [],
      addWare: [{
        name: '',
        address: '',
        phone: '',
        countyId: null
      }],
      selectContacts: [], // 选中的代理
      positionOpts: [
        {
          id: 1,
          name: '业务联系人'
        },
        {
          id: 2,
          name: '仓库联系人'
        },
        {
          id: 3,
          name: '财务联系人'
        }
      ], // 职位
      receiveAddress: [
        {
          name: '',
          phone: '',
          address: ''
        }
      ], // 收货地址
      selectAddress: [], // 选中的地址
      agentAccount: '',
      accountOpts: [], // 账期
      remark: '' // 备注
    }
  },
  created () {
    this.getRegion()
    this.periodSelect()
  },
  methods: {
    getRegion () {
      this.$api.common.settingRegionAll().then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.options = res.data
        } else {
          return this.$message({
            message: res.msg,
            customClass: 'message_reject',
            center: true,
            iconClass: 'icons'
          })
        }
      })
    },
    formatter (row, col) {
      switch (row.type) {
        case 1:
          return '业务联系人'
        case 2:
          return '仓库联系人'
        case 3:
          return '财务联系人'
        default:
          break
      }
    },
    delete (row) {
      console.log(row)
    },
    lotDel () {
      this.arr && this.arr.forEach(ele => {
        for (let i = 0; i < this.contactsData.length; i++) {
          if (this.contactsData[i].name === ele.name) {
            // this.contactsData.splice(ele, 1)
            console.log(ele)
          }
        }
      })
    },
    addlxr (data) {
      let obj = {
        name: data.name,
        type: data.type,
        phone: data.phone,
        wechat: data.wechat,
        qq: data.qq,
        index: this.index
      }
      console.log(obj)
      this.contactsData.push(obj)
      this.addContacts = [{
        index: '',
        name: '',
        type: '',
        phone: '',
        wechat: '',
        qq: ''
      }]
      this.index += 1
      this.contactAdd = false
    },
    addWaresubmit (data) {
      console.log(data)
      let obj = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        countyId: this.warecountyId[2]
      }
      console.log(obj)
      this.wareData.push(obj)
      this.index += 1
      this.cancl1()
    },
    cancl () {
      this.addContacts = [{
        name: '',
        type: '',
        phone: '',
        wechat: '',
        qq: '',
        index: this.index
      }]
      this.contactAdd = false
    },
    cancl1 () {
      this.addWare = [{
        name: '',
        address: '',
        phone: '',
        countyId: null
      }]
      this.contactWare = false
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    deleteRowe (index, rows) {
      rows.splice(index, 1)
    },
    periodSelect () {
      this.$api.agent.periodSelect({ keyword: '' }).then(res => {
        this.accountOpts = res.data
      })
    },
    handleChange (val) {
      console.log(val)
    },
    // 联系人选择
    handleSelectionChange (val) {
      console.log(val)
      console.log(this.contactsData)
      this.selectContacts = val
      this.arr = []
      console.log(this.selectContacts)
      this.selectContacts && this.selectContacts.forEach(ele => {
        for (let i = 0; i < this.contactsData.length; i++) {
          if (ele.index === this.contactsData[i].index) {
            let obj = {
              index: ele.index,
              name: ele.name
            }
            this.arr.push(obj)
          }
        }
      })
      // val && val.forEach((item) => {
      //   this.selectContacts.push(item)
      // })
      // console.log(this.selectContacts)
      // this.selectContacts.forEach(item => {
      //
      // })
      console.log(this.arr)
    },
    // 收货地址选择
    handleSelectionChange2 (val) {
      this.selectContacts = []
      val && val.forEach((item) => {
        this.selectContacts.push(item)
      })
    },
    addSubmit () {
      let params = {
        name: this.agentName,
        code: this.agentCode,
        countyId: this.companyAddres[2],
        address: this.address,
        periodId: this.agentAccount,
        remark: this.remark,
        contacts: this.contactsData,
        agentAddresses: this.wareData
      }
      this.$api.agent.agentAdd(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$router.push({ name: 'agentManage' })
        } else {
          this.$message.success(res.msg)
        }
      })
    },
    back () {
      this.$router.push({ name: 'agentManage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  padding: 17px 35px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.content{
  padding: 30px 35px;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 20px;
    .name{
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
    .el-cascader{
      width: 100%;
    }
  }
  .table{
    margin-bottom: 20px;
  }
}
</style>
