/**
 * @author Elwin
 * @description 用户信息
 */

import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware"
import { getUserProfile } from '@/api/user'
import settings from '@/config/index'
import { UserInfo } from '@/api/user/types'
import useAuthStore from './auth'
import { convertToRoutesAndBtns } from '@/router/shared/routerUtils'
import { login } from '@/api/auth'

const { title, tokenName } = settings

interface UserState {
  accessToken: string | null;
  userInfo: UserInfo | null;
  avatar: string[];
  roles: string[];
  setAccessToken: (token: string) => void;
  resetAccessToken: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setAvatar: (avatar: string[]) => void;
  setRoles: (roles: string[]) => void;
  getRoles: () => string[];
  fetchUserInfo: () => Promise<string[] | boolean>;
  login: (params: { username: string, password: string }) => Promise<string>;
  resetUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      userInfo: null,
      avatar: [],
      roles: [],
      setAccessToken: (token) => set(() => ({ accessToken: token })),
      resetAccessToken: () => {
        set(() => ({ accessToken: null, roles: [] }))
      },
      setUserInfo: (userInfo) => set(() => ({ userInfo })),
      setAvatar: (avatar) => set(() => ({ avatar })),
      setRoles: (roles) => set(() => ({ roles })),
      getRoles: () => get().roles,
      fetchUserInfo: async () => {
        // 获取用户信息
        const { data } = {
          data: {
            roles: ['admin'],
            username: 'admin',
            nickname: "nickname",
            'avatar': [
              'https://fastly.jsdelivr.net/gh/Elwin0204/sk-color-icons@master/icons/boy.svg',
              'https://fastly.jsdelivr.net/gh/Elwin0204/sk-color-icons@master/icons/girl.svg',
            ],
          }
        }
        
        if (!data) {
          window.$message.info({ content: '验证失败，请重新登录...' });
          return false
        }
        const { roles, username, nickname, avatar } = data
        if (roles && username && Array.isArray(roles)) {
          const userInfo = { username, nickname };
          set(() => ({ roles, userInfo, avatar }))
          return roles
        } else {
          window.$message.info({ content: '用户信息接口异常' });
          return false
        }
      },
      login: async (params) => {
        const { data } = await login(params);
        const accessToken = data[tokenName];

        if (accessToken) {
          set(() => ({ accessToken }));

          try {
            const { data: profile } = await getUserProfile();

            set({
              userInfo: profile.user,
              roles: profile.roles,
            });

            const authRoutesFlat = profile.menus; // 返回扁平数组，每项 path 是完整路径

            const { authRoutes, authBtns } = convertToRoutesAndBtns(authRoutesFlat);
            useAuthStore.setState({ authRoutesFlat, authRoutes, authBtns });

            const hour = new Date().getHours();
            const thisTime =
              hour < 8 ? '早上好' :
              hour <= 11 ? '上午好' :
              hour <= 13 ? '中午好' :
              hour < 18 ? '下午好' : '晚上好';

            window.$notification.success({
              message: `欢迎登录${title}`,
              description: `${thisTime}！${profile.user?.nickname || profile.user?.username}`
            });

            return accessToken;
          } catch (error) {
            // 处理 profile 请求失败（如 token 无效、网络错误）
            console.error("login error: ", error);
            window.$message.error({ content: '获取用户信息失败，请重新登录' });
            // 可选：清除 token 并跳转到登录页
            set(() => ({ accessToken: null, user: null }));
            return null;
          }
        } else {
          window.$message.error({ content: `登录接口异常，未正确返回${tokenName}...` });
          return null;
        }
      },
      resetUser: () => {
        set(() => ({ accessToken: null, userInfo: null }));
      }
    }),
    {
      name: 'userStorage', // 存储名称
      storage: createJSONStorage(() => localStorage), // 指定使用的存储类型，默认为localStorage
      partialize: (state) => ({ // 定义需要持久化的字段
        accessToken: state.accessToken,
        userInfo: state.userInfo,
      }),
    }
  )
)

export default useUserStore

export const getUserStore = () => useUserStore.getState();