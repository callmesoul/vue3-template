<template>
  <div class="is-null flex flex-align-center flex-pack-center">
    <div class="is-null-warp">
      <NullIcon />
      <div class="tips">{{ tips ? tips : $t('noDatas') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NullIcon from '@/assets/images/null.svg'
import { useI18n } from 'vue-i18n'
interface Props {
  tips?: string
}
const i18n = useI18n()

const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped src="./IsNull.scss"></style>
