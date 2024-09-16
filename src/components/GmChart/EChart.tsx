import { createElementSize } from '@solid-primitives/resize-observer'
import * as echarts from 'echarts'
import { createEffect, createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { useThemeState } from '~/states/theme-state'

export function EChart(props: {
  height?: string
  width?: string
  loading?: boolean
  option: ECBasicOption
}) {
  const [ref, setRef] = createSignal<HTMLDivElement>()
  let chart: echarts.ECharts | null = null

  const size = createElementSize(ref)
  const [themeState] = useThemeState()

  watch(() => themeState.isDark, () => {
    chart?.setOption({ darkMode: themeState.isDark })
  })

  watch(() => size.width, () => {
    chart?.resize()
  })

  watch(() => props.loading, () => {
    if (props.loading) {
      chart?.showLoading()
    }
    else {
      chart?.hideLoading()
    }
  })

  createEffect(() => {
    if (ref()) {
      if (chart) {
        chart.dispose()
      }
      const chartDom = ref()
      chart = echarts.init(chartDom, {}, { renderer: 'svg' })
    }
  })

  watch(() => props.option, () => {
    chart?.setOption(props.option)
  })

  return (
    <div
      style={{
        'width': props.width || '100%',
        'height': props.height || '100%',
        'min-height': '300px',
      }}
      ref={setRef}
    />
  )
}
