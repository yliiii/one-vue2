import classnames from 'classnames/bind'
import Math from './Math-extend'

export class ComponentGetClassNames {
  constructor(styles, reStyles, condition) {
    if (!styles) return a => a

    this.styles = styles
    this.reStyles = reStyles
    this.condition = condition
    this.CLASS_CACHE_NAME = Math.uuid()
    this[this.CLASS_CACHE_NAME] = {}

    if (this.reStyles) {
      let curStyles = this.extendStyles(this.styles, this.reStyles)
      this.styles = curStyles.styles
      this.cx = classnames.bind(curStyles.styles)
    } else {
      this.cx = classnames.bind(styles)
    }

    return this
  }

  formatCls = (name, condition) => {
    let v = this[this.CLASS_CACHE_NAME][name]

    if (condition) {
      v = this.cx({ [name]: true, ...condition })
    } else if (!v) {
      v = this[this.CLASS_CACHE_NAME][name] = this.cx({ [name]: true })
    }

    return v
  }

  extendStyles = (styles, reStyles) => {
    let isChanged = false // 标识是否有添加新的样式

    if (!styles) {
      return {
        isChanged: true,
        styles: reStyles
      }
    }

    if (reStyles) {
      let keys = Object.keys(reStyles)

      keys.forEach(key => {
        if (key in styles) {
          let name = styles[key]

          if (name !== reStyles[key]) {
            isChanged = true
            styles[key] = name + ' ' + reStyles[key]
          }
        } else {
          isChanged = true
          styles[key] = reStyles[key]
        }
      })
    } else {
      isChanged = true
      styles = { ...styles, ...reStyles }
    }

    return {
      isChanged,
      styles
    }
  }

  coverStyles = styles => {
    if (!styles) return

    if (this.styles) {
      let isChanged = false
      let keys = Object.keys(styles)

      keys.forEach(key => {
        if (key in this.styles) {
          if (this.styles[key] !== styles[key]) {
            isChanged = true
            this.styles[key] = styles[key]
          }
        } else {
          isChanged = true
          this.styles[key] = styles[key]
        }
      })

      if (isChanged) {
        this.cx = classnames.bind(this.styles)
      }
    }
  }

  addStyles = styles => {
    if (!styles) return

    let reStyles = this.extendStyles(this.reStyles, styles)

    this.reStyles = reStyles.styles

    if (reStyles.isChanged) {
      let curStyles = this.extendStyles(this.styles, this.reStyles)

      this.styles = curStyles.styles

      if (curStyles.isChanged) {
        this.cx = classnames.bind(this.styles)
      }
    }
  }

  getClass = (name, $condition) => {
    if (!name) return ''
    name = name.trim()

    let reg = /\s{1,}/g
    let cls = ''

    if (!reg.test(name)) {
      cls = this.formatCls(name, $condition || this.condition)
    } else {
      let names = name.replace(reg, ',').split(',')

      names.forEach(v => {
        let str = this.formatCls(v, $condition ? $condition[v] : this.condition)

        if (str) {
          cls += `${this.formatCls(v, $condition ? $condition[v] : this.condition)} `
        }
      })
    }

    return cls
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
