import zhCN from "./langs/zh-CN";
import zhTW from "./langs/zh-TW";
import enUS from "./langs/en-US";
import vi from "./langs/vi-VN";

const locales: Record<UnionKey.LangKey, any> = {
  "zh-CN": {
    translation: zhCN
  },
  "zh-TW": {
    translation: zhTW
  },
  "en": {
    translation: enUS
  },
  "vi": {
    translation: vi
  }
};

export default locales;