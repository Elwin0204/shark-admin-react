import zhCN from 'antd/es/locale/zh_CN';
import zhTW from "antd/es/locale/zh_TW";
import enUS from "antd/es/locale/en_US";
import viVN from "antd/es/locale/vi_VN";
import type { Locale } from "antd/lib/locale";

export const antdLocales: Record<UnionKey.LangKey, Locale> = {
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "en": enUS,
  "vi": viVN
};