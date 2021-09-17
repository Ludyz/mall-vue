<template>
    <div>
        <template>
            <el-table
                :data="roles"
                stripe
                style="width: 100%">
                <el-table-column
                prop="roleId"
                label="角色ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="roleName"
                label="角色"
                width="160">
                </el-table-column>
                <el-table-column
                prop="roleDesc"
                label="描述"
                width="180">
                </el-table-column>
                <el-table-column
                
                label="操作"
                width="180">
                    <template slot-scope="scope">
                        <el-button @click="showClick(scope.row.proid)" type="text" size="small">查看</el-button>
                        <el-button @click="editClick(scope.row.proid)" type="text" size="small">编辑</el-button>
                        <el-button @click="editClick(scope.row.proid)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
    
</template>

<script>
export default {
    name:'RoleManage',
    data(){
        return{
            roles:[]//角色
        }
    },
    methods:{
       
    },
    created(){
        let _this=this;
        this.$axios.get("/authority/selRole").then(res => {
            console.log(res)
            _this.roles=res.data.data;
        })
    }
    
}
</script>

<style scoped>

</style>