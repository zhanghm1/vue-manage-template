import Vue from 'vue';
import Router from 'vue-router';
import {localStorageCommon} from '../common/Server';

Vue.use(Router);

const routes = [

    {
        path: '/',
        component: () => import('../components/BasePages/Home.vue'),
        redirect: '/index',
        meta: { title: '首页', permission: "index" },
        children: [
            {
                path: '/index',
                component: () => import('../components/Index.vue'),
                meta: { title: '首页' }
            },
            {
                path: '/user',
                component: () => import('../components/UserManage/UserList.vue'),
                meta: { title: '用户列表', permission: "user_list" }
            },
            {
                path: '/user/edit',
                component: () => import('../components/UserManage/UserEdit.vue'),
                meta: { title: '用户编辑', permission: "user_edit" }
            },
            {
                path: '/system/systemuser',
                component: () => import('../components/SystemManage/SystemUser.vue'),
                meta: { title: '系统用户', permission: "systemuser" }
            },
            {
                path: '/system/systemrule',
                component: () => import('../components/SystemManage/SystemRule.vue'),
                meta: { title: '系统角色', permission: "systemrule" }
            },
        ]
    },
    {
        path: '/Login',
        component: () => import('../components/Login.vue'),
    }
    ,
    {
        path: '/Register',
        component: () => import('../components/Register.vue'),
    }

];

  // 3. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new Router({
    routes: routes
  });

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    let useurPermissionStr = localStorageCommon.getItem("UserPermission") ;
    let access_token = localStorageCommon.getItem("access_token");
    let path=to.path.toLowerCase();

    let hasPermission=false;

    if(!access_token && path != '/login' && path != '/register'){
        next('/login');
        return;
    } else if( path == '/login' || path == '/register'){
        next();
        return;
    } else{
        if(!useurPermissionStr){
            hasPermission=false;
        }
        else{
            if(!to.meta.permission){
                hasPermission=true;
            }else{
                let useurPermission =JSON.parse(localStorageCommon.getItem("UserPermission")) ;
                let permission=to.meta.permission.toLowerCase();
                window.console.log(permission);
                hasPermission = useurPermissionSearch(useurPermission,permission);
            }
        }
    }  

    if(hasPermission){
        next();
    }else{
        //提示没有权限
        Vue.prototype.$alert('您没有权限访问,请联系管理员1', '权限', {
            confirmButtonText: '确定'
        });
    }
    
});

function useurPermissionSearch(useurPermission,code){
    let IsHavs=false;
    for (let index = 0; index < useurPermission.length; index++) {
        const element = useurPermission[index];
        if(element.Code==code){
            IsHavs = true;
            break;
        }else{
            if(element.Childs){
                IsHavs = useurPermissionSearch(element.Childs,code);
                if(IsHavs){
                    break;
                }
            }
        }
    }
    return IsHavs;
}
  export default router;


  