<template>
	<div :class="cls('content-item')" :style="{width: width}" v-show="isShown" ref="item">
    <slot></slot>
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
    name: { default: '' },
    index: { default: '' } // tab索引标识
  },
  data: () => ({
    isShown: false
  }),
  created() {
    this.reStyles && componentClass.addStyles(this.reStyles) // 附加重写样式
  },
  mounted() {

  },
  computed: {
    width() {
      return this.$parent.width
    }
  },
  methods: {
    cls(name, condition) {
      return componentClass.getClass(`${this.preClass}-${name}`, condition)
    }
  }
}
</script>