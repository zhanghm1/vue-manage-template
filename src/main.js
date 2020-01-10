import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import {localStorageCommon} from './common/Server';
import VueI18n from 'vue-i18n'


Vue.config.productionTip = false;

Vue.use(VueI18n); 
Vue.use(ElementUI);



var contentLanguage = localStorage.getItem("ContentLanguage");
window.console.log("contentLanguage",contentLanguage);
if(contentLanguage=="undefined" || contentLanguage=="null" ||contentLanguage=='' || contentLanguage==undefined || contentLanguage==null){
  contentLanguage='zh-cn';
  window.console.log("contentLanguage",contentLanguage);
  localStorage.setItem("ContentLanguage",'zh-cn');
}



const i18n = new VueI18n({
  locale: contentLanguage,    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-cn': require('./config/languages/cn'),   // 中文语言包
    'en': require('./config/languages/en')    // 英文语言包
  }
});



new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//router 配置决定是否需要权限，leftmenu决定左侧导航栏，用户权限 UserPermission 控制leftmenu和router

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  let useurPermission = store.state.UserPermission ;
  //window.console.log(useurPermission);
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
    if(!to.meta.permission){
      hasPermission=true;
    }else{
      if(!useurPermission){
        hasPermission=false;
      }else{
              let permission=to.meta.permission.toLowerCase();
              //window.console.log(permission);
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