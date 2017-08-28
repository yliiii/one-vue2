<template>
	<div :class="cls('main')">
    <router-link to='/home'>HOME</router-link>
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