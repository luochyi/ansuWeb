<template>
  <div class="content">
    <div class="adtitile">新建仓库地址</div>
    <div>
        <!-- el-icon-search -->
      <div><el-input class="elipt" size="mini" placeholder="仓库名称"></el-input></div>
      <div><el-input class="elipt" size="mini" placeholder="仓库所属公司"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input></div>
      <div><el-input class="elipt" size="mini" placeholder="仓库负责人"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input></div>
      <div><el-input class="elipt" size="mini" placeholder="负责人手机号" disabled></el-input></div>
      <div><el-input class="elipt" size="mini" placeholder="仓库地址"><i slot="suffix" class="el-input__iconyellow el-icon-location"></i></el-input></div>
      <div><el-input style="width:287px;marginBottom:10px" type="textarea" size="mini" placeholder="详细地址"></el-input></div>
      <div><el-button class="orangeBtn">保 存</el-button>
        <el-button class="whiteBtn">取 消</el-button></div>
    </div>
  </div>
</template>

<script>
export default {}
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
