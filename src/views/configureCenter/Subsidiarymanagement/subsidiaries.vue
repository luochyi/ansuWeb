<template>
  <div class="content">
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text" v-if="this.editId===undefined">新建子公司</span>
      <span class="text" v-else>修改子公司</span>
    </el-row>
    <div class="box">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="93px" label-position="top">
          <el-col :span="12">
            <el-form-item label="运单起始号码" prop="startNo">
              <el-input v-model="formData.startNo" placeholder="请输入运单起始号码" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入公司名称" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址" prop="countyId">
              <el-cascader v-model="formData.countyId" :options="provinceOptions"
                :style="{width: '100%'}" placeholder="请选择公司地址" clearable filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详情地址" prop="address">
              <el-input v-model="formData.address" type="textarea" placeholder="请输入详情地址"
                :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="top" v-show="this.editId===undefined">
        <el-row :gutter="15">
          <el-form ref="adminForm" :model="admin" :rules="adminrules" size="small" label-width="93px" label-position="top">
            <el-col :span="12">
              <el-form-item label="管理员姓名" prop="name">
                <el-input v-model="admin.name" placeholder="请输入管理员姓名" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员手机号" prop="phone">
                <el-input v-model="admin.phone" placeholder="请输入管理员手机号" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录账号" prop="username">
                <el-input v-model="admin.username" placeholder="请输入登录账号" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录密码" prop="password">
                <el-input v-model="admin.password" placeholder="请输入登录密码" type="password" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-form>
          <el-form-item size="large">
            <el-button type="primary" @click="submit()" class="orangeBtn long2"
              >确定</el-button
            >
            <el-button class="whiteBtn long2" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      editId: null,
      provinceOptions: [],
      formData: {
        name: '',
        startNo: '',
        countyId: null,
        address: null
      },
      admin: {
        name: null,
        phone: null,
        username: null,
        password: null,
        confirmPassword: null
      },
      rules: {
        startNo: [{
          required: true,
          message: '请输入运单起始号码',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入公司名称',
          trigger: 'blur'
        }],
        countyId: [{
          required: true,
          type: 'array',
          message: '请至少选择一个公司地址',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: '请输入详情地址',
          trigger: 'blur'
        }]
      },
      adminrules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入登录账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  beforeDestory () {
    this.data.clipboard.destroy()
  },
  mounted () {
    this.editId = this.$route.params.id
    this.$api.configure.companyInfo({
      companyId: this.editId
    }).then(res => {
      console.log(res)
      this.formData.name = res.data.name
      this.formData.startNo = res.data.start_no
      this.formData.address = res.data.address
      this.formData.countyId = [res.data.province_id, res.data.city_id, res.data.county_id]
      console.log(this.countyId)
    })
    // 省市区三级联动
    this.$api.common.settingRegionAll().then(res => {
      console.log(res)
      res.data && res.data.forEach(ele => {
        let province = {
          value: ele.id,
          label: ele.name,
          children: []
        }
        if (province.value === ele.id) {
          ele.children && ele.children.forEach(eles => {
            let city = {
              value: eles.id,
              label: eles.name,
              children: []
            }
            if (city.value === eles.id) {
              eles.children && eles.children.forEach(item => {
                let county = {
                  value: item.id,
                  label: item.name
                }
                city.children.push(county)
              })
            }
            province.children.push(city)
          })
          province.children.push()
        }
        province.children.push()
        this.provinceOptions.push(province)
      })
    })
  },
  methods: {
    submit () {
      if (this.editId === undefined) {
        this.$refs.elForm.validate(valid => {
          if (!valid) return
          this.$refs.adminForm.validate(valid => {
            if (!valid) return
            // 给请求参数赋值
            let resData = {
              name: this.formData.name,
              startNo: this.formData.startNo,
              countyId: this.formData.countyId[2],
              address: this.formData.address,
              admin: {
                name: this.admin.name,
                phone: this.admin.phone,
                username: this.admin.username,
                password: this.admin.password,
                confirmPassword: this.admin.confirmPassword
              }
            }
            // 把请求参数传输至后端，并且获取接口返回的结果res
            this.$api.configure.companyAdd(resData).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg) // 成功提示
                this.$router.push({ name: 'Subsidiarymanagement' }) // 添加成功后返回子公司列表
              } else {
                this.$message.error(res.msg) // 错误提示
              }
            })
          })
        })
      } else {
        let resData = {
          companyId: this.editId,
          name: this.formData.name,
          startNo: this.formData.startNo,
          countyId: this.formData.countyId[2],
          address: this.formData.address
        }
        // 把请求参数传输至后端，并且获取接口返回的结果res
        this.$api.configure.companyEdit(resData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg) // 成功提示
            this.$router.push({ name: 'Subsidiarymanagement' }) // 添加成功后返回子公司列表
          } else {
            this.$message.error(res.msg) // 错误提示
          }
        })
      }
    },
    // 生成随机密码
    randomPsw () {
      this.admin.password = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 9))
      this.admin.confirmPassword = this.admin.password
    },
    copy () {
      const clipboard = new Clipboard('#copyBtn')
      clipboard.on('success', (e) => {
        this.$message.success('复制成功！')
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$message.error('复制失败！该浏览器不支持复制！')
        // 释放内存
        clipboard.destroy()
      })
    },
    // 级联选择器选择
    handleChange (val) {
      console.log(val)
      console.log(this.provinceOptions) // 打印级联选择器的options
      // this.countyId = val[2] // 区域id
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-top{
  margin-top: 10px;
}
.text {
  width: 100px;
  font-size: 16px;
  font-weight: 500;
  margin: 17px;
}
.box {
  margin: 25px;
  background: #ffffff;
  width: 50%;
}
#boxx {
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}
.boxa {
  width: 1191px;
  height: 300px;
  border: 1px solid #e9e9e9;
}
.top {
  border-top: 1px solid #e9e9e9;
}
.el-form {
  margin: 10px;
  text-align: left;
}
</style>
