import { FloatingUiPort } from 'jige-ui'
import type { JSX } from 'solid-js'

import './tooltip.scss'

export default function GmTooltip(props: {
  children: JSX.Element
  placement?: 'top' | 'bottom' | 'left' | 'right'
  content: string
  openDelay?: number
  closeDelay?: number
}) {
  return (
    <FloatingUiPort placement={props.placement} trigger="hover" openDelay={props.openDelay} closeDelay={props.closeDelay}>
      <FloatingUiPort.Trigger>{props.children}</FloatingUiPort.Trigger>
      <FloatingUiPort.Content zindex={2020} class="text-xs rounded shadow b b-border p-1 px-2 bg-hl text-white  anitip">
        <span>{props.content}</span>
      </FloatingUiPort.Content>
    </FloatingUiPort>
  )
}
