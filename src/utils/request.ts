import axios from 'axios'
import settings from '@config/index'
import qs from 'qs'
import * as lodash from 'lodash'
import { isArray } from './validate'
import { useUserStore, useSettingStore } from '@stores/index'
import { baseMessage } from './global'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from './serviceLoading'

const {
  baseURL,
  contentType,
  invalidCode,
  noPermissionCode,
  noFoundCode,
  requestTimeout,
  successCode,
  tokenName,
  loginInterception
} = settings

/**
 * @author Elwin
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const useHandleCode = (code: number, msg: string) => {
  const { resetAccessToken } = useUserStore()
  const navigator = useNavigate()
  switch (code) {
    // 402: 未登录或token过期， 清除token
    case invalidCode:
      baseMessage('error', msg || `后端接口${code}异常`)
      resetAccessToken()
      if (loginInterception) {
        location.reload()
      }
      break
    // 401: 无权限访问
    case noPermissionCode:
      console.log('code 401')
      navigator('/401')
      break
    // 404: 请求的资源不存在
    case noFoundCode:
      baseMessage('error', msg || `${code}：后端接口不存在`)
      break
    default:
      baseMessage('error', msg || `${code}：后端接口异常`)
      break
  }
}

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

instance.interceptors.request.use(
  (config) => {
    if (config.headers.isLoading !== false) {
      showLoading()
    }
    // fix: 没有参数时新增不上Content-Type
    if (!config.data) {
      config.data = true
    }
    // const { accessToken } = useUserStore()
    const accessToken = '123'
    if (accessToken) {
      config.headers[tokenName] = accessToken
    }
    //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    if (config.data) {
      config.data = lodash.pickBy(
        config.data,
        lodash.identity
      )
    }

    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(config.data)
    }
    console.log('config request', config)
    return config
  },
  (error) => {
    if (error.config.headers.isLoading !== false) {
      hideLoading()
    }
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.config.headers.isLoading !== false) {
      hideLoading()
    }
    const { data, config } = response
    const { code, msg } = data
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]]
    // 是否正常操作
    if (codeVerificationArray) {
      return data
    } else {
      useHandleCode(code, msg)
      return Promise.reject('shark-admin请求异常拦截:' +
      JSON.stringify({ url: config.url, code, msg }) || 'Error')
    }
  },
  (error) => {
    console.log('error', error)
    if (error.config.headers.isLoading !== false) {
      hideLoading()
    }
    const { response, message } = error
    // 请求已发出，但不在2xx范围
    if (response && response.data) {
      const { status,  data } = response
      useHandleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      // 处理断网的情况
      // eg: 请求超时或断网时，更新state的network状态
      // network状态在app.tsx中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      const { changeNetwork } = useSettingStore()
      if (!window.navigator.onLine) {
        changeNetwork(false)
      } else {
        let { message } = error
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        }
        if (message.includes('timeout')) {
          message = '后端接口请求超时'
        }
        if (message.includes('Request failed with status code')) {
          const code = message.substr(message.length - 3)
          message = '后端接口' + code + '异常'
        }
        baseMessage('error', message || `后端接口位置异常`)
        return Promise.reject(error)
      }
    }
  }
)

export default instance