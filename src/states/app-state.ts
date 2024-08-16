import { createGlobalState, watch } from 'solid-uses'
import { setDarkLightMetaThemeColor, setDynamicTheme } from '~/style/theme'

const document = isServer ? null : window.document
const darkMode = document?.body.classList.contains('dark')
const hue = document?.body.dataset.hue

const appState = createGlobalState(() => ({
  isDark: darkMode || false,
  hue: Number(hue) || 0,
}), {
  setIsDark(v: boolean) {
    document?.body.classList.toggle('dark', v)
    this.actions.setState('isDark', v)
    setDarkLightMetaThemeColor()
  },

  setHue(v: number) {
    if (document) {
      document.body.dataset.hue = String(v)
    }

    this.actions.setState('hue', v)
    setDynamicTheme()
  },

})

function useAppState() {
  return appState
}

export default useAppState
