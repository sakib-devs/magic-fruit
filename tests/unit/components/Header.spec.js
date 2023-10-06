import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import locales from '@/utils/locale'
import i18nMock from '@/tests/mocks/i18n'
import Header from '@/components/Header.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'bn',
  messages: i18nMock,
})

function wrapperFactory() {
  return shallowMount(Header, {
    global: {
      plugins: [i18n, createTestingPinia({ stubActions: false })],
    },
  })
}

describe('@/components/Header.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  describe('computed properties', () => {
    describe('locales', () => {
      it('returns an array of locales', () => {
        const wrapper = wrapperFactory()
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
        const wrapper = wrapperFactory()
        const isSelectedSpy = vi.spyOn(wrapper.vm, 'isSelected')
        const isSelected = isSelectedSpy(code)

        expect(isSelected).toBe(expected)
      })
    })
  })

  describe('language dropdown', () => {
    it('should have a language dropdown with locales', () => {
      const wrapper = wrapperFactory()
      const dropdown = wrapper.find('[data-testid="language-dropdown"]')
      const options = dropdown.findAll('option')

      expect(dropdown.exists()).toBe(true)
      expect(options[0].text()).toBe(i18nMock.bn['general.select-language'])
      expect(options.length).toBe(locales.length + 1)
    })

    it('should set the selected language is any option is selected', async () => {
      const wrapper = wrapperFactory()
      const dropdown = wrapper.find('[data-testid="language-dropdown"]')
      const options = dropdown.findAll('option')

      await options[1].setSelected()

      expect(wrapper.vm.i18n.locale.value).toBe(locales[0].code)
    })
  })
})
