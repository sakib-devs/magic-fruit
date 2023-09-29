<template>
  <div
    v-if="isBeforeGameStarted"
    class="mt-8 h-96 break-words flex flex-col justify-center items-center">
    <img
      src="/images/fruits/1.png"
      alt="Jackfruit"
      class="w-48 hover:w-60 mt-4 sm:mt-0 rounded-full duration-500" />

    <span
      class="text-center text-[3rem] w-fit font-bold md:hover:scale-125 duration-500 hover:text-emerald-500"
      v-text="textGreetings" />

    <div
      class="flex flex-col justify-center items-center hover:scale-125 duration-500">
      <PlayIcon
        class="play-icon text-cyan-500 px-2 rounded-full cursor-pointer"
        :title="$t('general.play')"
        @click="$emit('start')" />

      <button
        class="font-semibold"
        v-text="$t('general.play')"
        @click="$emit('start')" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PlayIcon from '@/assets/icons/play.svg'

const props = defineProps({
  isBeforeGameStarted: Boolean,
})
const emit = defineEmits(['start'])

const { t } = useI18n()
const textGreetings = computed(() => {
  return t('general.greetings', {
    title: t('project.title'),
  })
})
</script>
