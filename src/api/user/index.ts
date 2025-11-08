import http from "@/utils/http";

export function getUserProfile() {
  return http.request({
    url: '/sys/users/profile',
    method: 'get',
  });
}

// 用户列表
export function fetchUserList(params?: Record<string, any>) {
  return http.request({
    url: '/sys/users',
    method: 'get',
    params, // 支持查询参数
  });
}

// 可继续添加：createUser, updateUser, deleteUser...