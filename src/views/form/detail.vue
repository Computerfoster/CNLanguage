<template>
  <div>
    <Header/>
    <div class="app-container">
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="姓名" prop="Name">
          <div>{{form.Name}}</div>
        </el-form-item>

        <el-form-item label="证件照">
          <img v-if="form.Picture" :src="form.Picture" class="avatar">
        </el-form-item>

        <el-form-item label="性别" prop="Gender">
          <div>{{form.Gender}}</div>
        </el-form-item>

        <el-form-item label="担任导师" prop="IsSupervisor">
          <div>{{form.IsSupervisor}}</div>
        </el-form-item>

        <el-form-item label="出生日期" prop="Birthday">
          <div>{{form.Birthday}}</div>
        </el-form-item>

        <el-form-item label="民族" prop="Nation">
          <div>{{form.Nation}}</div>
        </el-form-item>

        <el-form-item label="办公电话" prop="Telephone">
          <div>{{form.Telephone}}</div>
        </el-form-item>

        <el-form-item label="手机号码" prop="Mobile">
          <div>{{form.Mobile}}</div>
        </el-form-item>

        <el-form-item label="传真号码" prop="Fax">
          <div>{{form.Fax}}</div>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="Email">
          <div>{{form.Email}}</div>
        </el-form-item>

        <el-form-item label="第一外语">
          <div>{{form.FirstForeignLang}}</div>
        </el-form-item>

        <el-form-item label="第一外语水平">
          <div>{{form.FirstForeignLangLevel}}</div>
        </el-form-item>

        <el-form-item label="第二外语">
          <div>{{form.SecondForeignLang}}</div>
        </el-form-item>

        <el-form-item label="第二外语水平">
          <div>{{form.SecondForeignLangLevel}}</div>
        </el-form-item>

        <el-form-item label="用户状态" prop="Status">
          <div>{{form.status}}</div>
        </el-form-item>

        <el-form-item label="导入日期" prop="inputYear">
          <div>{{form.inputYear}}</div>
        </el-form-item>

        <el-form-item label="最后学历" prop="HighestAcademic">
          <div>{{form.HighestAcademic}}</div>
        </el-form-item>

        <el-form-item label="最后学位" prop="HighestDegree">
          <div>{{form.HighestDegree}}</div>
        </el-form-item>

        <el-form-item label="学术研究方向" prop="ResearchDirection">
          <div>{{form.ResearchDirection}}</div>
        </el-form-item>

        <el-form-item label="现任专业技术职务" prop="TechnicalPosition">
          <div>{{form.TechnicalPosition}}</div>
        </el-form-item>

        <el-form-item label="行政职位">
          <div>{{form.AdministrativePost}}</div>
        </el-form-item>

        <el-form-item label="工作单位" prop="Organization">
          <div>{{form.Organization}}</div>
        </el-form-item>

        <el-form-item label="通讯地址" prop="Address">
          <div>{{form.Address}}</div>
        </el-form-item>

        <el-form-item label="邮政编码" prop="postcode">
          <div>{{form.postcode}}</div>
        </el-form-item>

        <el-form-item label="学术兼职" prop="AcademicJob">
          <div>{{form.AcademicJob}}</div>
        </el-form-item>

        <el-form-item label="个人简历" prop="Resume">
          <div>{{form.Resume}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header/index";
import Cookie from "../../utils/cookie";
export default {
  components: {
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
        Mobile: null,
        Fax: null,
        Email: null,
        HighestAcademic: null,
        HighestDegree: null,
        Organization: null,
        Address: null,
        AcademicJob: null,
        Resume: null,
        IsSupervisor: null,
        ResearchDirection: null,
        TechnicalPosition: null,
        FirstForeignLang: null,
        FirstForeignLangLevel: null,
        SecondForeignLang: null,
        SecondForeignLangLevel: null
      },
      expertId: 0
    };
  },
  mounted() {
    if (this.$route.path === "/new");
    else {
      const { id } = this.$route.params;
      this.expertId = id;
      const token = `Bearer ${Cookie.getCookie("lan_token")}`;
      fetch(`/api/Experts/${this.expertId}`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(res => {
          this.form = res;
        });
    }
  }
};
</script>

<style scoped>
.line {
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
  border-color: #409eff;
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
.app-container {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  background-color: white;
}
</style>
