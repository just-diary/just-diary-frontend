import type { JSX } from 'solid-js'
import { FloatingUiPort } from 'jige-ui'
import useAppState from '~/states/app-state'

import './tooltip.scss'

export default function GmTooltip(props: {
  children: JSX.Element
  placement?: 'top' | 'bottom' | 'left' | 'right'
  content: string
}) {
  return (
    <FloatingUiPort placement={props.placement} trigger="hover">
      <FloatingUiPort.Trigger>{props.children}</FloatingUiPort.Trigger>
      <FloatingUiPort.Content zindex={1} class="rounded drop-shadow p-2 bg-white dark:bg-[#111] dark:text-white ani-tips">
        <span>{props.content}</span>
        <FloatingUiPort.Arrow class="bg-white dark:bg-[#111] dark:text-white" size={8} />
      </FloatingUiPort.Content>
    </FloatingUiPort>
  )
}
