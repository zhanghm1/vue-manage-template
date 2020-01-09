<template>
  <el-row :gutter="20">
    
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple">
        <el-input v-model="UserName" placeholder="请输入内容"></el-input>
        <el-input v-model="Password" placeholder="请输入密码" show-password></el-input>
        <el-button type="primary" @click="submit()">登陆</el-button>

        <el-button type="primary" @click="GetInfo()">获取信息</el-button>
        <router-link to='/Register'>去注册</router-link>
      </div>
      </el-col>
  </el-row>
</template>

<script>
import axios from '../common/Request';
import {localStorageCommon} from '../common/Server';
import qs from 'qs';
export default {
  name: 'Login',
  data() {
        return {
            UserName:"admin",
            Password:"Admin123456!"
        };
    },
  methods:{
    submit:function(){
      axios.post('/connect/token',qs.stringify({
          grant_type:"password",
          client_id:"passwordclient",
          client_secret:"secret",
          username:this.UserName,
          password:this.Password,
          scope:"api1"
        }),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(resp=>{
          window.console.log(resp);
          //登录之后会保存token
          localStorageCommon.setLoginItem(resp);
          this.$router.push("/");
          
      }).catch(a=>{
        window.console.log(a);
      });
    },
    GetInfo(){
      Request.get('/api/user/Info').then(resp=>{
          window.console.log(localStorageCommon);
          
        window.console.log(resp);
      }).catch(a=>{
        window.console.log(a);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
