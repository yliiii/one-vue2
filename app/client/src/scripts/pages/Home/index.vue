<template>
	<div :class="cls('home-wrap')">
    HELLO WORLD!
  </div>
</template>

<script>
import { componentGetClassNames } from 'utils/dom-utils'
import styles from './styles.styl'

const  componentClass = new componentGetClassNames(styles)
export default {
  methods: {
    cls: componentClass.getClass
  }
}
</script>