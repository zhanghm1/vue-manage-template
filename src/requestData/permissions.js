import axios from "../common/Request"
// import qs from 'qs';

export const axiosGetPermissionList=(pageindex,pagesize)=> axios.get('/api/Permission/List?pageindex='+pageindex+"&pagesize="+pagesize);

export const axiosGetPermissionEdit=(id)=> axios.get('/api/Permission/Edit/'+id);

export const axiosPostPermissionEdit=(data)=> axios.post('/api/Permission/Edit',data);



