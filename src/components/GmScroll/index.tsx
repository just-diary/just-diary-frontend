import { Scrollbar } from 'jige-ui'
import { type JSX, Show, createMemo, createSignal } from 'solid-js'

function GmScrollBar(props: {
  type: 'vertical' | 'horizontal'
  hidden: boolean
  color?: string
}) {
  const state = Scrollbar.getState()
  const isVertical = createMemo(() => props.type === 'vertical')
  return (
    <Scrollbar.Bar
      type={props.type}
      class="absolute bottom-[2px] transition-[width,height,opacity] hover:op-85"
      classList={
        {
          'op-0': props.hidden,
          'op-100!': state.isDragging,
          'op-65': !props.hidden,
          'w-10px': state.isDragging && isVertical(),
          'h-10px': state.isDragging && !isVertical(),
          'left-[2px] right-[12px] h-[6px] hover:h-[10px]': !isVertical(),
          'top-[2px] right-[2px] w-[6px] hover:w-[10px]': isVertical(),
        }
      }
    >
      <Scrollbar.Thumb
        type={props.type}
        classList={{
          'cursor-pointer rounded-lg transition-all-30': true,
          'bg-hl': !props.color,
        }}
        style={{ 'background-color': props.color }}
      />
    </Scrollbar.Bar>
  )
}

export default function GmScroll(props: {
  children: JSX.Element
  color?: string
  hideVertical?: boolean
  hideHorizontal?: boolean
  class?: string
  height?: string
  maxHeight?: string
  always?: boolean
  onScroll?: JSX.EventHandlerUnion<HTMLDivElement, Event>
}) {
  const [hidden, setHidden] = createSignal(false)
  return (
    <Scrollbar
      class={props.class}
      height={props.height}
      maxHeight={props.maxHeight}
      onMouseEnter={() => {
        !props.always && setHidden(false)
      }}
      onMouseLeave={() => {
        !props.always && setHidden(true)
      }}
    >
      <Scrollbar.Content onScroll={props.onScroll}>
        {props.children}
      </Scrollbar.Content>
      <Show when={!props.hideVertical}>
        <GmScrollBar type="vertical" hidden={hidden()} color={props.color} />
      </Show>

      <Show when={!props.hideHorizontal}>
        <GmScrollBar type="horizontal" hidden={hidden()} color={props.color} />
      </Show>
    </Scrollbar>
  )
}
