import { ExtendedRouteObject } from "@/typings/router";

// 构建完整路径的函数
export function buildFullPath(basePath: string, route: ExtendedRouteObject): string {
  // 确保 route.path 存在并且是一个字符串
  const path = route.path || '';
  if (path === '/' || path === '*') {
    return path;
  }

  // 处理特殊情况：如果 basePath 是空字符串，则视为根路径
  const normalizedBasePath = basePath === '' ? '/' : basePath;

  // 拼接路径，移除重复的斜杠
  let fullPath = `${normalizedBasePath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  // 移除多余的斜杠并确保路径以单个斜杠开始
  fullPath = fullPath.replace(/\/+/g, '/').replace(/^\/\//, '/');
  
  return fullPath;
}

// 匹配路径的函数
function matchPath(fullPath: string, currentPath: string): boolean {
  if (fullPath === '*') return true;
  if (fullPath === currentPath) return true;
  if (fullPath.endsWith('/*')) {
    const prefix = fullPath.replace('/*', '');
    return currentPath.startsWith(prefix);
  }
  return false;
}

// 递归查找匹配路由的函数
function findMatchingRoute(routes: ExtendedRouteObject[], basePath: string, currentPath: string): ExtendedRouteObject | null {
  for (const route of routes) {
    const fullPath = buildFullPath(basePath, route);

    if (matchPath(fullPath, currentPath)) {
      return route;
    }

    if (route.children && route.children.length > 0) {
      const matchedChild = findMatchingRoute(route.children, fullPath, currentPath);
      if (matchedChild) {
        return matchedChild;
      }
    }
  }
  return null;
}

// 主函数：匹配当前路径到路由配置
export function matchRoute(pathname: string, routes: ExtendedRouteObject[]): ExtendedRouteObject | null {
  return findMatchingRoute(routes, '', pathname);
}

// 将权限数组转为authRoutes和authBtns
export function convertToRoutesAndBtns(menuList: any[]): { authRoutes: ExtendedRouteObject[], authBtns: string[] } {
  const routeMap = new Map<string, ExtendedRouteObject>();
  const authBtns: string[] = []; // 用于存储按钮权限
  console.log("convertToRoutesAndBtns", menuList);
  // 创建所有节点的映射，并处理按钮权限
  menuList.forEach(item => {
    if (item.type === 'BTN') {
      authBtns.push(item.key || item.id);
    } else {
      const path = item.path === '/' ? '/' : item.path.startsWith('/') ? item.path : `/${item.path}`;

      const route: ExtendedRouteObject = {
        path,
        key: item.key || item.id, // 使用 id 作为 key 的备选方案
        meta: {
          title: item.title,
          icon: item.icon,
          hidden: item.hidden,
          affix: item.affix,
          type: item.type,
          link: item.link,
          sort: item.sort,
          keepAlive: item.keepAlive,
          auth: true, // 默认所有路由都需要权限验证
          roles: [], // 角色信息可以根据实际情况填充
        },
        children: [], // 确保每个节点都有一个 children 数组
      };

      routeMap.set(item.id, route);
    }
  });

  // 构建树结构
  const authRoutes: ExtendedRouteObject[] = [];
  menuList.forEach(item => {
    if (item.type !== 'BTN') {
      const route = routeMap.get(item.id)!;

      if (item.parentId) {
        const parentRoute = routeMap.get(item.parentId);
        if (parentRoute) {
          // 确保 parentRoute 有 children 属性并是一个数组
          if (!parentRoute.children) {
            parentRoute.children = [];
          }
          parentRoute.children.push(route);
        }
      } else {
        authRoutes.push(route);
      }
    }
  });

  return { authRoutes, authBtns };
}