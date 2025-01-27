import defaultSettings from '@/config';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "./locale";
import { skLocal } from '@/utils/storage';

export function setupI18n() {
  i18n.use(initReactI18next).init({
    resources: locales,
    lng: getI18nLng(),
    interpolation: {
      escapeValue: false
    }
  });
}

export const $t = i18n.t;

export function getI18nLng(): UnionKey.LangKey {
  const langKeys = Object.keys(locales);

  const appStorage = skLocal.get("appStorage");
  if(appStorage) {
    const { lang } = appStorage.state;
    if (lang) {
      for (const key of langKeys) {
        if (lang.indexOf(key) > -1) {
          document.documentElement.lang = key;
          return key as UnionKey.LangKey;
        }
      }
    }
  }

  // browser lang
  const browserLang = navigator.language;
  for (const key of langKeys) {
    if (browserLang.indexOf(key) > -1) {
      document.documentElement.lang = key
      return key as UnionKey.LangKey;
    }
  }

  return defaultSettings.lang;
}

export function setI18nLng(lng: UnionKey.LangKey) {
  i18n.changeLanguage(lng);
}