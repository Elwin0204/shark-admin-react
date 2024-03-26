import { create } from 'zustand'
import { CustomRoute } from '@router/index'
import { constantRoutes, asyncRoutes } from '@router/index'
import { convertRouter, filterAsyncRoutes } from '@utils/handleRoutes'
import { getRouterList } from '@api/router'
import { useNavigate } from 'react-router-dom'

interface RoutesState {
  routes: CustomRoute[];
  partialRoutes: CustomRoute[];
  setRoutes: (permissions: string[]) => Promise<CustomRoute[]>;
  setAllRoutes: () => Promise<CustomRoute[]>;
  setPartialRoutes: (accessRoutes: CustomRoute[]) => CustomRoute[];
}

const useRoutesStore = create<RoutesState>()(
  (set) => ({
    routes: [],
    partialRoutes: [],
    setRoutes: async (permissions) => {
      //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
      const finallyAsyncRoutes = await filterAsyncRoutes(
        [...asyncRoutes],
        permissions
      )
      set(() => ({ routes: constantRoutes.concat(finallyAsyncRoutes) }))
      return finallyAsyncRoutes
    },
    setAllRoutes: async () => {
      const { data } = await getRouterList()
      const navigator = (() => useNavigate())()
      navigator('/404')
      const accessRoutes = convertRouter(data)
      set(() => ({ routes: constantRoutes.concat(accessRoutes) }))
      return accessRoutes
    },
    setPartialRoutes: (accessRoutes) => {
      set(() => ({ partialRoutes: constantRoutes.concat(accessRoutes) }))
      return accessRoutes
    },
  })
)

export default useRoutesStore