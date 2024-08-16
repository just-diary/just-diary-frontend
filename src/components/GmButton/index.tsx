import type { JSX } from 'solid-js'
import { redirect } from '@solidjs/router'
import type { GmButtonProps, GmButtonVariants } from './types'

type HandledGmButtonProps = Required<Omit<GmButtonProps, 'label' | 'children' | 'href'>> & {
  label?: string
  children?: JSX.Element
  href?: string
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
    <Dynamic
      component={props.href ? 'a' : 'button'}
      href={props.href}
      class={variantClasses()}
      disabled={props.disabled}
      onClick={(e: any) => {
        if (props.loading)
          return
        props.onClick(e)
      }}
    >
      <Show when={c()} fallback={props.label}>
        {c()}
      </Show>
    </Dynamic>
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
