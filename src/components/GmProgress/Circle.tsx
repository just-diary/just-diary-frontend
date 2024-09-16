import { CircleProgress } from 'jige-ui'
import { JSX, mergeProps } from 'solid-js'

export function Circle(props: {
  progress: number
  radius?: number
  fillWidth?: number
  railWidth?: number
  gapOffsetDegree?: number
  gapDegree?: number
  offsetDegree?: number
  children?: JSX.Element
  railColor?: string
  fillColor?: string
  injectSVG?: JSX.Element
}) {
  const realProps = mergeProps({
    radius: 50,
    fillWidth: 8,
    railWidth: 8,
    gapOffsetDegree: 0,
    gapDegree: 0,
    offsetDegree: 0,
    railColor: 'var(--gmc-hover)',
    fillColor: 'var(--gmc-hl)',
  }, props)
  return (
    <div class="relative w-100px h-100px">
      <CircleProgress gapDegree={realProps.gapDegree} gapOffsetDegree={realProps.offsetDegree}>
        {props.injectSVG}
        <CircleProgress.Rail
          class="transition-all"
          color={realProps.railColor}
          radius={realProps.radius}
          strokeWidth={realProps.railWidth}
        />
        <CircleProgress.Fill
          class="transition-all "
          color={realProps.fillColor}
          radius={realProps.radius}
          strokeWidth={realProps.fillWidth}
          percent={realProps.progress}
        />
      </CircleProgress>
      <div class="absolute inset-0 flex-center">
        {props.children}
      </div>
    </div>
  )
}
