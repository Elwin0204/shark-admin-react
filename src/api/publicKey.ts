import http from "@/utils/http";

export function getPublicKey() {
  return http.request({
    url: '/publicKey',
    method: 'post',
  })
}
