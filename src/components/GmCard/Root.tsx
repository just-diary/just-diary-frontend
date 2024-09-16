import { Show } from 'solid-js'
import type { JSX } from 'solid-js'

import './card.scss'

function Header(props: { title: string }) {
  return (
    <div class="text-sm c-text-2 relative card-title pl-8px">{props.title}</div>
  )
}

export function Root(props: { children: JSX.Element, class?: string, header?: string, headerRight?: JSX.Element }) {
  return (
    <div class={`p-3 pt-2 rounded bg-second b b-border mb-12px ${props.class}`}>
      <Show when={props.header}>
        <div class="flex justify-between items-center h-36px">
          <Header title={props.header!} />
          {props.headerRight}
        </div>
      </Show>
      {props.children}
    </div>
  )
}
