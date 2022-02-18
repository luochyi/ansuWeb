<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span>新建代理渠道</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
      <!-- 客户资料 -->
      <div class="infoBox">
        <el-row class="box_title left">
          代理渠道信息
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">代理渠道名称</div>
            <el-col :span="16">
              <el-input v-model="agentServiceName" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">渠道分类</div>
            <el-col :span="16">
              <el-select v-model="cate">
                <el-option v-for="item in cateOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">派件类型</div>
            <el-col :span="16">
              <el-select v-model="type">
                <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">是否含燃油费</div>
            <el-col :span="16">
              <el-select v-model="hasFuel">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">是否含税</div>
            <el-col :span="16">
              <el-select v-model="hasTax">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">是否含清关费</div>
            <el-col :span="16">
              <el-select v-model="hasClearanceFee">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
      </div>
       <!-- <div class="infoBox">
        <el-row class="box_title left">
          接收货物
        </el-row>
       </div>
       <div class="infoBox">
        <el-row class="box_title left">
          转单快递
        </el-row>
        <el-row class="box_title left">
           <el-checkbox-group
            v-model="checkedCities"
           >
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
       </div> -->
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
      id: null,
      cate: null,
      type: null,
      hasClearanceFee: null,
      hasTax: null,
      hasFuel: null,
      checkedCities: [],
      options: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      typeOption: [
        {
          value: 1,
          label: '快递'
        },
        {
          value: 2,
          label: '卡派'
        }
      ],
      cateOption: [
        {
          value: 1,
          label: '海运'
        },
        {
          value: 2,
          label: '空运'
        },
        {
          value: 3,
          label: '快递'
        },
        {
          value: 4,
          label: '铁路'
        }, {
          value: 5,
          label: '专车'
        }
      ],
      cities: ['上海', '北京', '广州', '深圳'],
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
      agentServiceName: '',
      agentCode: '', // 代理编码
      companyAddres: [], // 公司地址
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
    // this.getRegion()
    this.periodSelect()
    this.id = Number(sessionStorage.getItem('agentId'))
  },
  methods: {
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
        agentId: this.id,
        name: this.agentServiceName,
        cate: this.cate,
        type: this.type,
        hasFuel: this.hasFuel,
        hasTax: this.hasTax,
        hasClearanceFee: this.hasClearanceFee,
        materialCates: []
      }
      this.$api.agent.agentServiceAdd(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$router.push({ name: 'channelService' })
        } else {
          this.$message.success(res.msg)
        }
      })
    },
    back () {
      this.$router.push({ name: 'channelService' })
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
    margin-bottom: 30px;
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
