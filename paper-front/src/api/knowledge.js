import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/knowledge/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/knowledge/detail',
    method: 'get',
    params: { id }
  })
}
export function createKnowledge(data) {
  return request({
    url: '/knowledge/create',
    method: 'post',
    data
  })
}

export function updateKnowledge(data) {
  return request({
    url: '/knowledge/update',
    method: 'post',
    data
  })
}

export function deleteKnowledge(params) {
  return request({
    url: '/knowledge/delete',
    method: 'get',
    params: params
  })
}
