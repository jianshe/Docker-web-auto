import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/news/list',
    method: 'get',
    params: query
  })
}

export function fetchNew(id) {
  return request({
    url: '/news/detail',
    method: 'get',
    params: { id }
  })
}
export function createNew(data) {
  return request({
    url: '/news/create',
    method: 'post',
    data
  })
}

export function updateNew(data) {
  return request({
    url: '/news/update',
    method: 'post',
    data
  })
}

export function deleteNew(params) {
  return request({
    url: '/news/delete',
    method: 'get',
    params: params
  })
}
