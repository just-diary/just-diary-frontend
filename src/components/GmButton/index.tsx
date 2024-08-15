import type { JSX } from 'solid-js'
import type { GmButtonProps, GmButtonVariants } from './types'

type HandledGmButtonProps = Required<Omit<GmButtonProps, 'label' | 'children'>> & {
  label?: string
  children?: JSX.Element
}

function Button(props: HandledGmButtonProps) {
  const publicClassed = `rounded-md p-2 transition duration-100 `
  const variantClasses = createMemo(() => {
    const classes = {
      normal: `c-white bg-hl active:translate-y-0.5 focus-visible:outline-offset-2`,
      ghost: `c-hl rounded p-2 active:translate-y-0.5 hover:bg-hover focus-visible:outline-gray focus-visible:outline-offset-2`,
      link: `c-hl active:underline hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none`,
    }
    return `${publicClassed} ${classes[props.variant]}`
  })

  // eslint-disable-next-line solid/reactivity
  const c = children(() => props.children)
  return (
    <button
      class={variantClasses()}
      disabled={props.disabled}
      onClick={(e) => {
        if (props.loading)
          return
        props.onClick(e)
      }}
    >
      <Show when={c()} fallback={props.label}>
        {c()}
      </Show>
    </button>
  )
}

export default function GmButton(props: GmButtonProps) {
  const finalProps = mergeProps({
    onClick: (() => {}) as any,
    disabled: false,
    loading: false,
    variant: 'normal' as GmButtonVariants,
  }, props)

  return (
    <Button {...finalProps} />
  )
}
