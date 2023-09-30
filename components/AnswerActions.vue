<template>
  <div class="flex flex-col justify-center items-center">
    <div
      data-testid="confirmation-message"
      class="mt-6 mb-2 text-center text-lg text-cyan-700 font-bold"
      v-text="confirmationMessage" />

    <div class="my-2 flex gap-4">
      <button
        data-testid="no-button"
        class="flex gap-2 justify-center items-center w-32 py-1.5 bg-rose-700 text-white rounded hover:bg-rose-800 hover:font-semibold hover:scale-110 duration-500"
        @click="$emit('increase', 'no')">
        <XIcon
          data-testid="no-button-icon"
          class="action-icon mt-[0.15rem] rounded-full text-rose-700 hover:text-rose-800 font-bold bg-white" />
        <span data-testid="no-button-text" v-text="$t('general.no')" />
      </button>

      <button
        data-testid="yes-button"
        class="flex gap-2 justify-center items-center w-32 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-800 hover:font-semibold hover:scale-110 duration-500"
        @click="$emit('increase', 'yes')">
        <span data-testid="yes-button-text" v-text="$t('general.yes')" />
        <CheckIcon
          data-testid="yes-button-icon"
          class="action-icon mt-[0.15rem] rounded-full text-emerald-700 hover:text-emerald-800 font-bold bg-white" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import XIcon from '@/assets/icons/x.svg'
import CheckIcon from '@/assets/icons/check.svg'

const props = defineProps({
  currentRound: Number,
})
const emit = defineEmits(['increase'])

const { t } = useI18n()
const confirmationMessage = computed(() => {
  switch (props.currentRound) {
    case 1:
      return t('fruit.confirmation')
    case 2:
      return t('fruit.available')
    default:
      return t('fruit.here')
  }
})
</script>
