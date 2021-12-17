<template>
  <div >
    <el-row :gutter="15">
      <el-form
        class="elForm"
        ref="elForm"
        size="small"
        :model="searchForm"
        label-width="93px"
        label-position="top"
      >
        <el-col :span="4" v-for="item,index in searchForm" :key="index">
          <el-form-item :label="item.label" :prop="item.value">
            <el-input
              v-model="item.value"
              placeholder="请输入"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
                <el-form-item :label="item.label" prop="field104">
                    <el-select v-model="item.label" placeholder="请选择" clearable :style="{width: '100%'}">
                    <el-option v-for="(ele, index) in item.option" :key="index" :label="ele.label"
                        :value="ele.value" :disabled="ele.disabled"></el-option>
                    </el-select>
                </el-form-item>
                </el-col> -->
        <el-col :span="24">
          <el-form-item size="large">
            <el-button class="orangeBtn" @click="search">查询</el-button>
            <el-button class="whiteBtn" @click="resetForm('elForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'commonForm',
  props: {
    searchForm: Array
  },
  data () {
    return {
      elForm: {}
    }
  },
  watch: {},
  methods: {
    resetForm (form) {
    //   this.$refs.elForm.resetFields()
      console.log(1)
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
    text-align: left;
}
</style>
