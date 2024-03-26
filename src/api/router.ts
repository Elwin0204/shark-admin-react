import request from '@utils/request'

export function getRouterList() {
  return request({
    url: '/menu/navigate',
    method: 'post',
  })
}

export function getRouteList(data: any) {
  return request({
    url: '/menu/navList',
    method: 'post',
    data,
  })
}
