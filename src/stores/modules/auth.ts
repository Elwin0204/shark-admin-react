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
  fetchPermissions: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  (set) => ({
    authRoutes: [],
    authBtns: [],
    fetchPermissions: async () => {
      console.log("执行了");
      try {
        const { data } = await getAuthMenu({ username: "" });
        const { authRoutes, authBtns } = convertToRoutesAndBtns(data);
        console.log("authRoutes", authRoutes);
        console.log("authBtns", authBtns);
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
  })
)

export default useAuthStore