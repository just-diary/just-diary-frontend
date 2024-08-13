export default function LoadingPage() {
  const [width, setWidth] = createSignal(0)

  onCleanup(() => {
    setWidth(100)
  })

  let value = 0
  const totalDuration = 5000 // 总时长（毫秒）
  const startTime = Date.now()

  function update() {
    const elapsed = Date.now() - startTime
    const progress = elapsed / totalDuration

    // 使用指数衰减函数计算当前值
    value = 100 * (1 - Math.exp(-5 * progress))

    setWidth(value) // 打印当前值

    // 如果还未到达指定的持续时间，则继续更新
    if (elapsed < totalDuration) {
      requestAnimationFrame(update)
    }
  }

  onMount(() => {
    update()
  })

  return (
    <div class="flex items-center justify-center h-screen">
      <div class="bg-gray-2 rounded-12px h-3 overflow-hidden w-65px">
        <div
          class="bg-blue h-full transition"
          style={
            { width: `${width()}%` }
          }
        />
      </div>
    </div>
  )
}
