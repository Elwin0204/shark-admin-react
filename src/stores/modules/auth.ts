/**
 * @author Elwin
 * @description 权限信息
 */

import { create } from 'zustand'
import { getAuthMenu } from '@/api/auth'
import { ExtendedRouteObject } from '@/typings/router'
import { convertToRoutesAndBtns } from '@/router/shared/routerUtils';

interface AuthState {
  authRoutes: ExtendedRouteObject[];
  authBtns: string[];
  currentRoute: ExtendedRouteObject | null;
  cacheKeys: string[];
  removeCacheKey: string | null;
  setCurrentRoute: (route: ExtendedRouteObject | null) => void; // 添加设置 currentRoute 的方法
  fetchPermissions: () => Promise<void>;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  (set) => ({
    authRoutes: [],
    authBtns: [],
    currentRoute: null,
    cacheKeys: [],
    removeCacheKey: null,
    setCurrentRoute: (route) => set(() => ({ currentRoute: route })),
    fetchPermissions: async () => {
      try {
        const { data } = await getAuthMenu({ username: "" });
        const { authRoutes, authBtns } = convertToRoutesAndBtns(data);
        // 设置权限路由
        set(() => ({ authRoutes }));
        set(() => ({ authBtns }));
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
      }
    },
    resetAuth: () => {
      set(() => ({ authRoutes: [], authBtns: [] }));
    }
  })
)

export default useAuthStore