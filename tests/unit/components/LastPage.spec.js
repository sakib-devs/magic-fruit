import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import i18nMock from '@/tests/mocks/i18n.js'
import LastPage from '@/components/LastPage.vue'
import { answer } from '@/utils/fruits'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: i18nMock,
})

function wrapperFactory() {
  return mount(LastPage, {
    global: {
      plugins: [i18n],
    },
  })
}

describe('@/components/LastPage.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.vm).toBeTruthy()
  })

  describe('computed properties', () => {
    describe('"hasAnswer"', () => {
      /**
       * should return true when points is between 4 and 20
       * should return false when points is less than 4 and greater than 20
       */
      it.each([
        [false, 1],
        [false, 2],
        [false, 3],
        [true, 4],
        [true, 5],
        [true, 6],
        [true, 7],
        [true, 8],
        [true, 9],
        [true, 10],
        [true, 11],
        [true, 12],
        [true, 13],
        [true, 14],
        [true, 15],
        [true, 16],
        [true, 17],
        [true, 18],
        [true, 19],
        [true, 20],
        [false, 21],
        [false, 22],
        [false, 23],
      ])(
        'should return "%s" when "points" is "%s"',
        async (expected, points) => {
          const wrapper = wrapperFactory()

          await wrapper.setProps({ points })
          expect(wrapper.vm.hasAnswer).toBe(expected)
        }
      )
    })

    describe('"pickedFruit"', () => {
      /**
       * should return correct i18n names when points is between 4 and 20
       * should return "wrong answer" when points is less than 4 and greater than 20
       */
      it.each([
        ['general.wrong-answer', 1],
        ['general.wrong-answer', 2],
        ['general.wrong-answer', 3],
        ['fruit.coconut', 4],
        ['fruit.woodApple', 5],
        ['fruit.sapodilla', 6],
        ['fruit.velvetApple', 7],
        ['fruit.carambola', 8],
        ['fruit.papaya', 9],
        ['fruit.amalaki', 10],
        ['fruit.banana', 11],
        ['fruit.lychee', 12],
        ['fruit.jackfruit', 13],
        ['fruit.mango', 14],
        ['fruit.palm', 15],
        ['fruit.pomegranate', 16],
        ['fruit.jujube', 17],
        ['fruit.berry', 18],
        ['fruit.grapefruit', 19],
        ['fruit.custardApple', 20],
        ['general.wrong-answer', 21],
        ['general.wrong-answer', 22],
        ['general.wrong-answer', 23],
      ])(
        'should return "%s" when "points" is "%s"',
        async (translation, points) => {
          const wrapper = wrapperFactory()

          await wrapper.setProps({ points })

          expect(wrapper.vm.pickedFruit).toBe(i18nMock.en[translation])
        }
      )
    })

    describe('"wrongAnswer"', () => {
      it('should return correct i18n name', () => {
        const wrapper = wrapperFactory()
        const expected = `(${i18nMock.en['general.or']} ${i18nMock.en['general.wrong-answer']})`

        expect(wrapper.vm.wrongAnswer).toBe(expected)
      })
    })
  })

  describe('elements that depends on "points"', () => {
    describe('elements that should or should not render', () => {
      it.each([
        ['should not', 'answer-label', 1, false],
        ['should not', 'answer-image', 1, false],
        ['should not', 'wrong-answer', 1, false],
        ['should', 'answer-label', 10, true],
        ['should', 'answer-image', 10, true],
        ['should', 'wrong-answer', 10, true],
      ])(
        `%s render "%s" if "points" is "%s"`,
        async (_, id, points, expected) => {
          const wrapper = wrapperFactory()

          await wrapper.setProps({ points })

          const element = wrapper.find(`[data-testid="${id}"]`)

          expect(element.exists()).toBe(expected)
        }
      )
    })

    describe('texts', () => {
      const expectedWrongAnswer = `(${i18nMock.en['general.or']} ${i18nMock.en['general.wrong-answer']})`

      it.each([
        ['answer-label', i18nMock.en['general.your-answer']],
        ['wrong-answer', expectedWrongAnswer],
      ])(`should render correct test for "%s"`, async (id, expected) => {
        const wrapper = wrapperFactory()

        await wrapper.setProps({ points: 10 }) // any number between 4 and 20

        const element = wrapper.find(`[data-testid="${id}"]`)

        expect(element.text()).toBe(expected)
      })
    })

    describe('"answer-image" if "points" is between 4 and 20', () => {
      it.each([[4], [10], [20]])(
        'should render correct image when "points" is %s',
        async points => {
          const wrapper = wrapperFactory()
          const { id, name } = answer.get(points)

          await wrapper.setProps({ points })

          const element = wrapper.find('[data-testid="answer-image"]')

          expect(element.attributes('src')).toBe(`/images/fruits/${id}.png`)
          expect(element.attributes('alt')).toBe(i18nMock.en[name])
        }
      )
    })
  })

  describe('play button', () => {
    it('emits "start" event when clicked', async () => {
      const wrapper = wrapperFactory()
      const button = wrapper.find('[data-testid="play-button"]')

      await button.trigger('click')

      expect(wrapper.emitted('start')).toBeTruthy()
    })

    describe('play icon', () => {
      it('should render the icon properly', () => {
        const wrapper = wrapperFactory()
        const playIcon = wrapper.find('[data-testid="play-icon"]')

        expect(playIcon.exists()).toBeTruthy()
        expect(playIcon.attributes('title')).toBe(i18nMock.en['general.play'])
      })
    })

    it('should render the text properly', () => {
      const wrapper = wrapperFactory()
      const playText = wrapper.find('[data-testid="play-again-text"]')

      expect(playText.exists()).toBeTruthy()
      expect(playText.text()).toBe(i18nMock.en['general.play-again'])
    })
  })
})
