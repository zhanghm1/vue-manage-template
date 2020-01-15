<template>
    <div class="header">
        <el-radio-group v-model="isCollapse" @change="collapseChange" class="btn-isCollapse">
            <el-radio-button :label="false">{{$t('lang.MenuStatus.Expand')}}</el-radio-button>
            <el-radio-button :label="true">{{$t('lang.MenuStatus.packup')}}</el-radio-button>
        </el-radio-group>
        <div class="userinfo">
            <span>
                <el-select size="mini"  class="language-select" @change="languageChange"  v-model="selectLanguage" placeholder="请选择">
                    <el-option
                    v-for="item in LanguageList"
                    :key="item.Code"
                    :label="item.Name"
                    :value="item.Code">
                    </el-option>
                </el-select>
            </span>
            <span class="username">{{UserInfo.Name}}</span>
            <span class="loginout" @click="loginOut">
                {{$t('lang.LoginOut')}}
            </span>
        </div>
        
    </div>
</template>

<script>
import bus from '../../common/bus';
import {localStorageCommon} from '../../common/Server';
import {mapState,mapMutations} from 'vuex';
import {GetUserInfo} from '../../requestData/user';
import LanguageList from '../../config/languages';

export default {
    data(){
        return {
            isCollapse:false,
            LanguageList:[],
            selectLanguage:''
            
        }
    },
    computed: {
            ...mapState([
                'UserInfo','UserPermission'
            ]),
    },
    methods:{
        ...mapMutations([
                'SaveUserInfo','StoreLoginOut'
            ]),
        collapseChange(){
            bus.$emit("menuIsCollapse",this.isCollapse);
        },
        loginOut(){
            localStorageCommon.setLoginOutItem();
            this.StoreLoginOut();
            this.$router.push("/login");
        },
        GetInfo(){
            GetUserInfo().then(resp=>{
                if(resp.Code=="SUCCESS"){
                    this.SaveUserInfo(resp.Data);
                }
            }).catch(a=>{
                window.console.error(a);
            });
        },
        
        languageChange(){
            localStorageCommon.setItem("ContentLanguage",this.selectLanguage);
            //window.console.log(this.selectLanguage);
            this.$i18n.locale = this.selectLanguage;
            this.LanguageList =LanguageList[this.selectLanguage];
            bus.$emit('languageChange',this.selectLanguage);
        }

    },
    created(){
        this.collapseChange();
        this.GetInfo();
        this.selectLanguage=this.$i18n.locale;
        this.LanguageList =LanguageList[this.selectLanguage];
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
.language-select{
    width: 100px;
}
</style>