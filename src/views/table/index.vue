<template>
<div>
  <Header />
    <div class="app-container">
      <el-button
        size="medium"
        @click="add"
        type="primary"
        class="button-add"
      >
      增加成员</el-button>
      <el-upload
        ref="upload"
        action="/"
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false">
        <el-button
          slot="trigger"
          icon="el-icon-upload"
          size="small">
          批量导入
        </el-button>
       </el-upload>
      <el-button
        size="medium"
        @click="detele"
        class="button-delete"
        @click="exportFunc"
      >
      批量导出</el-button>
      <div class="select">
        <span style="color: #889aa4; font-size: 14px;">选择年龄段:</span>
        <el-input
          style="width: 55px;"
          v-model="lowAge">
        </el-input>
        <span>-</span>
        <el-input
          style="width: 55px; margin-right: 10px;"
          v-model="upAge">
        </el-input>
        <el-select v-model="searchs" placeholder="请选择检索字段">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          class="search"
          v-model="searchValue">
        </el-input>
        <el-button
          size="medium"
          @click="search"
          type="primary"
          class="button-add"
          >
          检索</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        :header-cell-style="{background:'#F5F5F5'}"
        element-loading-text="拼命加载中"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          align="center"
          width="40"
        >
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名" width="95">
        </el-table-column>
        <el-table-column align="center" label="照片" width="135">
          <template slot-scope="scope">
            <img :src="scope.row.picture" width="40" height="40" />
          </template>
        </el-table-column>
        <el-table-column label="性别" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender ? "女" : "男" }} 
          </template>
        </el-table-column>
        <el-table-column label="出生年月" width="200" align="center">
          <template slot-scope="scope">
            {{ new Date(scope.row.birthday).getFullYear() + '-' + (new Date(scope.row.birthday).getMonth() + 1 < 10 ? '0'+new Date(scope.row.birthday).getMonth() : new Date(scope.row.birthday).getMonth() + 1) + '-' + new Date(scope.row.birthday).getDate() + ' ' }}
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="工作单位">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '审核未通过' ? 'danger' : ('审核中' ? 'primary' : 'success')"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="todetail(scope.row)"
            >
              编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="todetail(scope.row)"
            >
              查看详情</el-button>
            <el-button
              size="mini"
              v-if="judgeRole"
              @click="passExpert(scope.row)"
            >
              审核通过</el-button>
            <el-button
              size="mini"
              v-if="judgeRole"
              type="danger"
              @click="refuseExpert(scope.row)"
            >
              审核通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="20"
        :pager-count="11"
        @current-change="handleCurrentChange(page)"
        :current-page.sync="page"
        layout="prev, pager, next"
        :total="totalPage"
        class="page"
      >
      </el-pagination>
    </div>
</div>
</template>

<script>
import Header from '../../components/Header/index'
import Cookie from '../../utils/cookie'
import XLSX from 'xlsx'
import FileSaver from 'file-saver';

