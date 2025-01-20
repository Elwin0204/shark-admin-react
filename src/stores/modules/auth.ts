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
  currentRoute: ExtendedRouteObject | null; // 添加 currentRoute 状态
  setCurrentRoute: (route: ExtendedRouteObject | null) => void; // 添加设置 currentRoute 的方法
  fetchPermissions: () => Promise<void>;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  (set) => ({
    authRoutes: [],
    authBtns: [],
    currentRoute: null,
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
        // 处理错误，例如显示错误消息给用户
      } finally {
        console.log("兜底操作");
      }
    },
    resetAuth: () => {
      set(() => ({ authRoutes: [], authBtns: [] }));
    }
  })
)

export default useAuthStore