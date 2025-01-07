import http from "@/utils/http";
import { encryptedData } from '@/utils/encrypt'
import settings from '@/config/index'

const { loginRSA, tokenName } = settings

export async function login(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return http.request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken: string) {
  return http.request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return http.request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return http.request({
    url: '/register',
    method: 'post',
  })
}
