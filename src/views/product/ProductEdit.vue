<template>
    <div class="container">
        <h3 style="text-align: center;">编辑商品</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="商品分类">
                <el-select v-model="form.cateid" placeholder="请选择分类">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
          
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="subtitle">
                <el-input v-model="form.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="商品主图" prop="mainimageUrl">
              <el-input v-model="form.mainimageUrl"  v-if="false"></el-input>
              <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      action="/product/insProduct"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :on-change="mainOnchange"
                      :auto-upload="false"
                      list-type="picture">
                  <img v-if="form.mainimageUrl" :src="form.mainimageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="商品图片" ref="subimageUrl">
              <el-input v-model="form.subimageUrl"  v-if="false"></el-input>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="/product/insProduct"
                :on-change="subOnchange"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false"
                list-type="picture">
                <img v-if="form.subimageUrl" :src="form.subimageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="商品详情" prop="detail">
                <el-input type="textarea" v-model="form.detail"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                 <el-input-number v-model="form.price" :precision="2" :step="0.1" ></el-input-number>
            </el-form-item>
            <el-form-item label="商品库存" prop="stock">
                <el-input-number v-model="form.stock" :step="2" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="商品状态">
                <el-radio-group v-model="form.status">
                  <el-radio label="1">在售</el-radio>
                  <el-radio label="0">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>
<script>
  export default {
    name:'AddProduct',
    data() {
      return {
        form: {
          proid:'',
          name: 'test',
          cateid: '1',
          subtitle: 'test',
          mainimageUrl: '',
          subimageUrl: '',
          detail: 'test',
          price: 1.00,
          stock: 1,
          status:"1"    
        },
        mainimgage:'',
        subimgages:'',
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          subtitle: [
            { required: true, message: '请选择商品副标题', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '请选择商品描述', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请选择商品价格', trigger: 'blur' }
          ],
          stock: [
            { required: true, message: '请选择商品库存', trigger: 'blur' }
          ]

        }
      }
    },
    methods: {
      submitForm(formName) {
        const _this=this;
        let editUrl="/product/insProduct"; //添加地址
        if(_this.form.proid){
            editUrl="/product/updProductById/"+_this.form.proid; //编辑地址
        }
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append("product",JSON.stringify(_this.form));

            if(_this.mainimgage){
                formData.append("mainimage",_this.mainimgage.raw,_this.mainimgage.name);
            }
            if(_this.subimages){
                formData.append("subimage",_this.subimgages.raw,_this.subimgages.name);
            }
            
            this.$axios.post(editUrl,formData,{
              headers:{
                'Content-Type': 'multipart/form-data'
              }
            }).then(res=>{
              console.log(res);
            })


          } else {
            
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      mainOnchange(file, fileList) {
        this.form.mainimageUrl = URL.createObjectURL(file.raw);
				this.mainimgage = file;//每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
			},

      subOnchange(file, fileList) {
        this.form.subimageUrl = URL.createObjectURL(file.raw);
				this.subimgage = file;//每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
			}
    },

    created(){
      const proId=this.$route.params.proId;
        if(proId){
            const _this=this;
            this.$axios.get("/product/selProductById/"+proId).then(res=>{
                const product=res.data.data;
                _this.form.proid=product.proid;
                _this.form.cateid=product.cateid;
                _this.form.name=product.name;
                _this.form.subtitle=product.subtitle;
                _this.form.mainimageUrl=product.mainimage;
                _this.form.subimageUrl=product.subimages;
                _this.form.price=product.price;
                _this.form.stock=product.stock;
                _this.form.status=product.status;
        })
      }
    }
  }
</script>

<style scoped>
.container{
    width: 960px;
    margin: 0 auto;
    
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>