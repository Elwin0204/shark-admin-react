import { useThemeStore } from "@/stores";
import { ConfigProviderProps, theme } from "antd";

function useSharkTheme() {
  const { 
    primaryColor,
    isDarkMode,
    baseHeaderZindex,
    baseTabbarZindex,
    baseSideBarZindex,
    baseFooterZindex,
    baseHeaderHeight,
    baseFooterHeight,
    baseTabsBarHeight,
    baseSidebarWidth,
    baseSidebarCollapseWidth,
    baseSidebarMixWidth,
    baseSidebarMixChildWidth,
    baseSidebarVerticalMixWidth,
    showWatermark,
    watermarkText
  } = useThemeStore();
  const { darkAlgorithm, defaultAlgorithm } = theme;
  
  const antdTheme: ConfigProviderProps["theme"] = {
    token: {
      colorPrimary: primaryColor
    },
    algorithm: [isDarkMode ? darkAlgorithm : defaultAlgorithm],
  };

  const customToken = {
    primaryColor,
    baseHeaderZindex,
    baseTabbarZindex,
    baseSideBarZindex,
    baseFooterZindex,
    baseHeaderHeight,
    baseFooterHeight,
    baseTabsBarHeight,
    baseSidebarWidth,
    baseSidebarCollapseWidth,
    baseSidebarMixWidth,
    baseSidebarMixChildWidth,
    baseSidebarVerticalMixWidth
  };

  const watermark = {
    visible: showWatermark,
    text: watermarkText
  };

  return { antdTheme, customToken, watermark };
}

export default useSharkTheme;