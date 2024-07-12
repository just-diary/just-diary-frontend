import { JSX } from 'solid-js'

export default function Card(props: {
  children: JSX.Element
  class?: string
}) {
  return (
    <div class={`flex bg-base ${props.class}`}>
      {props.children}
    </div>
  )
}
