<template>
	<div :class="cls('home-wrap')">
    HELLO WORLD!
  </div>
</template>

<script>
import { componentGetClassNames } from 'utils/dom-utils'
import styles from './styles.styl'

export default {
  methods: {
    cls: new componentGetClassNames(styles)
  },

  created() {
  },

  mounted() {
  }
}

</script>