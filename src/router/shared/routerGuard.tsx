import { pendingRequestManager } from "@/utils/pendingRequestManager";
import { useLocation, useNavigate } from "react-router-dom";
import { rootRoutes } from "..";
import { matchRoute } from "./routerUtils";
import { useAuthStore, useUserStore } from "@/stores";
import { useEffect, useState } from "react";

const RouterGuard = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const { accessToken } = useUserStore();
  const { authRoutes, fetchPermissions } = useAuthStore();
  const navigator = useNavigate();
  const route = matchRoute(pathname, rootRoutes);
  console.log("RouterGuard", route);

  // 状态变量用于跟踪是否已经尝试过获取权限
  const [hasFetchedPermissions, setHasFetchedPermissions] = useState(false);

  // 跳转之前, 清除所有pending状态的请求
  useEffect(() => {
    if(hasFetchedPermissions) {
      pendingRequestManager.removeAllPending();
    }
  }, [hasFetchedPermissions]);

  // 确保首次加载时获取权限
  useEffect(() => {
    if (accessToken && authRoutes.length === 0) {
      fetchPermissions().then(() => {
        setHasFetchedPermissions(true);
      }).catch((error) => {
        console.error('Failed to fetch permissions:', error);
      });
    }
  }, [accessToken, hasFetchedPermissions]);

  useEffect(() => {
    if (!accessToken) {
      navigator('/login', { replace: true });
    }
  }, []);

  // 不需要权限, 直接放行
  if(!route?.meta?.auth) return props.children;

  return props.children;
};

export default RouterGuard;