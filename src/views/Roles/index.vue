<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 角色列表 -->
    <div class="container">
      <!-- 添加角色 -->
      <el-button
        class="button"
        type="primary"
        @click="dialogFormVisible = true"
        @
        >添加角色</el-button
      >
      <!-- 表格 -->
      <el-table :data="roleslist" border style="width: 100%">
        <!-- # -->
        <el-table-column type="expand" label="#" width="70">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- id -->
        <el-table-column type="index" label="#" width="70"> </el-table-column>
        <!-- 角色名称 -->
        <el-table-column prop="roleName" label="角色名称" width="373">
        </el-table-column>
        <!-- 角色描述 -->
        <el-table-column prop="roleDesc" label="角色描述" width="372">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="370px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
              :visible.sync="dialogFormVisible"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeDeleteDialog(scope.row.id)"
              >删除</el-button
            >
            <!-- 分配权限-->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="installDialog = true"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-------------------------- 弹窗 ----------------------------------->
    <!-- 添加角色弹窗 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisible"
      @close="addDialogClosed"
    >
      <el-form :model="roleform" :rules="rules" ref="addFormRef">
        <!-- 角色名称-->
        <el-form-item
          label="角色名称"
          prop="roleName"
          :label-width="formLabelWidth"
        >
          <el-input v-model="roleform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item
          label="角色描述"
          prop="roleDesc"
          :label-width="formLabelWidth"
        >
          <el-input
            debounce="500"
            v-model="roleform.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rolesList, addRoles } from '@/api/roles'
export default {
  created () {
    this.getRolesList()
  },
  data () {
    return {
      // 添加角色规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ]
      },
      roleslist: [], // 角色列表
      dialogFormVisible: false, // 控制添加角色弹窗的显隐
      roleform: { // 参数
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    async getRolesList () {
      try {
        const res = await rolesList()
        console.log(res)
        this.roleslist = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    // 重置表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户
    async addUser () {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        try {
          const res = await addRoles(this.roleform)
          console.log('re', res)
          if (res.data.meta.status === !201) {
            this.$message.error('角色创建失败')
          } else {
            this.$message.success('角色创建成功')
          }
          this.dialogFormVisible = false
        } catch (err) {
          console.log(err)
        }
        this.getRolesList()
      })
    },
    // 编辑用户
    showEditDialog (row) {
      this.dialogFormVisible = true
      console.log(row)
    }
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
  .button {
    margin-bottom: 20px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
