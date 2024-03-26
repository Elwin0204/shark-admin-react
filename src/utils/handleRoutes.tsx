/**
 * @author Elwin
 * @description 路由处理逻辑
 */

import { CustomRoute } from 'router'
import { lazy } from 'react'
import BasicLayout from '@layouts/index'
import EmptyLayout from '@layouts/EmptyLayout'

function hasAuth(auth: string[], route: CustomRoute) {
  if (route.meta && route.meta.auth) {
    return auth.some((role) => route.meta?.auth?.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes: CustomRoute[], auth: string[]) {
  const finallyRoutes: CustomRoute[] = []
  routes.forEach((route: CustomRoute) => {
    const item = { ...route }
    if(hasAuth(auth, item)) {
      if(item.children) {
        item.children = filterAsyncRoutes(item.children, auth)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}

/**
 * @author Elwin
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes: CustomRoute[]) {
  return asyncRoutes.map((route: CustomRoute) => {
    if (route.element) {
      if (route.element === 'Layout') {
        route.element = <BasicLayout />
      } else if (route.element === 'EmptyLayout') {
        route.element = <EmptyLayout />
      } else {
        const index = (route.element as string).indexOf('pages')
        const path = index > 0 ? (route.element as string).slice(index) : `pages/${route.element}`
        const Element = lazy(() => import(/* @vite-ignore */`${path}`)) 
        route.element = <Element />
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children)
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}

/**
 * @author Elwin
 * @description 返回当前path对应的路由
 * @param routes 路由表
 * @param path 当前url
 * @returns route
 */
export function getCurrentRouteMap (routes: CustomRoute[], path: string): CustomRoute {
  for(const route of routes) {
    if(route.path === path) return route
    if(route.children && route.children.length > 0) {
      const childRoutes = getCurrentRouteMap(route.children, path)
      if(childRoutes) return childRoutes
    }
  }
  return routes[routes.length -1]
}
