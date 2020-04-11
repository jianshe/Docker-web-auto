import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/products/list',
    method: 'get',
    params: query
  })
}

export function getLatestProducts(query) {
  return request({
    url: '/products/getProductList',
    method: 'get',
    params: query
  })
}
export function createProduct(data) {
  return request({
    url: '/products/create',
    method: 'post',
    data
  })
}

export function deleteProduct(params) {
  return request({
    url: '/products/delete',
    method: 'get',
    params: params
  })
}
export function getProductDetail(params) {
  return request({
    url: '/products/findById',
    method: 'get',
    params: params
  })
}

