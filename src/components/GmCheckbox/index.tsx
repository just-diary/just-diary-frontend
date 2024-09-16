import { CheckboxGroup } from 'jige-ui'
import { For } from 'solid-js'

export function GmCheckbox(props: {
  options: string[]
  value?: string[]
  onChange?: (value: string[]) => void
}) {
  return (
    <CheckboxGroup class="flex gap-2" value={props.value} onChange={props.onChange}>
      <For each={props.options}>
        {item => (
          <CheckboxGroup.Item value={item}>
            <CheckboxGroup.ItemNative />
            <CheckboxGroup.ItemControl class="select-none p-2 cursor-pointer z-1 text-center text-xs bg-third data-checked:bg-bg flex-center">
              <div classList={
                { 'w-1em text-sm': true, 'i-ri-check-line': props.value?.includes(item) }
              }
              />
              {item}
            </CheckboxGroup.ItemControl>
          </CheckboxGroup.Item>
        )}
      </For>
    </CheckboxGroup>
  )
}
