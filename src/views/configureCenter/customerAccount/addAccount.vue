<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span>新建客户账号</span>
    </el-row>
    <!-- 内容 -->
    <div class="content">
      <!-- 客户资料 -->
      <div class="infoBox">
        <el-row class="box_title left">
          客户资料
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">客户名称</div>
            <el-col :span="16">
              <el-input v-model="agentName" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">客户编码</div>
            <el-col :span="16">
              <el-input v-model="agentCode" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">登录账号</div>
            <el-col :span="16">
              <el-input v-model="agentName" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex  align-center">
            <div class="name">登录密码</div>
            <el-col :span="16">
              <el-input v-model="agentCode" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">营业执照</div>
            <el-col :span="16">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-camera-solid uploadIcon"></i>
                </el-upload>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">公司地址</div>
            <el-col :span="20">
              <el-cascader
                v-model="companyAddres"
                :options="options"
                clearable
                :props="{value: 'id', label: 'name'}"
                @change="handleChange"></el-cascader>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="12" class="flex align-center">
            <div class="name">详细地址</div>
            <el-col :span="20">
              <el-input v-model="address" placeholder="请输入" ></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <!-- 代理联系人资料 -->
      <div class="infoBox">
        <el-row class="box_title left">
          联系资料
        </el-row>
        <el-row class="table">
          <el-table :data="contactsData" border style="width: 100%" @selection-change="handleSelectionChange"  :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.name" placeholder="请输入姓名"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="职位" min-width="150">
              <template v-slot='scope'>
                <el-select v-model="scope.row.position" placeholder="请选择职位">
                  <el-option
                    v-for="item in positionOpts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.phone" placeholder="请输入联系电话"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="微信" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.wechat" placeholder="请输入微信"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="QQ" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.qq" placeholder="请输入QQ"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button type="text">编辑信息</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="delete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="left">
          <el-button class="orangeBtn">新建联系人</el-button>
          <el-button class="whiteBtn">批量删除</el-button>
        </el-row>
      </div>
      <!-- 收货地址 -->
      <div class="infoBox">
        <el-row class="box_title left">
          收货地址
        </el-row>
        <el-row class="table">
          <el-table :data="receiveAddress" border style="width: 100%" @selection-change="handleSelectionChange2"  :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="仓库负责人" min-width="100">
              <template v-slot='scope'>
                <el-input v-model="scope.row.name" placeholder="请输入姓名"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="负责人电话" min-width="120">
              <template v-slot='scope'>
                <el-input v-model="scope.row.phone" placeholder="请输入负责人电话"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="仓库地址" min-width="150">
              <template v-slot='scope'>
                <el-input v-model="scope.row.address" placeholder="请输入仓库地址"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template v-slot="scope">
                <el-button type="text">编辑地址</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="delete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="left">
          <el-button class="orangeBtn">新建收货地址</el-button>
          <el-button class="whiteBtn">批量删除</el-button>
        </el-row>
      </div>
      <!-- 代理账期 -->
      <div class="infoBox">
        <el-row class="box_title left">
          客户账期
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">结算账期</div>
            <el-col :span="20" class="left">
              <el-select v-model="agentAccount" placeholder="请选择" >
                <el-option
                  v-for="item in accountOpts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex align-center">
            <div class="name">客户等级</div>
            <el-col :span="20" class="left">
              <el-select v-model="agentAccount" placeholder="请选择" >
                <el-option
                  v-for="item in accountOpts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="infoBox">
        <el-row class="box_title left">
          报价设置
        </el-row>
        <!--  -->
        <el-row class="info">
          <el-col :span="6" class="flex align-center">
            <div class="name">大货价格</div>
            <el-col :span="20" class="left">
               <el-input placeholder="请输入" v-model="input1" style="width:195px">
                    <template slot="prepend">
                        <el-select v-model="value1" style="width:80px">
                            <el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </template>
                    <i slot="suffix" class="el-input__icon">元</i>
                </el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="flex align-center">
            <div class="name">小货价格</div>
            <el-col :span="20" class="left">
               <el-input placeholder="请输入" v-model="input1" style="width:195px">
                    <template slot="prepend">
                        <el-select v-model="value1" style="width:80px">
                            <el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </template>
                    <i slot="suffix" class="el-input__icon">元</i>
                </el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: 1,
      options1: [
        {
          value: 1,
          label: '增加'
        },
        {
          value: 2,
          label: '减少'
        },
        {
          value: 3,
          label: '乘以'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  padding: 17px 35px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.content{
  padding: 30px 35px;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 20px;
    .name{
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
    .el-cascader{
      width: 100%;
    }
  }
  .table{
    margin-bottom: 20px;
  }
}
.avatar-uploader{
    width: 75px;
    height: 77px;
    line-height: 77px;
    border-radius: 11px;text-align: center;
    background: #F7F7F7;
}
.uploadIcon{
    width: 30px;
    height: 26px;
}
</style>
