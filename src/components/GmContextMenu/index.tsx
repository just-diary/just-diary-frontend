import { ContextMenu } from 'jige-ui'
import type { JSX, ValidComponent } from 'solid-js'
import type { DynamicProps } from 'solid-js/web'

function Trigger<T extends ValidComponent = 'div'>(props: {
  children: JSX.Element
  as?: T
} & Omit<DynamicProps<T>, 'component' | 'onContextMenu'>) {
  return (
    <ContextMenu.Trigger {...props} as={props.as as ValidComponent} />
  )
}

function Content(props: { children: JSX.Element }) {
  return (
    <ContextMenu.Content zindex={2020} class="bg-second shadow rounded-md p-2">
      {props.children}
    </ContextMenu.Content>
  )
}

function Root(props: { children: JSX.Element }) {
  return (
    <ContextMenu>
      {props.children}
    </ContextMenu>
  )
}

export const GmContextMenu = Object.assign(Root, {
  Trigger,
  Content,
})
