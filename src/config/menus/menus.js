// IsPremission 标识有没有权限；
// needPremission 是否需要权限

const Menus={
    'zh-cn':[
        {Id:1, Name:"主页",Code:"index", needPremission:false, link:"/index",IsMenu:true,IsPremission:false, Childs:null},
        {Id:2,Name:"用户管理",Code:"user_manage",needPremission:true, link:"user",IsMenu:true,IsPremission:false,Childs:[
                {Id:21,Name:"用户列表",Code:"user_list",needPremission:true, link:"/user",IsMenu:true,IsPremission:false,ioc:null},
                {Id:22,Name:"用户编辑",Code:"user_edit",needPremission:true, link:"/user/edit",IsMenu:true,IsPremission:false,ioc:null,Childs:null},
            ]
        },
        {Id:3,Name:"系统管理",Code:"index",needPremission:true, link:"system",IsMenu:true,IsPremission:false,Childs:[
                {Id:31,Name:"系统用户",Code:"systemuser",needPremission:true, link:"/system/systemuser",IsMenu:true,IsPremission:false,ioc:null,Childs:null},
                {Id:42,Name:"系统角色",Code:"systemrole",needPremission:true, link:"/system/systemrole",IsMenu:true,IsPremission:false,ioc:null,Childs:null},
            ]
        },
    ],
    'en':[
        {Id:1, Name:"Home",Code:"index", needPremission:false, link:"/index",IsMenu:true,IsPremission:false, Childs:null},
        {Id:2,Name:"User Manage",Code:"user_manage",needPremission:true, link:"user",IsMenu:true,IsPremission:false,Childs:[
                {Id:21,Name:"User List",Code:"user_list",needPremission:true, link:"/user",IsMenu:true,IsPremission:false,ioc:null},
                {Id:22,Name:"User Edit",Code:"user_edit",needPremission:true, link:"/user/edit",IsMenu:true,IsPremission:false,ioc:null,Childs:null},
            ]
        },
        {Id:3,Name:"System Manage",Code:"index",needPremission:true, link:"system",IsMenu:true,IsPremission:false,Childs:[
                {Id:31,Name:"System User",Code:"systemuser",needPremission:true, link:"/system/systemuser",IsMenu:true,IsPremission:false,ioc:null,Childs:null},
                {Id:42,Name:"System Role",Code:"systemrole",needPremission:true, link:"/system/systemrole",IsMenu:true,IsPremission:false,ioc:null,Childs:null},
            ]
        },
    ]

}
export default Menus;