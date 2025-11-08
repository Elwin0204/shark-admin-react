import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import BaseLayout from '@/layouts/BaseLayout'
import type { ExtendedRouteObject } from "@/typings/router";

// 表单路由
const formRouter: Array<ExtendedRouteObject> = [
	{
		path: "/form",
		key: "form",
		element: <BaseLayout />,
		meta: {
			title: "表单 Form"
		},
		children: [
			{
				path: "basicForm",
				key: "basicForm",
				element: lazyLoad(React.lazy(() => import("@/pages/form/basicForm/index"))),
				meta: {
					auth: true,
					title: "基础 Form",
				}
			},
			{
				path: "validateForm",
				key: "validateForm",
				element: lazyLoad(React.lazy(() => import("@/pages/form/validateForm/index"))),
				meta: {
					auth: true,
					title: "校验 Form",
				}
			},
			{
				path: "dynamicForm",
				key: "dynamicForm",
				element: lazyLoad(React.lazy(() => import("@/pages/form/dynamicForm/index"))),
				meta: {
					auth: true,
					title: "动态 Form",
				}
			}
		]
	}
];

export default formRouter;
