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
        @click="
          dialogFormVisible = true;
          isEdit = false;
          roleform = {};
        "
        >添加角色</el-button
      >
      <!-- 表格 -->
      <el-table :data="roleslist" border style="width: 100%">
        <!-- # -->
        <!-- 展开列 -->
        <el-table-column type="expand" label="#" width="70">
          <template slot-scope="scope">
            <el-row
              :class="['botto', i1 === 0 ? 'bbtop' : '', 'center']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5"
                ><el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                  :class="[i2 !== 0 ? 'bbtop' : '', 'center']"
                >
                  <el-col :span="6"
                    ><el-tag type="success">{{ item2.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i
                  ></el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="removeId(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
              @click="allotVisible(scope.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-------------------------- 弹窗 ----------------------------------->
    <!-- 添加/编辑角色弹窗 -->
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
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
        <el-button type="primary" @click="onClick">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限弹窗 -->
    <el-dialog title="提示" :visible.sync="settingVisible" width="30%">
      <span>分配权限</span>
      <!-- 树形图 -->
      <el-tree
        :props="{ label: 'authName' }"
        :data="treeData"
        default-expand-all
        node-key="id"
        show-checkbox
        setChecked
        :default-checked-keys="selectedPermissions"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingVisible = false">取 消</el-button>
        <el-button type="primary" @click="settingVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { rights } from '@/api/rights'
import { rolesList, addRoles, editRoles, delRole, rolesRight, delRolesRights } from '@/api/roles'
export default {
  created () {
    this.getRolesList()
  },
  data () {
    return {
      props: {
        label: 'authName',
        children: 'zones'
      },
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
      dialogFormVisible: false, // 控制添加/编辑角色弹窗的显隐
      // removeDeleteDialog: false, // 控制删除角色弹窗
      roleform: { // 参数
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '80px',
      isEdit: false, // 控制添加还是编辑
      id: 0,
      rightId: 0,
      settingVisible: false, // 分配权限弹窗
      treeData: [], // 分配权限数据
      selectedPermissions: [] // 默认选中节点的id值数组
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
    // 删除权限弹窗
    async removeId (row, id) {
      console.log(row, id)
      this.id = row.id
      this.rightId = id
      const confilmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confilmResult)
      if (confilmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res1 = await delRolesRights(this.id, this.rightId)
      console.log('res1', res1)
      row.children = res1.data.data

      // this.getRolesList()
    },
    // 重置表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加/编辑用户（弹窗确定按钮）
    async onClick () {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        try {
          if (this.isEdit) {
            const res = await editRoles(this.id, this.roleform)
            console.log('edit', res)
            if (res.data.meta.status === !200) {
              this.$message.error('角色编辑失败')
            } else {
              this.$message.success('角色编辑成功')
            }
          } else {
            const res = await addRoles(this.roleform)
            console.log('add', res)
            if (res.data.meta.status === !201) {
              this.$message.error('角色创建失败')
            } else {
              this.$message.success('角色创建成功')
            }
          }
        } catch (err) {
          console.log(err)
        }
        this.dialogFormVisible = false
        this.getRolesList()
      })
    },
    // 编辑用户（点击进入按钮）
    showEditDialog (row) {
      this.isEdit = true // 编辑角色
      this.id = row.id
      this.dialogFormVisible = true // 弹窗出现
      console.log('row', row)
      this.roleform = { ...row } // 浅拷贝
    },
    // 删除用户
    // eslint-disable-next-line vue/no-dupe-keys
    removeDeleteDialog (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delRole(id)
        console.log('del', res)
        if (res.data.meta.status === 200) {
          this.$message.success('角色删除成功')
          this.getRolesList() // 刷新
        } else {
          this.$message.error('角色删除失败')
        }
      })
    },
    // 分配权限
    async allotVisible (id) {
      console.log(id)
      const res = await rights('tree')
      console.log('tree', res)
      this.treeData = res.data.data // 权限树状列表
      this.settingVisible = true// 弹窗出现
      // 获取当前的权限
      const res1 = await rolesRight(this.id, { rid: this.rightId })
      console.log(res1)
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
/* 展开列 */
.el-tag {
  margin: 10px;
}
.botto {
  margin-left: 70px;
  margin-right: 70px;
  border-bottom: 1px solid #eee;
}
.bbtop {
  border-top: 1px #eee solid;
}
.center {
  display: flex;
  align-items: center;
}
</style>
