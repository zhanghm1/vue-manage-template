// IsPremission 标识有没有权限；
// needPremission 是否需要权限
 
const Menus=function(){
    //needPremission是否需要权限
    // IsPremission 是否有权限
    return  {
        'zh-cn': [
            { Id: 1, Name: "主页", Code: "index", needPremission: false, link: "/index", IsMenu: true, IsPremission: false, Childs: null },
            {
                Id: 2, Name: "系统管理", Code: "system_manage", needPremission: true, link: "system", IsMenu: true, IsPremission: false, Childs: [
                    { Id: 21, Name: "系统角色", Code: "system_role_list", needPremission: true, link: "/system/role", IsMenu: true, IsPremission: false, ioc: null, Childs: null },
                    { Id: 22, Name: "用户列表", Code: "system_user_list", needPremission: true, link: "/system/user", IsMenu: true, IsPremission: false, ioc: null },
                ]
            },
        ],
        'en': [
            { Id: 1, Name: "Home", Code: "index", needPremission: false, link: "/index", IsMenu: true, IsPremission: false, Childs: null },
            {
                Id: 2, Name: "System Manage", Code: "system_manage", needPremission: true, link: "system", IsMenu: true, IsPremission: false, Childs: [
                    { Id: 21, Name: "System Role", Code: "system_role_list", needPremission: true, link: "/system/role", IsMenu: true, IsPremission: false, ioc: null, Childs: null },
                    { Id: 22, Name: "User List", Code: "system_user_list", needPremission: true, link: "/system/user", IsMenu: true, IsPremission: false, ioc: null },
                ]
            },
        ]
    
    }
}

export default Menus();