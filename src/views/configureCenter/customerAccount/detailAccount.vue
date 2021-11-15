<template>
    <div>
        <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
            <span class='text'>客户详情</span>
        </el-row>
        <el-row>
          <div class="cont">
            <el-descriptions title="客户信息">
                <template slot="extra">
                  <el-button type="primary" @click="editInfo" size="small">修改</el-button>
                </template>
                <el-descriptions-item  label="客户编码">{{detail.code}}</el-descriptions-item>
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
          width="30%"
          :before-close="infoClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="infoShow = false">取 消</el-button>
            <el-button type="primary" @click="infoShow = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 联系人 -->
        <el-dialog
          title="联系人资料修改"
          :visible.sync="contactsShow"
          width="30%"
          :before-close="contactsClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="contactsShow = false">取 消</el-button>
            <el-button type="primary" @click="contactsShow = false">确 定</el-button>
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
      form: {}
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
      this.contactsShow = true
      console.log(data)
      this.contact.id = data.id
      this.contact.name = data.name
      this.contact.phone = data.phone
      this.contact.position = data.position
      this.contact.wechat = data.wechat
      this.contact.qq = data.qq
    },
    infoClose () {},
    contactsClose () {}
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
