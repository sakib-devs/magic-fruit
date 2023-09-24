<template>
  <header class="header">
    <div class="header__left flex w-full">
      <select
        @change="setLocale"
        class="p-1.5 rounded-sm outline-none outline-teal-500 hover:outline-teal-600 text-center w-full sm:text-left sm:w-fit">
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
