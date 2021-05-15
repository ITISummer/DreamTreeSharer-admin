import my_request from '@/utils/request'

export function getAllUser(params) {
  return my_request({
    url: '/admin/get-all-user',
    method: 'get',
    data: params
  })
}
