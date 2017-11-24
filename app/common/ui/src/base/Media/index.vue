<template>
  <div :class="cls('media-wrap')">
    Hello mediaplayer!!!
    <video v-if="isShowVideo" :src="videoSrc" ref="video"></video>
  </div>
</template>

<script>
import Detector from 'utils/detector/web-detector'
import { ComponentGetClassNames } from 'utils/dom-utils'
import styles from './styles'

const componentClass = new ComponentGetClassNames(styles)
const isSupportHLS = /^(?:ios|android)$/i.test(Detector.os.name) || /^(?:safari|edge)$/i.test(Detector.browser.name)

let HLS = null

export default {
  props: [
    'reStyles',
    'channel'
  ],
  data: () => ({
    videoSrc: '',
    // 状态类
    isShowVideo: false
  }),
  created() {
    componentClass.addStyles(this.reStyles) // 附加重写样式

    if (this.channel) { // 有推流通道才显示video
      if (isSupportHLS) { // 假如支持HLS协议，则设置video.src
        this.videoSrc = this.channel
      }

      this.isShowVideo = true
    }
  },
  methods: {
    cls: componentClass.getClass, // 设置样式方法
    useHLSPlugin(channel) {
      const { video } = this.$refs

      if(HLS.isSupported()) {
        if (this.hls) { // 销毁已有的hls
          this.hls.destroy()

          if (this.hls.bufferTimer) {
            clearInterval(this.hls.bufferTimer)
            this.hls.bufferTimer = undefined
          }

          this.hls = null
        }
      }

      this.hls = this.hls || new HLS()

      const hls = this.hls

      hls.loadSource(channel)
      hls.attachMedia(video)

      hls.on(HLS.Events.MANIFEST_PARSED, () => {
        hls.startLoad()
      })

      hls.on(HLS.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
          case HLS.ErrorTypes.NETWORK_ERROR: // try to recover network error
            hls.startLoad()
            break;
          case HLS.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default: // cannot recover
            hls.destroy();
            break;
          }
        }
      })
    },
    switchChannel(channel) { // 切换视频地址
      if (!channel) return

      this.isShowVideo = true

      if (isSupportHLS) {
        this.videoSrc = channel
      } else {
        HLS
        ? this.useHLSPlugin(channel)
        : import('hls.js').then($hls => {
          HLS = $hls
          this.useHLSPlugin(channel)
        }).catch(e => {
          // TODO: 错误处理
        })
      }
    }
  }
}
</script>