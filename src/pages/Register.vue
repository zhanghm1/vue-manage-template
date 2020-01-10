<template>
  <div class="Login">
    <el-input v-model="Name" placeholder="请输入名称"></el-input>
    <el-input v-model="UserName" placeholder="请输入用户名"></el-input>
    <el-input v-model="Password" placeholder="请输入密码" show-password></el-input>
    <el-button type="primary" @click="Onsubmit()">注册</el-button>
     
  </div>
</template>

<script>
import {Register} from '../requestData/user';
export default {
  name: 'Login',
  data() {
        return {
            UserName:"zhanghm01",
            Password:"Admin123456!",
            Name:"zhm"
        };
    },
  methods:{
    Onsubmit:function(){
      Register({
          UserName:this.UserName,
          Password:this.Password,
          Name:this.Name
        }).then(resp=>{
          if(resp.Code=="SUCCESS"){
            this.$router.push('/');
            //this.$alert(resp.Message);
          }else{
            this.$alert(resp.Message);
          }
          
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
