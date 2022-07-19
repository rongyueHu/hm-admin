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

export const editRoles = ({ id, roleName, roleDesc }) => {
  return request({
    url: `roles/${id}`,
    method: 'PUT',
    data: {
      roleDesc,
      roleName
    }
  })
}
