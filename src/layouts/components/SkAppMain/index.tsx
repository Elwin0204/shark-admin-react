import { useEffect, useState } from 'react'
import {
  Outlet,
} from 'react-router-dom'
import Bus from 'event-bus-hooks'

const SkAppMain: React.FC = () => {
  const [routerView, setRouterView] = useState(true)
  const reloadRouterView = () => {
    setRouterView(false)
    setTimeout(() => {
      setRouterView(true)
    }, 3000)
  }

  useEffect(() => {
    Bus.$on('reload-router-view', reloadRouterView)
    return () => {
      Bus.$off('reload-router-view')
    }
  }, [])
  return (
    <>
      {routerView && (
        <div className='app-main-container'>
          <div className='app-main-height'>
            app main { JSON.stringify(routerView) }
            <Outlet />
          </div>
        </div>)}
    </>
  )
}

export default SkAppMain