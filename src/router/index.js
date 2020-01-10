import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const routes = [
    {
        path: '/',
        component: () => import('../components/BasePages/Home.vue'),
        redirect: '/index',
        meta: { title: '首页',code:'Home'},
        children: [
            {
                path: '/index',
                component: () => import('../pages/Index.vue'),
                meta: { title: '首页',code:'Home' }
            },
            {
                path: '/user',
                component: () => import('../pages/UserManage/UserList.vue'),
                meta: { title: '用户列表',code:'user_list', permission: "user_list" }
            },
            {
                path: '/user/edit',
                component: () => import('../pages/UserManage/UserEdit.vue'),
                meta: { title: '用户编辑', code:'user_edit',permission: "user_edit" }
            },
            {
                path: '/system/systemuser',
                component: () => import('../pages/SystemManage/SystemUser.vue'),
                meta: { title: '系统用户',code:'systemuser', permission: "systemuser" }
            },
            {
                path: '/system/systemrole',
                component: () => import('../pages/SystemManage/SystemRole.vue'),
                meta: { title: '系统角色',code:'systemrole', permission: "systemrole" }
            },
        ]
    },
    {
        path: '/Login',
        component: () => import('../pages/Login.vue'),
    }
    ,
    {
        path: '/Register',
        component: () => import('../pages/Register.vue'),
    }

];

  // 3. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new Router({
    routes: routes
  });


  export default router;


  