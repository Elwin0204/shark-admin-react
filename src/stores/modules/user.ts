/**
 * @author Elwin
 * @description 用户信息
 */

import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware"
import { baseMessage, baseNotify } from '@/utils/global'
import { login } from '@/api/user'
import settings from '@/config/index'
import { UserInfo } from '@/api/user/types'

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
      // accessToken: getAccessToken(),
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
          baseMessage('info', '验证失败，请重新登录...')
          return false
        }
        const { roles, username, nickname, avatar } = data
        if (roles && username && Array.isArray(roles)) {
          const userInfo = { username, nickname };
          set(() => ({ roles, userInfo, avatar }))
          return roles
        } else {
          baseMessage('info', '用户信息接口异常')
          return false
        }
      },
      login: async (params) => {
        const { data } = await login(params)
        const accessToken = data[tokenName]
        if (accessToken) {
          set(() => ({ accessToken: accessToken }))
          // 登录成功后获取用户信息
          await get().fetchUserInfo();
          const hour = new Date().getHours()
          const thisTime =
            hour < 8
              ? '早上好'
              : hour <= 11
              ? '上午好'
              : hour <= 13
              ? '中午好'
              : hour < 18
              ? '下午好'
              : '晚上好'
          baseNotify('success', {
            message: `欢迎登录${title}`,
            description: `${thisTime}!`,
          })
        } else {
          baseMessage('error', `登录接口异常，未正确返回${tokenName}...`)
        }
        return accessToken
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