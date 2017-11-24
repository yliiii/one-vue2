
import Tab from './Tab'
import Tabs from './Tabs'

export default {
  install (Vue) {
    Vue.component('one-tab', Tab)
    Vue.component('one-tabs', Tabs)
  }
}

export { Tab, Tabs }