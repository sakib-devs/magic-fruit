import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import i18nMock from '@/tests/mocks/i18n.js'
import IncreamentActions from '@/components/IncreamentActions.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: i18nMock,
})

function wrapperFactory() {
  return mount(IncreamentActions, {
    global: {
      plugins: [i18n],
    },
  })
}

describe('@/components/IncreamentActions.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.vm).toBeTruthy()
  })

  describe('translations', () => {
    it.each([
      ['pick-fruit-message', 'fruit.pick-fruit'],
      ['previous-button-text', 'general.previous'],
      ['next-button-text', 'general.next'],
    ])('should translate text for "%s"', (id, translation) => {
      const wrapper = wrapperFactory()
      const element = wrapper.find(`[data-testid="${id}"]`)

      expect(element.text()).toBe(i18nMock.en[translation])
    })
  })

  describe('icons', () => {
    it.each([['previous-button-icon'], ['next-button-icon']])(
      'should have icon "%s"',
      id => {
        const wrapper = wrapperFactory()
        const element = wrapper.find(`[data-testid="${id}"]`)

        expect(element.exists()).toBeTruthy()
      }
    )
  })

  describe('events', () => {
    it.each([
      ['previous-button', 'decrease'],
      ['next-button', 'increase'],
    ])('should emit event "increase" for "%s"', async (id, event) => {
      const wrapper = wrapperFactory()
      const element = wrapper.find(`[data-testid="${id}"]`)

      await element.trigger('click')

      const emitted = wrapper.emitted(event)

      expect(emitted).toBeTruthy()
    })
  })
})
