<template>
  <media :reStyles="styles"></media>
</template>

<script>
  import { componentGetClassNames } from 'utils/dom-utils'
  import media from 'ui-base/Media'

  import styles from './styles'

  const componentClass = new componentGetClassNames(styles)

  export default {
    data() {
      return {
        styles
      }
    },
    components: {
      media
    },
    methods: {
      cls: componentClass.getClass
    }
  }
</script>