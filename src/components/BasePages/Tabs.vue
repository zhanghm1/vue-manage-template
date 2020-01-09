<template>
    <div class="tabs-list">
        <div class="tabs-item" v-for="(item,index) in tabList" :class="{'active':isActive(item)}" :key="item.index">
            <router-link :to="item.link" class="tags-li-title">
                    {{item.Name}}
                </router-link>
            <span class="tags-item-close" @click="closeTab(index)"><i class="el-icon-close"></i></span>
        </div>
    </div>

</template>

<script>
import bus from '../../common/bus';
export default {
    data(){
        return {
            tabList:[],
            ActiveIndex:""

        }
    },
    methods:{
        isActive(item) {
                if(item.link === this.$route.path) {
                    this.ActiveIndex=item.link;
                    return true;
                }
                return false;
            },
        closeTab(index){
            //如果home页keep-alive有缓存，那么还是需要更新 keep-alive，这里没做

            let delItem = this.tabList.splice(index, 1)[0];

            //新的数组中找当前，没有就找前一个
            const item = this.tabList[index] ? this.tabList[index] : this.tabList[index - 1];
            if (item) {
                if(delItem.link==this.link){//只有关闭自己的时候才需要跳转
                    this.$router.push(item.link);
                }
            }else{
                if(delItem.link!= '/index'){
                    this.$router.push('/');
                }
            }
     
        },
        addTab(router){
           
            let hasExist = this.tabList.some(item => {
                return item.link === router.path;
            });
            if(!hasExist){
                bus.$emit('tabsChange', this.tabList);
                this.tabList.push({link:router.path,Name:router.meta.title});
            }
            
        },

    },
    watch:{
            $route(newValue){
                this.addTab(newValue);
            }
        },
     created(){
           // window.console.log('tabs_created');
             this.addTab(this.$route,null);
     },
    //  beforeMount(){
    //     // window.console.log('tabs_beforeMount');
    //      this.$nextTick(function () {
           
    //     })
       
    //  }

}
</script>

<style scoped>
.tabs-item{
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin: 2px 1px;
    float: left;
    background: #fff;
    border-radius: 5px;
    color: #000;
    border: 1px #d4d4d4 solid;
}
.active{
    background: #409EFF !important;
    color: #fff !important;
    border:none;
    height: 26px;
    line-height: 26px;
    margin: 2px 1px;
}
.active .tags-li-title{
    text-decoration: none;
    color: #fff;
}
.tags-li-title{
    text-decoration: none;
    color: #000;
}
</style>