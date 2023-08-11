/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const riftlinkTheme = {
  "dark": true,
  "colors": {
    "background": "#121212",
    "surface": "#212121",
    "primary": "#FF0B45",
    "secondary": "#25E1BB",
    "error": "#FF002E",
    "info": "#25E1BB",
    "success": "#3AAF14",
    "warning": "#FB8C00",
    "on-surface": "#EEEEEE",
    "on-background": "#EEEEEE",
  }
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'riftlinkTheme',
    themes: {
      riftlinkTheme
    },
  },
})
