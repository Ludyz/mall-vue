<template>
    <div>
        <el-form ref="loginform" :rules='rules' :model="loginform" label-width=80px class="loginContainer">
            <h3 class='loginTitle'>用户注册</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginform.username"  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type='password' v-model="loginform.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="verifyPassword">
                <el-input type='password' v-model="loginform.verifyPassword" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
                <el-button style="width:100%" v-on:click="submitLogin" type='primary'>注册</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'Register',
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.loginform.password) {
                console.log(value+"***"+this.loginform.password )
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            captchaUrl:'',
            loginform:{
                username:'',
                password:'',
                verifyPassword:'',
                code:''
            },
            checked:false,
            rules:{
                username:[{required:true,message:'请输入用户名',triger:'blur'}],
                password:[{required:true,message:'请输入密码',triger:'blur'}],
                verifyPassword:[{validator: validatePass, trigger: 'blur'}]
            }
        }
        
    },
    
    methods:{
        submitLogin(){
            const _this=this;
            this.$refs.loginform.validate((valid) => {
            if (valid) {
                this.$axios.post('/register',this.loginform).then(res=>{
                    console.log(res)
                    _this.$router.push("/login");//跳转到首页
                    
                }).catch(err=>{
                    console.log("error" )
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