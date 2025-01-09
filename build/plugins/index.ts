import react from '@vitejs/plugin-react'
import { Env } from '../../src/typings/env';
import { setupHtmlPlugin } from './html';
import { setupUnPluginIcon } from './unplugin-icon';
import { setupAutoImport } from "./auto-import";

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTimestamp: number) {
  const plugins = [
    react(),
    setupAutoImport(viteEnv),
    ...setupUnPluginIcon(viteEnv),
    setupHtmlPlugin(buildTimestamp),
  ];

  return plugins;
}