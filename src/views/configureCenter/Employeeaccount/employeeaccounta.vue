
<template>
<div id='boxx'>
   <el-row type='flex' justify='flex-start' class='title' align='middle' >
      <span class='text'>新建员工账号</span>
    </el-row>
  <div class="box">
    <!--  标签页 -->
   <el-descriptions class="margin-top" :column="4" direction="vertical">
   <el-descriptions-item label="员工姓名">
       <el-input style="width: 200px" v-model="input" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="员工手机">
        <el-input style="width: 200px" v-model="inputa" placeholder="请输入"></el-input>
        </el-descriptions-item>
         </el-descriptions>
        <el-descriptions class="margin" :column="4" direction="vertical">
   <el-descriptions-item label="部门" >
    <el-select v-model="departmentOpts" placeholder="请选择">
        <el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
    </el-select>
   </el-descriptions-item>
   <el-descriptions-item label="角色" >
    <el-select v-model="roleOpts" placeholder="请选择">
        <el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
    </el-select>
   </el-descriptions-item>
   <el-descriptions-item label="是否可见下级部门角色数据" >
    <el-radio v-model="radio" label="1" >可见</el-radio>
   <el-radio v-model="radio" label="2">不可见</el-radio>
   </el-descriptions-item>
   </el-descriptions>
         <el-descriptions class="margin-top" :column="4" direction="vertical">
   <el-descriptions-item label="登陆账号" >
       <el-input style="width: 200px" v-model="inputd" placeholder="请输入"></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="登陆密码">
       <el-input style="width: 200px" placeholder="请输入" v-model="inpute" show-password></el-input>
   </el-descriptions-item>
   <el-descriptions-item label="确认密码">
       <el-input style="width: 200px" placeholder="请输入" v-model="inputf" show-password></el-input>
       <el-button class="whiteBtn">生成随机密码</el-button>
   </el-descriptions-item>
   </el-descriptions>
    <el-descriptions class="margin-top" :column="1" direction="vertical">
         <el-descriptions-item label="使用手机端" >
    <el-select v-model="Notused" placeholder="不使用">
        <el-option v-for="item in NotusedOpts" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
    </el-select>
   </el-descriptions-item>
   </el-descriptions>
   <el-form >
    <el-form-item size="large">
    <el-button type="primary" @click="determine" class="orangeBtn long2">确定</el-button>
    <el-button class='whiteBtn long2' style="color:rgba(251, 71, 2, 1)">取消</el-button>
    </el-form-item>
   </el-form>
  </div>
  <!-- 生成随机密码 -->
   <el-dialog title="生成随机密码" :visible.sync="password" width="30%">
               <div class="input" >
               <br><span><i class="el-icon-circle-check"></i>随机密码：LDKDLJ3432</span><br>
               </div>
               <span slot="footer" class="password-footer">
                <el-button  @click="password = false" class='orangeBtn'>复制密码</el-button>
                 <el-button @click="password = false" class='wuBtn'>取 消</el-button>
               </span>
            </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 单选框
      radio: '1',

      password: false, // 生成随机密码

      value: '',
      input: '',
      inputa: '',
      inputb: '',
      inputc: '',
      inputd: '',
      inpute: '',
      inputf: '',
      options: '',
      determine: '',
      // 选择器
      Notused: '', // 使用手机端
      NotusedOpts: [{
        id: '1',
        name: '不使用'
      }, {
        id: '2',
        name: '业务员端'
      }, {
        id: '3',
        name: '司机端'
      }, {
        id: '4',
        name: '司机主管'
      }, {
        id: '5',
        name: '仓库端'
      }
      ],
      methods: {
        determine () {
          console.log('ondetermine!')
        }

      }
    }
  }
}
</script>

<style>
.text{
    width: 100px;
    font-size: 16px;
    font-weight: 500;
    margin: 17px;
}
.box{
  height: 400px;
  margin: 25px;
background: #FFFFFF;
}
#boxx{
width: 1191px;
height: 914px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.boxa{
    width:1191px ;
    height: 300px;
    border: 1px solid #E9E9E9;
}
.top{
  border-top:1px solid #E9E9E9;
}
.el-form{
  margin: 10px;
    text-align: left;
}
</style>
