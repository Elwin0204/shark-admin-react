/**
 * @author Elwin
 * @description 默认网路配置
 **/

const network = {
  baseURL: import.meta.env.VITE_API_URL,
  // 文件服务地址
  fileURL: import.meta.env.VITE_FILE_URL,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 是否启用mock
  isMock: true,
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 30000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //登录失效code
  invalidCode: 401,
  //无权限code
  noPermissionCode: 403,
  // 资源不存在
  noFoundCode: 404,
}
export default network
