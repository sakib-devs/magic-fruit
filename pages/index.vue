<template>
  <div>
    <header class="header">
      <div class="header__left">
        <select @change="setLocale">
          <option value="" v-text="$t('general.select-language')" />
          <option
            v-for="{ code, name } in locales"
            :key="code"
            :value="code"
            :selected="isSelected(code)"
            v-text="name" />
        </select>
      </div>
    </header>
    <h1 class="flex justify-center gap-2 text-3xl font-bold">
      <span v-text="textGreetings" />
    </h1>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/store/locale'

const i18n = useI18n()
const localeStore = useLocaleStore()
const locales = computed(() => localeStore.locales)

const setLocale = event => {
  i18n.setLocale(event.target.value)
}
const isSelected = code => i18n.locale.value === code

const textGreetings = computed(() => {
  return i18n.t('general.greetings', {
    title: i18n.t('project.title'),
  })
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
