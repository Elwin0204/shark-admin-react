import http from "@/utils/http";
import { encryptedData } from '@/utils/encrypt';
import settings from '@/config/index';

const { loginRSA } = settings;

export async function login(data: any) {
  // if (loginRSA) {
  //   data = await encryptedData(data);
  // }
  return http.request({
    url: '/auth/login',
    method: 'post',
    data,
  });
}

export function logout() {
  return http.request({
    url: '/auth/logout',
    method: 'post',
  });
}

export function register(data: any) {
  return http.request({
    url: '/auth/register',
    method: 'post',
    data,
  });
}