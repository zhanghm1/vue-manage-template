import axios from "../common/Request"
import qs from 'qs';

export const Login=(data)=> axios.post('/connect/token',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

export const GetUserInfo=()=> axios.get('/api/user/Info');

export const GetUserPermissions=()=> axios.get('/api/user/UserPermissions');

export const Register=(data)=> axios.post('/api/user/Register',data);



