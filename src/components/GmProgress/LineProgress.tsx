import { createMemo } from 'solid-js'

export function LineProgress(props: {
  progress: number
  height?: string
  width?: string
}) {
  const nomalizeProgress = createMemo(() => {
    return Math.min(Math.max(props.progress, 0), 100)
  })
  return (
    <div
      class="bg-third rounded-md"
      style={{
        height: props.height || '8px',
        width: props.width || '100%',
        overflow: 'hidden',
      }}
    >
      <div class="h-full bg-hl rounded-md transition-width" style={{ width: `${nomalizeProgress()}%` }} />
    </div>
  )
}
