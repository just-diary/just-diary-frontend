import { JSX } from 'solid-js'
import { GmButtonColors, GmButtonProps } from './types'

type HandledGmButtonProps = Required<Omit<GmButtonProps, 'variant' | 'label' | 'children'>> & {
  label?: string
  children?: JSX.Element
}

function NormalButton(props: HandledGmButtonProps) {
  return (
    <button
      class={`c-reverse bg-${props.color} rounded p-2`}
      disabled={props.disabled}
      onClick={(e) => {
        if (props.loading)
          return
        props.onClick(e)
      }}
    >
      <Show when={props.children} fallback={props.label}>
        {props.children}
      </Show>
    </button>
  )
}

export default function GmButton(props: GmButtonProps) {
  const finalProps = mergeProps({
    color: 'primary' as GmButtonColors,
    onClick: (() => {}) as any,
    disabled: false,
    loading: false,
  }, props)

  return (
    <Switch fallback={<NormalButton {...finalProps} />}>
      <Match when={finalProps.variant === 'normal'}>
        <NormalButton {...finalProps} />
      </Match>
    </Switch>
  )
}
