import React, { Suspense } from 'react'
import { ConfigProvider, Watermark } from 'antd'
import AppProvider from './providers/AppProvider'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/reset.css'
import './App.css'
import "@/assets/styles/reset.css"
import "@/assets/styles/transition.css"
import RouterGuard from './router/shared/routerGuard'
import Router from "@/router/index"
import SkLoading from '@/components/ui/SkLoading'
import { ThemeProvider } from 'antd-style'
import type { ThemeState } from '@/stores/modules/theme'
import useSharkTheme from "@/hooks/theme"

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends ThemeState {}
}

const AppRoot: React.FC = () => {
  const { antdTheme, customToken, watermark } = useSharkTheme();

  return (
    <ThemeProvider
      theme={antdTheme}
      customToken={customToken}>
      <ConfigProvider
        locale={zhCN}
      >
        <AppProvider>
          <Watermark zIndex={9999} style={{ height: "100%" }} content={watermark.visible ? watermark.text || "shark admin react" : ""}>
            <Suspense fallback={<SkLoading />}>
              <RouterGuard>
                <Router />
              </RouterGuard>
            </Suspense>
          </Watermark>
        </AppProvider>
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default AppRoot