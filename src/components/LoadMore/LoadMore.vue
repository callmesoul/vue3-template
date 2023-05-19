<template>
  <div class="pagination" v-if="pagination?.nothing || pagination?.loading">
    <div class="nothing" v-if="pagination?.loading">{{ $t('Pagination.loading') }}...</div>
    <div class="nothing" v-else>{{ $t('Pagination.nothing') }}</div>
  </div>
  <div class="more-warp" v-if="props.showMoreButton" @click="moreHistroy">
    <div class="tips">{{ $t('clickmore') }}</div>
    <div class="icon"><img :src="home_icon_ins" /></div>
  </div>
</template>

<script setup lang="ts">
import home_icon_ins from '@/assets/svg/home_icon_ins.svg?url'
const emit = defineEmits(['getMore']) // 定义事件
const props = defineProps<{
  pagination: Pagination
  showMoreButton?: boolean
}>()

function moreHistroy() {
  emit('getMore')
}
</script>
<style lang="scss" scoped src="./LoadMore.scss"></style>
