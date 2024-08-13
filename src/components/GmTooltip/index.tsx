import { JSX } from 'solid-js'
import { Tooltip } from 'jige-ui'
import useAppState from '~/states/app-state'

export default function GmTooltip(props: {
  children: JSX.Element
  placement?: 'top' | 'bottom' | 'left' | 'right'
  content: string
}) {
  const [state] = useAppState()
  return (
    <Tooltip
      class="rounded drop-shadow p-2 bg-white dark:bg-[#111] dark:text-white"
      tips={props.content}
      placement={props.placement}
      arrow={
        { size: 8, color: state.isDark ? '#111' : '#fff' }
      }
    >
      {props.children}
    </Tooltip>
  )
}
