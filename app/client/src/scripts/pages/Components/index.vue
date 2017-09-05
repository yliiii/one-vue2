<template>
	<div :class="cls('main')">
    <router-link to='/components/player'>MEDIA PLAYER</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { componentGetClassNames } from 'utils/dom-utils'
import styles from './styles'

const componentClass = new componentGetClassNames(styles)

export default {
  methods: {
    cls: componentClass.getClass
  }
}
</script>