<template>
    <div class="header">
        <el-radio-group v-model="isCollapse" @change="collapseChange" class="btn-isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <div class="userinfo">
            <span class="username">{{CurrentUser.Name}}</span>
            <span class="loginout" @click="loginOut">
                退出
            </span>
        </div>
        
    </div>
</template>

<script>
import axios from '../../common/Request';
import bus from '../../common/bus';
import {localStorageCommon} from '../../common/Server';
export default {
    data(){
        return {
            isCollapse:false,
            CurrentUser:{
                Id:0,
                UserName:'',
                Name:'',
            }
        }
    },
    methods:{
        collapseChange(){
            bus.$emit("menuIsCollapse",this.isCollapse);
        },
        loginOut(){
            localStorageCommon.setLoginOutItem();
            this.$router.push("/login");
        },
        GetInfo(){
           
            axios.get('/api/user/Info').then(resp=>{
                if(resp.Code=="SUCCESS"){
                    this.CurrentUser.Name=resp.Data.Name;
                    this.CurrentUser.UserName=resp.Data.UserName;
                    this.CurrentUser.Id=resp.Data.Id;

                }
            }).catch(a=>{
                window.console.error(a);
            });
        },

    },
    created(){
        this.collapseChange();
        this.GetInfo();
        
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
}
.btn-isCollapse{
    margin: 15px 0;
    position: absolute;
    left: 20px;
}
.loginout{
   
    cursor: pointer;
}
.loginout :hover{
    color: aqua;
}
.userinfo{
    float: right;
    right: 50px;
    font-size: 14px;
    margin-right: 20px;
    margin-top: 22px;
}
.userinfo .username{
    color: #64b7ff;
}
</style>