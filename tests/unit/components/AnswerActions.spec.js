import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import i18nMock from '@/tests/mocks/i18n.js'
import AnswerActions from '@/components/AnswerActions.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: i18nMock,
})

function wrapperFactory() {
  return mount(AnswerActions, {
    global: {
      plugins: [i18n],
    },
  })
}

describe('@/components/AnswerActions.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.vm).toBeTruthy()
  })

  describe('confirmation message', () => {
    it.each([
      [1, 'fruit.confirmation'],
      [2, 'fruit.available'],
      [3, 'fruit.here'], // or any other round
    ])(
      'should have correct confirmation message if "currentRound" is %s',
      async (currentRound, translation) => {
        const wrapper = wrapperFactory()
        await wrapper.setProps({ currentRound })
        const element = wrapper.find('[data-testid="confirmation-message"]')

        expect(element.text()).toBe(i18nMock.en[translation])
      }
    )
  })

  describe('translations', () => {
    it.each([
      ['no-button-text', 'general.no'],
      ['yes-button-text', 'general.yes'],
    ])('should translate text for "%s"', (id, translation) => {
      const wrapper = wrapperFactory()
      const element = wrapper.find(`[data-testid="${id}"]`)

      expect(element.text()).toBe(i18nMock.en[translation])
    })
  })

  describe('icons', () => {
    it.each([['no-button-icon'], ['yes-button-icon']])(
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
      ['no-button', 'no'],
      ['yes-button', 'yes'],
    ])('should emit event "increase" for "%s"', async (id, payload) => {
      const wrapper = wrapperFactory()
      const element = wrapper.find(`[data-testid="${id}"]`)

      await element.trigger('click')

      const emitted = wrapper.emitted('increase', payload)

      expect(emitted).toBeTruthy()
    })
  })
})
