import request from '@/utils/request'

//查询全部部门
export const queryAllApi = () => {
    return request({
        url: '/depts',
        method: 'get'
    })
}

export const addApi = (dept) => {
    return request({
        url: '/depts',
        method: 'post',
        data: dept
    })
}

export const queryByIdApi = (id) => {
    return request({
        url: '/depts/' + id ,
        method: 'get'
    })
}

export const updateApi = (dept) => {
    return request({
        url: '/depts',
        method: 'put',
        data: dept
    })
}

export const deleteByIdApi = (id) => {
    return request({
        url: '/depts?id=' + id ,
        method: 'delete'
    })
}
