import { useLocation, useNavigate } from "react-router-dom";
import { rootRoutes } from "..";
import { matchRoute } from "./routerUtils";
import { useAuthStore, useUserStore } from "@/stores";
import { useEffect } from "react";

const whiteList = ['/index'];

const RouterGuard = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { accessToken, userInfo } = useUserStore();
  const { authRoutesFlat } = useAuthStore();

  const route = matchRoute(pathname, rootRoutes);
  console.log("route", route);
  // ✅ 1. 未登录 → 跳转登录页
  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }
  }, [accessToken, navigate]);

  // ✅ 2. 已登录但用户信息/权限未加载完成？—— 可选：显示 loading 或阻塞渲染
  // 注意：正常情况下，App 初始化时应已完成 profile 加载
  if (accessToken && !userInfo) {
    // 可选：显示全局 loading，或返回 null（白屏）
    return null; // 或 <GlobalLoading />
  }

  // ✅ 3. 不需要权限 or 在白名单中 → 直接放行
  if (!route?.meta?.auth || whiteList.includes(pathname)) {
    return children;
  }

  // ✅ 4. 需要权限的路由：检查是否在 authRoutesFlat 中
  const hasPermission = authRoutesFlat.some((r) => r.key === route.key);
  console.log("authRoutesFlat", authRoutesFlat);
  if (!hasPermission) {
    // 没有权限 → 跳转 403 或首页
    return <div>无访问权限</div>;
  }

  // ✅ 5. 有权限，放行
  return children;
};

export default RouterGuard;