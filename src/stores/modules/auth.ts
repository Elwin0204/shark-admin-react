/**
 * @author Elwin
 * @description 权限信息
 */

import { create } from 'zustand'
import { ExtendedRouteObject } from '@/typings/router'

interface AuthState {
  authRoutesFlat: ExtendedRouteObject[],
  authRoutes: ExtendedRouteObject[];
  authBtns: string[];
  currentRoute: ExtendedRouteObject | null;
  cacheKeys: string[];
  removeCacheKey: string | null;
  setCurrentRoute: (route: ExtendedRouteObject | null) => void; // 添加设置 currentRoute 的方法
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  (set) => ({
    authRoutesFlat: [],
    authRoutes: [],
    authBtns: [],
    currentRoute: null,
    cacheKeys: [],
    removeCacheKey: null,
    setCurrentRoute: (route) => set(() => ({ currentRoute: route })),
    resetAuth: () => {
      set(() => ({ authRoutesFlat: [], authRoutes: [], authBtns: [] }));
    }
  })
)

export default useAuthStore