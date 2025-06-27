import request from '@/utils/request'

//查询全部部门
export const queryAllApi = () => {
    return request({
        url: '/depts?apifoxApiId=314707462',
        method: 'get'
    })
}