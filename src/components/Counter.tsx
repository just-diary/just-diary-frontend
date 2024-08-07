import { createSignal } from 'solid-js'
import GmButton from './GmButton'

export default function Counter() {
  const [count, setCount] = createSignal(0)
  return (
    <GmButton
      onClick={() => setCount(count() + 1)}
      label={`Clicks: ${count()}`}
    />
  )
}
