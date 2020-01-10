<template>
  <el-row :gutter="20">
    
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple">
        <el-input v-model="UserName" placeholder="请输入内容"></el-input>
        <el-input v-model="Password" placeholder="请输入密码" show-password></el-input>
        <el-button type="primary" @click="submit()">登陆</el-button>
        <router-link to='/Register'>去注册</router-link>
      </div>
      </el-col>
  </el-row>
</template>

<script>
import {localStorageCommon} from '../common/Server';
import {mapState, mapMutations} from 'vuex';
import {Login} from '../requestData/user';
export default {
  name: 'Login',
  data() {
        return {
            UserName:"admin",
            Password:"Admin123456!"
        };
    },
    computed: {
            ...mapState([
                'UserPermission'
            ]),
    },
  methods:{
    ...mapMutations([
                'SaveUserPermission'
            ]),
    submit:function(){
      Login({
          grant_type:"password",
          client_id:"passwordclient",
          client_secret:"secret",
          username:this.UserName,
          password:this.Password,
          scope:"api1"
        })
      .then(resp=>{
          //window.console.log(resp);
          //登录之后会保存token
          localStorageCommon.setLoginItem(resp);

          
          this.$router.push("/");
          
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
