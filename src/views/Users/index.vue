<!-- eslint-disable vue/no-dupe-keys -->
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
        <el-input
          @clear="getUserList"
          clearable
          placeholder="请输入内容"
          v-model="obj.query"
        >
          <el-button
            @click="getUserList"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <!-- 添加用户 -->
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="userlist" border style="width: 100%">
        <!-- id -->
        <el-table-column type="index" label="#" width="60"> </el-table-column>
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
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 编辑用户按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除用户按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeDeleteDialog(scope.row.id)"
            ></el-button>
            <!-- 设置用户按钮 -->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="installDialog = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <!-- pagesize当前每页显示多少条 pagenum当前的页数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="obj.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="obj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!------------------------------------ 用户弹窗 -------------------------------------------->
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
          <el-input
            debounce="500"
            v-model="form.email"
            autocomplete="off"
          ></el-input>
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
    <!-- 编辑用户 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      @close="editDialogClosed"
    >
      <el-form :model="editform" :rules="editrules" ref="editFormRef">
        <!-- 用户名 -->
        <el-form-item
          label="用户名称"
          prop="username"
          :label-width="formLabelWidth"
          hide-required-asterisk
        >
          <el-input
            disabled
            v-model="editform.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input
            debounce="500"
            v-model="editform.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item
          label="手机号"
          prop="mobile"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除用户 -->
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
      <span class="el-icon-warning">此操作将永久删除该用户，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 设置用户 -->
    <el-dialog title="分配新角色" :visible.sync="dialogFormVisible2">
      <p>当前的用户</p>
      <p>当前的角色</p>
      <el-form>
        <el-form-item label="分配角色" :label-width="formLabelWidth">
          <el-select v-model="value1" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validateMobile, validateEmail } from '@/utils/validate' // 引入手机，邮箱封装方法
import { addUser, user, searchUser, editUser, deleteUser } from '@/api/user' // 引入封装api
export default {
  name: 'User', // 组件命名
  created () {
    this.getUserList() // 开局刷新
  },
  data () {
    // 二次校验
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
      /* 弹窗 */
      dialogFormVisible: false, // 添加用户，控制添加用户对话框的编辑与隐藏
      editDialogVisible: false, // 编辑用户，控制编辑用户对话框的显示与隐藏
      deleteDialogVisible: false, // 删除用户，控制删除用户对话框的显示与隐藏
      dialogFormVisible2: false, // 设置用户，控制删除用户对话框的显示与隐藏
      value1: '', // 设置表单
      // 添加用户规则
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户对象
      editform: {
      },
      // 添加用户规则
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
      // 编辑用户规则
      editrules: {
        username: [
          { message: '请输入用户名', trigger: 'blur' },
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
      total: 0, // 合计条数
      obj: {
        query: '', pagenum: 1, pagesize: 5
      },
      userlist: [],
      formLabelWidth: '80px'
    }
  },
  methods: {
    /* 获取初始数据 */
    async getUserList () {
      try {
        // pagesize每页显示条数  pagenum当前页码
        const res = await user(this.obj)
        console.log(res)
        this.userlist = res.data.data.users
        this.total = res.data.data.total
      } catch (err) { this.$message.error('校验失败') }
    },
    /* 分页 */
    handleSizeChange (val) {
      this.obj.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
      this.getUserList()
    },
    // 重置添加用户表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 重置编辑用户表单
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 添加用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        try {
          const res = await addUser(this.form)
          console.log('2', res)
          this.formlist = res.data.data
          if (res.data.meta.status !== 201) {
            this.$message.error('添加用户失败')
          } else {
            this.$message.success('添加用户成功')
          }
          this.dialogFormVisible = false
        } catch (err) { console.log(err) }
      })
      this.getUserList()
    },
    // 获取用户id
    async showEditDialog (row) {
      console.log(row)
      try {
        // console.log(row.id)
        const res = await searchUser(row.id)
        console.log('id', res)
        this.editform = res.data.data
      } catch (err) { console.log(err) }
      this.editDialogVisible = true
    },
    // 编辑用户数据
    async editUserInfo () {
      const data = {
        id: this.editform.id,
        email: this.editform.emali,
        mobile: this.editform.mobile
      }
      try {
        const res = await editUser(data)
        console.log('1236', res)
        if (res.data.meta.status !== 200) { return this.$message.error('编辑用户失败') }
        // 关闭弹窗
        this.editDialogVisible = false
        // 刷新列表
        this.getUserList()
        // 提示成功
        this.$message.success('编辑用户成功')
      } catch (err) { console.log(err) }
    },
    // 删除用户
    async removeDeleteDialog (id) {
      console.log('160', id)
      const result = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      if (result !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      console.log(result)
      const res = await deleteUser(id)
      console.log(res)
      if (res.data.meta.status !== 200) {
        this.$message.error('删除失败')
      } else {
        this.$message.error('删除成功')
      }
      // 刷新列表
      this.getUserList()
    }
    // 设置用户
  },

  computed: {},
  watch: {},
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
/* 设置 */
.el-dialog p {
  margin-left: 12px;
}
</style>
