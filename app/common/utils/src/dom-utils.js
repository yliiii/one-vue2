import classnames from 'classnames/bind'
import Math from './Math-extend'

export class componentGetClassNames {
  constructor(styles, reStyles, condition) {
    if (!styles) return a => a

    this.styles = styles
    this.reStyles = reStyles
    this.condition = condition
    this.cx = classnames.bind(styles)
    this.recx = classnames.bind(reStyles)
    this.CLASS_CACHE_NAME = Math.uuid()
    this[this.CLASS_CACHE_NAME] = {}


    return (name, $condition = condition) => {
      if (!name) return ""

      let reg = /\s{1,}/g
      let cls = ""

      if (!reg.test(name)) {
        cls = this.formatCls(name, $condition)
      } else {
        let names = name.replace(reg, ",").split(",")

        names.forEach(v => {
          let str = this.formatCls(v, $condition[v])

          if (str) {
            cls += `${this.formatCls(v, $condition[v])} `
          }
        })
      }

      return cls
    }
  }

  formatCls = (name, condition) => {
    let { styles, reStyles } = this
    let v = this[this.CLASS_CACHE_NAME][name]
    let reCls = reStyles && reStyles[name] ? { [this.recx(name)]: !!reStyles[name] } : {}

    if (condition) {
      let reCondition = {}

      Object.keys(condition).forEach(key => {
        if (reStyles && reStyles[key]) {
          reCondition[reStyles[key]] = condition[key]
        }

        reCondition[key] = condition[key]
      })

      v = this.cx({ ...reCondition })
    } else if (!v) {
      v = this[this.CLASS_CACHE_NAME][name] = this.cx({ [name]: true, ...reCls })
    }

    return v
  }
}

export function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, null)[attr];
}

export function hasClass(obj, cls) {
  let re = new RegExp('(\\s|^)' + cls + '(\\s|$)')
  return re.test(obj.className)
}

export function addClass(obj, cls) {
  if (!cls || !obj) return obj;

  let classStr = '';

  if (typeof cls === 'string') {
    cls = cls.replace(/\s{1,}/g, '|').split('|')
  }

  cls.forEach(name => {
    if (!!name && !hasClass(obj, name)) {
      classStr += ' ' + name
    }
  })

  obj.className += classStr

  return obj
}

export function removeClass(obj, cls) {
  if (!cls || !obj) return obj

  if (typeof cls === 'string') {
    cls = cls.replace(/\s{1,}/g, '|').split('|')
  }

  if (document.body.classList) {
    cls.forEach(name => {
      if (name) obj.classList.remove(name)
    })
  } else {
    let classStr = obj.className;

    cls.forEach(name => {
      if (name) classStr = classStr.replace(new RegExp(name, 'g'), '')
    })

    obj.className = classStr
  }

  return obj
}

export function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls);
  } else {
    addClass(obj, cls);
  }
}

export function getElementOffsetClientPosition(element) {
  let top = element.offsetTop
  let left = element.offsetLeft
  while (element.offsetParent) {
    element = element.offsetParent
    top += element.offsetTop
    left += element.offsetLeft
  }
  return {
    top,
    left
  }
}

export default {
  getStyle,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  getElementOffsetClientPosition
}
