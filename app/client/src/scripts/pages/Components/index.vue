<template>
	<div :class="cls('main')">
    <router-link to='/components/player'>MEDIA PLAYER</router-link>
    <router-link to='/components/oneswitchtab'>ONE-SWITCHTAB</router-link>
    <router-view></router-view>
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