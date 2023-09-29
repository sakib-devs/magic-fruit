<template>
  <div class="flex flex-col justify-center items-center">
    <div
      class="mt-6 mb-2 text-center text-lg text-emerald-700 font-bold"
      v-text="$t('fruit.pick-fruit')" />

    <div class="my-2 flex gap-3">
      <button
        class="w-28 py-1 bg-pink-700 hover:bg-pink-800 text-white rounded hover:font-semibold hover:scale-110 duration-500"
        @click="$emit('decrease')"
        v-text="$t('general.previous')" />

      <button
        class="w-28 py-1 bg-cyan-700 hover:bg-cyan-800 text-white rounded hover:font-semibold hover:scale-110 duration-500"
        @click="$emit('increase')"
        v-text="$t('general.next')" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['increase', 'decrease'])
</script>
