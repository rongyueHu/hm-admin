// 角色管理
import request from '@/utils/request'
/* {
  "data": [
    {
      "id": 30,
      "roleName": "主管",
      "roleDesc": "技术负责人",
      "children": [
        {
          "id": 101,
          "authName": "商品管理",
          "path": null,
          "children": [
            {
              "id": 104,
              "authName": "商品列表",
              "path": null,
              "children": [
                {
                  "id": 105,
                  "authName": "添加商品",
                  "path": null
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
} */
/**
 *角色列表
 * @returns
 */
export const rolesList = () => {
  return request({
    url: 'roles'
  })
}
// 添加角色
/*
{
  "data": {
    "roleId": 40,
    "roleName": "admin2",
    "roleDesc": "admin2Desc"
  },
  "meta": {
    "msg": "创建成功",
    "status": 201
  }
} */
/**
 *
 * @param {添加角色} param0
 * @returns
 */
export const addRoles = ({ roleName, roleDesc }) => {
  return request({
    url: 'roles',
    method: 'POST',
    data: {
      roleName, roleDesc
    }
  })
}
// 编辑角色
/**
 *
 * @param {角色id} id
 * @param {角色名称及描述} param1
 * @returns
 */
export const editRoles = (id, { roleName, roleDesc }) => {
  return request({
    url: `roles/${id}`,
    method: 'PUT',
    data: {
      roleDesc,
      roleName
    }
  })
}

/*
{
  "data": null,
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
} */
// 删除角色
export const delRole = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'DELETE'
  })
}

// 角色授权
/*
{
  "data": null,
  "meta": {
    "msg": "更新成功",
    "status": 200
  }
} */
/**
 *
 * @param {角色id} roleld
 * @param {权限id列表} param1
 * @returns
 */
export const rolesRight = (roleld, { rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleld}/rights`,
    data: { rids }
  })
}

// 删除角色指定权限
export const delRolesRights = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
