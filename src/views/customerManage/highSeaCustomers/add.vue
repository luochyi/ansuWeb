<template>
<div id="boxx">
<div id="box">
  <div class="add">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px"
          label-position="top">
          <el-col :span="24">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入客户名称" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户联系人" prop="liaison">
              <el-input v-model="formData.liaison" placeholder="请输入客户联系人" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户联系电话" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入客户联系电话" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户地址" prop="countyId">
              <el-cascader v-model="formData.countyId" :options="provinceOptions" :props="countyIdProps"
                :style="{width: '100%'}" placeholder="请选择客户地址" clearable filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="formData.address" type="textarea" placeholder="请输入详细地址"
                :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-button @click="submit" class='orangeBtn long1'>确 定</el-button>
      <el-button @click="cancl" class='wuBtn long1'>取 消</el-button>
  </div>
</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      provinceOptions: [],
      dialogVisible: false,
      add: '',
      formData: {
        name: null,
        liaison: '',
        phone: '',
        address: null,
        countyId: null
      },
      rules: {
        name: [{
          required: true,
          message: '请输入客户名称',
          trigger: 'blur'
        }],
        liaison: [{
          required: true,
          message: '请输入客户联系人',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入客户联系电话',
          trigger: 'blur'
        }],
        countyId: [{
          required: true,
          type: 'array',
          message: '请至少选择一个客户地址',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.elForm.validate(valid => {
        if (!valid) {
          return
        }
        // 给请求参数赋值
        let resData = {
          countyId: this.formData.countyId[2],
          name: this.formData.name,
          liaison: this.formData.liaison,
          phone: this.formData.phone,
          address: this.formData.address
        }
        // 把请求参数传输至后端，并且获取接口返回的结果res
        this.$api.customer.publicAdd(resData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg) // 成功提示
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg) // 错误提示
          }
        })
      })
    },
    // 级联选择器选择
    handleChange (val) {
      console.log(val)
      console.log(this.provinceOptions) // 打印级联选择器的options
      this.formData.countyId = val[2] // 区域id
    },
    cancl () {
      this.$router.go(-1)
    }
  },
  mounted () {
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
  }
}
</script>

<style lang="scss" scoped>
/* 写样式的地方，可以百度一下elementui怎么更改样式，要使用/deep/给组件改样式*/
#boxx{
width: 1440px;
height: 1080px;
background: rgb(241, 241, 241);
}
#box{
width: 740px;
height: 845px;
background: #FFFFFF;
border-radius: 10px 11px 10px 10px;
margin: 53px 300px ;
border: 1px solid #E8E8E8;
}
.add{
  width: 392px;
  margin: 53px 124px ;
  text-align: left;
}
.el-input__inner{
  width: 390px;
}
.el-textarea__inner{
   width: 390px;
}
.el-descriptions {
  font-size: 16px;
  color: #303133;
  line-height: 22px;
}
</style>
