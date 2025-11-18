import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import BaseLayout from '@/layouts/BaseLayout'
import type { ExtendedRouteObject } from "@/typings/router";

// 系统路由
const sysRouter: Array<ExtendedRouteObject> = [
	{
		path: "/sys",
		key: "sys",
		element: <BaseLayout />,
		meta: {
			title: "系统管理"
		},
		children: [
			{
				path: "user",
				key: "user",
				element: lazyLoad(React.lazy(() => import("@/pages/sys/user/index"))),
				meta: {
					auth: true,
					title: "用户管理",
				}
			},
			{
				path: "role",
				key: "role",
				element: lazyLoad(React.lazy(() => import("@/pages/sys/role/index"))),
				meta: {
					auth: true,
					title: "角色管理",
				}
			},
			{
				path: "menu",
				key: "menu",
				element: lazyLoad(React.lazy(() => import("@/pages/sys/menu/index"))),
				meta: {
					auth: true,
					title: "菜单管理",
				}
			}
		]
	}
];

export default sysRouter;
