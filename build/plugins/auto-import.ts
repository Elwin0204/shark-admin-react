import AutoImport from "unplugin-auto-import/vite";
import IconsResolve from "unplugin-icons/resolver";
import type { Env } from "../../src/typings/env";

export function setupAutoImport(viteEnv: Env.ImportMeta) {
  return AutoImport({
    imports: ["react", "react-router-dom", "ahooks"],
    include: [/\.[tj]sx?$/],
    dirs: ["src/hooks/**", "src/components/**"],
    exclude: [
      /[/\\]style\.ts$/i, // 👈 强化版排除
    ],
    dts: "src/typings/auto-imports.d.ts",
    resolvers: [
      IconsResolve({
        prefix: "icon",
        extension: "tsx",
        customCollections: ["local"],
      }),
    ],
  });
}