<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <el-table :data="rightsData" border style="width: 100%" ref="filterTable">
        <!-- id -->
        <el-table-column type="index" label="#" width="55"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="400">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="400">
        </el-table-column>
        <el-table-column
          prop="level"
          label="权限等级"
          width="400"
          :filters="[
            { text: '等级一', value: '等级一' },
            { text: '等级二', value: '等级二' },
            { text: '等级三', value: '等级三' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          >>
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.level === '0'
                  ? ''
                  : scope.row.level === '1'
                  ? 'success'
                  : 'warning'
              "
              disable-transitions
              >{{
                scope.row.level === "0"
                  ? "等级一"
                  : scope.row.level === "1"
                  ? "等级二"
                  : "等级三"
              }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { rights } from '@/api/rights'
export default {
  name: 'Rights',
  created () {
    this.getRights()
  },
  data () {
    return {
      rightsData: []
    }
  },
  methods: {
    async getRights () {
      const res = await rights('list')
      console.log('qwe', res)
      this.rightsData = res.data.data
    },
    filterTag (value, row) {
      return row.level === value
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
}
</style>
