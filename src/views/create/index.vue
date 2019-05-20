// 添加管理员
<template>
    <div class="app-container">
        <el-form ref="form" :rules="rules" :model="registeredForm" label-width="150px">

            <h2 class="h2_local">添加管理员信息</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registeredForm.Username" style="width: 30%;" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registeredForm.Password" style="width: 30%;" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="registeredForm.Role" placeholder="请选择" style="width: 30%;">
                    <el-option label="管理员" value="Admin" />
                    <el-option label="用户" value="User" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleAdd" class="button_local">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import Header from '../../components/Header/index'
import cookie from "../../utils/cookie.js"


export default {
    data(){
        return {
            registeredForm: {
                Username: '',
                Password: '',
                Role:''
            }
        }
    },

    rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
    },

    methods:{
        // 添加管理员函数
        handleAdd(){
            const token = `Bearer ${Cookie.getCookie('lan_token')}`
            fetch(`/api/Users`,{
                method:"POST",
                headers:{
                    Authorization: token,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(this.registeredForm)
            }).then(
                function(res){
                    if(res.ok){
                        this.$alert('添加成功',{
                            confirmButtonText: '确定'
                        }).then(()=>{
                            this.$router.push({ path: `/addAdmin` })
                        })
                    }
                    else{
                        this.$alert('添加失败，请重新尝试', {
                            confirmButtonText: '确定'
                        })
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
.app-container{
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    background-color: white;
  }

.el-form-item__label{
    text-align:center!important
}

.h2_local{
     margin:10px 5px 15px 215px;
}

.button_local{
    margin:10px 5px 15px 130px;
}
</style>

