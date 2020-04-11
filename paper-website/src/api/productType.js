import request from '@/utils/request'

export function fetchTypeList(params) {
  return request({
    url: '/productTypes/list',
    method: 'get',
    params: params
  })
}

export function getProductTypeById(params) {
  return request({
    url: '/productTypes/getProductType',
    method: 'get',
    params: params
  })
}
export function getTotalTypeList(params) {
  return request({
    url: '/productTypes/total',
    method: 'get',
    params: params
  })
}

export function createProductType(data) {
  return request({
    url: '/productTypes/create',
    method: 'post',
    data
  })
}

export function updateProductType(data) {
  return request({
    url: '/productTypes/update',
    method: 'post',
    data
  })
}

export function deleteProductType(params) {
  return request({
    url: '/productTypes/delete',
    method: 'get',
    params: params
  })
}
