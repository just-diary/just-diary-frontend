import { TextField } from 'jige-ui'

export function GmInput(props: {
  class?: string
  value?: string
  type?: 'text' | 'password' | 'tel' | 'textarea' | 'search' | 'email'
  placeholder?: string
  onChange?: (value: string) => void
}) {
  return (
    <TextField value={props.value} onChange={props.onChange}>
      <TextField.Input type={props.type} class={`bg-second px-2 py-1 rounded-md b b-border hover:b-hl focus:b-hl focus-visible:outline-none ${props.class}`} placeholder={props.placeholder || '输入...'} />
    </TextField>
  )
}
