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
