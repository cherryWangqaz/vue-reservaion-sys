import request from '@/utils/request'

export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: `/order/update/${data['id']}`,
    method: 'put',
    data
  })
}

export function getOrderList() {
  return request({
    url: '/order',
    method: 'get'
  })
}



// export function getOrderwithCondition(data) {
//   return request({
//     url: '/order/withCondition',
//     method: 'get',
//     params:{data}
//   })
// }