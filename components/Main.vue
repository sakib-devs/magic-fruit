<template>
  <div>
    <div
      v-if="isBeforeGameStarted"
      class="flex flex-col justify-center items-center">
      <span class="text-3xl font-bold" v-text="textGreetings" />
      <button v-text="$t('general.play')" @click="startGame" />
    </div>

    <div v-if="isGameStarted" class="flex flex-col justify-center items-center">
      <div class="flex justify-center items-start gap-12 h-96">
        <ul
          class="flex flex-col gap-1"
          v-for="(fruits, index) in chunkedFruits"
          :key="`chuncked-fruit-${index}`">
          <li v-for="{ id, name } in fruits" :key="id" v-text="name" />
        </ul>
      </div>

      <div
        v-if="isStarterRound"
        class="flex flex-col justify-center items-center">
        <div v-text="$t('fruit.pick-fruit')" />
        <div class="flex gap-2">
          <button @click="decreaseRound" v-text="$t('general.previous')" />
          <button @click="increaseRound" v-text="$t('general.next')" />
        </div>
      </div>

      <div
        v-if="isPlayingRound"
        class="flex flex-col justify-center items-center">
        <div v-text="$t('fruit.confirmation')" />
        <div class="flex gap-2">
          <button @click="increaseRound" v-text="$t('general.no')" />
          <button @click="increaseRoundWithYes" v-text="$t('general.yes')" />
        </div>
      </div>
    </div>

    <div
      v-if="isGameFinished"
      class="flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <span class="text-3xl font-bold" v-text="$t('general.your-answer')" />
        <span class="text-3xl font-bold" v-text="pickedFruit" />
        <span v-if="hasAnswer" v-text="wrongAnswer" />
      </div>
      <button v-text="$t('general.play-again')" @click="startGame" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fruitsMap, answer } from '@/utils/fruits'
import { sliceIntoChunks } from '@/helpers/chunks'
import { shuffle } from '@/helpers/shuffle'

const i18n = useI18n()
const textGreetings = computed(() => {
  return i18n.t('general.greetings', {
    title: i18n.t('project.title'),
  })
})

const startGame = () => {
  currentRound.value = 0
  points.value = 0
}

const currentRound = ref(-1)

const isRound = round => {
  return currentRound.value === round
}
const increaseRound = () => {
  currentRound.value++
}
const increaseRoundWithYes = () => {
  points.value += currentRound.value
  increaseRound()
}
const decreaseRound = () => {
  currentRound.value--
}

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

  const mappedFruits = fruitsMap
    .get(currentRound.value)
    .map(fruit => ({ ...fruit, name: i18n.t(fruit.name) }))

  return shuffle(mappedFruits)
})
const chunkedFruits = computed(() => {
  if (listedFruits.value.length === 0) {
    return []
  }

  return sliceIntoChunks(listedFruits.value, 10)
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
</script>
