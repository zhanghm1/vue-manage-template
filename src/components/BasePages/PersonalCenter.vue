<template>
    <div  class="content-detail personal_center">

    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
    data(){
        return {
            dialogFormVisible:false,
            
            Model:{Id:0,Name:''}
        }
    },
        computed: {
            ...mapState([
                'UserInfo'
            ]),
    },
    methods:{
        ...mapMutations([
                'SaveUserInfo'
            ]),
        submitData(){

        }
    }

}
</script>

<style scoped>

</style>