/**
 * @author Elwin
 * @description 默认网路配置
 **/

const network = {
  // 默认的接口地址 如果是开发环境和生产环境走sk-mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL: import.meta.env.VITE_API_URL,
  //  接口域名的管理，针对对接不同业务系统的情况
  baseURLs: {
    test: import.meta.env.VITE_API_URL,
    baidu: import.meta.env.VITE_API_URL_BAIDU,
    google: import.meta.env.VITE_API_URL_GOOGLE,
  },
  // 文件服务地址
  fileURL: import.meta.env.VITE_FILE_URL,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json',
  // contentType: 'application/json;charset=UTF-8',
  // 是否启用mock
  isMock: true,
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 5000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  // 资源不存在
  noFoundCode: 404,
}
export default network
