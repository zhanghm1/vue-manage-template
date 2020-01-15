import axios from "../common/Request"
import qs from 'qs';
/**
 * 登陆获取token
 * @param {*} data  登陆信息
 */
export const Login=(data)=> axios.post('/connect/token',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
/**
 * 获取当前登陆人信息
 */
export const GetUserInfo=()=> axios.get('/api/user/Info');
/**
 * 编辑当前登陆人信息
 */
export const axiosPostUserInfoEdit=(data)=> axios.post('/api/user/UserInfoEdit',data);
/**
 * 获取用户权限
 */
export const GetUserPermissions=()=> axios.get('/api/user/UserPermissions');
/**
 * 注册用户
 */
export const Register=(data)=> axios.post('/api/user/Register',data);

/**
 * 用户列表
 */
export const GetUserList=(pageindex,pagesize)=> axios.get('/api/user/UserList?pageindex='+pageindex+"&pagesize="+pagesize);
/**
 * 获取编辑时的用户信息
 */
export const GetUserEdit=(id)=> axios.get('/api/user/UserEdit/'+id);
/**
 * 编辑用户信息
 */
export const axiosPostUserEdit=(data)=> axios.post('/api/user/UserEdit',data);



