<template>
<div id='boxx'>
    <div class="box">
    <!--  top -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>操作员负责仓库</span>
    </el-row>
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>仓库操作：黄旭东</span>
      <span class='text'>职位：操作员</span>
    </el-row>
     <el-descriptions class="margin-top" :column="2" direction="vertical">
      <el-descriptions-item label="公司地址" :span="6">
    <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
  </el-descriptions-item>
  </el-descriptions>
<el-form>
    <el-form-item size="large">
    <el-button type="primary" @click="determine" class="orangeBtn">确定</el-button>
    <el-button class='wuBtn'>取消</el-button>
  </el-form-item>
  </el-form>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      determine: '',
      methods: {

      }
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    margin: 17px;
}
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.boxa{
height: 500px;
}

</style>
