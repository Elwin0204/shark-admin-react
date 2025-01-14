import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import BaseLayout from '@/layouts/BaseLayout'
import type { ExtendedRouteObject } from "@/typings/router";

// 多级菜单路由
const multiMenuRouter: Array<ExtendedRouteObject> = [
	{
		path: "/multi-menu",
		element: <BaseLayout />,
		meta: {
			title: "多级菜单"
		},
		children: [
			{
				path: "menu1",
				meta: {
					auth: true,
					title: "菜单1",
				},
        children: [
          {
            path: "menu1-1",
            element: lazyLoad(React.lazy(() => import("@/pages/multi-menu/menu11"))),
            meta: {
              auth: true,
              title: "菜单1-1",
            }
          },
          {
            path: "menu1-2",
            element: lazyLoad(React.lazy(() => import("@/pages/multi-menu/menu12"))),
            meta: {
              auth: true,
              title: "菜单1-2",
            }
          },
          {
            path: "menu1-3",
            meta: {
              auth: true,
              title: "菜单1-3",
            },
            children: [
              {
                path: "menu1-3-1",
                element: lazyLoad(React.lazy(() => import("@/pages/multi-menu/menu131"))),
                meta: {
                  auth: true,
                  title: "菜单1-3-1",
                }
              },
            ]
          },
        ]
			},
			{
				path: "menu2",
				meta: {
					auth: true,
					title: "菜单2",
				},
        children: [
          {
            path: "menu2-1",
            element: lazyLoad(React.lazy(() => import("@/pages/multi-menu/menu21"))),
            meta: {
              auth: true,
              title: "菜单2-1",
            },
          }
        ]
			},
		]
	}
];

export default multiMenuRouter;
