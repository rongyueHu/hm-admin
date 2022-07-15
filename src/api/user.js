// 用户登录
import request from '@/utils/request'

/**
 * 登录
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
/**
 *
 * @param {用户数据列表} param0
 * @returns
 */
export const user = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    method: 'GET',
    params: {
      query, pagenum, pagesize
    }
  })
}
/**
 *
 * @param {添加用户} form
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username, password, email, mobile
    }
  })
}
/* 查询 */
/* {
  "data": {
    "id": 503,
    "username": "admin3",
    "role_id": 0,
    "mobile": "00000",
    "email": "new@new.com"
  },
  "meta": {
    "msg": "查询成功",
    "status": 200
  }
} */
/**
 *根据id查询用户参数
 * @param {} id
 * @returns
 */
export const searchUser = (id) => {
  return request({
    url: `users/${id}`,
    params: { id }
  })
}
/* 编辑用户 */
/* 200表示成功，500表示失败 */
/* {
  "data": {
  "id": 503,
  "username": "admin3",
  "role_id": 0,
  "mobile": "111",
  "email": "123@123.com"
  },
  "meta": {
    "msg": "更新成功",
      "status": 200
  }
} */
/**
 *编辑用户提交
 * @param {*} param0
 * @returns
 */
export const editUser = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      id, email, mobile
    }
  })
}

/* 删除单个用户 */
/* {
  "data": null,
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
} */
/**
 *删除用户
 * @param {*} id
 * @returns
 */
export const deleteUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`,
    data: {
      id
    }
  })
}

/* 分配用户角色 */
/* {
  "data": {
    "id": 508,
    "rid": "30",
    "username": "asdf1",
    "mobile": "123123",
    "email": "adfsa@qq.com"
  },
  "meta": {
    "msg": "设置角色成功",
    "status": 200
  }
} */

export const roleUser = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      id, rid
    }
  })
}
