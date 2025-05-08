// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://securil.github.io',
  base: '/Sera_IR',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'zh', 'ja'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [tailwind()],
  // GitHub Pages에 직접 배포를 위한 설정 추가
  output: 'static'
});
