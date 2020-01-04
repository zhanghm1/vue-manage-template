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
            <template  v-for="item in lists">
                <template v-if="item.childs &&item.childs.length>0">
                    <el-submenu :index="item.index" :key="item.id">
                        <template slot="title">
                            <div  >
                            <i class="el-icon-location"></i>
                            <span class="el-submenu_title" slot="title">{{item.title}}</span>
                            </div>
                        </template>
                        <el-menu-item  class="el-submenu_title-dateil"  
                        v-for="itemchild in item.childs"  
                        :data-index="itemchild.index"
                        :index="itemchild.index" 
                        :key="itemchild.id" >{{itemchild.title}}</el-menu-item>
                    </el-submenu>
                </template>
                <template  v-else>
                    <el-menu-item class="el-submenu_title"  :index="item.index" :key="item.id">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    var lists=[
        {id:1, title:"主页",index:"/index",ioc:"index",childs:null},
        {id:2,title:"用户管理",index:"user",ioc:"user",childs:[
                {id:21,title:"用户列表",index:"/user",ioc:null},
                {id:22,title:"用户编辑",index:"/user/edit",ioc:null,childs:null},
            ]
        },
        {id:3,title:"系统管理",index:"system",ioc:"system",childs:[
                {id:31,title:"系统用户",index:"/system/systemuser",ioc:null,childs:null},
                {id:42,title:"系统角色",index:"/system/systemrule",ioc:null,childs:null},
            ]
        },
    
    ];
import bus from '../../common/bus';
export default {
    data() {
      return {
        isCollapse: false,
        lists:lists,
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