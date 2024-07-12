import { createSignal } from 'solid-js'
import { Button } from 'jige-ui'

export default function Counter() {
  const [count, setCount] = createSignal(0)
  return (
    <Button
      onClick={() => setCount(count() + 1)}
      variant="primary"
    >
      Clicks:
      {' '}
      {count()}
    </Button>
  )
}
