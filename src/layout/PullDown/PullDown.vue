<template>
  <div id="pull" ref="Pull">
    <div class="refresh-box"></div>
    <div class="pull-content" ref="PullContentRef">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, provide, reactive, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
// 定义
const disy = ref<number>(0)
const y = ref<number>(0)
// ref获取元素
const Pull = ref<HTMLDivElement | null>(null)
// 保存指向
const box = () => Pull.value as HTMLDivElement
// 保存缓存页面滚动条高度
const pageScollerTop: { fullPath: string; top: 0 }[] = []

const startY = 0
const route = useRoute()
const router = useRouter()
const PullContentRef = ref()
const i18n = useI18n()
const pulldown: PullDownVal = reactive({
  onRefresh: false,
  pageContentRef: PullContentRef,
  pullRef: Pull,
})

const refreshBox = computed<HTMLDivElement>(() => {
  if (pulldown.refreshSlot) {
    return pulldown.refreshSlot
  } else {
    Pull.value?.children[0]
  }
})

// 组件加载完成调用
onMounted(() => {
  // console.log(PullContentRef.value)

  nextTick(() => {
    if (Pull.value) {
      ;(box().children[1] as HTMLDivElement).ontouchstart = fnstart
    }
  })
})
// 按下事件
const fnstart = (e: TouchEvent) => {
  if (Pull.value && pulldown.onRefresh && PullContentRef.value.scrollTop === 0) {
    refreshBox.value.style.transition = 'none'
    refreshBox.value.className = 'refresh-box'
    disy.value = e.changedTouches[0].pageY - y.value
    document.getElementById('pull')!.ontouchmove = fnmove
  }
}
// 移动事件
const fnmove = (e: TouchEvent) => {
  if (Pull.value && pulldown.onRefresh && PullContentRef.value.scrollTop === 0) {
    refreshBox.value.innerHTML = i18n.t('PullDown.Refreshing')
    refreshBox.value.style.opacity = '0.5'
    y.value = e.changedTouches[0].pageY - disy.value
    refreshBox.value.style.height = y.value / 3 + 'px'
    document.getElementById('pull')!.ontouchend = fnend
  }
}
// 抬起事件
const fnend = async (e: TouchEvent) => {
  if (Pull.value && pulldown.onRefresh) {
    // 过度效果
    refreshBox.value.style.transition = '.3s linear height'
    if (y.value / 3 > 50) {
      y.value = 50
      if (pulldown.onRefresh) {
        await pulldown.onRefresh()
        refreshFinish()
      }
      // emit('onRefresh', refreshFinish)
      // setTimeout(() => {
      //   y.value = 0
      //   ;(box().children[0] as HTMLDivElement).style.height = y.value + 'px'
      // }, 1500)
      // setTimeout(() => {
      //   ;(box().children[0] as HTMLDivElement).innerHTML = '刷新成功'
      // }, 600)
    } else {
      y.value = 0
    }
    refreshBox.value.style.height = y.value + 'px'
  }
}

function refreshFinish() {
  if (Pull.value && pulldown.onRefresh) {
    refreshBox.value.innerHTML = i18n.t('PullDown.Refresh succeeded')
    setTimeout(() => {
      y.value = 0
      refreshBox.value.style.height = y.value + 'px'
    }, 600)
  }
}

provide('Pulldown', pulldown)

function throttle(fn: () => any, delay = 500) {
  let timer: any
  return function() {
    if (timer) return
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments)
      // @ts-ignor
      timer = null
    })
  }
}

function onLoad() {
  if (pulldown.onLoad) pulldown.onLoad()
}

// 保存缓存页面 滚动条高度
function saveKeepliveScollerTop(e?: HTMLElement) {
  if (!route.meta.isSaveScrollTop) return
  // @ts-ignore
  const scrollTop = e.target.scrollTop
  const item = pageScollerTop.find(_item => _item.fullPath === route.fullPath)
  if (item) {
    item.top = scrollTop
  } else {
    pageScollerTop.push({
      fullPath: route.fullPath,
      top: scrollTop,
    })
  }
}

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isSaveScrollTop) {
      const index = pageScollerTop.findIndex(item => item.fullPath === route.fullPath)
      if (index !== -1) {
        nextTick(() => {
          PullContentRef.value.scrollTop = pageScollerTop[index].top
        })
      } else {
        PullContentRef.value.scrollTop = 0
      }
    } else {
      PullContentRef.value.scrollTop = 0
    }
  }
)

router.afterEach(() => {
  // 父级路由或者当前路由 没有不设置重置的page的 都要将page重置
  const _route =
    router
      .getRoutes()
      .find(item => item.children && item.children.find(_item => _item.name === route.name)) ||
    router.getRoutes().find(item => item.name === route.name)
  if (!_route?.meta.isNotRestPage) {
    pulldown.onRefresh = false
    pulldown.refreshSlot = undefined
  }
})
</script>

<style lang="scss" scoped src="./PullDown.scss"></style>
