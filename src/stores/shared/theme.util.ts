import { DARK_MODE_MEDIA_QUERY, GRAYSCALE_CLS } from "@/const/app";
import { toggleHtmlClass } from "@/utils";

const themeSchemes: UnionKey.ThemeMode[] = ['light', 'dark', 'auto'];

export function getNextThemeMode(currentMode: UnionKey.ThemeMode): UnionKey.ThemeMode {
  const index = themeSchemes.findIndex(item => item === currentMode);
  // 更新索引，当到达数组末尾时，回到开头
  const newIndex = (index + 1) % themeSchemes.length;
  // 返回新的主题模式
  return themeSchemes[newIndex];
}

export function getDarkMode(themeMode: UnionKey.ThemeMode) {
  console.log("getDarkMode", themeMode, window.matchMedia(DARK_MODE_MEDIA_QUERY).matches)
  if (themeMode === 'dark') {
    return true;
  } else if (themeMode === 'light') {
    return false;
  }
  return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
}

export function toggleGrayscaleMode(enable = false) {
  const { add, remove } = toggleHtmlClass(GRAYSCALE_CLS);
  if(enable) {
    add();
  } else {
    remove();
  }
}

export function toggleColorBlindnessMode(enable = false) {
  const htmlElement = document.documentElement;
  htmlElement.style.filter = enable ? 'invert(80%)' : '';
}