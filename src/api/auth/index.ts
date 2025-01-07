import http from "@/utils/http";
import { AuthMenuQuery } from "./types";

export function getAuthMenu(data: AuthMenuQuery) {
  return http.request({
    url: '/auth/menu',
    method: 'post',
    data,
  })
}
