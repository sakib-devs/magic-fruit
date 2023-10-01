<template>
  <div class="mt-8 h-96 break-words flex flex-col justify-center items-center">
    <img
      src="/images/fruits/1.png"
      alt="Jackfruit"
      class="h-48 hover:h-60 mt-4 sm:mt-0 duration-500" />

    <span
      class="text-center text-[3rem] bg-clip-text text-transparent bg-gradient-to-r hover:bg-gradient-to-l from-violet-500 via-cyan-600 to-emerald-500 w-fit font-bold md:hover:scale-125 duration-500"
      v-text="textGreetings" />

    <button
      class="flex flex-col justify-center items-center hover:scale-125 duration-500"
      @click="$emit('start')">
      <PlayIcon
        class="play-icon text-cyan-500 px-2 rounded-full cursor-pointer"
        :title="$t('general.play')" />

      <span class="font-semibold" v-text="$t('general.play')" />
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PlayIcon from '@/assets/icons/play.svg'

const emit = defineEmits(['start'])

const { t } = useI18n()
const textGreetings = computed(() => {
  return t('general.greetings', {
    title: t('project.title'),
  })
})
</script>
