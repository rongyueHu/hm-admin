// 校验登录规则
// 校验手机号码是否满足要求
// 封装可全局调用
/**
 *校验是不是手机号
 * @param {手机号} mobile
 * @returns
 */
export const validateMobile = (mobile) => {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(mobile)
}
/**
 *
 * @param {邮箱} email
 * @returns
 */
export const validateEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
/**
 *
 * @param {用户ID} id
 * @returns
 */
export const validateId = (id) => {
  const reg = /^\d{2}$/
  return reg.test(id)
}
