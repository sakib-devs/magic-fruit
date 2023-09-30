<template>
  <div class="flex flex-col justify-center items-center">
    <HomePage v-if="isBeforeGameStarted" @start="startGame" />

    <div v-if="isGameStarted" class="flex flex-col justify-center items-center">
      <FruitsList :fruits="fruits" />

      <IncreamentActions
        v-if="isStarterRound"
        @increase="increaseRound"
        @decrease="decreaseRound" />

      <AnswerActions
        v-if="isPlayingRound"
        :current-round="currentRound"
        @increase="increaseRound" />
    </div>

    <LastPage v-if="isGameFinished" :points="points" @start="startGame" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fruitsMap } from '@/utils/fruits'
import HomePage from '@/components/HomePage'
import FruitsList from '@/components/FruitsList'
import IncreamentActions from '@/components/IncreamentActions'
import AnswerActions from '@/components/AnswerActions'
import LastPage from '@/components/LastPage'

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
const fruits = computed(() => {
  if (!fruitsMap.has(currentRound.value)) {
    return []
  }

  return fruitsMap.get(currentRound.value).map(fruit => ({
    ...fruit,
    name: i18n.t(fruit.name),
  }))
})

const points = ref(0)

function startGame() {
  playSound('start')
  currentRound.value = 0
  points.value = 0
}
function isRound(round) {
  return currentRound.value === round
}
function increaseRound(action) {
  if (action === 'yes') {
    points.value += currentRound.value
  }

  currentRound.value++

  if (isPlayingRound.value) {
    playSound('start')
  }

  if (isGameFinished.value) {
    playSound('success', 'mp3')
  }
}
function decreaseRound() {
  currentRound.value--
}
function playSound(sound, extension = 'wav') {
  const audio = new Audio(`./sounds/${sound}.${extension}`)
  audio.play()
}
</script>
