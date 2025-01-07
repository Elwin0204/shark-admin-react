import path from 'node:path';
import process from 'node:process';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import type { PluginOption } from 'vite';
import Icons from 'unplugin-icons/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import type { Env } from "../../src/typings/env.d";

export function setupUnPluginIcon(viteEnv: Env.ImportMeta) {
  const localIconPath = path.join(process.cwd(), 'src/assets/icons');

  const plugins: PluginOption[] = [
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `icon-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    }),
    Icons({
      compiler: 'jsx',
      customCollections: {
        ["local"]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      jsx: 'react',
      defaultClass: 'inline-block'
    })
  ];

  return plugins;
}
