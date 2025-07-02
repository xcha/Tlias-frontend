import request from '@/utils/request'

//查询班级列表数据
export const queryPageApi = (name, begin, end, page, pageSize) => 
  request.get(`/clazzs?name=${name || ''}&begin=${begin || ''}&end=${end || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)


//查询全部班级
export const queryAllApi = () => {
    return request({
        url: '/clazzs/list',
        method: 'get'
    })
}

export const addApi = (dept) => {
    return request({
        url: '/clazzs',
        method: 'post',
        data: dept
    })
}

export const queryByIdApi = (id) => {
    return request({
        url: '/clazzs/' + id ,
        method: 'get'
    })
}

export const updateApi = (clazz) => {
    return request({
        url: '/clazzs',
        method: 'put',
        data: clazz
    })
}

export const deleteByIdApi = (id) => {
    return request({
        url: '/clazzs/' + id ,
        method: 'delete'
    })
}
