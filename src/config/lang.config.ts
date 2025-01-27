/**
 * @author Elwin
 * @description 默认国际化配置
 **/

interface LangConfig {
  lang: UnionKey.LangKey;
  langOptions: App.LangOption;
}

const lang: LangConfig = {
  lang: 'zh-CN',
  langOptions: {
    'zh-CN': '中文简体',
    'zh-TW': '中文繁體',
    'en': 'English',
    'vi': 'Tiếng Việt',
  },
};
export default lang;
