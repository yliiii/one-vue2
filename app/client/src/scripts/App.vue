<template>
	<div id="main" :class="cls('main-wrap')">
    <router-view></router-view>
  </div>
</template>

<script>
import { ComponentGetClassNames } from 'utils/dom-utils'
import styles from './styles.styl'

const componentClass = new ComponentGetClassNames(styles)

export default {
  methods: {
    cls: componentClass.getClass
  }
}
</script>