<template>
    <div class="header">
        <el-radio-group v-model="isCollapse" @change="collapseChange" class="btn-isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
import bus from '../../common/bus';
export default {
    data(){
        return {
            isCollapse:false
        }
    },
    methods:{
        collapseChange(){
            bus.$emit("menuIsCollapse",this.isCollapse);
        }
    },
    created(){
        this.collapseChange();
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
}
.btn-isCollapse{
    margin: 15px 0;
    position: absolute;
    left: 20px;
}
</style>