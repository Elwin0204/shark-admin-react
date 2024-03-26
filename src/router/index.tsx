import { lazy, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import BasicLayout from '@layouts/index'
import Login from '../pages/Login'

const Index = lazy(() => import('../pages/Index'))
const Page401 = lazy(() => import('../pages/401'))
const Page404 = lazy(() => import('../pages/404'))

export interface CustomRoute {
  path: string,
  name?: string,
  element?: ReactNode,
  children?: CustomRoute[],
  meta?: {
    title?: string,
    icon?: string,
    hidden?: boolean,
    affix?: boolean,
    auth?: string[]
  }
}

export const constantRoutes: CustomRoute[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/401',
    element: <Page401 />,
    meta: {
      title: '401',
      hidden: true
    }
  },
  {
    path: '/404',
    element: <Page404 />,
    meta: {
      title: '404',
      hidden: true
    }
  }
]

export const asyncRoutes: CustomRoute[] = [
  {
    path: '/',
    element: <Navigate to="/index" />,
  },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'index',
        element: <Index />,
        meta: {
          title: '首页',
          icon: 'home',
        }
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/404" replace={true} />,
  },
]