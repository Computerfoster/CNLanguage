<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">

        <el-form-item prop="Username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.Username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="PasswordHash">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.PasswordHash"
            :type="passwordType"
            placeholder="Password"
            name="PasswordHash"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        Username: '',
        PasswordHash: ''
      },
      registeredForm: {
        Username: '',
        PasswordHash: '',
        Role:''
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  mounted(){
    if(cookie.checkCookie('lan_token')){
      this.$router.push('/manage');
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.PasswordHash.focus()
      })
    },
    handleLogin() {
      fetch(`/api/Users/login`, {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(this.loginForm)
      }).then(res => {
      if(res.ok){
        return res.json()
      }
      }).then(res => {
          cookie.setCookie('userId', res.id);
          cookie.setCookie('lan_token', res.token);
          cookie.setCookie('role', res.role);
          this.$router.push('/manage');
      })
    }
  }
}
</script>

<style lang="scss">
$light_gray:#fff;
$dark_gray:#889aa4;

/* reset element-ui css */
.login-container {
  box-sizing: border-box;
  border: 0px;
  height: 100vh;
  background: url("../../assets/background.jpeg") no-repeat top left;
  background-size: 100%;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $dark_gray;
      height: 47px;
    }
  }

   .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 30px 20px;
  }

 

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

 .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .box-card {
    width: 480px;
    height: 300px;
    left: 50%;
    margin-left: -230px;
    position: fixed;
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0,0,0,.1);
    top: 37%;
  }
}
</style>