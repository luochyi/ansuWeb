<template>
  <div class="content">
    <div class="adtitile">新建仓库地址</div>
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
          :options="regions" class="elipt" size="mini" placeholder="仓库地址"
          v-model="formData.area"
          :props="{ expandTrigger: 'hover' }"
          filterable
      ></el-cascader></div>
      <div><el-input style="width:287px;marginBottom:10px" type="textarea" size="mini" v-model="formData.address" placeholder="详细地址"></el-input></div>
      <div><el-button class="orangeBtn" @click="add">保 存</el-button>
        <el-button class="whiteBtn">取 消</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      regions: [],
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
  },
  methods: {
    principalSelect () {
      this.$api.configure.warehouse.select().then(res => {
        this.principalData = res.data
      })
    },
    add () {
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
