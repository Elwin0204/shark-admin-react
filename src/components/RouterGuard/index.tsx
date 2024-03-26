import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useUserStore, useRoutesStore } from '@stores/index'
import { constantRoutes, asyncRoutes, CustomRoute } from '@router/index'
import SkProgress from 'nprogress'
import 'nprogress/nprogress.css'
import settings from '@config/index'

const { authentication, loginInterception, progressBar, recordRoute, routesWhiteList } = settings

SkProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})

const RouterGuard = () => {
  const location = useLocation()
  const navigator = useNavigate()
  const elements = useRoutes(constantRoutes.concat(asyncRoutes))
  const { accessToken, getPermissions, setPermissions, getUserInfo, resetAccessToken } = useUserStore()
  const { setRoutes, setAllRoutes } = useRoutesStore()

  const routeCb = async () => {
    if (progressBar) SkProgress.start()
    let hasToken = !!accessToken
    if (!loginInterception) hasToken = true
    // hasToken = true
    if (hasToken) {
      if (location.pathname === '/login') {
        navigator('/')
        if (progressBar) SkProgress.done()
      } else {
        const permissions = getPermissions()
        const hasPermissions = permissions && permissions.length > 0
        if (hasPermissions) {
          console.log('有权限')
          if (progressBar) SkProgress.done()
        } else {
          console.log('无权限')
          try {
            let permissions: string[] = []
            if (!loginInterception) {
              setPermissions(['admin'])
              permissions = ['admin']
              // console.log('loginInterception', permissions)
            } else {
              const userPermissions = await getUserInfo()
              // console.log('userPermissions', userPermissions)
              if (typeof userPermissions !== 'boolean' && userPermissions.length > 0) {
                permissions = userPermissions
              } else {
                permissions = []
              }
            }
            let accessRoutes: CustomRoute[] = []
            if (authentication === 'intelligence') {
              accessRoutes = await setRoutes(permissions)
            } else if (authentication === 'all') {
              accessRoutes = await setAllRoutes()
            }
            if (progressBar) SkProgress.done()
            console.log('accessRoutes', accessRoutes)
          } catch (error) {
            // console.log('catch', error)
            resetAccessToken()
            if (progressBar) SkProgress.done()
          }
        }
      }
    } else {
      if (routesWhiteList.includes(location.pathname)) {
        if (progressBar) SkProgress.done()
        // console.log('跳转', location.pathname)
      } else {
        if (recordRoute) {
          navigator(`/login?redirect=${location.pathname}`)
        } else {
          navigator('/login')
        }

        if (progressBar) SkProgress.done()
      }
    }
  }

  useEffect(() => {
    routeCb()
  }, [location.pathname])
  // console.log('routerguard', elements, location)

  return (
    <>{ elements }</>
  )
}

export default RouterGuard
