/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { createAuth0 } from '@auth0/auth0-vue';

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(createAuth0({
      domain: import.meta.env.VITE_AUTH_DOMAIN,
      clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH_AUDIENCE
      }
    }))
}
