// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'

import '@unocss/reset/tailwind.css'
import '@unocss/reset/tailwind-compat.css'

import './style/font.css'

mount(() => <StartClient />, document.getElementById('app')!)
