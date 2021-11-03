<template>
<div id="boxx">
<div id="box">
  <div class="add">
       <el-descriptions class="margin-top" :column="1" direction="vertical">
         <el-descriptions-item label="客户名称" :span="2">
           <el-input v-model="name" placeholder="请输入客户名称"></el-input>
         </el-descriptions-item>
         <el-descriptions-item label="客户联系人" :span="2">
           <el-input v-model="liaison" placeholder="请输入客户名称"></el-input>
         </el-descriptions-item>
         <el-descriptions-item label="客户联系电话" :span="2">
           <el-input v-model="phone" placeholder="请输入客户名称"></el-input>
         </el-descriptions-item>
        <el-descriptions-item label="客户地址" :span="2">
          <!-- 级联选择器 三级联动 -->
          <el-cascader
           :span="12"
          v-model="countyId"
          :options="provinceOptions"
          placeholder="客户地址"
          @change="handleChange"></el-cascader>
        </el-descriptions-item>
        <el-descriptions-item label="详细地址">
          <el-input
            style="width: 517px"
            type="textarea"
            :rows="2"
            :column="8"
            placeholder="请输入"
            v-model="address"
          ></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <el-button @click="submit" class='orangeBtn long1'>确 定</el-button>
      <el-button @click="Cancel" class='wuBtn long1'>取 消</el-button>
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
      name: null,
      liaison: '',
      phone: '',
      address: null,
      countyId: null

    }
  },
  methods: {
    submit () {
      // 给请求参数赋值
      let resData = {
        countyId: this.countyId,
        name: this.name,
        liaison: this.liaison,
        phone: this.phone,
        address: this.address
      }
      // 把请求参数传输至后端，并且获取接口返回的结果res
      this.$api.customer.privateAdd(resData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'privateSea' }) // 添加成功后返回私海客户
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    // 级联选择器选择
    handleChange (val) {
      console.log(val)
      console.log(this.provinceOptions) // 打印级联选择器的options
      this.countyId = val[2] // 区域id
    },
    Cancel () {
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
.text{
margin-top: 20px;
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
