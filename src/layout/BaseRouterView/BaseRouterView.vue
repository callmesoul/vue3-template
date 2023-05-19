<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive>
      <component :is="Component" :key="route.fullPath" v-if="route.meta && route.meta.keepAlive" />
    </KeepAlive>
    <component
      :is="Component"
      :key="route.fullPath"
      v-if="!route.meta || (route.meta && !route.meta.keepAlive)"
    />
  </RouterView>
</template>
