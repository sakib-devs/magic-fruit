<template>
  <div class="mt-16 h-96 flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <span
        v-if="hasAnswer"
        class="text-center text-3xl font-bold"
        data-testid="answer-label"
        v-text="$t('general.your-answer')" />

      <img
        v-if="hasAnswer"
        class="mt-4 h-36 rounded-full"
        data-testid="answer-image"
        :src="`/images/fruits/${answer.get(points).id}.png`"
        :alt="pickedFruit" />

      <span
        class="text-center text-emerald-500 text-[4rem] font-bold"
        data-testid="answer-text"
        v-text="pickedFruit" />

      <span
        data-testid="wrong-answer"
        class="mt-2"
        v-if="hasAnswer"
        v-text="wrongAnswer" />
    </div>

    <button
      data-testid="play-button"
      class="flex flex-col justify-center items-center hover:scale-125 duration-500"
      @click="$emit('start')">
      <PlayIcon
        data-testid="play-icon"
        class="play-icon text-cyan-500 px-2 rounded-full cursor-pointer"
        :title="$t('general.play')" />

      <span
        data-testid="play-again-text"
        class="font-semibold"
        v-text="$t('general.play-again')" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { answer } from '@/utils/fruits'
import PlayIcon from '@/assets/icons/play.svg'

const props = defineProps({
  points: Number,
})
const emit = defineEmits(['start'])

const hasAnswer = computed(() => {
  return answer.has(props.points)
})
const { t } = useI18n()
const pickedFruit = computed(() => {
  if (!hasAnswer.value) {
    return t('general.wrong-answer')
  }

  return t(answer.get(props.points).name)
})
const wrongAnswer = computed(() => {
  return `(${t('general.or')} ${t('general.wrong-answer')})`
})
</script>
