import request from '@/utils/request'

export function getAllUser() {
  return request({
    url: '/admin/get-all-user',
    method: 'get',
    // data
  })
}
