/**
 * @author Elwin
 * @description 导入所有 controller 模块，浏览器环境中自动输出controller文件夹下Mock接口。
 */
import Mock from 'mockjs'
import { paramObj } from '@/utils/index'

interface MockjsRequestOptions {
  url: string;
  type: string;
  body: any;
}

interface MockItem {
  url: string,
  type: string,
  response: any
}
const mocks: MockItem[] = []
const files: Record<string, any> = import.meta.glob('../../mock/controller/*.ts', { eager: true, import: 'default' })

Object.keys(files).forEach((key) => {
  mocks.push(...files[key])
})

export function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    // 将 arguments 转换为数组并传递给 proxy_send
    const args = Array.prototype.slice.call(arguments);
    this.proxy_send.apply(this, args);
  }

  function XHRHttpRequst(respond: MockItem["response"]) {
    return function (options: MockjsRequestOptions) {
      let result
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: paramObj(url),
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  mocks.forEach((item) => {
    Mock.mock(
      new RegExp(item.url),
      item.type || 'get',
      XHRHttpRequst(item.response)
    )
  })
}
