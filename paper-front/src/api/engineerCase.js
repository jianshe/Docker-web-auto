import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/engineerCase/list',
    method: 'get',
    params: query
  })
}

export function createEngineerCase(data) {
  return request({
    url: '/engineerCase/create',
    method: 'post',
    data
  })
}

export function deleteEngineerCase(params) {
  return request({
    url: '/engineerCase/delete',
    method: 'get',
    params: params
  })
}

export function findById(params) {
  return request({
    url: '/engineerCase/findById',
    method: 'get',
    params: params
  })
}

export function updateEngineerCase(data) {
  return request({
    url: '/engineerCase/update',
    method: 'post',
    data
  })
}
