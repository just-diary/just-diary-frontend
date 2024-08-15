// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'

import '@unocss/reset/tailwind.css'
import '@unocss/reset/tailwind-compat.css'
import '~/style/color.scss'

// @ts-expect-error xxx
import { css, fontFamilyFallback } from '../assets/fonts/XiaolaiSC-Regular.ttf'
import { initDarkLightMode, setDynamicTheme } from './style/theme'

document.body.style.fontFamily = `"${css.family}", ${fontFamilyFallback}`

initDarkLightMode()
setDynamicTheme()

mount(() => <StartClient />, document.getElementById('app')!)
