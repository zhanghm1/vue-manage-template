var ApiUrl="https://localhost:5001";

// 所有的菜单栏
let isPremission=false;
var leftMenu=[
    {Id:1, Name:"主页",Code:"index", needPremission:false, link:"/index",IsMenu:true,IsPremission:isPremission, Childs:null},
    {Id:2,Name:"用户管理",Code:"user_manage",needPremission:true, link:"user",IsMenu:true,IsPremission:isPremission,Childs:[
            {Id:21,Name:"用户列表",Code:"user_list",needPremission:true, link:"/user",IsMenu:true,IsPremission:isPremission,ioc:null},
            {Id:22,Name:"用户编辑",Code:"user_edit",needPremission:true, link:"/user/edit",IsMenu:true,IsPremission:isPremission,ioc:null,Childs:null},
        ]
    },
    {Id:3,Name:"系统管理",Code:"index",needPremission:true, link:"system",IsMenu:true,IsPremission:isPremission,Childs:[
            {Id:31,Name:"系统用户",Code:"index",needPremission:true, link:"/system/systemuser",IsMenu:true,IsPremission:isPremission,ioc:null,Childs:null},
            {Id:42,Name:"系统角色",Code:"index",needPremission:true, link:"/system/systemrule",IsMenu:true,IsPremission:isPremission,ioc:null,Childs:null},
        ]
    },
];

export {
    ApiUrl,
    leftMenu
} ;

