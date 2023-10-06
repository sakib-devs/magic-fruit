<template>
  <header>
    <div class="flex w-full">
      <select
        data-testid="language-dropdown"
        class="p-1.5 bg-gray-200 rounded-sm outline-none text-center w-full sm:text-left sm:w-48"
        @change="setLocale">
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

function setLocale(event) {
  i18n.setLocale(event.target.value)
}
function isSelected(code) {
  return i18n.locale.value === code
}
</script>
