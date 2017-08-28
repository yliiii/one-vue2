<template>
	<div id="main" :class="cls('main-wrap')">
    <router-view></router-view>
  </div>
</template>

<script>
import { componentGetClassNames } from 'utils/dom-utils'
import styles from './styles.styl'

export default {
  methods: {
    cls: new componentGetClassNames(styles)
  }
}

</script>