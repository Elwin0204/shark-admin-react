import SkOverflowTooltip from "@/components/ui/SkOverflowTooltip";
import { ExtendedRouteObject } from "@/typings/router";

export function getMenusByAuthRoutes(routes: ExtendedRouteObject[]) {
  const menus: App.Menu[] = [];

  routes.forEach((route) => {
    if(!route.meta?.hidden) {
      const menu = renderMenuByRoute(route);

      if(route.children?.some((item) => !item.meta?.hidden)) {
        menu.children = getMenusByAuthRoutes(route.children) || [];
      }

      menus.push(menu);
    }
  });

  return menus;
}

export function renderMenuByRoute(route: ExtendedRouteObject) {
  const { path } = route;
  const { title, icon } = route.meta ?? {};

  const menu: App.Menu = {
    key: path!,
    label: <SkOverflowTooltip title={title} />,
    // label: title,
    icon: (
      <SvgIcon icon={icon} style={{ fontSize: "18px" }} />
    ),
    title: title
  };

  return menu;
}