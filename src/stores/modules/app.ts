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
  isMobile: boolean;
  header: string;
  hasNetwork: boolean;
  primaryColor: string;
  changeNetwork: (hasNetwork: boolean) => void;
  setColor: (color: string) => void;
  foldSidebar: (collapse: boolean) => void;
  setThemeDrawerVisible: (visible: boolean) => void;
}

const useAppStore = create<AppState>()(
  (set) => ({
    collapse: false,
    themeDrawerVisible: false,
    isMobile: false,
    header: header,
    hasNetwork: true,
    primaryColor: '#247fff',
    changeNetwork: (hasNetwork) => set(() => ({ hasNetwork: hasNetwork })),
    setColor: (color) => set(() => ({ primaryColor: color })),
    foldSidebar: (collapse) => set(() => ({ collapse: collapse })),
    setThemeDrawerVisible: (visible) => set(() => ({ themeDrawerVisible: visible })),
  }),
)

export default useAppStore