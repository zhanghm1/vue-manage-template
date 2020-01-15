<template>
  <div class="content-detail user_list">
    <el-button @click="AddUser">添加用户</el-button>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="Id" label="ID" width="180"></el-table-column>
      <el-table-column prop="UserName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="Name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="EditUser(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="EditUser(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Total"
      :current-page="PageIndex"
      :page-size="PageSize"
      :hide-on-single-page="false"
      @current-change="changePageIndex"
      @prev-click="PchangePageIndex"
      @next-click="AchangePageIndex"
    ></el-pagination>

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="userEdit">
        <el-form-item label="用户名">
          <el-input v-model="userEdit.UserName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="userEdit.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userEdit.PhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <input type="text" class="passwordhide" />
          <input type="password" class="passwordhide" />
          <el-input v-model="userEdit.Password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <template>
            <el-checkbox   :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="userEdit.UserRoleIds" @change="handleCheckedChange">
              <template  v-for="item in AllRoles" >
                <el-checkbox :label="item.Id" :key="item.Id" >{{item.Name}}</el-checkbox>
              </template>
              
            </el-checkbox-group>
          </template>
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

import {
  GetUserList,
  axiosPostUserEdit,
  GetUserEdit
} from "../../requestData/user";
export default {
  data() {
    return {
      isIndeterminate:true,
      dialogFormVisible: false,
      userList: [],
      PageIndex: 1,
      PageSize: 20,
      PageCount: 1,
      Total: 20,
      AllRoles:[],
      checkAll:false,
      userEdit: { Id: 0, Name: "",UserName:'',Password:'', PhoneNumber:'', UserRoleIds:[],AllRoles:[]}
    };
  },
  methods: {
    GetData() {
      GetUserList(this.PageIndex, this.PageSize).then(resp => {
        this.userList = resp.Data.List;
        this.PageIndex = resp.Data.PageIndex;
        this.PageSize = resp.Data.PageSize;
        this.PageCount = resp.Data.PageCount;
        this.Total = resp.Data.Total;
      });
    },
    changePageIndex() {
      window.console.log(this.PageIndex);
      this.GetData();
    },
    PchangePageIndex() {
      this.PageIndex--;
      window.console.log(this.PageIndex);
      //this.GetData();
    },
    AchangePageIndex() {
      this.PageIndex++;
      window.console.log(this.PageIndex);
      //this.GetData();
    },
    InituserEdit() {
      this.userEdit = { Id: 0 };
      this.AllRoles=[];
    },
    AddUser() {
      this.dialogFormVisible = true;
      this.InituserEdit();
    },
    EditUser(item) {
      this.dialogFormVisible = true;
      this.InituserEdit();
      GetUserEdit(item.Id).then(a => {
        window.console.log(a);
        if (a.Code != "SUCCESS") {
          this.$message({
            message: a.Message,
            type: "warning"
          });
        }else{
          
          this.AllRoles = a.Data.AllRoles;
          this.userEdit = a.Data;
          
          window.console.log(this.AllRoless);
        }
      });
    },
    handleCheckAllChange(value){
      this.isIndeterminate=false;
      this.userEdit.UserRoleIds = value ? this.AllRoles : [];
      //window.console.log(value);
    },
    handleCheckedChange(value){
      window.console.log(value);
      window.console.log(value);
      let checkedCount = value.length;
        this.checkAll = checkedCount === this.AllRoles.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.AllRoles.length;
    },
    submitData() {
      axiosPostUserEdit(this.userEdit).then(a => {
        window.console.log(a);
        if (a.Code == "SUCCESS") {
          this.dialogFormVisible = false;
          this.InituserEdit();
          this.$message({
            message: "SUCCESS",
            type: "success"
          });
          this.GetData();
        } else {
          this.$message({
            message: a.Message,
            type: "warning"
          });
        }
      });
    }
  },
  created() {
    this.GetData();
  }
};
</script>

<style scoped>
.user_list {
}
</style>