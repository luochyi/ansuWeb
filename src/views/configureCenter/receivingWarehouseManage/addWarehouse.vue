<template>
  <div class="content">
    <div class="adtitile" v-if="this.editId===undefined">新建仓库地址</div>
    <div class="adtitile" v-else>修改仓库地址</div>
    <div>
        <!-- el-icon-search -->
      <div><el-input class="elipt" size="mini" placeholder="仓库名称" v-model="formData.name"></el-input></div>
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
        </div>
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
        if (!this.formData.area || this.formData.area.length === 0) {
          this.$message.error('请选择负责人') // 错误提示
          return
        }
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
  margin-left:-150px;
  margin-bottom: 8px;
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

</style>
