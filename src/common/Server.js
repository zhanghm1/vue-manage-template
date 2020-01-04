var localStorageCommon ={
    getItem:function(key){
        return localStorage.getItem(key);
    },
    setItem:function(key,value){
        localStorage.setItem(key,value);
        return true;
    },
    setLoginItem(resp){
        localStorageCommon.setItem("access_token",resp.access_token);
        localStorageCommon.setItem("UserPermission",resp.UserPermission);
        localStorageCommon.setItem("UserId",resp.UserId);
        localStorageCommon.setItem("UserName",resp.UserName);
        localStorageCommon.setItem("token_type",resp.token_type);
    },
    setLoginOutItem(){
        localStorageCommon.setItem("access_token",null);
        localStorageCommon.setItem("UserPermission",null);
        localStorageCommon.setItem("UserId",null);
        localStorageCommon.setItem("UserName",null);
        localStorageCommon.setItem("token_type",null);
    }
}


// 输出多个值用 export
//输出单个值用 export default
export {
    localStorageCommon
} ;
