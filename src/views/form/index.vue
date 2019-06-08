<template>
<div>
  <Header />
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="form.Name" style="width: 30%;" />
        </el-form-item>
        <el-form-item label="证件照">
        <el-upload action='' :on-change="getFile" :limit="1" list-type="picture" :auto-upload="false">
          <!-- <img v-if="form.Picture" :src="form.Picture" class="avatar"> -->
            <el-button size="small" type="primary">选择图片上传,最多上传一张图片</el-button>
        </el-upload>
      </el-form-item>
        <el-form-item label="性别" prop="Gender">
          <el-select v-model="form.Gender" placeholder="请选择" style="width: 30%;">
            <el-option label="男" value="0" />
            <el-option label="女" value="1" />
          </el-select>
        </el-form-item>
         <el-form-item label="担任导师" prop="IsSupervisor">
          <el-select v-model="form.IsSupervisor" placeholder="请选择" style="width: 30%;">
            <el-option label="否" value="false" />
            <el-option label="是" value="true" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="Birthday">
          <el-col :span="11">
            <el-date-picker v-model="form.Birthday" type="date" style="width: 66%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="民族" prop="Nation">
          <el-input v-model="form.Nation" style="width: 30%;" />
        </el-form-item>
        <el-form-item label="办公电话" prop="Telephone">
          <el-input v-model="form.Telephone" style="width: 30%;" />
        </el-form-item>
        <el-form-item label="手机号码" prop="Mobile">
          <el-input v-model="form.Mobile" style="width: 30%;" />
        </el-form-item>
        <el-form-item label="传真号码" prop="Fax">
          <el-input v-model="form.Fax" style="width: 30%;" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="Email">
          <el-input v-model="form.Email" style="width: 30%;" />
        </el-form-item>
        <el-form-item label="第一外语">
          <el-input v-model="form.FirstForeignLang" style="width: 30%;" />
        </el-form-item>
         <el-form-item label="第一外语水平">
          <el-select v-model="FirstForeignLangLevel" placeholder="请选择" style="width: 30%;">
            <el-option label="精通" value="精通" />
            <el-option label="熟练" value="熟练" />
            <el-option label="一般" value="一般" />
          </el-select>
        </el-form-item>
        <el-form-item label="第二外语">
          <el-input v-model="form.SecondForeignLang" style="width: 30%;" />
        </el-form-item>
         <el-form-item label="第二外语水平">
          <el-select v-model="SecondForeignLangLevel" placeholder="请选择" style="width: 30%;">
            <el-option label="精通" value="精通" />
            <el-option label="熟练" value="熟练" />
            <el-option label="一般" value="一般" />
          </el-select>
        </el-form-item>
         <el-form-item label="用户状态" prop="Status">
          <el-select v-model="form.status" placeholder="请选择" style="width: 30%;">
            <el-option label="审核中" value="0" />
            <el-option label="审核通过" value="1" />
            <el-option label="审核未通过" value="2" />
          </el-select>
         </el-form-item>
            <el-form-item label="导入日期" prop="inputYear">
          <el-col :span="11">
            <el-date-picker v-model="form.inputYear" type="date" style="width: 66%;" />
          </el-col>
        </el-form-item>
       <el-form-item label="最后学历" prop="HighestAcademic">
        <el-input v-model="form.HighestAcademic" style="width: 46%;" />
      </el-form-item>
      <el-form-item label="最后学位" prop="HighestDegree">
        <el-input v-model="form.HighestDegree" style="width: 46%;" />
      </el-form-item>
       <el-form-item label="学术研究方向" prop="ResearchDirection">
        <el-input v-model="form.ResearchDirection" style="width: 46%;" />
      </el-form-item>
       <el-form-item label="现任专业技术职务" prop="TechnicalPosition">
        <el-input v-model="form.TechnicalPosition" style="width: 46%;" />
      </el-form-item>
       <el-form-item label="行政职位">
        <el-input v-model="form.AdministrativePost" style="width: 46%;"  />
      </el-form-item>
      <el-form-item label="工作单位" prop="Organization">
        <el-input v-model="form.Organization" style="width: 46%;" />
      </el-form-item>
      <el-form-item label="通讯地址" prop="Address">
        <el-input v-model="form.Address" style="width: 46%;" />
      </el-form-item>
      <el-form-item label="邮政编码" prop="postcode">
        <el-input v-model="form.postcode" style="width: 46%;" />
      </el-form-item>
      <el-form-item label="学术兼职" prop="AcademicJob">
        <el-input v-model="form.AcademicJob" style="width: 46%;" />
      </el-form-item>
      <el-form-item label="个人简历" prop="Resume">
        <el-input v-model="form.Resume" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import Header from '../../components/Header/index'
