import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/about', '/services', '/portfolio', '/contact'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        // FIX: renderAfterElementExists causes a dangling never-resolving Promise inside
        // Chrome (via page.evaluate). Chrome GC collects it during lazy-chunk loading,
        // throwing "Promise was collected" before <main> ever appears.
        // renderAfterTime uses a setTimeout which holds a strong GC reference — no GC issue.
        renderAfterTime: 8000,
        // Render one route at a time to avoid Puppeteer race conditions
        maxConcurrentRoutes: 1,
        // 45-second hard timeout per route
        timeout: 45000,
        // Block 3rd-party requests (Clarity, GA) so networkidle0 isn't held open by beacons
        skipThirdPartyRequests: true,
        // Note: navigationOptions.waitUntil fails schema validation in this package version
        // (upstream schema bug: base type is 'null'). skipThirdPartyRequests is the real fix —
        // it blocks GA/Clarity beacons so networkidle0 doesn't hang indefinitely.
      },
    }),
  ],
})
