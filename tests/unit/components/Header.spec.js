import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useLocaleStore } from '@/store/locale'
import { createI18n } from 'vue-i18n'
import i18nMock from '@/tests/mocks/i18n.js'
import Header from '@/components/Header.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: i18nMock,
})

describe('@/components/Header.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      global: {
        plugins: [i18n, createTestingPinia()],
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
