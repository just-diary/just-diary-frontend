import { onMount, Show, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import type { JSX } from 'solid-js'
import Gmal from '~/utils/gmal'

export function GmDialog(props: {
  open: boolean
  setOpen: (open: boolean) => void
  onClosed?: (status: number) => void
  beforeClose?: (status: number) => boolean | Promise<boolean>
  cancelLabel?: string
  confirmLabel?: string
  children: JSX.Element
}) {
  let ref!: HTMLDivElement
  let instance: any
  const [local, others] = splitProps(props, ['children'])
  onMount(() => {
    watch(() => ({ ...others }), () => {
      if (others.open) {
        instance = Gmal.alert({
          html: ref,
          onClosed: (status: number) => {
            if (status >= 0)
              others.setOpen(false)
            others.onClosed?.(status)
          },
          beforeClose: (s) => {
            if (s === -2 || s === -99)
              return true
            if (others.beforeClose) {
              return others.beforeClose(s)
            }
            return true
          },
          cancelLabel: others.cancelLabel,
          confirmLabel: others.confirmLabel,
        })
      }
      else {
        instance?.close(-99)
      }
    })
  })

  return (
    <div ref={ref} class="w-full">
      <Show when={others.open}>
        {local.children}
      </Show>
    </div>
  )
}
