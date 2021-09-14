<template>
  <div class="content">
    <div class="adtitile">新建FBA仓</div>
    <div>
        <!-- el-icon-search -->
      <div><el-input class="elipt" size="mini" placeholder="FBA仓名称"></el-input></div>
      <div><el-input class="elipt" size="mini" placeholder="FBA仓邮编"></el-input></div>
      <div><el-input style="width:287px;marginBottom:10px" type="textarea" size="mini" placeholder="FBA仓地址"></el-input></div>
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
