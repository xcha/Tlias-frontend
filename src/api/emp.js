import request from '@/utils/request'

//查询员工列表数据
export const queryPageApi = (name, gender, begin, end, page, pageSize) => 
  request.get(`/emps?name=${name || ''}&gender=${gender || ''}&begin=${begin || ''}&end=${end || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
// 新增员工
export const addApi = (emp) => request.post('/emps', emp)

// 修改员工
export const queryInfoApi = (id) => request.get(`/emps/${id}`)

export const updateApi = (emp) => request.put('/emps', emp)
