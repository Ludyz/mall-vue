<template>
    <div>
        <el-page-header @back="goBack" content="购物车">
        </el-page-header>
        <!-- selection-change和 select 会一起触发-->
        <el-table
            :data="carts"
            ref="table"
            
            @selection-change="handleSelectionChange" 
            @select="handleSelect"
            :row-key="row => { return row.id }"
            style="width: 100%">
            <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品信息"
                width="520">
            </el-table-column>
            <el-table-column
                label="单价"
                width="180">
                <template slot-scope="scope">
                    ￥{{scope.row.price}}
                </template>
            </el-table-column>
            <el-table-column
                width="200"
                label="数量">
                <template slot-scope="scope">
                    <el-input-number :min="0" size="small" v-model="scope.row.quantity"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                label="小计">
                <template slot-scope="scope">
                    ￥{{ scope.row.price*scope.row.quantity}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="cart_bottom">
            <el-row>
                <el-col :span="2" :offset="1" >
                    <div class="cart_operation" >
                        <a style="color:#959595;" v-on:click="deleteCart">删除选中的商品</a>
                    </div>
                </el-col>
                <el-col :span="8" :offset="10">   
                <div class="cart_shop">
                    <div class="countNum">
                        <div >已选择<span style="color:red; font-size:22px;padding:0px 5px">{{checkedNum}}</span>件商品</div>
                        <div style="text-align:right;color:#959595">共计<span style=" font-size:16px;padding:0px 5px">{{countNum}}</span>商品</div>
                    </div>
                    <div class="countPrice">
                        <div>应付总额：<span style="color:red; font-size:22px;padding:0px 5px">￥{{countPrice}}</span></div>
                        <div><span style="text-align:right;color:#959595">应付总额不含运费</span></div>
                        
                    </div>
                    <div class="buy">
                        <el-button type="primary" size="medium" @click="buy">现在购买</el-button>
                    </div>
                </div>
                </el-col>
            </el-row>
             
        </div>
    </div>
    
    
</template>

<script>
export default {
    name:'Cart',
    data(){
        return{
            userid:'01',
            carts:[], //table数据
            checkedNum:0, //被选中的行数
            checkedCarts:[], //被选中的行
            countNum:0,//总计数量，
            countPrice:0 ,//总价格
            show:''
        }
    },
    
    methods:{
        geta(){
            console.log(this.countNum)
        },
        getkey(row){
            console.log(row)
            return row.carid;
        },
        goBack(){
            this.$router.push("/");
        },
        deleteCart(){//批量删除
            const carts=this.checkedCarts;
            if(carts.length==0){
                this.$alert("请先选择要删除的数据", "提示", {
                    confirmButtonText: "确定",
                });
            }else {
                this.carts.splice(carts[0].xh - 1, 1);//删除选中的行
                this.$axios.post("/cart/delOnCarProduct",carts).then(res=>{
                })
            } 
        },
        handleDelete(index,row){//单行删除
            this.carts.splice(index, 1);
            var data=[row];
            this.$axios.post("/cart/delOnCarProduct",data).then(res=>{
                
            })

        },
        handleSelectionChange(value){
            this.checkedCarts=value;
            
        },
        handleSelect(seletion,row){
             this.checkedCarts=seletion;
            if(row.checked===1){
                row.checked=0;
            }else{
                 row.checked=1;
            }  
        },
        buy(){

        }
    },
    watch:{
        checkedCarts(){
           this.getCountNum
           this.getCountPrice 
        }
    },
    
    computed:{
        getCountNum(){
            var countNum=0;
            this.checkedCarts.forEach(v =>{
                countNum+=v.quantity;
            })
            this.countNum=countNum;
            this.checkedNum=this.checkedCarts.length;
            return countNum;
        },
        
        getCountPrice(){
            var countPrice=0;
            let a=new Array;
            a=this.checkedCarts;
            a.forEach(v =>{
                countPrice+=v.price*v.quantity;
            })
            this.countPrice=countPrice;
        }

    },
    created(){
        const _this=this;
        const userName=this.$store.getters.getUser.userName;
        if(userName){
                _this.userid=this.$store.getters.getUser.userid;
                this.$axios.get('/cart/selectListPage?id='+_this.userid).then(res=>{
                    _this.carts=res.data.data;
                    
                })
                
        }else{
            this.$router.push("/login");
        }

    },

    //回显多选框的选中状态
    updated(){
       
        this.carts.forEach((v,i) =>{
           if(v.checked==1){
               this.$refs.table.toggleRowSelection(v,true);
           }
        })
         this.checkedNum=this.$refs.table.selection.length;
         this.checkedCarts=this.$refs.table.selection;

    },
    beforeDestroy(){
        const carts=this.carts;
        if(carts.length>0){
            this.$axios.post("/cart/changeCarChecked",carts).then(res=>{
                
            })
        }
            
    }
}
</script>

<style scoped>
.cart_operation{
    cursor: pointer;
    padding: 4px;
}
.cart_bottom{
    margin-top: 20px;
}
.countNum{
    float: left;
    margin-right: 20px;
    border-right:2px solid #959595;
    padding-right:20px; 
    
}
.countPrice{
    float: left;
    
    
}
.buy{
     float: left;
    margin-left: 20px;
}
</style>