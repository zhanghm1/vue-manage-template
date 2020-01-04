<template>
  <div class="Login">
    <el-input v-model="UserName" placeholder="请输入内容"></el-input>
    <el-input v-model="Password" placeholder="请输入密码" show-password></el-input>
    <el-button type="primary" @click="Register()">注册</el-button>
     
  </div>
</template>

<script>
import Request from '../common/Request';
export default {
  name: 'Login',
  data() {
        return {
            UserName:"zhanghm01",
            Password:"Admin123456!"
        };
    },
  methods:{
    Register:function(){
      Request.post('/api/user/Register',
        {
          UserName:this.UserName,
          Password:this.Password
        }).then(resp=>{
          if(resp.Code=="SUCCESS"){
            this.$alert("注册成功");
          }else{
            this.$alert("注册失败");
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
