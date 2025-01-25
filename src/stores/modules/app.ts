/**
 * @author Elwin
 * @description 应用全局配置
 */
import { create } from 'zustand';
import defaultSettings from '@/config/index';

const { lang } = defaultSettings;

interface AppState {
  collapse: boolean;
  themeDrawerVisible: boolean;
  mixSidebarFixed: boolean;
  reloadFlag: boolean;
  isMobile: boolean;
  hasNetwork: boolean;
  lang: UnionKey.LangKey,
  changeNetwork: (hasNetwork: boolean) => void;
  toggleSidebar: (collapse: boolean) => void;
  setThemeDrawerVisible: (visible: boolean) => void;
  toggleMixSidebarFixed: () => void;
  setLang: (lang: UnionKey.LangKey) => void;
}

const useAppStore = create<AppState>()(
  (set, get) => ({
    collapse: false,
    themeDrawerVisible: false,
    mixSidebarFixed: false,
    reloadFlag: true,
    isMobile: false,
    hasNetwork: true,
    lang: lang,
    changeNetwork: (hasNetwork) => set(() => ({ hasNetwork: hasNetwork })),
    toggleSidebar: (collapse) => set(() => ({ collapse: collapse })),
    setThemeDrawerVisible: (visible) => set(() => ({ themeDrawerVisible: visible })),
    toggleMixSidebarFixed: () => set(() => ({ mixSidebarFixed: !get().mixSidebarFixed })),
    setLang: (lang) => set(() => ({ lang: lang }))
  }),
)

export default useAppStore