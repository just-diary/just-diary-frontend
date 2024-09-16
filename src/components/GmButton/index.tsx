import { children, createMemo, type JSX, mergeProps, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { GmButtonProps, GmButtonVariants } from './types'

type HandledGmButtonProps = Required<Omit<GmButtonProps, 'label' | 'children' | 'href' | 'download' | 'class'>> & {
  label?: string
  children?: JSX.Element
  href?: string
  download?: boolean
  class?: string
}

function Button(props: HandledGmButtonProps) {
  const c = children(() => props.children)
  const buttonClass = createMemo(() => {
    let c = `rounded-md p-1 px-2 transition duration-100 ${props.class}`
    if (props.disabled) {
      c += ' op-50 cursor-not-allowed'
    }

    switch (props.variant) {
      case 'normal': {
        c += ' c-white bg-hl focus-visible:outline-offset-2'
        if (!props.disabled) {
          c += ' active:translate-y-0.5'
        }
        break
      }
      case 'ghost': {
        c += ' c-hl rounded focus-visible:outline-gray focus-visible:outline-offset-2'
        if (!props.disabled) {
          c += ' hover:bg-hover'
        }
        break
      }
      case 'link': {
        c += ' c-hl underline-offset-4 focus-visible:underline focus-visible:outline-none'
        if (!props.disabled) {
          c += ' active:underline hover:underline'
        }
        break
      }
    }
    return c
  })
  return (
    <Dynamic
      component={props.href ? 'a' : 'button'}
      href={props.href}
      class={buttonClass()}
      onClick={(e: any) => {
        if (props.loading || props.disabled)
          return
        props.onClick(e)
      }}
      download={props.download}
      type={props.type}
      role="button"
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
    type: 'button',
  }, props)

  return (
    <Button {...finalProps} />
  )
}
