const themeSchemes: UnionKey.ThemeMode[] = ['light', 'dark', 'auto'];

export function getNextThemeMode(currentMode: UnionKey.ThemeMode): UnionKey.ThemeMode {
  const index = themeSchemes.findIndex(item => item === currentMode);
  // 更新索引，当到达数组末尾时，回到开头
  const newIndex = (index + 1) % themeSchemes.length;
  // 返回新的主题模式
  return themeSchemes[newIndex];
}