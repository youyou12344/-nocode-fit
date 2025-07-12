import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { tmpdir } from 'os';
import { devLogger } from '@meituan-nocode/vite-plugin-dev-logger';
import { devHtmlTransformer, prodHtmlTransformer } from '@meituan-nocode/vite-plugin-nocode-html-transformer';
import react from '@vitejs/plugin-react';

// 在构建时输出环境变量取值
console.log('=== 构建环境变量信息 ===');
console.log('VERCEL:', process.env.VERCEL);
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('========================');

const isProdEnv = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// 根据不同部署环境动态设置 base 路径
const PUBLIC_PATH = isVercel ? '/' : (isGitHubPages ? '/yy12344-fit/' : '/');
const OUT_DIR = 'dist';
const PLUGINS = isProdEnv ? [
  react(),
  prodHtmlTransformer(process.env.CHAT_VARIABLE)
] : [
  devLogger({
    dirname: resolve(tmpdir(), '.nocode-dev-logs'),
    maxFiles: '3d',
  }),
  react(),
  devHtmlTransformer(process.env.CHAT_VARIABLE),
];

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::',
    port: '8080',
    hmr: {
      overlay: false
    }
  },
  plugins: [
    PLUGINS
  ],
  base: PUBLIC_PATH,
  build: {
    outDir: OUT_DIR
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: 'lib',
        replacement: resolve(__dirname, 'lib'),
      },
    ],
  },
});