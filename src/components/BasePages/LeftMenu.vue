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
import axios from '../../common/Request';
import {leftMenu} from '../../config';
import {localStorageCommon} from '../../common/Server';
export default {
    data() {
      return {
        isCollapse: false,
        menus:leftMenu,
        tabsItem:""
      };
    },
    methods: {
        handleOpen(key, keyPath) {

            window.console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            window.console.log(key, keyPath);
        },
        GetUserPermissions(){
            axios.get('/api/user/UserPermissions').then(resp=>{
                if(resp.Code=="SUCCESS"){
                    // 路由权限
                    localStorageCommon.setItem("UserPermission",JSON.stringify(resp.Data));
                    //菜单栏权限
                    this.UpdatePremission(this.menus,  resp.Data);
                }
            }).catch(a=>{
                window.console.error(a);
            });
        },
        UpdatePremission(menus,userPremission){
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
    computed: {
        onRoutes() {
            return this.$route.path;
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('menuIsCollapse', msg => {
            window.console.log('menuIsCollapse',msg);
            this.isCollapse = msg;
        });
        this.GetUserPermissions();
       
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