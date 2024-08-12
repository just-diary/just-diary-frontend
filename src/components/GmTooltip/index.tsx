import { JSX } from 'solid-js'
import { Tooltip } from 'jige-ui'

export default function GmTooltip(props: {
  children: JSX.Element
  placement?: 'top' | 'bottom' | 'left' | 'right'
  content: string
}) {
  return (
    <Tooltip
      class="rounded drop-shadow p-2 bg-white dark:bg-[#333] dark:text-white"
      tips={props.content}
      placement={props.placement}
      arrow={
        { size: 8, color: 'white' }
      }
    >
      {props.children}
    </Tooltip>
  )
}
