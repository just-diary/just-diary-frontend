import { clientOnly } from '@solidjs/start'

export * from './types'

export const GmRadio = {
  Segment: clientOnly(() => import('./Segment')),
}
