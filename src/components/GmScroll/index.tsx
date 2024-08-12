import { Scrollbar } from 'jige-ui'
import { JSX } from 'solid-js'

export default function GmScroll(props: {
  children: JSX.Element
  height?: string
}) {
  return (
    <Scrollbar>
      <Scrollbar.Content height={props.height}>
        {props.children}
      </Scrollbar.Content>
      <Scrollbar.Bar type="vertical" class="absolute bottom-2 top-2 right-2 w-6px">
        <Scrollbar.Thumb type="vertical" class="bg-gray-2 cursor-pointer rounded-lg hover:bg-gray-3 transition transition-duration-30 " />
      </Scrollbar.Bar>
      <Scrollbar.Bar type="horizontal" class="absolute left-2 bottom-2  right-2 h-6px">
        <Scrollbar.Thumb type="horizontal" class="bg-amber cursor-pointer rounded-lg" />
      </Scrollbar.Bar>
    </Scrollbar>
  )
}
