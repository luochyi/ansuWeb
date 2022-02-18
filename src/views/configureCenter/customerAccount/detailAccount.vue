<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
            <span class='text'>客户详情</span>
        </el-row>
        <el-row>
          <div class="cont">
            <el-descriptions title="客户信息">
                <template slot="extra">
                  <!-- <el-button type="primary" @click="editInfo" size="small">修改</el-button> -->
                </template>
                <el-descriptions-item  label="客户简称">{{detail.code}}</el-descriptions-item>
                <el-descriptions-item  label="客户名称">{{detail.name}}</el-descriptions-item>
                <el-descriptions-item  label="登录账号">{{detail.username}}</el-descriptions-item>
                <el-descriptions-item  label="地址">{{detail.full_address}}</el-descriptions-item>
                <el-descriptions-item  label="账期">{{detail.period_name}}</el-descriptions-item>
                <el-descriptions-item  label="等级">{{detail.level_name}}</el-descriptions-item>
                <el-descriptions-item  label="业务员名称">{{detail.personnel_name}}</el-descriptions-item>
                <el-descriptions-item  label="大货类型">{{detail.big_goods_type===1?'增加':detail.big_goods_type===2?'减少':'乘以'}}</el-descriptions-item>
                <el-descriptions-item  label="大货金额">{{detail.big_goods_amount}}</el-descriptions-item>
                <el-descriptions-item  label="小货类型">{{detail.small_goods_type===1?'增加':detail.small_goods_type===2?'减少':'乘以'}}</el-descriptions-item>
                <el-descriptions-item  label="小货金额">{{detail.small_goods_amount}}</el-descriptions-item>
            </el-descriptions>
            <div style='text-align:left'>
              <div>
                营业执照
              </div>
                    <img :src="ImgUrl(detail.certificate_photo)" style='width:300px;height:200px' alt=""></div>
            <el-descriptions title="联系人资料" :column="1">
                 <!-- <template slot="extra">
                  <el-button type="primary" @click="editContacts" size="small">修改</el-button>
                </template> -->
            </el-descriptions>
            <div style="text-align:left">
              <el-button class="orangeBtn" @click="editContact" style="margin-bottom:10px;">新增联系人</el-button>
            </div>
            <el-table :data="contacts"  border  tooltip-effect="dark" :header-cell-style="{background: '#F5F5F6'}">
                      <el-table-column prop='name' label='联系人姓名'></el-table-column>
                      <el-table-column prop='position' label='职位'>
                        <template slot-scope="scope">
                          {{scope.row.position===1?'财务':scope.row.position===2?'业务':'发货'}}
                        </template>
                      </el-table-column>
                      <el-table-column prop='phone' label='手机号'></el-table-column>
                      <el-table-column prop='wechat' label='微信'></el-table-column>
                      <el-table-column prop='qq' label='qq'></el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                          <el-button type="text" @click="editContact(scope.row)" size="small">编辑</el-button>
                          <el-button type="text" @click="delContact(scope.row)" size="small">删除</el-button>
                        </template>
                      </el-table-column>
            </el-table>
            <el-button class="orangeBtn" @click="goBack" style="margin-top:20px">返 回</el-button>
          </div>
        </el-row>
        <!-- 修改信息-->
         <el-dialog
          title="基本信息修改"
          :visible.sync="infoShow"
          width="50%"
          :before-close="infoClose">
          <div style='margin:13px;text-align:left'>
            <el-form ref="baseForm" :model="infoForm" :rules="inforules" size="medium" label-width="100px"
              label-position="top">
              <el-col :span="12">
                <el-form-item label="客户简称" prop="code">
                  <el-input v-model="infoForm.code" placeholder="请输入客户简称"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入客户姓名"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入客户姓名"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入客户姓名"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入客户姓名"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入客户姓名"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="name">
                  <el-input v-model="infoForm.name" placeholder="请输入客户姓名"
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="infoShow = false">取 消</el-button>
            <el-button type="primary" @click="infoShow = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 联系人 -->
        <el-dialog
          :title="contactsTitle"
          :visible.sync="contactsShow"
          width="50%"
          :before-close="contactsClose">
          <div style='margin:13px;text-align:left;height:300px'>
            <el-form ref="contForm" :model="contactsForm" :rules="contactsFormrules" size="medium" label-width="100px"
              label-position="top">
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="contactsForm.name" placeholder="请输入姓名" show-word-limit clearable
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职位" prop="position">
                  <el-select v-model="contactsForm.position" placeholder="请选择职位"
                    :style="{width: '80%'}">
                    <el-option v-for="item in contactOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="contactsForm.phone" placeholder="请输入手机号" show-word-limit clearable
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="微信" prop="wechat">
                  <el-input v-model="contactsForm.wechat" placeholder="请输入微信" show-word-limit clearable
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="qq" prop="qq">
                  <el-input v-model="contactsForm.qq" placeholder="请输入qq" show-word-limit clearable
                    :style="{width: '80%'}"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="contactsClose">取 消</el-button>
            <el-button type="primary" @click="editContactSubmit()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      infoShow: false,
      contactsShow: false,
      id: null,
      detail: { name: '' },
      contacts: [],
      contactsTitle: '',
      contactsForm: {
        customerId: null,
        contactId: null,
        name: '',
        position: 0,
        phone: '',
        wechat: '',
        qq: ''
      },
      contactOptions: [
        {
          value: 1, label: '财务'
        },
        {
          value: 2, label: '业务'
        },
        {
          value: 3, label: '发货'
        }
      ],
      infoForm: {
        customerId: null,
        name: null,
        code: null,
        certificatePhoto: null,
        countyId: null,
        address: null,
        levelId: null,
        periodId: null,
        personnelId: null,
        bigGoodsType: null,
        bigGoodsAmount: null,
        smallGoodsType: null,
        smallGoodsAmount: null
      },
      contactsFormrules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        position: [{
          required: true,
          message: '请选择职位',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      inforules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id === undefined || this.id === null) {
      this.goBack()
    }
    this.getData()
  },
  methods: {
    getData () {
      this.$api.customer.info({ customerId: this.id }).then(res => {
        this.detail = res.data
        this.contacts = res.data.contacts
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    editInfo () {
      this.infoShow = true
    },
    editContact (data) {
      if (data.id === undefined) {
        this.contactsTitle = '新增联系人'
      } else {
        this.contactsTitle = '修改联系人'
      }
      this.contactsShow = true
      // console.log(data)
      this.contactsForm.customerId = this.id
      this.contactsForm.contactId = data.id
      this.contactsForm.name = data.name
      this.contactsForm.phone = data.phone
      this.contactsForm.position = data.position
      this.contactsForm.wechat = data.wechat
      this.contactsForm.qq = data.qq
    },
    editContactSubmit () {
      this.$refs.contForm.validate(valid => {
        if (!valid) return
        if (this.contactsForm.contactId != null) {
          // TODO 提交表单
          this.$api.customer.contactEdit({
            customerId: this.id,
            contactId: this.contactsForm.contactId,
            name: this.contactsForm.name,
            position: Number(this.contactsForm.position),
            phone: this.contactsForm.phone,
            wechat: this.contactsForm.wechat,
            qq: this.contactsForm.qq
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
              this.contactsClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$api.customer.contactAdd({
            customerId: this.id,
            contactId: this.contactsForm.contactId,
            name: this.contactsForm.name,
            position: Number(this.contactsForm.position),
            phone: this.contactsForm.phone,
            wechat: this.contactsForm.wechat,
            qq: this.contactsForm.qq
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
              this.contactsClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    infoClose () {},
    contactsClose () {
      this.$refs.contForm.resetFields()
      this.contactsShow = false
    },
    delContact (data) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.customer.contactDelete({
          customerId: this.id,
          contactId: data.id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cont{
  background: #ffffff;
  // padding-top: 20px;
  // padding-left: 40px;
  // padding-right: 20px;
  padding: 20px 20px 40px 40px;
}
.yes{
    margin-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.line{
    background:#E9E9E9;
    height: 1px;
    margin:16px 0;
}
/deep/ .item-box .el-input__inner{
    border:0;
}
.item-box{
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    // width:36%
}
.item{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}
.desDia{
  text-align: left;
  padding-left: 20px;
}
.appwrapper{
  height: 100px;
  padding-bottom: 100px;
}
</style>
