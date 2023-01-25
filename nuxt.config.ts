import eslint from 'vite-plugin-eslint';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['normalize.css/normalize.css'],
  vite: {
    plugins: [ eslint() ]
  },
})
