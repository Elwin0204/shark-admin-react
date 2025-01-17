import { antdComponents } from './antdComponents'
import { getAntdComponentsMap } from './antdUtil'
import type { Resolver } from 'unplugin-auto-import/types'

interface AntdResolverOptions {
  prefix?: string;
  packageName?: string;
}

export const antdResolver = (options: AntdResolverOptions = {}): Resolver => {
  const { prefix, packageName: from = 'antd' } = options
  const antdComponentsMap = getAntdComponentsMap(prefix)
  return {
    type: 'component',
    resolve: (originName: string) => {
      if (!prefix) {
        if (antdComponents.includes(originName)) {
          return {
            from,
            name: originName
          }
        }
      } else {
        // 如果设定前缀，则重命名引入
        const name = antdComponentsMap.get(originName)
        if (name) {
          return {
            from,
            name,
            as: originName
          }
        }
      }
      return undefined
    }
  }
}
