<template>
    <div>
        <el-form ref="loginform" :rules='rules' :model="loginform" label-width=80px class="loginContainer">
            <h3 class='loginTitle'>系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginform.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type='password' v-model="loginform.password" placeholder="请输入密码"></el-input>
            </el-form-item>
                <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
                <el-button style="width:100%" v-on:click="submitLogin" type='primary'>登录</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            captchaUrl:'',
            loginform:{
                username:'test',
                password:'123',
                code:''
            },
            checked:false,
            rules:{
                username:[{required:true,message:'请输入用户名',triger:'blur'}],
                password:[{required:true,message:'请输入密码',triger:'blur'}]
            }
        }
        
    },
    
    methods:{
        submitLogin(){
            const _this=this;
            this.$refs.loginform.validate((valid) => {
          if (valid) {
            this.$axios.post('/login',this.loginform).then(res=>{
                console.log(res)
                const jwt=res.headers['authorization'];
                const userInfo=res.data.data;
                _this.$store.commit("SET_TOKEN",jwt);
                _this.$store.commit("SET_USERINFO",userInfo);
                _this.$router.push("/");//跳转到首页
                
            })
          } else {
            this.$message({
                showClose: true,
                message: '请输入所有字段',
                type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width:350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border:1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        text-align:center;
    }
    .loginRemember{
        text-align: right;
        margin: 0px 0px 15px 15px ;
        
    }
</style>