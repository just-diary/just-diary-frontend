// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'

import '@unocss/reset/tailwind.css'
import '@unocss/reset/tailwind-compat.css'

// @ts-expect-error xxx
import { css, fontFamilyFallback } from '../assets/fonts/XiaolaiSC-Regular.ttf'

document.body.style.fontFamily = `"${css.family}", ${fontFamilyFallback}`

mount(() => <StartClient />, document.getElementById('app')!)
