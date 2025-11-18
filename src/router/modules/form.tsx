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
				path: "basic-form",
				key: "basic-form",
				element: lazyLoad(React.lazy(() => import("@/pages/form/basic-form/index"))),
				meta: {
					auth: true,
					title: "基础 Form",
				}
			},
			{
				path: "validate-form",
				key: "validate-form",
				element: lazyLoad(React.lazy(() => import("@/pages/form/validate-form/index"))),
				meta: {
					auth: true,
					title: "校验 Form",
				}
			},
			{
				path: "dynamic-form",
				key: "dynamic-form",
				element: lazyLoad(React.lazy(() => import("@/pages/form/dynamic-form/index"))),
				meta: {
					auth: true,
					title: "动态 Form",
				}
			}
		]
	}
];

export default formRouter;
