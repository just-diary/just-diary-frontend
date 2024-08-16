import { Slider } from 'jige-ui'

import './slider.scss'

export default function GmSlider(props: {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  name?: string
}) {
  return (
    <Slider {...props}>
      <Slider.Native class="gmslider-native" />
      <Slider.Track class="w-full h-10px rounded-md bg-hover gmslider-track">
        <Slider.Fill class="rounded-md bg-light" />
        <Slider.Thumb class="rounded-50% bg-hl h-20px w-20px translate-x-[-50%] top-[-5px] cursor-grab data-dragging:cursor-grabbing gmslider-thumb" />
      </Slider.Track>
    </Slider>
  )
}
