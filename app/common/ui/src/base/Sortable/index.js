import React from 'react'
import { findDOMNode } from 'react-dom';
import BaseComponent from '../Component'
import Sortable from 'sortablejs'

import styles from './styles.styl'

const IS_TOUCH = typeof __SERVER__ === 'undefined' ? ('ontouchstart' in document) : false
const EVENT ={
  START: IS_TOUCH ? 'touchstart' : 'mousedown',
  END: IS_TOUCH ? 'touchend' : 'mouseup',
  MOVE: IS_TOUCH ? 'touchmove': 'mousemove',
}

export default class Dragger extends BaseComponent {
  static defaultProps = {
    options:{}
  }

  constructor() {
    super()
    
    this.sortable = null
  }

  init = () => {
    const { reStyles, options } = this.props
    const container = findDOMNode(this)
    const cls = this.componentGetClassNames(styles, reStyles)

    this.sortable = Sortable.create(container, {
      chosenClass: 'drag-start',
      ghostClass: 'drag-ghost',
      onEnd: () => {
        console.log(this.sortable.toArray())
      },
      ...options
    })
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate() {
    this.sortable && this.sortable.destroy && this.sortable.destroy()
    this.init()
  }

  render() {
    const { children, className } = this.props

    return <div className={className}>{ children }</div>
  }

  getSortArray = () => {
    return this.sortable ? this.sortable.toArray() : []
  }
}