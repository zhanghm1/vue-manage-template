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
                path: '/system/user',
                component: () => import('../pages/SystemManage/UserList.vue'),
                meta: { title: '用户列表',code:'system_user_list', needPremission: true }
            },
            {
                path: '/system/role',
                component: () => import('../pages/SystemManage/SystemRole.vue'),
                meta: { title: '系统角色',code:'system_role_list', needPremission: true }
            },
        ]
    },
    {
        path: '/Login',
        component: () => import('../pages/Login.vue'),
    },
    {
        path: '/Register',
        component: () => import('../pages/Register.vue'),
    },
    {
        path: '/test',
        component: () => import('../pages/test.vue'),
    }

];

  // 3. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new Router({
    routes: routes
  });


  export default router;


  