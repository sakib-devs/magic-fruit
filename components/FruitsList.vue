<template>
  <div class="my-4 flex justify-center items-start gap-16 h-96">
    <ul
      class="flex flex-col gap-2"
      v-for="(fruits, index) in chunkedFruits"
      :key="`chuncked-fruit-${index}`">
      <li
        class="flex items-center gap-4"
        v-for="{ id, name } in fruits"
        :key="id">
        <img
          :src="`/images/fruits/${id}.webp`"
          :alt="name"
          class="object-contain h-8 w-10" />

        <span
          class="text-lg font-semibold hover:text-cyan-600 duration-500 cursor-pointer"
          v-text="name" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { sliceIntoChunks } from '@/helpers/chunks'

const props = defineProps({
  fruits: Array,
})

const chunkedFruits = computed(() => {
  if (props.fruits.length === 0) {
    return []
  }

  return sliceIntoChunks(props.fruits, 10)
})
</script>
