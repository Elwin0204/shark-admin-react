import react from '@vitejs/plugin-react'
import { Env } from '../../src/typings/env';
import { setupHtmlPlugin } from './html';
import { setupUnPluginIcon } from './unplugin-icon';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTimestamp: number) {
  const plugins = [
    react(),
    ...setupUnPluginIcon(viteEnv),
    setupHtmlPlugin(buildTimestamp),
  ];

  return plugins;
}