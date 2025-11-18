import { useLocation, useNavigate } from "react-router-dom";
import { rootRoutes } from "..";
import { matchRoute } from "./routerUtils";
import { useAuthStore, useUserStore } from "@/stores";
import { useEffect } from "react";

const whiteList = ['/index', '/login', '/register'];

const RouterGuard = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  const route = matchRoute(pathname, rootRoutes);
  console.log("route", route);

  const navigate = useNavigate();
  const { accessToken, restoreSession } = useUserStore();
  const { authRoutesFlat } = useAuthStore();

  // ✅ 应用启动时：如果有 token，尝试恢复会话（profile + 菜单权限）
  useEffect(() => {
    const init = async () => {
      if (accessToken) {
        await restoreSession();
      } else {
        navigate('/login', { replace: true });
      }
    };
    init();
  }, []);

  // ✅ 3. 不需要权限 or 在白名单中 → 直接放行
  if (!route?.meta?.auth || whiteList.includes(pathname)) {
    return children;
  }

  // ✅ 4. 需要权限的路由：检查是否在 authRoutesFlat 中
  const hasPermission = authRoutesFlat.some((r) => r.key === route.key);

  if (!hasPermission) {
    // 没有权限 → 跳转 403 或首页
    return <div>无访问权限</div>;
  }

  // ✅ 5. 有权限，放行
  return children;
};

export default RouterGuard;