import { ExtendedRouteObject } from "@/typings/router";
import { buildFullPath } from "@/router/shared/routerUtils";

export function getMenusByAuthRoutes(routes: ExtendedRouteObject[], basePath = '', isNested = true): App.Menu[] {
  const menus: App.Menu[] = [];

  routes.forEach((route) => {
    if (!route.meta?.hidden) {
      // 计算除去隐藏的子路由之后的可见子路由数量
      const visibleChildrenCount = route.children?.filter(child => !child.meta?.hidden).length || 0;

      if (visibleChildrenCount === 1 && isNested) {
        // 如果有且仅有一个可见的子路由并且配置为嵌套，则直接使用子路由的信息
        const [singleChild] = route.children!.filter(child => !child.meta?.hidden);
        // const menu = renderMenuByRoute(basePath, singleChild);
        // 确保子路由继承父级路径
        const menu = renderMenuByRoute(buildFullPath(basePath, route), singleChild);
        menus.push(menu);
      } else {
        // 否则按常规方式渲染菜单
        const menu = renderMenuByRoute(basePath, route);

        if (route.children?.some((item) => !item.meta?.hidden)) {
          // 传递当前路径作为子路径的基础路径
          const childrenMenus = getMenusByAuthRoutes(route.children, menu.key, isNested);
          if (childrenMenus.length > 0) {
            menu.children = childrenMenus;
          }
        }

        menus.push(menu);
      }
    }
  });

  return menus;
}

export function renderMenuByRoute(basePath: string, route: ExtendedRouteObject) {
  const fullPath = buildFullPath(basePath, route);
  const { title, icon } = route.meta ?? {};

  const menu: App.Menu = {
    key: fullPath,
    // label: <SkOverflowTooltip title={title} />,
    label: title,
    icon: (
      <SvgIcon icon={icon} style={{ fontSize: "18px" }} />
    ),
    title: title
  };

  return menu;
}

export const getOpenKeys = (fullPath: string): string[] => {
  return fullPath
    .split('/')
    .filter(segment => segment) // 过滤掉空段（例如根路径）
    .reduce((acc: { accumulatedPath: string; parentPaths: string[] }, currentSegment, index, array) => {
      if (index < array.length - 1) { // 排除最后一个子路径
        acc.accumulatedPath += `/${currentSegment}`;
        acc.parentPaths.push(acc.accumulatedPath);
      }
      return acc;
    }, { accumulatedPath: '', parentPaths: [] })
    .parentPaths;
};

export function getActiveFirstLevelMenuKey(menus: App.Menu[], pathname: string): string {
  console.log("fist", menus, pathname);
  // 辅助函数：检查当前菜单或其子菜单是否包含给定路径
  const matchesPath = (menu: App.Menu, path: string): boolean => {
    if (menu.key) {
      if (menu.key === pathname) return true;
    }

    if (menu.children && menu.children.length > 0) {
      return menu.children.some(child => matchesPath(child, path));
    }

    return false;
  };

  // 遍历菜单项，找到第一个匹配的最顶层菜单
  for (const menu of menus) {
    if (matchesPath(menu, pathname)) {
      return menu.key;
    }
  }

  // 如果没有找到匹配项，则返回 undefined
  return "";
}