import React, { Suspense } from 'react'
import { ConfigProvider } from 'antd'
import AppProvider from './providers/AppProvider'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/reset.css'
import './App.css'
import "@/assets/styles/reset.css"
import { useAppStore } from '@/stores/index'
import RouterGuard from './router/shared/routerGuard'
import Router from "@/router/index"
import SkLoading from '@/components/ui/SkLoading'
import useThemeStore from '@/stores/modules/theme'
import { ThemeProvider } from 'antd-style'
import type { ThemeState } from '@/stores/modules/theme'

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends ThemeState {}
}

const AppRoot: React.FC = () => {
  const { primaryColor } = useAppStore()
  const customToken = useThemeStore()
  return (
    <ThemeProvider<ThemeState> customToken={{ ...customToken }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: { colorPrimary: primaryColor },
        }}
      >
        <AppProvider>
          <Suspense fallback={<SkLoading />}>
            <RouterGuard>
              <Router />
            </RouterGuard>
          </Suspense>
        </AppProvider>
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default AppRoot