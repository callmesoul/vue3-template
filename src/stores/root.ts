import { defineStore } from 'pinia'

interface RootState {}

const UA = window.navigator.userAgent.toLowerCase()
// 根据尺寸判断是否是移动端
export const isMobile = window.innerWidth <= 1024
export const isShortDevice = window.innerHeight <= 700
export const isAndroid = !!(UA && UA.indexOf('android') > 0)
export const isIOS = !!(UA && /iphone|ipad|ipod|ios/.test(UA))
export const isWechat = !!(UA && /micromessenger/.test(UA))
export const isApp = !!window.appMetaIdJsV2
export const isSafari = !!(UA && /safari/.test(UA) && !/chrome/.test(UA))
export const isIosApp = isIOS && isApp
export const isAndroidApp = isApp && isAndroid

export const useRootStore = defineStore('root', {
  state: () => <RootState>{},
  getters: {},
  actions: {},
})
