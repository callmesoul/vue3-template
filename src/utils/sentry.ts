import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import 'virtual:vite-plugin-sentry/sentry-config'
import { EnvMode } from '@/enum'
// @ts-ignore
const release = window.VITE_PLUGIN_SENTRY_CONFIG.release
export function StartSentry(parmas: { app: any; router: any }) {
  if (import.meta.env.MODE === EnvMode.Mainnet) {
    Sentry.init({
      app: parmas.app,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(parmas.router),
          tracePropagationTargets: ['*'],
        }),
        new Sentry.Replay(),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      release,
    })
  }
}
