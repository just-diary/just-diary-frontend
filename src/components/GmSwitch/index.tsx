import { Switcher } from 'jige-ui'
import { createMemo, Match, Switch } from 'solid-js'

export function GmSwitch(props: { onChange?: (checked: boolean) => void, value?: boolean, type?: 'checkbox' | 'switcher' | 'label' }) {
  const type = createMemo(() => props.type || 'switcher')
  return (
    <Switcher checked={props.value} onChange={props.onChange}>
      <Switcher.Native class="switch-native" />
      <Switch>
        <Match when={type() === 'checkbox'}>
          <Switcher.Control class="bg-second relative b b-border hover:b-hl w-18px h-18px rounded cursor-pointer flex-center switch-control">
            <Switcher.Thumb class="data-checked:i-ri-check-fill text-15px " />
          </Switcher.Control>
        </Match>
        <Match when={type() === 'switcher'}>
          <Switcher.Control class="bg-bg relative w-40px h-20px  rounded-20px cursor-pointer switch-control">
            <Switcher.Thumb class="left-1px absolute bg-hl w-20px h-20px rounded-full data-checked:translate-x-[calc(100%-1px)] transition" />
          </Switcher.Control>
        </Match>
        <Match when={type() === 'label'}>
          <Switcher.Control class="relative w-40px h-20px  rounded-20px cursor-pointer switch-control">
            <Switcher.Thumb class="left-1px absolute bg-hl w-20px h-20px rounded-full data-checked:translate-x-[calc(100%-1px)] transition" />
          </Switcher.Control>
        </Match>
      </Switch>

    </Switcher>
  )
}
