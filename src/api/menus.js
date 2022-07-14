// 左侧权限
import request from '@/utils/request'
/**
 *
 * @returns
 */
export const menus = () => {
  return request({
    url: 'menus'
  })
}
