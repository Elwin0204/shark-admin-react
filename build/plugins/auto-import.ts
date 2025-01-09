import AutoImport from "unplugin-auto-import/vite";
import IconsResolve from "unplugin-icons/resolver";
import type { Env } from "../../src/typings/env";
import { antdResolver } from "./antd/antdResolver";

export function setupAutoImport(viteEnv: Env.ImportMeta) {
  return AutoImport({
    imports: ["react", "react-router-dom", "ahooks"],
    include: [/\.[tj]sx?$/],
    dirs: ["src/hooks/**", "src/components/**"],
    exclude: [
      /\/style\.ts$/, // 排除style.ts 文件
    ],
    dts: "src/typings/auto-imports.d.ts",
    resolvers: [
      IconsResolve({
        prefix: "icon",
        extension: "tsx",
        customCollections: ["local"],
      }),
      // todo: 不好使, 日后完善
      // antdResolver({ prefix: 'A' })
    ],
  });
}