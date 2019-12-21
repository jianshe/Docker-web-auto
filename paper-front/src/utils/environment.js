export function interfaceUrl() {
  // sit,uat,prd
  // const nodeConfig = 'http://localhost:9527/dev-api'
  const nodeConfig = process.env.VUE_APP_BASE_API
  return nodeConfig
}
