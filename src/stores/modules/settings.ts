/**
 * @author Elwin
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { create } from 'zustand' 
import defaultSettings from '@config/index'

const {
  tabsBar,
  logo,
  layout,
  header,
  themeBar,
  themeName
} = defaultSettings

type logoType = typeof logo


const theme = JSON.parse(localStorage.getItem('theme')!) || {}

interface SettingState {
  tabsBar: boolean;
  logo: logoType;
  collapse: boolean;
  layout: string;
  header: string;
  device: string;
  themeBar: boolean;
  theme: string,
  hasNetwork: boolean;
  primaryColor: string;
  changeNetwork: (hasNetwork: boolean) => void;
  setColor: (color: string) => void;
  setLayout: (layout: string) => void;
  foldSidebar: (collapse: boolean) => void;
}

const useSettingStore = create<SettingState>()(
  (set) => ({
    tabsBar: theme.tabsBar || tabsBar,
    logo: logo,
    collapse: false,
    layout: theme.layout || layout,
    header: theme.header || header,
    device: 'desktop',
    themeBar: themeBar,
    theme: theme.name || themeName,
    hasNetwork: true,
    primaryColor: '#247fff',
    changeNetwork: (hasNetwork) => set(() => ({ hasNetwork: hasNetwork })),
    setColor: (color) => set(() => ({ primaryColor: color })),
    setLayout: (layout) => set(() => ({ layout: layout })),
    foldSidebar: (collapse) => set(() => ({ collapse: collapse })),
  }),
)

export default useSettingStore