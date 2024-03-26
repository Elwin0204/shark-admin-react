import { create } from 'zustand'
import { getAccessToken, removeAccessToken, setAccessToken } from '@utils/accessToken'
import { baseMessage, baseNotify } from '@utils/global'
import { login } from '@api/user'
import settings from '@config/index'

const { title, tokenName } = settings

interface UserState {
  accessToken: string | null;
  username: string | null;
  avatar: string[];
  permissions: string[];
  setAccessToken: (token: string) => void;
  resetAccessToken: () => void;
  setUsername: (username: string) => void;
  setAvatar: (avatar: string[]) => void;
  setPermissions: (permissions: string[]) => void;
  getPermissions: () => string[];
  getUserInfo: () => Promise<string[] | boolean>;
  login: (params: { username: string, password: string }) => Promise<string>;
}

const useUserStore = create<UserState>()(
  (set, get) => ({
    accessToken: getAccessToken(),
    username: '',
    avatar: [],
    permissions: [],
    setAccessToken: (token) => set(() => ({ accessToken: token })),
    resetAccessToken: () => {
      set(() => ({ accessToken: null, permissions: [] }))
      removeAccessToken()
    },
    setUsername: (username) => set(() => ({ username })),
    setAvatar: (avatar) => set(() => ({ avatar })),
    setPermissions: (permissions) => set(() => ({ permissions })),
    getPermissions: () => get().permissions,
    getUserInfo: async () => {
      // 获取用户信息
      const { data } = {
        data: {
          permissions: ['admin'],
          username: 'admin',
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
      const { permissions, username, avatar } = data
      if (permissions && username && Array.isArray(permissions)) {
        set(() => ({ permissions, username, avatar }))
        return permissions
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
        setAccessToken(accessToken)
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
    }
  }),
)

export default useUserStore