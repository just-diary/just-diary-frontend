import { Scrollbar } from 'jige-ui'
import type { JSX } from 'solid-js'

export default function GmScroll(props: {
  children: JSX.Element
  height?: string
  autoHide?: boolean
}) {
  const [hidden, setHidden] = createSignal(false)
  return (
    <Scrollbar
      class="pr-[10px]"
      onMouseEnter={() => {
        props.autoHide && setHidden(false)
      }}
      onMouseLeave={() => {
        props.autoHide && setHidden(true)
      }}
    >
      <Scrollbar.Content height={props.height}>
        {props.children}
      </Scrollbar.Content>
      <Scrollbar.Bar
        type="vertical"
        class="absolute bottom-[2px] top-[2px] right-[2px] w-[6px] hover:w-[8px] transition"
        classList={
          {
            'op-0': hidden(),
          }
        }
      >
        <Scrollbar.Thumb type="vertical" class="bg-third cursor-pointer rounded-lg hover:bg-hover transition transition-transform-30 " />
      </Scrollbar.Bar>
      <Scrollbar.Bar type="horizontal" class="absolute left-[2px] bottom-[2px] right-[12px] h-[6px]">
        <Scrollbar.Thumb type="horizontal" class="bg-third cursor-pointer rounded-lg hover:bg-hover transition transition-transform-30 " />
      </Scrollbar.Bar>
    </Scrollbar>
  )
}
