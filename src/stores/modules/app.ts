/**
 * @author Elwin
 * @description 应用全局配置
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getI18nLng } from '@/i18n';

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
  persist(
    (set, get) => ({
      collapse: false,
      themeDrawerVisible: false,
      mixSidebarFixed: false,
      reloadFlag: true,
      isMobile: false,
      hasNetwork: true,
      lang: getI18nLng(),
      changeNetwork: (hasNetwork) => set(() => ({ hasNetwork: hasNetwork })),
      toggleSidebar: (collapse) => set(() => ({ collapse: collapse })),
      setThemeDrawerVisible: (visible) => set(() => ({ themeDrawerVisible: visible })),
      toggleMixSidebarFixed: () => set(() => ({ mixSidebarFixed: !get().mixSidebarFixed })),
      setLang: (lang) => set(() => ({ lang: lang }))
    }),
    {
      name: 'appStorage', // 存储名称
      storage: createJSONStorage(() => localStorage), // 指定使用的存储类型，默认为localStorage
      partialize: (state) => ({ // 定义需要持久化的字段
        lang: state.lang,
      }),
    }
  )
)

export default useAppStore