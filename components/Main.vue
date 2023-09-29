<template>
  <div>
    <HomePage
      :is-before-game-started="isBeforeGameStarted"
      @start="startGame" />

    <div v-if="isGameStarted" class="flex flex-col justify-center items-center">
      <FruitsList :fruits="listedFruits" />

      <IncreamentActions
        v-if="isStarterRound"
        @increase="increaseRound"
        @decrease="decreaseRound" />

      <AnswerActions
        v-if="isPlayingRound"
        :current-round="currentRound"
        @increase="increaseRound"
        @increase-with-yes="increaseRoundWithYes" />
    </div>

    <div
      v-if="isGameFinished"
      class="mt-16 h-96 flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <span
          v-if="hasAnswer"
          class="text-center text-3xl font-bold"
          v-text="$t('general.your-answer')" />
        <img
          v-if="hasAnswer"
          :src="`/images/fruits/${answer.get(points).id}.png`"
          :alt="pickedFruit"
          class="mt-4 w-36 rounded-full" />
        <span
          class="break-words text-emerald-500 text-[4rem] font-bold"
          v-text="pickedFruit" />
        <span class="mt-2" v-if="hasAnswer" v-text="wrongAnswer" />
      </div>
      <div class="mt-2 flex flex-col justify-center items-center">
        <PlayIcon
          class="play-icon hover:scale-125 duration-500 text-cyan-500 px-2 rounded-full cursor-pointer"
          @click="startGame" />
        <button
          class="font-semibold"
          v-text="$t('general.play-again')"
          @click="startGame" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fruitsMap, answer } from '@/utils/fruits'
import PlayIcon from '@/assets/icons/play.svg'
import HomePage from '@/components/HomePage'
import FruitsList from '@/components/FruitsList'
import IncreamentActions from '@/components/IncreamentActions'
import AnswerActions from '@/components/AnswerActions'

const i18n = useI18n()

const currentRound = ref(-1)
const isBeforeGameStarted = computed(() => {
  return isRound(-1)
})
const isStarterRound = computed(() => {
  return isRound(0)
})
const isPlayingRound = computed(() => {
  return currentRound.value > 0 && currentRound.value <= fruitsMap.size - 1
})
const isGameStarted = computed(() => {
  return isStarterRound.value || isPlayingRound.value
})
const isGameFinished = computed(() => {
  return isRound(fruitsMap.size)
})
const listedFruits = computed(() => {
  if (!fruitsMap.has(currentRound.value)) {
    return []
  }

  return fruitsMap.get(currentRound.value).map(fruit => ({
    ...fruit,
    name: i18n.t(fruit.name),
  }))
})

const points = ref(0)
const hasAnswer = computed(() => {
  return answer.has(points.value)
})
const pickedFruit = computed(() => {
  if (!hasAnswer.value) {
    return i18n.t('general.wrong-answer')
  }

  return i18n.t(answer.get(points.value).name)
})
const wrongAnswer = computed(() => {
  return `(${i18n.t('general.or')} ${i18n.t('general.wrong-answer')})`
})

function startGame() {
  currentRound.value = 0
  points.value = 0
}
function isRound(round) {
  return currentRound.value === round
}
function increaseRound() {
  currentRound.value++
}
function increaseRoundWithYes() {
  points.value += currentRound.value
  increaseRound()
}
function decreaseRound() {
  currentRound.value--
}
</script>

<style scoped>
.play-icon {
  height: 5rem;
  width: 5rem;
}
</style>
