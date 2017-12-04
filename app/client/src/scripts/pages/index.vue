<template>
	<div :class="cls('main')">
    Index
  </div>
</template>

<script>
import { ComponentGetClassNames } from 'utils/dom-utils'
import styles from './styles'

const componentClass = new ComponentGetClassNames(styles)

export default {
  methods: {
    cls: componentClass.getClass
  }
}
</script>