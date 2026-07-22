import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import chromium from '@sparticuz/chromium'

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/about', '/services', '/portfolio', '/contact'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 8000,
        maxConcurrentRoutes: 1,
        timeout: 45000,
        skipThirdPartyRequests: true,
        launchOptions: {
          args: [
            ...chromium.args,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
          ],
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          dumpio: true,
        },
      },
    }),
  ],
})