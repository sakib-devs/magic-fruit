import locales from './utils/locale'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', 'nuxt-svgo'],
  css: ['~/assets/css/main.css', '~/assets/css/icons.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'Magic Fruit',
      meta: [{ name: 'description', content: 'Magic Fruit' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/mango.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  i18n: {
    locales,
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },
})
