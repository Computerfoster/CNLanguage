<template>
  <div class="container">
    <div class="header">
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                     <span class="svg-container">
                         <svg-icon icon-class="user" style="width: 25px; height: 25px;" />
                     </span>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item v-if="role" divided>
                        <span style="display:block;" @click="addAdmin">添加管理员</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
  </div>
</template>

<script>
import cookie from '../../utils/cookie'

export default {
  name: 'Header',
  data () {
    return {
      open: false,
      avatar: "",
      role: false
    }
  },
  mounted(){
    if(cookie.getCookie('role') === 'Superadmin'){
      this.role = true;
    }
  },
  methods: {
    logout () {
      Cookie.delCookie('lan_token')
      Cookie.delCookie('userId')
      Cookie.delCookie('role')
      this.$router.push(`/`)
    },
    addAdmin(){
      this.$router.push(`/addAdmin`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container{
  background-color: white;
  .header{
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      // box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(255, 255, 255, 0);
      justify-content:space-between;
      align-items: center;
      top: 0;
      left: 0;
      font-size: 18px;
      z-index: 99;
      img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        vertical-align: middle;
        margin-right: 10px;
      }
      .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
          outline: none;
        }
      }
    }
}

</style>
