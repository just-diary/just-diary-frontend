// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'

import '@unocss/reset/tailwind.css'
import '@unocss/reset/tailwind-compat.css'
import '~/style/color.scss'

import { initDarkLightMode, setDynamicTheme } from './style/theme'

initDarkLightMode()
setDynamicTheme()

mount(() => <StartClient />, document.getElementById('app')!)
