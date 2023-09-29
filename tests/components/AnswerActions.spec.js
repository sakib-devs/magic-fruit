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

describe('AnswerActions', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(AnswerActions, {
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