export default {
  components:{
    Header
  },
  data() {
    return {
      list: null,
      listLoading: true,
      totalPage: null,
      page: 1,
      searchs:'',
      options: [{
        value: 'Name',
        label: '姓名'
      }, {
        value: 'Gender',
        label: '性别'
      },
      {
        value: 'Address',
        label: '工作单位'
      },
      {
        value: 'Status',
        label: '状态'
      }],
      searchValue:'',
      lowAge: null,
      upAge: null,
      xlsxJson: null,
      multipleSelection: [],
      downloadLoading: false,
    }
  },
  components: {
    FileSaver,
    XLSX
  },
  created() {
    this.handleCurrentChange(1)
  },
  mounted(){
    this.handleCurrentChange(1);
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    add(){
      this.$router.push({ path: `/new` })
    },
    search(){
      this.handleCurrentChange(1);
    },
    todetail(row) {
      this.$router.push({ path: `/manage/edit/${row.id}` })
    },
    judgeRole(){
      if(Cookie.getCookie('role') === 'Superadmin' || Cookie.getCookie('role') === 'admin'){
        return true;
      }else{
        return false;
      }
    },
    passExpert(row){
      const token = `Bearer ${Cookie.getCookie('lan_token')}`;
      fetch(`/api/Experts/approve/${row.id}`,{
          method: 'GET',
          headers: {
            Authorization: token,
          }.then(res => {
          if(res.ok) {
            this.$message({
              message: 'pass',
              type: 'success'
            })
            this.handleCurrentChange(this.page)
          }
        })
      })
    },
    refuseExpert(row){
      const token = `Bearer ${Cookie.getCookie('lan_token')}`;
      fetch(`/api/Experts/disapprove/${row.id}`,{
          method: 'GET',
          headers: {
            Authorization: token,
          }.then(res => {
          if(res.ok) {
            this.$message({
              message: '审核驳回',
              type: 'error'
            })
            this.handleCurrentChange(this.page)
          }
        })
      })
    },
    handleDelete(index, row){
      const token = `Bearer ${Cookie.getCookie('lan_token')}`;
      fetch(`/api/Experts/${row.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          }
        }).then(res => {
          if(res.ok) {
            this.handleCurrentChange(this.page)
          }
        })
      },
    importExcel(file) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
      if (!fileType) {
        alert('格式错误！请重新选择')
        return
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson.sheet
          xlsxJson.map(sheet=>{
            let time = new Date((sheet.birthday - 1) * 24 * 3600000 + 1)
            time.setYear(time.getFullYear() - 70)
            let year = time.getFullYear() + ''
            let month = time.getMonth() + 1 + ''
            let date = time.getDate() + ''
            sheet.birthday = '' + new Date(year + '-' + month + '-' + date).getTime()
            const token = `Bearer ${Cookie.getCookie('lan_token')}`
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
                  this.handleCurrentChange(1);
                });
              }
              else{
                this.$alert('添加失败，请重新尝试', {
                  confirmButtonText: '确定'
                })
              }
            })
          })
        }
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file.raw)
      })
    },
    // exportFunc(e) {
    //   // 从表生成工作簿对象
    //   var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
    //   // 得到二进制字符串作为输出
    //   var wbout = XLSX.write(wb, {
    //     bookType: 'xlsx',
    //     type: 'binary'
    //   });
    //   FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
    //     type: 'application/octet-stream'
    //   }), 'a.xlsx');
    // },
    // s2ab: function(s) {
    //   var cuf;
    //   var i;
    //   if (typeof ArrayBuffer !== 'undefined') {
    //     cuf = new ArrayBuffer(s.length);
    //     var view = new Uint8Array(cuf);
    //     for (i = 0; i !== s.length; i++) {
    //       view[i] = s.charCodeAt(i) & 0xFF;
    //     }
    //     return cuf;
    //   } else {
    //     cuf = new Array(s.length);
    //     for (i = 0; i !== s.length; ++i) {
    //       cuf[i] = s.charCodeAt(i) & oxFF;
    //     }
    //     return cuf;
    //   }
    // },
      handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['姓名', '性别', '出生年月', '工作单位', '状态']
          const filterVal = ['name', 'gender', 'birthday', 'address', 'status']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    handleCurrentChange(page) {
      this.listLoading = true
      const token = `Bearer ${Cookie.getCookie('lan_token')}`;
      if(this.upAge !== '' || this.lowAge !== ''){
        if(this.searchValue !== '' && this.search !== ''){
          fetch(`/api/Experts?${searchs}=${searchValue}&Age=${0+lowAge}-${0+upAge}&Page=${page}&Limit=20`,{
            method: 'GET',
            headers: {
            Authorization: token,
            }
          }).then(res => {
            if(res.ok) {
              this.list = res.experts,
              this.totalPage = res.totalPage,
              this.listLoading = false
            }
          })
        }else{
          fetch(`/api/Experts?Age=${0+lowAge}-${0+upAge}&Page=${page}&Limit=20`,{
            method: 'GET',
            headers: {
            Authorization: token,
            }
          }).then(res => {
            if(res.ok) {
              this.list = res.experts,
              this.totalPage = res.totalPage,
              this.listLoading = false
            }
          })
        }
      }else{
        fetch(`/api/Experts?Page=${page}&Limit=20`, {
          method: 'GET',
          headers: {
            "Content-Type":"application/json",
            Authorization: token
          },
          }).then(res => {
          if(res.ok){
            return res.json()
          }
          }).then(res => {
            this.list = res.experts,
            this.totalPage = res.totalPage,
            this.listLoading = false
        })
      }
      }
  }
}
</script>

<style lang="scss">
.page{
  text-align: center;
  margin-top: 20px;
  height: 30px;
}
.app-container{
  width: 95%;
  margin: 20px auto;
  border-radius: 5px;
  // box-shadow: 0 0 30px rgba(0,0,0,.1);
  background-color: white
}
.button-add{
  margin-bottom: 20px;
}
.select{
  float: right;
}
.search{
  width: 200px;
  margin-left: 15px;
}

</style>
