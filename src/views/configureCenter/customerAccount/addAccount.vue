<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span>新建客户账号</span>
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
          <el-col :span="6" class="flex align-center">
            <div class="name">客户名称</div>
            <el-col :span="16">
              <el-input v-model="form.name" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">客户编码</div>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex align-center">
            <div class="name">业务员</div>
            <el-col :span="16">
              <el-select v-model="form.personnelId" placeholder="请输入" >
                 <el-option
                    v-for="item in salesOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">登录账号</div>
            <el-col :span="16">
              <el-input v-model="form.username" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">登录密码</div>
            <el-col :span="16">
              <el-input v-model="form.password" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
           <el-col :span="6" class="flex  align-center">
            <div class="name">确认密码</div>
            <el-col :span="16">
              <el-input v-model="form.confirmPassword" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">营业执照</div>
            <el-col :span="16">
              <el-upload
                class="avatar-uploader"
                :action="`${$baseUrl}/file/upload/image`"
                :headers="uploadhead"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.certificatePhoto" :src="ImgUrl(this.form.certificatePhoto)" class="avatar">
                <i v-else class="el-icon-camera-solid uploadIcon"></i>
                </el-upload>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">公司地址</div>
            <el-col :span="20">
              <el-cascader
                v-model="form.countyId"
                :options="regiondata"
                clearable
                :props="{value: 'value', label: 'label'}"
                @change="handleChange"></el-cascader>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">详细地址</div>
            <el-col :span="20">
              <el-input v-model="form.address" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <!-- 代理联系人资料 -->
      <div class="infoBox">
        <el-row class="box_title left">
          联系资料
        </el-row>
        <el-row class="table">
          <el-table :data="contactsData" border style="width: 100%"  :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名" min-width="150" prop="name">
            </el-table-column>
            <el-table-column label="职位" min-width="150" prop="position">
              <template slot-scope="scope">
                <span>{{scope.row.position===1?'财务':scope.row.position===2?'业务':'发货'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" min-width="150" prop="phone">
            </el-table-column>
            <el-table-column label="微信" min-width="150" prop="wechat">
            </el-table-column>
            <el-table-column label="QQ" min-width="150" prop="qq">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button type="text">修改信息</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span> -->
                <el-button type="text" @click="deleterow(scope.$index, contactsData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="addContactInfo" border style="width: 100%" :show-header="false" v-show="addcontact">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.name" placeholder="请输入姓名"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="职位" min-width="150">
              <template v-slot='scope'>
                <el-select v-model="scope.row.position" placeholder="请选择职位">
                  <el-option
                    v-for="item in positionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.phone" placeholder="请输入联系电话"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="微信" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.wechat" placeholder="请输入微信"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="QQ" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.qq" placeholder="请输入QQ"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button type="text" @click="pushInfo(scope.row)">确认</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="addclose(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="left">
          <el-button class="orangeBtn" @click="addcontact=true">新建联系人</el-button>
          <!-- <el-button class="whiteBtn">批量删除</el-button> -->
        </el-row>
      </div>
      <!-- 代理账期 -->
      <div class="infoBox">
        <el-row class="box_title left">
          客户账期
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">结算账期</div>
            <el-col :span="20" class="left">
              <el-select v-model="form.periodId" placeholder="请选择" >
                <el-option
                  v-for="item in periodOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex align-center">
            <div class="name">客户等级</div>
            <el-col :span="20" class="left">
              <el-select v-model="form.levelId" placeholder="请选择" >
                <el-option
                  v-for="item in levelOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="infoBox">
        <el-row class="box_title left">
          报价设置
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">大货价格</div>
            <el-col :span="20" class="left">
               <el-input placeholder="请输入" v-model="form.bigGoodsAmount" style="width:195px">
                    <template slot="prepend">
                        <el-select v-model="form.bigGoodsType" style="width:80px">
                            <el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </template>
                    <i slot="suffix" class="el-input__icon">元</i>
                </el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex align-center">
            <div class="name">小货价格</div>
            <el-col :span="20" class="left">
               <el-input placeholder="请输入" v-model="form.smallGoodsAmount" style="width:195px">
                    <template slot="prepend">
                        <el-select v-model="form.smallGoodsType" style="width:80px">
                            <el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </template>
                    <i slot="suffix" class="el-input__icon">元</i>
                </el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
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
      uploadhead: {
        'Ansuex-Manage-Token': sessionStorage.getItem('token')
      },
      form: {
        name: '',
        code: '',
        username: '',
        password: '',
        confirmPassword: '',
        personnelId: null, // 业务员id
        certificatePhoto: '',
        countyId: null,
        address: '',
        levelId: null,
        periodId: null,
        bigGoodsType: null,
        bigGoodsAmount: '',
        smallGoodsType: null,
        smallGoodsAmount: '',
        contacts: [
          {
            name: '',
            position: null,
            phone: '',
            wechat: '',
            qq: ''
          }
        ]
      },
      addcontact: false,
      addContactInfo: [
        {
          name: '',
          position: null,
          phone: '',
          wechat: '',
          qq: ''
        }
      ],
      contactsData: [],
      regiondata: [],
      salesOptions: [],
      options1: [
        {
          value: 1,
          label: '增加'
        },
        {
          value: 2,
          label: '减少'
        },
        {
          value: 3,
          label: '乘以'
        }
      ],
      periodOptions: [],
      levelOptions: [],
      positionOptions: [
        {
          value: 1,
          label: '财务'
        },
        {
          value: 2,
          label: '业务'
        },
        {
          value: 3,
          label: '发货'
        }
      ]
    }
  },
  mounted () {
    // 区域筛选
    this.regiondata = this.$store.state.common.regiondata
    // 账期筛选
    this.$api.agent.periodSelect({ keyword: '' }).then(res => {
      this.periodOptions = res.data
    })
    // 等级筛选
    this.$api.configure.customerLevelSelect().then(res => {
      this.levelOptions = res.data
    })
    // 业务员筛选
    this.$api.company.position.salesSelect().then(res => {
      this.salesOptions = res.data
    })
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    back () {
      this.$router.go(-1)
    },
    addSubmit () {
      this.$api.customer.customerAdd({
        name: this.form.name,
        code: this.form.code,
        username: this.form.username,
        password: this.form.password,
        confirmPassword: this.form.confirmPassword,
        certificatePhoto: this.form.certificatePhoto,
        countyId: this.form.countyId[2],
        address: this.form.address,
        levelId: this.form.levelId,
        periodId: this.form.periodId,
        personnelId: this.form.personnelId,
        bigGoodsType: this.form.bigGoodsType,
        bigGoodsAmount: this.form.bigGoodsAmount,
        smallGoodsType: this.form.smallGoodsType,
        smallGoodsAmount: this.form.smallGoodsAmount,
        contacts: this.contactsData
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$router.push({ name: 'customerAccount' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.form.certificatePhoto = res.data.path
    },
    // 上传前的钩子函数，设置上传限制
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      const isJPG = file.type === 'image/png'
      const isPNG = file.type === 'image/jpeg'
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    addclose () {
      this.addcontact = false
      this.addContactInfo = [{
        name: '',
        position: null,
        phone: '',
        wechat: '',
        qq: ''
      }]
    },
    pushInfo (row) {
      this.contactsData.push(row)
      this.addclose()
    },
    deleterow (index, rows) {
      rows.splice(index, 1)
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
.avatar-uploader{
    width: 75px;
    height: 77px;
    line-height: 77px;
    border-radius: 11px;text-align: center;
    background: #F7F7F7;
}
.uploadIcon{
    width: 30px;
    height: 26px;
}
.avatar{
  width: 75px;
    height: 77px;
}
</style>