import Cookie from '../../utils/cookie'
export default {
  components:{
    Header
  },
  data() {
    return {
      form: {
        Name: null,
        Status: null,
        Picture: null,
        Gender: null,
        Birthday: null,
        Nation: null,
        AdministrativePost: null,
        Telephone: null,
        Mobile:null,
        Fax: null,
        Email: null,
        HighestAcademic: null,
        HighestDegree: null,
        Organization: null,
        Address: null,
        AcademicJob: null,
        Resume: null,
        IsSupervisor: null,
        ResearchDirection:null,
        TechnicalPosition:null,
        FirstForeignLang:null,
        FirstForeignLangLevel:null,
        SecondForeignLang:null,
        SecondForeignLangLevel:null
      },
      expertId:0,
      rules: {
        name: [
          { required: true, message: '请输入教授姓名', trigger: 'blur' },
        ],
        Status: [
          { required: true, message: '请选择专家状态', trigger: 'change' }
        ],
        Picture: [
          { required: true, message: '请上传专家个人证件照', trigger: 'change' }
        ],
      }
    }
  },
  mounted(){
    if(this.$route.path === '/new');
    else{
      const { id } = this.$route.params;
      this.expertId = id;
       const token = `Bearer ${Cookie.getCookie('lan_token')}`;
        fetch(`/api/Experts/${this.expertId}`, {
          method: 'GET',
          headers: {
            Authorization: token
          },
        }).then(res => {
          if(res.ok){
            return res.json()
          }
          }).then(res => {
            this.form = res
          })
    }
  },
  methods: {
    onSubmit() {
      this.form.Birthday = '' + new Date(this.form.Birthday).getTime();
      this.form.Gender = "0" ? 0 : 1;
      this.form.Status = "0" ? 0 : ("1" ? 1 : 2);
      const token = `Bearer ${Cookie.getCookie('lan_token')}`
      if(this.$route.path === '/new'){
        fetch(`/api/Experts`, {
          method: 'POST',
          headers: {
            Authorization: token,
            "Content-Type":"application/json"
          },
          body: JSON.stringify(this.form)
        }).then(res => {
          if(res.ok){
            this.$alert('添加成功', {
              confirmButtonText: '确定'
            }).then(() => {
              this.$router.push({ path: `/addAdmin` })
            });
          }
          else{
            this.$alert('添加失败，请重新尝试', {
              confirmButtonText: '确定'
            })
          }
        })
      }
      else{
        fetch(`/api/Experts/${this.expertId}`, {
          method: 'PUT',
          headers: {
            "Content-Type":"application/json",
            Authorization: token
          },
          body: JSON.stringify(this.form)
        }).then(res => {
          if(res.ok){
            this.$alert('编辑信息成功', {
              confirmButtonText: '确定'
            }).then(() => {
              this.$router.push({ path: `/manage` })
            });
          }
          else{
            this.$alert('编辑信息失败，请重新尝试', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push('./manage')
    },
    getFile(file, fileList) {
    
      this.getBase64(file.raw).then(res => {
      console.log(res)
      this.form.Picture = res
      });
    },

    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
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
    border: 1px rgb(209, 207, 207) solid;
    border-radius: 5%;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .app-container{
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    background-color: white;
  }
</style>
