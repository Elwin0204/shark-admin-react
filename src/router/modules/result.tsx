import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import BaseLayout from '@/layouts/BaseLayout'
import { ExtendedRouteObject } from "@/typings/router";

// 结果路由
const resultRouter: Array<ExtendedRouteObject> = [
	{
    path: "/result",
		element: <BaseLayout />,
		meta: {
			title: "结果 Result"
		},
		children: [
			{
				path: "success",
				element: lazyLoad(React.lazy(() => import("@/pages/result/success/index"))),
				meta: {
					auth: true,
					title: "成功 Result",
				}
			},
			{
				path: "fail",
				element: lazyLoad(React.lazy(() => import("@/pages/result/fail/index"))),
				meta: {
					auth: true,
					title: "失败 Result",
				}
			},
			{
				path: "warning",
				element: lazyLoad(React.lazy(() => import("@/pages/result/warning/index"))),
				meta: {
					auth: true,
					title: "警告 Result",
				}
			},
      {
				path: "info",
				element: lazyLoad(React.lazy(() => import("@/pages/result/info/index"))),
				meta: {
					auth: true,
					title: "消息 Result",
				}
			}
		]
	}
];

export default resultRouter;
