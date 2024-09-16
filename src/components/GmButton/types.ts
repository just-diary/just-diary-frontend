import type { JSX } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

export type GmButtonVariants = 'link' | 'ghost' | 'normal'

// label or children is required
export interface GmButtonProps {
  onClick?: (e: MouseEvent & {
    currentTarget: HTMLButtonElement
    target: DOMElement
  }) => void
  variant?: GmButtonVariants
  loading?: boolean
  disabled?: boolean
  label?: string
  children?: JSX.Element
  href?: string
  type?: string
  download?: boolean
  class?: string
};
