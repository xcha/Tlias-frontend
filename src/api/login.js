import request from '@/utils/request'

//登录
export const loginApi = (data) => request.post('/login', data)

// src/api/login.js 中添加
export const updatePasswordApi = (data) => {
  return request({
    url: '/emps',
    method: 'put',
    data
  })
}