<template>
  <div>
    <one-tabs :reStyles="styles" :enabledAnimation="true" defaultTabKey="a" :onTabChanged="onTabChanged">
      <one-tab name="啊啊啊" index="a">
        <div>aaa</div>
      </one-tab>
      <one-tab name="八佰伴" index="b">
        <div>bbb</div>
      </one-tab>
      <one-tab name="吃川菜" index="c">
        <div>ccc</div>
      </one-tab>
    </one-tabs>
  </div>
</template>

<script>
  import { ComponentGetClassNames } from 'utils/dom-utils'
  import styles from './styles'

  const componentClass = new ComponentGetClassNames(styles)

  export default {
    data: () => ({
      styles,
      tabs: ['啊啊啊', '八佰伴', '吃川菜']
    }),
    methods: {
      cls: componentClass.getClass,
      onTabChanged(curTab, prevTab) {
        console.log(curTab, prevTab)
      }
    }
  }
</script>