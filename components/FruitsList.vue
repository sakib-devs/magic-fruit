<template>
  <div
    v-if="hasFruits"
    data-testid="fruits"
    class="my-4 flex justify-center items-start gap-16 h-96">
    <ul
      data-testid="chunked-fruits"
      class="flex flex-col gap-2"
      v-for="(fruits, index) in chunkedFruits"
      :key="`chuncked-fruit-${index}`">
      <li
        data-testid="fruit"
        class="flex items-center gap-4 hover:scale-110 duration-300"
        v-for="{ id, name } in fruits"
        :key="`fruit-${id}`">
        <img
          data-testid="fruit-image"
          :src="`/images/fruits/${id}.webp`"
          :alt="name"
          class="object-contain h-8 w-10" />

        <span
          data-testid="fruit-name"
          class="text-lg font-semibold hover:text-cyan-600 duration-500 cursor-pointer"
          v-text="name" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { sliceIntoChunks } from '@/helpers/chunks'

const props = defineProps({
  fruits: Array,
})

const hasFruits = computed(() => props.fruits.length > 0)
const chunkedFruits = computed(() => {
  if (!hasFruits.value) {
    return []
  }

  return sliceIntoChunks(props.fruits, 10)
})
</script>
