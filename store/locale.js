import locales from '@/utils/locale'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    availableLocales: locales,
  }),
  getters: {
    locales: ({ availableLocales }) => availableLocales,
  },
})
