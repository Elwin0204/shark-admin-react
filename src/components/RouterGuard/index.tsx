import { useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { useUserStore, useRoutesStore } from '@stores/index';
import { constantRoutes, asyncRoutes, CustomRoute } from '@router/index';
import SkProgress from 'nprogress';
import 'nprogress/nprogress.css';
import settings from '@config/index';

const {
  authentication,
  loginInterception,
  progressBar,
  recordRoute,
  routesWhiteList
} = settings;

// 配置进度条
SkProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});

interface RouteGuardProps {}

const RouterGuard: React.FC<RouteGuardProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken, getPermissions, setPermissions, getUserInfo, resetAccessToken } = useUserStore();
  const { setRoutes, setAllRoutes } = useRoutesStore();

  // 直接在组件顶层调用 useRoutes
  const elements = useRoutes([...constantRoutes, ...asyncRoutes]);

  // 检查是否在白名单路径中
  const isWhiteListPath = (path: string): boolean => routesWhiteList.includes(path);

  // 处理进度条状态
  const handleProgressBar = (start: boolean) => {
    if (progressBar) {
      start ? SkProgress.start() : SkProgress.done();
    }
  };

  // 登录拦截处理
  const handleLoginInterception = async (hasToken: boolean) => {
    if (!hasToken) {
      const redirectPath = recordRoute ? `/login?redirect=${location.pathname}` : '/login';
      navigate(redirectPath);
      return;
    }

    // 登录后逻辑...
  };

  // 检查权限并设置路由
  const checkPermissionsAndSetRoutes = async () => {
    let permissions: string[] = []
    try {
      const userPermissions = await getUserInfo();
      if (typeof userPermissions !== 'boolean' && userPermissions.length > 0) {
        permissions = userPermissions
      } else {
        permissions = []
      }
      if (!loginInterception && !permissions.length) {
        permissions = ['admin'];
        setPermissions(['admin']);
      }

      let accessRoutes: CustomRoute[] = [];
      if (authentication === 'intelligence') {
        accessRoutes = await setRoutes(permissions);
      } else if (authentication === 'all') {
        accessRoutes = await setAllRoutes();
      }

      console.log('accessRoutes', accessRoutes);
    } catch (error) {
      resetAccessToken();
    } finally {
      handleProgressBar(false);
    }
  };

  useEffect(() => {
    handleProgressBar(true);

    const hasToken = !!accessToken || !loginInterception;

    if (isWhiteListPath(location.pathname)) {
      handleProgressBar(false);
      return;
    }

    if (location.pathname === '/login') {
      if (hasToken) navigate('/');
      handleProgressBar(false);
      return;
    }

    if (hasToken) {
      const permissions = getPermissions();
      if (permissions && permissions.length > 0) {
        console.log('有权限');
        handleProgressBar(false);
      } else {
        console.log('无权限');
        void checkPermissionsAndSetRoutes();
      }
    } else {
      void handleLoginInterception(hasToken);
    }

    // 清除进度条
    return () => handleProgressBar(false);
  }, [location.pathname, accessToken]);

  return <>{elements}</>;
};

export default RouterGuard;