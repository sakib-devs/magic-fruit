import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FruitsList from '@/components/FruitsList.vue'

const firstChunckedFruits = getFruits(1, 10)
const secondChunckedFruits = getFruits(11, 20)
const thirdChunckedFruits = getFruits(21, 25)

const fruitsList1 = [...firstChunckedFruits]
const fruitsList2 = [...firstChunckedFruits, ...secondChunckedFruits]
const fruitsList3 = [
  ...firstChunckedFruits,
  ...secondChunckedFruits,
  ...thirdChunckedFruits,
]

function wrapperFactory() {
  return mount(FruitsList, {
    propsData: {
      fruits: [],
    },
  })
}
function getFruits(from, to) {
  const fruits = []

  for (let i = from; i <= to; i++) {
    fruits.push({
      id: i,
      name: `Fruit ${i}`,
    })
  }

  return fruits
}

describe('@/components/FruitsList.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.vm).toBeTruthy()
  })

  describe('computed properties', () => {
    describe('"hasFruits"', () => {
      it.each([
        [false, []],
        [true, fruitsList1],
        [true, fruitsList2],
        [true, fruitsList3],
      ])('should return "%s"', async (expected, fruits) => {
        const wrapper = wrapperFactory()

        await wrapper.setProps({ fruits })

        expect(wrapper.vm.hasFruits).toBe(expected)
      })
    })

    describe('"chunkedFruits"', () => {
      it.each([
        [1, [], []],
        [2, fruitsList1, [firstChunckedFruits]],
        [3, fruitsList2, [firstChunckedFruits, secondChunckedFruits]],
        [
          4,
          fruitsList3,
          [firstChunckedFruits, secondChunckedFruits, thirdChunckedFruits],
        ],
      ])(
        'should return the correct chunked fruits for "test-%s"',
        async (_testNum, fruits, chunkedFruits) => {
          const wrapper = wrapperFactory()

          await wrapper.setProps({ fruits })

          expect(wrapper.vm.chunkedFruits).toEqual(chunkedFruits)
        }
      )
    })
  })

  describe('fruits list', () => {
    it.each([
      ['should not', [], false],
      ['should', fruitsList1, true],
      ['should', fruitsList2, true],
      ['should', fruitsList3, true],
    ])(`%s render the fruits list`, async (_, fruits, expected) => {
      const wrapper = wrapperFactory()

      await wrapper.setProps({ fruits })

      const fruitsWrapper = wrapper.find('[data-testid="fruits"]')

      expect(fruitsWrapper.exists()).toBe(expected)
    })

    describe('chunked fruits', () => {
      it.each([
        [0, []],
        [1, fruitsList1],
        [2, fruitsList2],
        [3, fruitsList3],
      ])(
        'should render the "%s" chunked fruits',
        async (chunkedFruitsLength, fruits) => {
          const wrapper = wrapperFactory()

          await wrapper.setProps({ fruits })

          const chunkedFruitsWrapper = wrapper.findAll(
            '[data-testid="chunked-fruits"]'
          )

          expect(chunkedFruitsWrapper.length).toBe(chunkedFruitsLength)
        }
      )
    })

    describe('fruit image', () => {
      it('should render the correct fruit image', async () => {
        const wrapper = wrapperFactory()
        const [{ id, name }] = fruitsList1
        const expectedImageSrc = `/images/fruits/${id}.webp`
        const expectedImageAlt = name

        await wrapper.setProps({ fruits: fruitsList1 })

        const fruitImageWrapper = wrapper
          .findAll('[data-testid="fruit-image"]')
          .at(0)

        expect(fruitImageWrapper.attributes('src')).toBe(expectedImageSrc)
        expect(fruitImageWrapper.attributes('alt')).toBe(expectedImageAlt)
      })
    })

    describe('fruit name', () => {
      it('should render the correct fruit name', async () => {
        const wrapper = wrapperFactory()
        const [{ name }] = fruitsList1

        await wrapper.setProps({ fruits: fruitsList1 })

        const fruitNameWrapper = wrapper
          .findAll('[data-testid="fruit-name"]')
          .at(0)

        expect(fruitNameWrapper.text()).toBe(name)
      })
    })
  })
})
