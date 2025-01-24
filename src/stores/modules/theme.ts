/**
 * @author Elwin
 * @description 全局主题样式配置
 */
import { create } from 'zustand'
import defaultSettings from '@/config/index'
import { getDarkMode, getNextThemeMode, toggleColorBlindnessMode, toggleGrayscaleMode } from '../shared/theme.util';

const {
  layout,
  themeMode,
  grayscale,
  colorBlindnessMode,
  showBreadcrumb,
  showTabbar,
  showWatermark,
  watermarkText,
  showFooter,
  pageAnimate,
  pageAnimateMode
} = defaultSettings

export interface ThemeState {
  layout: UnionKey.LayoutMode;
  themeMode: UnionKey.ThemeMode;
  grayscale: boolean;
  colorBlindnessMode: boolean;
  darkMode: boolean;
  primaryColor: string;
  inverted: boolean;
  baseHeaderZindex: number;
  baseTabbarZindex: number;
  baseSideBarZindex: number;
  baseFooterZindex: number;
  baseHeaderHeight: number;
  baseFooterHeight: number;
  baseTabsBarHeight: number;
  baseSidebarWidth: number;
  baseSidebarCollapseWidth: number;
  baseSidebarMixWidth: number;
  baseSidebarMixChildWidth: number;
  baseSidebarVerticalMixWidth: number;
  baseMainPadding: number;
  recommendColor: boolean;
  showWatermark: boolean;
  watermarkText: string;
  showBreadcrumb: boolean;
  breadcrumbIcon: boolean;
  showTabbar: boolean;
  tabbarIcon: boolean;
  showFooter: boolean;
  pageAnimate: boolean;
  pageAnimateMode: UnionKey.PageAnimateMode;
  setLayout: (layout: UnionKey.LayoutMode) => void;
  setThemeMode: (themeMode?: UnionKey.ThemeMode) => void;
  setGrayscale: (enable: boolean) => void;
  setColorBlindnessMode: (enable: boolean) => void;
  setPrimaryColor: (color: string) => void;
  setRecommendColor: (enable: boolean) => void;
  setShowWatermark: (visible: boolean) => void;
  setShowBreadcrumb: (visible: boolean) => void;
  setBreadcrumbIcon: (visible: boolean) => void;
  setShowTabbar: (visible: boolean) => void;
  setTabbarIcon: (visible: boolean) => void;
  setShowFooter: (visible: boolean) => void;
}

const useThemeStore = create<ThemeState>()(
  (set, get) => ({
    layout: layout as UnionKey.LayoutMode,
    themeMode: themeMode as UnionKey.ThemeMode,
    grayscale: grayscale,
    colorBlindnessMode: colorBlindnessMode,
    darkMode: getDarkMode(themeMode as UnionKey.ThemeMode),
    primaryColor: '#247fff',
    inverted: false,
    baseHeaderZindex: 17,
    baseTabbarZindex: 15,
    baseSideBarZindex: 19,
    baseFooterZindex: 15,
    baseHeaderHeight: 56,
    baseFooterHeight: 48,
    baseTabsBarHeight: 44,
    baseSidebarWidth: 220,
    baseSidebarCollapseWidth: 64,
    baseSidebarMixWidth: 90,
    baseSidebarMixChildWidth: 200,
    baseSidebarVerticalMixWidth: 290,
    baseMainPadding: 16,
    recommendColor: false,
    showWatermark: showWatermark,
    watermarkText: watermarkText,
    showBreadcrumb: showBreadcrumb,
    breadcrumbIcon: true,
    showTabbar: showTabbar,
    tabbarIcon: true,
    showFooter: showFooter,
    pageAnimate: pageAnimate,
    pageAnimateMode: pageAnimateMode as UnionKey.PageAnimateMode,
    setLayout: (layout: UnionKey.LayoutMode) => set(() => ({ layout: layout })),
    setThemeMode: (themeMode?: UnionKey.ThemeMode)=> {
      if(themeMode) {
        set(() => ({ themeMode: themeMode }))
        set(() => ({ darkMode: getDarkMode(themeMode as UnionKey.ThemeMode) }))
      } else {
        const newThemeMode = getNextThemeMode(get().themeMode);
        set(() => ({ themeMode: newThemeMode }))
        set(() => ({ darkMode: getDarkMode(newThemeMode as UnionKey.ThemeMode) }))
      }
    },
    setGrayscale: (enable: boolean) => {
      toggleGrayscaleMode(enable);
      set(() => ({ grayscale: enable }));
    },
    setColorBlindnessMode: (enable: boolean) => {
      toggleColorBlindnessMode(enable);
      set(() => ({ colorBlindnessMode: enable }));
    },
    setPrimaryColor: (color) => set(() => ({ primaryColor: color })),
    setRecommendColor: (enable: boolean) => set(() => ({ recommendColor: enable })),
    setShowWatermark: (visible: boolean) => set(() => ({ showWatermark: visible })),
    setShowBreadcrumb: (visible: boolean) => set(() => ({ showBreadcrumb: visible })),
    setBreadcrumbIcon: (visible: boolean) => set(() => ({ breadcrumbIcon: visible })),
    setShowTabbar: (visible: boolean) => set(() => ({ showTabbar: visible })),
    setTabbarIcon: (visible: boolean) => set(() => ({ tabbarIcon: visible })),
    setShowFooter: (visible: boolean) => set(() => ({ showFooter: visible })),
  }),
)

export default useThemeStore

