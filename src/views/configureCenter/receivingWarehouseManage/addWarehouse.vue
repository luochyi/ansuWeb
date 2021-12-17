<template>
  <div class="content">
    <div class="adtitile" v-if="this.editId===undefined">新建仓库地址</div>
    <div class="adtitile" v-else>修改仓库地址</div>
    <div style="text-align:left">
      <!-- <div><el-input class="elipt" size="mini" placeholder="仓库名称" v-model="formData.name"></el-input></div>
      <div><el-select v-model="formData.principalId" filterable class="elipt" size="mini" placeholder="仓库负责人">
        <el-option
            v-for="item in principalData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select></div>
      <div><el-cascader
          filterable
          :options="regions" class="elipt" size="mini" placeholder="仓库地址"
          v-model="formData.area"
          :props="{ expandTrigger: 'hover' }"
      ></el-cascader></div>
      <div><el-input style="width:287px;marginBottom:10px" type="textarea" size="mini" v-model="formData.address" placeholder="详细地址"></el-input></div>
      <div><el-button class="orangeBtn" @click="add">保 存</el-button>
        <el-button class="whiteBtn" @click="back">取 消</el-button>
        </div> -->
        <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="93px" label-position="top">
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入仓库名称" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="仓库负责人" prop="principalId">
            <el-select v-model="formData.principalId" placeholder="请选择仓库负责人" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in principalData" :key="index" :label="item.name"
                :value="item.id" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="仓库地址" prop="area">
            <el-cascader v-model="formData.area" :options="regions" :props="{ expandTrigger: 'hover' }" :style="{width: '100%'}"
              placeholder="请选择仓库地址" clearable filterable></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="formData.address" type="textarea" placeholder="请输入详细地址"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button class="orangeBtn" @click="add">保 存</el-button>
        <el-button class="whiteBtn" @click="back">取 消</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      regions: [],
      editId: null,
      principalData: [],
      formData: {
        name: '',
        principalId: '',
        address: '',
        area: []
      },
      rules: {
        name: [{
          required: true,
          message: '请输入仓库名称',
          trigger: 'blur'
        }],
        principalId: [{
          required: true,
          message: '请选择仓库负责人',
          trigger: 'change'
        }],
        area: [{
          required: true,
          type: 'array',
          message: '请至少选择一个仓库地址',
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
  mounted () {
    this.regions = this.$store.state.common.regiondata
    this.principalSelect()
    this.editId = this.$route.params.id
    console.log(this.editId)
    if (this.editId !== null) {
      this.$api.setting.warehouse.warehouseInfo({
        warehouseId: this.editId
      }).then(res => {
        console.log(res)
        this.formData.name = res.data.name
        this.formData.principalId = res.data.principal_id
        this.formData.address = res.data.address
        this.formData.area = [res.data.province_id, res.data.city_id, res.data.county_id]
      })
    }
  },
  methods: {
    principalSelect () {
      this.$api.configure.warehouse.select().then(res => {
        this.principalData = res.data
      })
    },
    add () {
      if (this.editId === undefined) {
        this.$refs.elForm.validate(valid => {
          if (!valid) return
          this.$api.setting.warehouse.add({
            name: this.formData.name,
            principalId: Number(this.formData.principalId),
            address: this.formData.address,
            countyId: Number(this.formData.area.slice(-1))
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg) // 成功提示
              this.$router.push({ name: 'receivingWarehouseManage' }) // 添加成功后返回列表
            } else {
              this.$message.error(res.msg) // 错误提示
            }
          })
        })
      } else {
        if (!this.formData.area || this.formData.area.length === 0) {
          this.$message.error('请选择负责人') // 错误提示
          return
        }
        this.$api.setting.warehouse.edit({
          warehouseId: this.editId,
          name: this.formData.name,
          principalId: Number(this.formData.principalId),
          address: this.formData.address,
          countyId: Number(this.formData.area.slice(-1))
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg) // 成功提示
            this.$router.push({ name: 'receivingWarehouseManage' }) // 添加成功后返回列表
          } else {
            this.$message.error(res.msg) // 错误提示
          }
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.adtitile {
  color: #000000a6;
  font-weight: 500;
  font-size: 18px;
  // margin-left:-150px;
  // margin-bottom: 8px;
}
.elipt {
  width: 287px;
  height: 40px;
  margin: 3px;
  line-height: 40px;
}
.el-input__iconyellow{
    color:#FFBD32FF;
}
.content{
  width: 500px;
margin: auto;
}
</style>
