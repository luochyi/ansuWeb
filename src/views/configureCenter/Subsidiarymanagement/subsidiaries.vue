<template>
  <div class="content">
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text" v-if="this.editId===undefined">新建子公司</span>
      <span class="text" v-else>修改子公司</span>
    </el-row>
    <div class="box">
      <!--  标签页 -->
      <el-descriptions class="margin-top" :column="2" direction="vertical">
        <el-descriptions-item label="运单起始号码">
          <el-input
            style="width: 265px"
            v-model="startNo"
            placeholder="请输入"
          ></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="公司名称">
          <el-input
            style="width: 265px"
            v-model="name"
            placeholder="请输入"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="1" direction="vertical">
        <el-descriptions-item label="公司地址" :span="2">
          <!-- 级联选择器 三级联动 -->
          <el-cascader
          filterable
          v-model="countyId"
          :options="provinceOptions"
          @change="handleChange"></el-cascader>
        </el-descriptions-item>
        <el-descriptions-item label="详细地址">
          <el-input
            style="width: 517px"
            type="textarea"
            :rows="2"
            placeholder="请输入"
            v-model="address"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <div class="top" v-show="this.editId===undefined">
        <el-descriptions class="margin-top" :column="2" direction="vertical">
          <el-descriptions-item label="管理员名称">
            <el-input
              style="width: 265px"
              v-model="admin.name"
              placeholder=""
            ></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="管理员手机">
            <el-input
              style="width: 265px"
              v-model="admin.phone"
              placeholder=""
            ></el-input>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="4" direction="vertical">
          <el-descriptions-item label="登陆账号">
            <el-input
              style="width: 265px"
              v-model="admin.username"
              placeholder=""
            ></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="登陆密码">
            <el-input
              style="width: 265px"
              placeholder=""
              v-model="admin.password"
              show-password
            ></el-input>
          </el-descriptions-item>
          <!-- <el-descriptions-item label="确认密码">
            <el-input
              style="width: 265px"
              placeholder=""
              v-model="admin.confirmPassword"
              show-password
            ></el-input>
          </el-descriptions-item> -->
        </el-descriptions>
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
      name: '',
      startNo: '',
      countyId: null,
      address: null,
      admin: {
        name: null,
        phone: null,
        username: null,
        password: null,
        confirmPassword: null
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
      this.name = res.data.name
      this.startNo = res.data.start_no
      this.address = res.data.address
      this.countyId = [res.data.province_id, res.data.city_id, res.data.county_id]
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
        // 给请求参数赋值
        let resData = {
          name: this.name,
          startNo: this.startNo,
          countyId: this.countyId[2],
          address: this.address,
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
      } else {
        let resData = {
          companyId: this.editId,
          name: this.name,
          startNo: this.startNo,
          countyId: this.countyId[2],
          address: this.address
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

<style>
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
  height: 400px;
  margin: 25px;
  background: #ffffff;
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
