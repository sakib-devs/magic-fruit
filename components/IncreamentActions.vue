<template>
  <div class="flex flex-col justify-center items-center">
    <div
      data-testid="pick-fruit-message"
      class="mt-6 mb-2 text-center text-lg text-emerald-700 font-bold"
      v-text="$t('fruit.pick-fruit')" />

    <div class="my-2 flex gap-4">
      <button
        data-testid="previous-button"
        class="flex gap-2 justify-center items-center w-32 py-1.5 bg-pink-700 text-white rounded hover:bg-pink-800 hover:font-semibold hover:scale-110 duration-500"
        @click="$emit('decrease')">
        <ArrowLeftIcon
          data-testid="previous-button-icon"
          class="action-icon mt-[0.15rem] rounded-full text-pink-700 hover:text-pink-800 font-bold bg-white" />

        <span
          data-testid="previous-button-text"
          v-text="$t('general.previous')" />
      </button>

      <button
        data-testid="next-button"
        class="flex gap-2 justify-center items-center w-32 py-1.5 bg-cyan-700 text-white rounded hover:bg-cyan-800 hover:font-semibold hover:scale-110 duration-500"
        @click="$emit('increase')">
        <span data-testid="next-button-text" v-text="$t('general.next')" />

        <ArrowRightIcon
          data-testid="next-button-icon"
          class="action-icon mt-[0.15rem] rounded-full text-cyan-700 hover:text-cyan-800 font-bold bg-white" />
      </button>
    </div>
  </div>
</template>

<script setup>
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

const emit = defineEmits(['increase', 'decrease'])
</script>
