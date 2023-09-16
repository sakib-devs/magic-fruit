<template>
  <div>
    <div
      v-if="!isPlayStarted"
      class="flex flex-col justify-center items-center">
      <span class="text-3xl font-bold" v-text="textGreetings" />
      <button v-text="$t('general.play')" @click="startGame" />
    </div>

    <div v-else class="flex flex-col justify-center items-center">
      <div v-if="isRound(0)" v-text="$t('fruit.pick-fruit')" />

      <ul>
        <li v-for="{ id, name } in listedFruits" :key="id" v-text="name" />
      </ul>

      <div>
        <button @click="decreaseRound" v-text="$t('general.previous')" />
        <button @click="increaseRound" v-text="$t('general.next')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fruitsMap } from '@/utils/fruits'

const i18n = useI18n()
const textGreetings = computed(() => {
  return i18n.t('general.greetings', {
    title: i18n.t('project.title'),
  })
})

const isPlayStarted = ref(false)
const isPlayStopped = ref(false)
const startGame = () => {
  isPlayStarted.value = true
}

const currentRound = ref(0)
const increaseRound = () => {
  if (currentRound.value === fruitsMap.size - 1) {
    currentRound.value = 0
    isPlayStarted.value = false

    return
  }

  currentRound.value++
}
const decreaseRound = () => {
  if (currentRound.value === 0) {
    isPlayStarted.value = false

    return
  }

  currentRound.value--
}
const isRound = round => {
  return currentRound.value === round
}

const listedFruits = computed(() => {
  return fruitsMap
    .get(currentRound.value)
    .map(fruit => ({ ...fruit, name: i18n.t(fruit.name) }))
})
</script>
