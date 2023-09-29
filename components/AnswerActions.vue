<template>
  <div class="flex flex-col justify-center items-center">
    <div
      class="mt-6 mb-2 text-center text-lg text-cyan-700 font-bold"
      v-text="confirmationMessage" />

    <div class="my-2 flex gap-3">
      <button
        class="w-28 py-1 bg-rose-700 text-white rounded hover:bg-rose-800 hover:font-semibold hover:scale-110 duration-500"
        v-text="$t('general.no')"
        @click="$emit('increase', 'no')" />

      <button
        class="w-28 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-800 hover:font-semibold hover:scale-110 duration-500"
        v-text="$t('general.yes')"
        @click="$emit('increase', 'yes')" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

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
