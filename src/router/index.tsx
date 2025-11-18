import { Navigate, useRoutes } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import Login from '@/pages/login'
import Index from "@/pages/index"
import { EagerRouteModules, ExtendedRouteObject } from '@/typings/router'

const metaRoutes: EagerRouteModules = import.meta.glob("./modules/*.tsx", { eager: true })
export const routeArray: ExtendedRouteObject[] = [];

Object.keys(metaRoutes).forEach((path) => {
  const module = metaRoutes[path];
  routeArray.push(...module.default);
});

export const rootRoutes: ExtendedRouteObject[] = [
  {
    path: '/login',
    key: 'login',
    element: <Login />,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    element: <Navigate to="/index" />,
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'index',
        key: 'index',
        element: <Index />,
        meta: {
          title: '首页',
          icon: 'home',
          auth: false,
        }
      }
    ]
  },
  ...routeArray,
  {
		path: "*",
		element: <Navigate to="error/404" />
	}
]

const Router = () => {
	const routes = useRoutes(rootRoutes);
	return routes;
};

export default Router;