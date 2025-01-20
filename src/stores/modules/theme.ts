/**
 * @author Elwin
 * @description 全局主题样式配置
 */
import { create } from 'zustand'
import defaultSettings from '@/config/index'
import { getDarkMode, getNextThemeMode } from '../shared/theme.util';

const {
  layout,
  themeMode
} = defaultSettings

export interface ThemeState {
  layout: UnionKey.LayoutMode;
  themeMode: UnionKey.ThemeMode;
  isDarkMode: boolean;
  primaryColor: string;
  //框架默认主题色
  baseColorDefault: string;
  //默认层级
  baseZindex: 999;
  baseHeaderZindex: number;
  baseTabsBarZindex: number;
  baseSideBarZindex: number;
  baseFooterZindex: number;
  //横向布局纵向布局时菜单背景色
  baseMenuBackground: string;
  //菜单文字颜色
  baseMenuColor: string;
  // 菜单hover文字颜色
  baseMenuColorHover: string;
  //菜单选中文字颜色
  baseMenuColorActive: string;
  //菜单悬浮背景色
  baseMenuBackgroundHover: string;
  //菜单选中背景色
  baseMenuBackgroundActive: string;
  // 菜单选中或者hover左边框颜色
  baseMenuBorderLeftActive: string;
  //标题颜色
  baseTitleColor: string;
  //字体大小配置
  baseFontSizeSmall: number;
  baseFontSizeDefault: number;
  baseFontSizeBig: number;
  baseFontSizeBigger: number;
  baseFontSizeMax: number;
  baseFontColor: string;
  baseColorBlue: string;
  baseColorGreen: string;
  baseColorWhite: string;
  baseColorBlack: string;
  baseColorYellow: string;
  baseColorOrange: string;
  baseColorRed: string;
  baseColorGray: string;
  baseMainWidth: number;
  baseBorderRadius: number;
  baseBorderColor: string;
  //输入框高度
  baseInputHeight: number;
  //默认paddiing
  basePadding: number;
  //默认阴影
  baseBoxShadow: string;
  //横向布局时top-bar、logo、一级菜单的高度
  baseTopBarHeight: number;
  //纵向布局时logo的高度
  baseLogoHeight: number;
  //顶部nav-bar的高度
  baseHeaderHeight: number;
  baseFooterHeight: number;
  //顶部多标签页tabs-bar的高度
  baseTabsBarHeight: number;
  //顶部多标签页tabs-bar中每一个item的高度
  baseTagItemHeight: number;
  //菜单li标签的高度
  baseMenuItemHeight: number;
  setLayout: (layout: UnionKey.LayoutMode) => void;
  toggleThemeMode: (themeMode?: UnionKey.ThemeMode) => void;
  //app-main的高度
  baseAppMainHeight: () => string;
  // app-main-container高度
  baseAppMainContainerHeight: () => string;
  // 左侧菜单未折叠时的宽度
  baseSidebarWidth: number;
  // 左侧菜单折叠时的宽度
  baseSidebarCollapseWidth: number;
  baseSidebarMixWidth: number;
  //纵向布局时左侧导航未折叠时右侧内容的宽度
  baseRightContentWidth: () => string;
  //默认动画
  baseTransition: string;
  //默认动画长
  baseTransitionTime: string;
  setColor: (color: string) => void;
}

const useThemeStore = create<ThemeState>()(
  (set, get) => ({
    layout: layout as UnionKey.LayoutMode,
    themeMode: themeMode as UnionKey.ThemeMode,
    isDarkMode: getDarkMode(themeMode as UnionKey.ThemeMode),
    primaryColor: '#247fff',
    baseColorDefault: '#5E7CE0',
    baseZindex: 999,
    baseHeaderZindex: 17,
    baseTabsBarZindex: 15,
    baseSideBarZindex: 19,
    baseFooterZindex: 15,
    baseMenuBackground: '#fff',
    baseMenuColor: '#575d6c',
    baseMenuColorHover: '#96ADFA',
    baseMenuColorActive: '#96ADFA',
    baseMenuBackgroundHover: '#d5d5db',
    baseMenuBackgroundActive: '#d5d5db',
    baseMenuBorderLeftActive: '#5E7CE0',
    baseTitleColor: '#575d6c',
    baseFontSizeSmall: 12,
    baseFontSizeDefault: 14,
    baseFontSizeBig: 16,
    baseFontSizeBigger: 18,
    baseFontSizeMax: 22,
    baseFontColor: '#606266',
    baseColorBlue: '#5E7CE0',
    baseColorGreen: '#41b882',
    baseColorWhite: '#fff',
    baseColorBlack: '#000',
    baseColorYellow: '#ffa91b',
    baseColorOrange: '#ff6700',
    baseColorRed: '#f34d37',
    baseColorGray: 'rgba(0, 0, 0, 0.65)',
    baseMainWidth: 1279,
    baseBorderRadius: 4,
    baseBorderColor: '#dcdfe6',
    baseInputHeight: 32,
    basePadding: 20,
    baseBoxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
    baseTopBarHeight: 65,
    baseLogoHeight: 75,
    baseHeaderHeight: 56,
    baseFooterHeight: 48,
    baseTabsBarHeight: 44,
    baseTagItemHeight: 34,
    baseMenuItemHeight: 50,
    baseSidebarWidth: 220,
    baseSidebarCollapseWidth: 64,
    baseSidebarMixWidth: 90,
    baseTransition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s background 0s, color 0s, font-size 0s',
    baseTransitionTime: '0.3s',
    setLayout: (layout: UnionKey.LayoutMode) => set(() => ({ layout: layout })),
    toggleThemeMode: (themeMode?: UnionKey.ThemeMode)=> {
      const newThemeMode = getNextThemeMode(get().themeMode);
      set(() => ({ themeMode: newThemeMode }))
    },
    baseAppMainHeight: () => {
      return `calc(100vh - ${get().baseHeaderHeight}px - ${get().baseTabsBarHeight}px - ${get().basePadding}px - ${get().basePadding}px - 55px - 55px)`
    },
    baseAppMainContainerHeight: () => {
      return `calc(100vh - ${get().baseHeaderHeight}px - ${get().baseTabsBarHeight}px)`
    },
    baseRightContentWidth: () => {
      return `calc(100% - ${get().baseSidebarWidth}px)`
    },
    setColor: (color) => set(() => ({ primaryColor: color })),
  }),
)

export default useThemeStore

