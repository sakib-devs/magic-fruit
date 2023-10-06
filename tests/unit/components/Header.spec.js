import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import { useLocaleStore } from '@/store/locale'
import locales from '@/utils/locale'
import i18nMock from '@/tests/mocks/i18n'
import Header from '@/components/Header.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'bn',
  messages: i18nMock,
})

describe('@/components/Header.vue', () => {
  let wrapper, store

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      global: {
        plugins: [i18n, createTestingPinia({ stubActions: false })],
      },
    })

    store = useLocaleStore()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('computed properties', () => {
    describe('locales', () => {
      it('returns an array of locales', () => {
        expect(wrapper.vm.locales).toEqual(locales)
      })
    })
  })

  describe('methods', () => {
    describe('isSelected', () => {
      it.each([
        ['bn', true],
        ['hi', false],
        ['en', false],
        ['es', false],
        ['de', false],
        ['it', false],
        ['fr', false],
      ])('checks if the "%s" is selected for i18n', (code, expected) => {
        const isSelectedSpy = vi.spyOn(wrapper.vm, 'isSelected')
        const isSelected = isSelectedSpy(code)

        expect(isSelected).toBe(expected)
      })
    })
  })
})
