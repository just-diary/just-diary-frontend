import { RadioGroup } from 'jige-ui'
import { createMemo, For } from 'solid-js'
import type { RadioOption } from './types'

function Slider(props: {
  options: Exclude<RadioOption, string>[]
  width: number
}) {
  const state = RadioGroup.getState()
  const sliderX = createMemo(() => {
    const index = props.options.findIndex(option => option.value === state.value)
    return index * props.width
  })
  return (
    <div class="absolute top-3px bottom-3px left-3px bg-second rounded transition shadow" style={{ width: `${props.width}px`, transform: `translateX(${sliderX()}px)` }} />
  )
}

export default function Segment(props: {
  options: RadioOption[]
  itemWidth?: number
  value?: string
  onChange?: (value: string) => void
}) {
  const normalizeOptions = createMemo(() => {
    return props.options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      }
      return option
    })
  })
  const itemWidth = createMemo(() => props.itemWidth || 100)

  return (
    <RadioGroup
      class="p-3px bg-third rounded-md relative flex"
      onChange={props.onChange}
      value={props.value}
    >
      <For each={normalizeOptions()}>
        {item => (
          <RadioGroup.Item value={item.value}>
            <RadioGroup.ItemNative />
            <RadioGroup.ItemControl class="z-1">
              <div class="text-center cursor-pointer text-sm lh-relaxed" style={{ width: `${itemWidth()}px` }}>
                {item.label}
              </div>
            </RadioGroup.ItemControl>
          </RadioGroup.Item>
        )}
      </For>
      <Slider width={itemWidth()} options={normalizeOptions()} />
    </RadioGroup>
  )
}
