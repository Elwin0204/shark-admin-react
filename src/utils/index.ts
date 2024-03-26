/**
 * @author Elwin
 * @description 格式化时间
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
export function parseTime(time: any, cFormat: any) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  type formatObjType = typeof formatObj
  type formatObjKeyType = keyof formatObjType
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: formatObjKeyType) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @author Elwin
 * @description 格式化时间
 * @param time
 * @param option
 * @returns {string}
 */
export function formatTime(time: any, option: any) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getMilliseconds()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @author Elwin
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @author Elwin
 * @description 父子关系的数组转换成树形结构数据
 * @param data
 * @returns {*}
 */

interface TreeNode {
  id: string | number,
  parentId: string | number,
  name: string,
  children: TreeNode[]
}
export function translateDataToTree(data: TreeNode[]) {
  const parent = data.filter(
    (value) => value.parentId === 'undefined' || value.parentId == null
  )
  const children = data.filter(
    (value) => value.parentId !== 'undefined' && value.parentId != null
  )
  const translator = (parent: TreeNode[], children: TreeNode[]) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp)
          typeof parent.children !== 'undefined'
            ? parent.children.push(current)
            : (parent.children = [current])
        }
      })
    })
  }
  translator(parent, children)
  return parent
}

/**
 * @author Elwin
 * @description 树形结构数据转换成父子关系的数组
 * @param data
 * @returns {[]}
 */
interface ArrItem {
  id: string | number,
  name: string,
  parentId: string | number,
}
export function translateTreeToData(data: TreeNode[]) {
  const result: ArrItem[] = []
  data.forEach((item) => {
    const loop = (data: TreeNode) => {
      result.push({
        id: data.id,
        name: data.name,
        parentId: data.parentId,
      })
      const child = data.children
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i])
        }
      }
    }
    loop(item)
  })
  return result
}

/**
 * @author Elwin
 * @description 10位时间戳转换
 * @param time
 * @returns {string}
 */
export function tenBitTimestamp(time: number) {
  const date = new Date(time * 1000)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const m1 = m < 10 ? '' + m : m
  const d = date.getDate()
  const d1 = d < 10 ? '' + d : d
  const h = date.getHours()
  const h1 = h < 10 ? '0' + h : h
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const minute1 = minute < 10 ? '0' + minute : minute
  const second1 = second < 10 ? '0' + second : second
  return y + '年' + m1 + '月' + d1 + '日 ' + h1 + ':' + minute1 + ':' + second1 //组合
}

/**
 * @author Elwin
 * @description 13位时间戳转换
 * @param time
 * @returns {string}
 */
export function thirteenBitTimestamp(time: number) {
  const date = new Date(time / 1)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const m1 = m < 10 ? '' + m : m
  const d = date.getDate()
  const d1 = d < 10 ? '' + d : d
  const h = date.getHours()
  const h1 = h < 10 ? '0' + h : h
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const minute1 = minute < 10 ? '0' + minute : minute
  const second1 = second < 10 ? '0' + second : second
  return y + '年' + m1 + '月' + d1 + '日 ' + h1 + ':' + minute1 + ':' + second1 //组合
}

/**
 * @author Elwin
 * @description 获取随机id
 * @param length
 * @returns {string}
 */
export function uuid(length = 32) {
  const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length))
  }
  return str
}

/**
 * @author Elwin
 * @description m到n的随机数
 * @param m
 * @param n
 * @returns {number}
 */
export function random(m: number, n: number) {
  return Math.floor(Math.random() * (m - n) + n)
}

/**
 * @author Elwin
 * @description addEventListener
 * @type {function(...[*]=)}
 */
export const on = (function () {
  return function (element: HTMLElement, event: string, handler: EventListenerOrEventListenerObject, useCapture = false) {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture)
    }
  }
})()

/**
 * @author Elwin
 * @description removeEventListener
 * @type {function(...[*]=)}
 */
export const off = (function () {
  return function (element: HTMLElement, event: string, handler: EventListenerOrEventListenerObject, useCapture = false) {
    if (element && event) {
      element.removeEventListener(event, handler, useCapture)
    }
  }
})()

/**
 * @author Elwin
 * @description browser height
 */
export function getClientHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  )
}

/**
 * @author Elwin
 * @description lazy load module
 * @param url
 * @returns 
 */
export function lazyMock (url: string) {
  return new Promise<{ mockXHR: () => void }>(resolve => {
    import(/* @vite-ignore */url).then(module =>{
      resolve(module)
    })
  })
}
