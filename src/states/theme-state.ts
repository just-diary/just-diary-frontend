import { defineGlobalStore } from 'solid-uses'
import { oklch2web } from '~/utils/Color'
import { SelectorEngine } from '~/utils/dom'

const colorPrefix = '--gmc-'

type Light = number
type Color = number
type Opacity = number

interface ThemeVar {
  l: Light
  c?: Color
  cD?: Color
  lD?: Light
  a?: Opacity
}

export interface ThemeVars {
  [key: string]: ThemeVar
}

const themeVars = {
  'main': { l: 97, c: 0.008, lD: 35, cD: 0.006 },
  'main-b': { l: 97, c: 0.008, lD: 35, cD: 0.006, a: 0.5 },
  'second': { l: 99.4, c: 0.0045, lD: 30.5 },
  'quote': { l: 98.2, c: 0.004, lD: 32, cD: 0.003 },
  'third': { l: 92.9, c: 0.008, lD: 39, a: 0.8 },
  'hover': { l: 92.8, c: 0.008, lD: 40, a: 0.9 },
  'border': { l: 90, c: 0.008, lD: 42 },
  'body': { l: 91, c: 0.014, lD: 18 },
  'hl': { l: 75, c: 0.14, lD: 72 },
  'disabled': { l: 90, c: 0.1, lD: 92, cD: 0.06 },
  'divider': { l: 85, c: 0.02, a: 0.7 },
  'bg': { l: 95, c: 0.025, cD: 0.04 },
}

function buildInitialVars() {
  const vars: Record<string, string> = {}
  for (const key in themeVars) {
    vars[key] = ''
  }

  return vars as Record<keyof typeof themeVars, string>
}

const themeCache: Record<string, { light: string, dark: string }> = {}

const themeState = defineGlobalStore('theme-state', {
  state: () => ({
    hue: 200,
    isDark: false,
    ...buildInitialVars(),
  }),
  methods: {
    getColor(name: string, dark: boolean, a?: number) {
      // @ts-expect-error xxx
      const v = themeVars[name]
      if (!v)
        return '#ccc'
      return oklch2web(
        dark ? v.lD || 128 - v.l : v.l,
        (dark ? v.cD || v.c : v.c) || 0.18,
        this.state.hue,
        a || v.a,
      )
    },
    setTheme() {
      const { state, actions } = this
      let css = ':root{'
      let cssDark = '.dark{'
      for (const key in themeVars) {
        const lightC = actions.getColor(key, false)
        const darkC = actions.getColor(key, true)
        themeCache[key] = { light: lightC, dark: darkC }
        css += `${colorPrefix}${key}:${lightC};`
        cssDark += `${colorPrefix}${key}:${darkC};`
        actions.setState(key as any, state.isDark ? themeCache[key].dark : themeCache[key].light)
      }
      css += '}'
      cssDark += '}'
      let root = SelectorEngine.findOne<HTMLStyleElement>('#theme-color')
      if (!root) {
        root = document.createElement('style')
        root.id = 'theme-color'
        root.dataset.hue = state.hue.toString()
        document.head.append(root)
      }
      root.innerHTML = css + cssDark
      root.dataset.hue = state.hue.toString()
    },
    setDark() {
      const { state, actions } = this
      document.body.classList.toggle('dark', state.isDark)
      const color = state.isDark ? themeCache.main.dark : themeCache.main.light
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) {
        meta.setAttribute('content', color)
      }
      for (const key in themeVars) {
        actions.setState(key as any, state.isDark ? themeCache[key].dark : themeCache[key].light)
      }
    },
  },
  persist: 'localStorage',
})

export function useThemeState() {
  return themeState
}
