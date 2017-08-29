<template>
  <div :class="cls('media-wrap')">
    Hello mediaplayer!!!
  </div>
</template>

<script>
import { componentGetClassNames } from 'utils/dom-utils'
import styles from './styles'

const componentClass = new componentGetClassNames(styles)

export default {
  props: [
    'reStyles',
    'src'
  ],
  created() {
    // 附加重写样式
    componentClass.addStyles(this.reStyles)
  },
  methods: {
    cls: componentClass.getClass
  }
}
</script>