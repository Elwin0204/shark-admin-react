/**
 * @author Elwin
 * @description 应用全局配置
 */
import { create } from 'zustand' 
import defaultSettings from '@/config/index'

const {
  header,
  themeName
} = defaultSettings

interface AppState {
  collapse: boolean;
  header: string;
  device: string;
  theme: string,
  hasNetwork: boolean;
  primaryColor: string;
  changeNetwork: (hasNetwork: boolean) => void;
  setColor: (color: string) => void;
  foldSidebar: (collapse: boolean) => void;
}

const useAppStore = create<AppState>()(
  (set) => ({
    collapse: false,
    header: header,
    device: 'desktop',
    theme: themeName,
    hasNetwork: true,
    primaryColor: '#247fff',
    changeNetwork: (hasNetwork) => set(() => ({ hasNetwork: hasNetwork })),
    setColor: (color) => set(() => ({ primaryColor: color })),
    foldSidebar: (collapse) => set(() => ({ collapse: collapse })),
  }),
)

export default useAppStore