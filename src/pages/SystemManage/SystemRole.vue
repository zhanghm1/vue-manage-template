<template>
    <div  class="content-detail role_list">
        
        <el-button  @click="AddModel">添加角色</el-button>
        <el-table
            :data="List"
            style="width: 100%">
            <el-table-column
                prop="Id"
                label="ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Name"
                label="角色名称">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="EditModel(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="EditModel(scope.row)"  type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
            </el-table>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="Total"
        :current-page="PageIndex"
        :page-size="PageSize"
        :hide-on-single-page='false'
        @current-change='changePageIndex'
        @prev-click='PchangePageIndex'
        @next-click='AchangePageIndex'
        >
        </el-pagination>
        
<el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
  <el-form :model="Model">
    
    <el-form-item label="名称" >
      <el-input v-model="Model.Name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="Model.Description" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="权限" >
        <div style="margin-top: 40px;">
            <el-tree
            :data="AllPermissions"
            show-checkbox
            ref="treePermissions"
            node-key="Id"
            :check-strictly='true'
            :default-expand-all="true"
            :default-checked-keys="Model.PermissionsIds"
            @check-change='checkChange'
            :props="defaultProps">
            </el-tree>
        </div>

    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitData">确 定</el-button>
  </div>
</el-dialog>

    </div>
</template>

<script>
import bus from '../../common/bus';
import {axiosGetPermissionList,axiosGetPermissionEdit,axiosPostPermissionEdit} from '../../requestData/permissions';
export default {
    data(){
        return {
            dialogFormVisible:false,
            List:[],
            PageIndex: 1,
            PageSize: 20,
            PageCount: 1,
            Total: 20,
            AllPermissions:[],
            Model:{Id:0,Name:'',Description:'',PermissionsIds:[],},
            defaultProps: {
                children: 'Childs',
                label: 'Name'
            }
        }
    },
    methods:{
        GetData(){
            axiosGetPermissionList(this.PageIndex,this.PageSize).then(resp=>{
                        this.List=resp.Data.List;
                        this.PageIndex=resp.Data.PageIndex;
                        this.PageSize=resp.Data.PageSize;
                        this.PageCount=resp.Data.PageCount;
                        this.Total=resp.Data.Total;
                    });
        },
        changePageIndex(){
            window.console.log(this.PageIndex);
            this.GetData();
        },
        PchangePageIndex(){
            this.PageIndex--;
            window.console.log(this.PageIndex);
            //this.GetData();
        },
        AchangePageIndex(){
            this.PageIndex++;
            window.console.log(this.PageIndex);
            //this.GetData();
        },
        InitModel(){
            this.Model={Id:0};
        },
        AddModel(){
            this.dialogFormVisible=true;
            this.InitModel();
        },
        EditModel(item){
            this.dialogFormVisible=true;
            this.InitModel();
            axiosGetPermissionEdit(item.Id).then(a=>{
                window.console.log(a);
                this.Model=a.Data;
                this.AllPermissions=a.Data.AllPermissions;
                if(a.Code!='SUCCESS'){
                    this.$message({
                        message: a.Message,
                        type: 'warning'
                    });
                }
            });
        },
        submitData(){
            axiosPostPermissionEdit(this.Model).then(a=>{
                window.console.log(a);
                if(a.Code=='SUCCESS'){
                    this.dialogFormVisible=false;
                    this.InitModel();
                    this.$message({
                        message: 'SUCCESS',
                        type: 'success'
                    });
                    bus.$emit("changeRolePermissions",true);
                    this.GetData();
                }else{
                    this.$message({
                        message: a.Message,
                        type: 'warning'
                    });
                }
                
            })
        },
        setCheckedKeys() {
            window.console.log(this.$refs.tree);
            this.$refs.treePermissions.setCheckedKeys(this.Model.PermissionsIds);
        },
        checkChange(item,isCheck,childsIsCheck){
            
           window.console.log(item);
           window.console.log(isCheck);
           window.console.log(childsIsCheck);
           if(isCheck){
               if(this.Model.PermissionsIds.indexOf(item.Id)==-1){
                    this.Model.PermissionsIds.push(item.Id);
                    if(item.ParentId>0){
                        this.Model.PermissionsIds.push(item.ParentId);
                    }
                    this.setCheckedKeys();
               }
           }else{
               if(this.Model.PermissionsIds.indexOf(item.Id)!=-1){
                     this.Model.PermissionsIds.splice(this.Model.PermissionsIds.indexOf(item.Id),1);
               }
           }
        }

    },
    created(){
        this.GetData();
    }
}
</script>

<style scoped>
.role_list{}

</style>