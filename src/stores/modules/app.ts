/**
 * @author Elwin
 * @description 应用全局配置
 */
import { create } from 'zustand' 
import defaultSettings from '@/config/index'

const {
  header,
} = defaultSettings

interface AppState {
  collapse: boolean;
  themeDrawerVisible: boolean;
  mixSidebarFixed: boolean;
  isMobile: boolean;
  header: string;
  hasNetwork: boolean;
  changeNetwork: (hasNetwork: boolean) => void;
  toggleSidebar: (collapse: boolean) => void;
  setThemeDrawerVisible: (visible: boolean) => void;
  toggleMixSidebarFixed: () => void;
}

const useAppStore = create<AppState>()(
  (set, get) => ({
    collapse: false,
    themeDrawerVisible: false,
    mixSidebarFixed: false,
    isMobile: false,
    header: header,
    hasNetwork: true,
    changeNetwork: (hasNetwork) => set(() => ({ hasNetwork: hasNetwork })),
    toggleSidebar: (collapse) => set(() => ({ collapse: collapse })),
    setThemeDrawerVisible: (visible) => set(() => ({ themeDrawerVisible: visible })),
    toggleMixSidebarFixed: () => set(() => ({ mixSidebarFixed: !get().mixSidebarFixed }))
  }),
)

export default useAppStore