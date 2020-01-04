
var localStorageCommon ={
    getItem:function(key){
        return localStorage.getItem(key);
    },
    setItem:function(key,value){
        localStorage.setItem(key,value);
        return true;
    },
}
// 输出多个值用 export
//输出单个值用 export default
export {
    localStorageCommon
} ;
