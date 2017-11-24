<template>
  <div :class="cls('wrap')">
    <div :class="cls('tabs-wrap')" v-show="enabledTabs">
      <div
        :class="cls(`tab-item ${tab.index}`, { [preClass + '-tab-item']: { cur: curTab && curTab === tab.index } })"
        @click="switchTab(tab.index)"
        v-for="tab in tabs">
        <span v-html="tab.name"></span>
      </div>
    </div>
    <div :class="cls('content', { active: !isAnimateEnded })" ref="content">
      <div :class="cls('direction', {
          [`${preClass}-vertical`]: isVertical,
          [`${preClass}-horizontal`]: !isVertical
        })"
        :style="animationStyle"
        ref="animation">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ComponentGetClassNames } from 'utils/dom-utils'
import styles from './styles'

const componentClass = new ComponentGetClassNames(styles)

export default {
  props: {
    preClass: { default: 'one-switch' },
    reStyles: { default: null },
    isVertical: { default: false },
    enabledTabs: { default: true },
    enabledAnimation: { default: true },
    defaultTabKey: { default: '' },
    speed: { default: .5 },
    beforeChange: { type: Function, default: () => null },
    onTabChanged: { type: Function, default: () => null }
  },
  data: () => ({
    tabs: [],
    curTab: '',
    nextTab: '',
    isAnimateWillStart: false, // 动画即将开始
    isAnimateEnded: true, // 动画已经结束
    width: 'auto',
    transform: {},
    transition: {}
  }),
  created() {
    this.reStyles && componentClass.addStyles(this.reStyles) // 附加重写样式
    this.curTab = this.defaultTabKey // 设置初始tab
  },
  mounted() {
    this.tabs = this.$children
    this.width = this.$refs.content.clientWidth + 'px'
    this.setTabs()
  },
  updated() {
    if (this.isAnimateWillStart) {
      let prevTab = this.curTab

      setTimeout(() => {
        this.transition = { transition: `transform ${this.speed}s ease` }
        this.setTransform(this.nextTab)
        this.isAnimateWillStart = false
        this.isAnimateEnded = false

        setTimeout(() => { // 动画结束后触发
          this.curTab = this.nextTab
          this.setTabs()

          this.onTabChanged(this.curTab, prevTab)

          // 重置动画相关变量
          this.isAnimateEnded = true
          this.nextTab = ''
          this.transform = {}
          this.transition = {}
        }, this.speed * 1e3)
      })
    }
  },
  computed: {
    animationStyle() {
      return { ...this.transform, ...this.transition }
    }
  },
  methods: {
    cls(name, condition) {
      return componentClass.getClass(`${this.preClass}-${name}`, condition)
    },
    switchTab(curTab) {
      let prevTab = this.curTab
      
      if (curTab === this.curTab || !this.isAnimateEnded) return

      if (this.beforeChange(curTab, prevTab) === false) return

      if (this.enabledAnimation) {
        this.startAnimate(curTab)
      } else {
        this.curTab = curTab
        this.setTabs()
        this.onTabChanged(curTab, prevTab)
      }
    },
    setTabs() {
      this.tabs.forEach(tab => {
        if (tab.index === this.curTab) {
          tab.isShown = true
        } else {
          tab.isShown = false
        }
      })
    },
    startAnimate(nextTab) {
      this.tabs.forEach(tab => tab.isShown = true) // 重置所有tab的状态
      this.setTransform(this.curTab) // 设置当前tab的偏移量
      this.nextTab = nextTab
      this.isAnimateWillStart = true
    },
    setTransform(curTab) {
      let autoKey = 0
      let keysLen = this.tabs.length
      let offset = keysLen > 1 ? 100 / keysLen : 100
      let translateX
      let translateY

      if (keysLen > 1) {
        for(let i in this.tabs) {
          if (this.tabs[i].index == curTab) {
            break
          }

          autoKey++
        }
      }

      if (this.isVertical) {
        translateY = `-${offset * autoKey}%`
      } else {
        translateX = `-${offset * autoKey}%`
      }

      this.transform = { transform: `translate3d(${translateX ? translateX + ',0,0' : translateY ? '0,' + translateY + ',0' : '0,0,0'})` }
    }
  }
}
</script>