import request from '@/utils/request'
/**
 *列表
 * @param {所有权限列表} 值为列表或树状图
 * @returns
 */
export const rights = type => {
  return request({
    url: `rights/${type}`
  })
}
