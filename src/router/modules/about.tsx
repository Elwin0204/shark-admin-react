import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import BaseLayout from '@/layouts/BaseLayout';
import { ExtendedRouteObject } from "@/typings/router";


// app信息
const aboutRouter: Array<ExtendedRouteObject> = [
	{
		path: "/",
		element: <BaseLayout />,
		meta: {
			auth: false,
			title: "关于",
		},
    children: [
      {
				path: "about",
				element: lazyLoad(React.lazy(() => import("@/pages/about/index"))),
				meta: {
					auth: true,
					title: "关于",
				}
			},
    ]
	},
];

export default aboutRouter;
