<template>
  <div>
    <div
      v-if="isBeforeGameStarted"
      class="h-96 flex flex-col justify-center items-center">
      <span
        class="text-[3rem] font-bold hover:scale-125 duration-500 hover:text-emerald-500"
        v-text="textGreetings" />
      <PlayIcon
        class="play-icon hover:scale-125 duration-500 text-cyan-500 px-2 rounded-full cursor-pointer"
        :title="$t('general.play')"
        @click="startGame" />
      <button
        class="font-semibold"
        v-text="$t('general.play')"
        @click="startGame" />
    </div>

    <div v-if="isGameStarted" class="flex flex-col justify-center items-center">
      <div class="my-4 flex justify-center items-start gap-12 h-96">
        <ul
          class="flex flex-col gap-1"
          v-for="(fruits, index) in chunkedFruits"
          :key="`chuncked-fruit-${index}`">
          <li
            class="text-lg font-semibold hover:text-cyan-600 duration-500 cursor-pointer"
            v-for="{ id, name } in fruits"
            :key="id"
            v-text="name" />
        </ul>
      </div>

      <div
        v-if="isStarterRound"
        class="flex flex-col justify-center items-center">
        <div
          class="my-2 text-lg text-emerald-700 font-bold"
          v-text="$t('fruit.pick-fruit')" />
        <div class="my-2 flex gap-3">
          <button
            class="w-28 py-1 bg-pink-700 hover:bg-pink-800 text-white rounded hover:font-semibold hover:scale-110 duration-500"
            @click="decreaseRound"
            v-text="$t('general.previous')" />
          <button
            class="w-28 py-1 bg-cyan-700 hover:bg-cyan-800 text-white rounded hover:font-semibold hover:scale-110 duration-500"
            @click="increaseRound"
            v-text="$t('general.next')" />
        </div>
      </div>

      <div
        v-if="isPlayingRound"
        class="flex flex-col justify-center items-center">
        <div
          class="my-2 text-lg text-cyan-700 font-bold"
          v-text="$t('fruit.confirmation')" />
        <div class="my-2 flex gap-3">
          <button
            class="w-28 py-1 bg-rose-700 text-white rounded hover:bg-rose-800 hover:font-semibold hover:scale-110 duration-500"
            @click="increaseRound"
            v-text="$t('general.no')" />
          <button
            class="w-28 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-800 hover:font-semibold hover:scale-110 duration-500"
            @click="increaseRoundWithYes"
            v-text="$t('general.yes')" />
        </div>
      </div>
    </div>

    <div
      v-if="isGameFinished"
      class="h-96 flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <span
          v-if="hasAnswer"
          class="text-3xl font-bold"
          v-text="$t('general.your-answer')" />
        <span
          class="mt-4 text-emerald-500 text-[4rem] font-bold"
          v-text="pickedFruit" />
        <span class="mt-1" v-if="hasAnswer" v-text="wrongAnswer" />
      </div>
      <PlayIcon
        class="mt-2 play-icon hover:scale-125 duration-500 text-cyan-500 px-2 rounded-full cursor-pointer"
        :title="$t('general.play')"
        @click="startGame" />
      <button
        class="font-semibold"
        v-text="$t('general.play-again')"
        @click="startGame" />
    </div>
  </div>
</template>

import { computed, ref } from 'vue'
<script setup>
import { useI18n } from 'vue-i18n'
import { fruitsMap, answer } from '@/utils/fruits'
import { sliceIntoChunks } from '@/helpers/chunks'
import PlayIcon from '@/assets/icons/play.svg'

const i18n = useI18n()
const textGreetings = computed(() => {
  return i18n.t('general.greetings', {
    title: i18n.t('project.title'),
  })
})
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

  return fruitsMap
    .get(currentRound.value)
    .map(fruit => ({ ...fruit, name: i18n.t(fruit.name) }))
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
