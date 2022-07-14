<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表 -->
    <div class="container">
      <!-- 搜索区 -->
      <div class="search">
        <el-input placeholder="请输入内容" v-model="userlist.query">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="user"
          ></el-button>
        </el-input>
        <!-- 添加用户 -->
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="userlist.users" border style="width: 100%">
        <!-- id -->
        <el-table-column prop="id" label="#" width="60"> </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="username" label="姓名" width="250">
        </el-table-column>
        <!-- 电话 -->
        <el-table-column prop="mobile" label="电话" width="250">
        </el-table-column>
        <!-- 角色 -->
        <el-table-column prop="role_name" label="角色" width="250">
        </el-table-column>
        <!-- 状态 -->
        <!-- 作用域插槽决定了属性，就可以将父级prop删除 -->
        <el-table-column label="状态" width="250"
          ><template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column prop="handle" label="操作">
          <div class="handle">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="open"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
            <el-button type="warning" icon="el-icon-setting"></el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userlist.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加用户弹窗 -->
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户对话框"
      :visible.sync="dialogFormVisible"
      @close="addDialogClosed"
    >
      <el-form :model="form" :rules="rules" ref="addFormRef">
        <!-- 用户名 -->
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item
          label="手机号"
          prop="mobile"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--  <AddUser></AddUser> -->
  </div>
</template>

<script>
// import { Message } from 'element-ui'
import { validateMobile, validateEmail } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { addUser } from '@/api/user'

// import AddUser from './components/AddUser.vue'
export default {
  name: 'user',
  created () {
    this.user()
  },
  data () {
    const validateMobileFn = (rule, value, callback) => {
      if (validateMobile(value)) {
        callback()
      } else {
        // callback()校验通过 callback(new Error()) 校验失败
        callback(new Error('手机号码格式不正确'))
      }
    }
    const validateEmailFn = (rule, value, callback) => {
      if (validateEmail(value)) {
        callback()
      } else {
        // callback()校验通过 callback(new Error()) 校验失败
        callback(new Error('邮箱格式不正确'))
      }
    }
    return {
      //  queryInfo: { query: '', pagenum: 1, pagesize: 2 }, // input
      /* 弹窗 */
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formlist: {}, // 添加用户
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: validateEmailFn, trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateMobileFn, trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px',
      /* 分页 */
      currentPage4: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    async user () {
      try {
        await this.$store.dispatch('user/user', { query: null, pagenum: 1, pagesize: 5 })
      } catch (err) { this.$message.error('校验失败') }
    },
    // 重置表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        const res = await addUser(this.form)
        console.log('2', res)
        this.formlist = res.data.data
      })
    }
    // 编辑用户
  },
  computed: {
    ...mapGetters(['userlist'])
  },
  watch: {
  },
  filters: {},
  components: {}

}
</script>

<style scoped lang='less'>
.container {
  padding: 20px;
  background-color: #fff;
  margin-top: 15px;
  .search {
    margin-bottom: 20px;
    .el-input {
      width: 533px;
      height: 40px;
      margin-right: 30px;
      .el-input__inner {
        padding: 0 30px 0 15px;
      }
    }
  }
}
.handle {
  width: 180px;
  .el-button {
    width: 44px;
    height: 28px;
    padding: 7px 15px;
  }
}
/* 分页 */
.block {
  margin-top: 20px;
}
</style>
