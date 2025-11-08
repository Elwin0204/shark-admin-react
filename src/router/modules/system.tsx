import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import BaseLayout from '@/layouts/BaseLayout'
import type { ExtendedRouteObject } from "@/typings/router";

// 系统路由
const systemRouter: Array<ExtendedRouteObject> = [
	{
		path: "/system",
		key: "system",
		element: <BaseLayout />,
		meta: {
			title: "系统管理"
		},
		children: [
			{
				path: "user",
				key: "user",
				element: lazyLoad(React.lazy(() => import("@/pages/system/user/index"))),
				meta: {
					auth: true,
					title: "用户管理",
				}
			},
			{
				path: "role",
				key: "role",
				element: lazyLoad(React.lazy(() => import("@/pages/system/role/index"))),
				meta: {
					auth: true,
					title: "角色管理",
				}
			},
			{
				path: "menu",
				key: "menu",
				element: lazyLoad(React.lazy(() => import("@/pages/system/menu/index"))),
				meta: {
					auth: true,
					title: "菜单管理",
				}
			}
		]
	}
];

export default systemRouter;
