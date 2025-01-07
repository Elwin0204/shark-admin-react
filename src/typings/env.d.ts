export type GlobEager<T> = {
  [key: string]: T;
};

declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_URL_BAIDU: string;
    readonly VITE_API_URL_GOOGLE: string;
    readonly VITE_FILE_URL: string;
  }
}