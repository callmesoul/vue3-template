import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import svgLoader from 'vite-svg-loader'
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
import type { ViteSentryPluginOptions } from 'vite-plugin-sentry'
import viteSentry from 'vite-plugin-sentry'
// import dns from 'dns'
// dns.setDefaultResultOrder('verbatim')
const pathSrc = path.resolve(__dirname, 'src')


export default ({ mode, command }) => {
  // 加载环境配置文件
  const env = loadEnv(mode, process.cwd())
  // # sentry 
  // const sentryConfig: ViteSentryPluginOptions = {
  //   url: env.VITE_SENTRY_URL,
  //   authToken: env.VITE_SENTRY_AUTH_TOKEN,
  //   org: env.VITE_SENTRY_ORG,
  //   project: env.VITE_SENTRY_PROJECT,
  //   release: env.VITE_COMMIT_ID,
  //   deploy: {
  //     env: 'production'
  //   },
  //   setCommits: {
  //     auto: true
  //   },
  //   sourceMaps: {
  //     include: ['./dist/assets'],
  //     ignore: ['node_modules'],
  //     urlPrefix: '~/assets'
  //   }
  // }

  const isProduction = command === 'build'
  return defineConfig({
    plugins: [
      vue(),
      // element-plus 按需加载
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
      // 多语言加载
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: path.resolve(__dirname, './src/languages/**'),
      }),
      svgLoader(),
      VitePluginHtmlEnv(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
        //  */
        customDomId: '__svg__icons__dom__',
      }),
      viteExternalsPlugin({}),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        devOptions: {
          enabled: true,
          navigateFallbackAllowlist: [/^index.html$/],
        },
        manifest: {
          name: env.VITE_AppName,
          short_name: env.VITE_AppName,
          description:env.VITE_AppDescription,
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-48x48.png',
              sizes: '48x48',
              type: 'image/png',
            },
            {
              src: 'pwa-72x72.png',
              sizes: '72x72',
              type: 'image/png',
            },
            {
              src: 'pwa-96x96.png',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: 'pwa-144x144.png',
              sizes: '144x144',
              type: 'image/png',
            },
            {
              src: 'pwa-168x168.png',
              sizes: '168x168',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
      // basicSsl(),

      // sentryVitePlugin({
      //   include: '.',
      //   ignore: ['node_modules', 'vite.config.ts'],
      //   org: env.VITE_SENTRY_ORG,
      //   project: env.VITE_SENTRY_PROJECT,
      //   authToken: env.VITE_SENTRY_AUTH_TOKEN,
      // }),

      // #Sentry
      // viteSentry(sentryConfig)
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
    },
    define: {
      _APP_VERSION: JSON.stringify(pkg.version),
    },
    server: {
      host: true,
      https: false,
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
    build: {
      target: isProduction ? 'es2015' : 'modules',
      minify: isProduction,
      sourcemap: isProduction ? false : 'inline',
      // sourcemap: true,
      rollupOptions: {
        // @ts-ignore
        plugins: [nodePolyfills()],
        output: {
          sourcemap: isProduction ? false : 'inline',
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  })
}
