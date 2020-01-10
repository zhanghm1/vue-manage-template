<template>
    <div class="left-menu">
        <el-menu
        class="el-menu-vertical-demo" 
        :default-active="onRoutes"
        :class="{'el-menu-collapse':isCollapse}" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#324157"
        text-color="#fff"
        unique-opened
        router
        >
            <template  v-for="item in menus">
                <template v-if="item.Childs && item.IsMenu && item.IsPremission && item.Childs.length>0">
                    <el-submenu :index="item.link" :key="item.Id">
                        <template slot="title">
                            <div  >
                            <i class="el-icon-location"></i>
                            <span class="el-submenu_title" slot="title">{{item.Name}}</span>
                            </div>
                        </template>
                        <template  v-for="itemchild in item.Childs" >
                            <el-menu-item  class="el-submenu_title-dateil" 
                            :data-index="itemchild.link"
                            :index="itemchild.link" 
                            :key="itemchild.Id" 
                            v-if="itemchild.IsMenu && itemchild.IsPremission" 
                            >
                            {{itemchild.Name}}
                            </el-menu-item>
                        </template>
                        
                    </el-submenu>
                </template>
                <template  v-else>
                    <el-menu-item class="el-submenu_title" v-if="item.IsMenu && item.IsPremission"  :index="item.link" :key="item.Id">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{ item.Name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>

import bus from '../../common/bus';
import Menus from '../../config/menus/menus';
import {mapState,mapMutations} from 'vuex'
import {GetUserPermissions} from '../../requestData/user';
export default {
    data() {
      return {
        isCollapse: false,
        menus:[],
        tabsItem:"",

      };
    },
    computed: {
            ...mapState([
                'UserPermission'
            ]),
            onRoutes() {
            return this.$route.path;
        }
    },
    methods:{
            ...mapMutations([
                'SaveUserPermission'
            ]),
        handleOpen(key, keyPath) {

            window.console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            window.console.log(key, keyPath);
        },
        GetPermissions(){
            GetUserPermissions().then(resp=>{
                if(resp.Code=="SUCCESS"){
                    // 保存到store
                    this.SaveUserPermission(resp.Data);
                    //window.console.log('leftmenu_',this.UserPermission);
                    this.UpdatePremission(this.menus,this.UserPermission)
                }
            }).catch(a=>{
                window.console.error(a);
            });
        },
        // 根据权限匹配导航栏
        UpdatePremission(menus,userPremission){
            if(userPremission==null||userPremission==undefined||userPremission.length==0){
                return;
            }
            menus.forEach(a=>{
                let premissions = userPremission.filter(p=>p.Code==a.Code);
                if(!a.needPremission){
                    a.IsPremission=true;
                }else{
                    if(premissions.length>0 ){
                        a.IsPremission=true;
                        if(!a.Childs){
                            return;
                        }
                        this.UpdatePremission(a.Childs,premissions[0].Childs);
                    }else{
                        return;
                    }
                }
            });
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('menuIsCollapse', msg => {
            window.console.log('menuIsCollapse',msg);
            this.isCollapse = msg;
        });
        // 切换菜单文字的语言
        bus.$on('languageChange', msg => {
            window.console.log('languageChange',msg);
            this.menus = Menus[msg];
            this.GetPermissions();
        });
        
        let ContentLanguage = this.$i18n.locale;
        this.menus = Menus[ContentLanguage];

        this.GetPermissions();
        
       
    }
  }
</script>

<style scoped>
.el-menu-vertical-demo {
    min-height: 400px;
    width: 70px;
    background-color: rgb(50, 65, 87);
  }
.el-submenu_title{color: #fff;}
    .el-menu-vertical-demo:not(.el-menu-collapse) {
    min-height: 400px;
    width: 250px;
    
  }
.el-menu-item.is-active{
    color: #ffffff;
    background-color: rgb(3, 104, 154) !important;
  }
 
.el-submenu_title-dateil{
    padding-left: 50px !important;
  }
.left-menu{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    background-color: rgb(50, 65, 87);
    color: #fff;
    text-align: left;
    }

</style>