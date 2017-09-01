<template>
  <div>
    <media :reStyles="styles" ref="media"></media>
    <div>
      <input type="text" ref="channelInput" v-model="channel" :value="channel"/>
      <input type="button" value="切换线路" @click="switchChannel"/>
    </div>
  </div>
</template>

<script>
  import { componentGetClassNames } from 'utils/dom-utils'
  import media from 'ui-base/Media'
  import styles from './styles'

  const componentClass = new componentGetClassNames(styles)

  export default {
    data: () => ({
      styles,
      channel: '' // 推流通道
    }),
    components: {
      media
    },
    methods: {
      cls: componentClass.getClass,
      switchChannel() {
        const { media } = this.$refs

        media && this.channel && media.switchChannel(this.channel)
      }
    }
  }
</script>