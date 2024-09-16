// @refresh reload
import { mount, StartClient } from '@solidjs/start/client'

import { enableGlobalStore } from 'solid-uses'
import '@unocss/reset/tailwind.css'

import '@unocss/reset/tailwind-compat.css'
import '~/style/color.scss'

mount(() => <StartClient />, document.getElementById('app')!)

enableGlobalStore()
