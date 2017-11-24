<template>
	<div :class="cls('main')">
    <router-link to='/home'>HOME</router-link>
    <router-link to='/components'>COMPONENTS</router-link>
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