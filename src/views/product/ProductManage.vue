<template>
    <div>
        <template>
            <el-table
                :data="page.products"
                stripe
                style="width: 100%">
                <el-table-column
                prop="proid"
                label="商品ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="商品名"
                width="160">
                </el-table-column>
                <el-table-column
                prop="subtitle"
                label="子标题"
                width="180">
                </el-table-column>
                <el-table-column
                prop="detail"
                label="详细描述"
                width="180">
                </el-table-column>
                <el-table-column
                prop="price"
                width="80"
                label="单价">
                </el-table-column>
                <el-table-column
                prop="stock"
                width="80"
                label="库存">
                </el-table-column>
                <el-table-column
                prop="status"
                width="80"
                label="状态">
                    <template slot-scope="scope">
                        {{justifyStatus(scope.row.status)}}
                    </template>
                </el-table-column>
                 <el-table-column
                prop="updatetime"
                width="180"
                label="修改时间">
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
    name:'ProductManage',
    data(){
        return{
            page:{
                currentPage:1,//当前页
                size:12,//一页的数量
                products:[],//商品
                total:0,//总条数
                sizes:0,//总页数
                pages:0
            },
            goods:[],
            defaultImg:"http://localhost:8082/productPicture/b3fc9cc6252e378cd0dfd83bcca3106e.gif"
        }
    },
    methods:{
         changePage(currentPage){
            
            let _this=this;
            this.$axios.get("/product/selProductPage?pageNo="+currentPage+"&pageSize="+this.page.size).then(res=>{
            
            _this.page.products=res.data.data.records;
            _this.page.currentPage=res.data.data.current;
            _this.page.total=res.data.data.total;
            _this.page.size=res.data.data.size;
            _this.page.pages=res.data.data.pages;
            _this.goods=this.pages;
            })
        },
        justifyStatus(status){
            if(status===1){
                return "在售"
            }else{
                return "下架"
            }
        },
        showClick(id){
            this.$router.push("/product/"+id+"/detail");
        },
        editClick(id){
            this.$router.push("/product/"+id+"/edit");
        }

    },
    created(){
        this.changePage(1);
    }
    
}
</script>

<style scoped>

</style>