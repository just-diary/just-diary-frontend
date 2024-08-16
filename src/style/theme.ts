import { throttle } from 'radash'
import { theme } from 'unocss/preset-mini'
import type { ColorType } from '../utils/Color/Color'
import { OkLch } from '../utils/Color/Color'
import useAppState from '~/states/app-state'
import { getCookie } from '~/utils/cookie'
import * as SelectorEngine from '~/utils/dom/selector-engine'

const colorPrefix = '--gmc-'

type Light = number
type Color = number
type Opacity = number

interface ThemeVar {
  n: string
  l: Light
  c?: Color
  cD?: Color
  lD?: Light
  a?: Opacity
}

// 边栏区颜色
const mainC = { n: 'main', l: 97.2, c: 0.008, lD: 26, cD: 0.005 }

const themeVars: ThemeVar[] = [
  // 主色
  mainC,

  // 主色带透明
  {
    ...mainC,
    a: 0.8,
    n: 'main-b',
  },
  { n: 'second', l: mainC.l + 2.1, c: 0.005, lD: mainC.lD - 2.8 },
  { ...mainC, n: 'hover', l: mainC.l - 6, lD: mainC.lD + 6, a: 0.9 },
  { ...mainC, n: 'third', l: mainC.l - 5, lD: mainC.lD + 5, a: 0.8 },
  { ...mainC, n: 'border', l: mainC.l - 7, lD: mainC.lD + 7 },
  { n: 'body', l: 91, c: 0.014, lD: 18 },
  { n: 'hl', l: 72, c: 0.14 },
  { n: 'disabled', l: 91 },
  { n: 'divider', l: 85, a: 0.7, c: 0.02 },
  { n: 's-bg', l: 63, a: 0.15, c: 0.07, lD: 35 },
  { n: 'light', l: 50, a: 0.6, c: 0.1, lD: 45 },
]

// 保存当前主题色
const metaThemeColor = {
  light: '',
  dark: '',
}

let currentHue = Number.NaN

function changeThemeColor(hue: number) {
  if (currentHue === hue) {
    return
  }

  let root = SelectorEngine.findOne<HTMLStyleElement>('#theme-color')

  if (!root) {
    root = document.createElement('style')
    root.id = 'theme-color'
    document.head.append(root)
  }
  let css = ':root{'
  let cssDark = '.dark{'
  const lchColor = new OkLch(hue)

  themeVars.forEach((obj) => {
    const value = lchColor.new(obj.l, obj.c, obj.a)
    const valueDark = lchColor.new(
      obj.lD || 125 - obj.l,
      obj.cD || obj.c,
      obj.a,
    )

    if (obj.n === 'main') {
      metaThemeColor.light = value
      metaThemeColor.dark = valueDark
    }

    css += `${colorPrefix}${obj.n}:${value};`
    cssDark += `${colorPrefix}${obj.n}:${valueDark};`
  })

  setDarkLightMetaThemeColor()
  currentHue = hue

  css += '}\n'
  cssDark += '}\n'
  root.innerHTML = css + cssDark
}

function getTheme() {
  const T = document.body.dataset.hue
  return Number(T) || 0
}

const throttleThemeChange = throttle({ interval: 50 }, (theme: number) => {
  changeThemeColor(theme)
})
export function setDynamicTheme() {
  const theme = getTheme()
  throttleThemeChange(theme)
}

export function setDarkLightMetaThemeColor() {
  // 改变meta theme-color
  const $meta = SelectorEngine.findOne<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )!

  const dark = document.body.classList.contains('dark')

  $meta.content = dark ? metaThemeColor.dark : metaThemeColor.light
}

export function initDarkLightMode() {
  // 根据系统主题设置html的data-theme属性
  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (getCookie('dark_mode') === '1') {
    dark = true
  }
  if (getCookie('dark_mode') === '0') {
    dark = false
  }

  document.body.classList.toggle('dark', dark)
  const [, actions] = useAppState()
  actions.setIsDark(dark)
  setDarkLightMetaThemeColor()
}
