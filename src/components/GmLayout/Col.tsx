import { isNumber } from 'radash'
import { JSX } from 'solid-js'
import context from './context'

export function Col(props: {
  span?: number
  sm?: number
  md?: number
  lg?: number
  children: JSX.Element
}) {
  const [state] = context.useContext()
  return (
    <div
      classList={
        {
          [`col-${props.span}`]: isNumber(props.span),
          [`sm:col-${props.sm}`]: isNumber(props.sm),
          [`md:col-${props.md}`]: isNumber(props.md),
          [`lg:col-${props.lg}`]: isNumber(props.lg),
        }
      }
      style={{
        'padding-left': `${state.gutters / 2}px`,
        'padding-right': `${state.gutters / 2}px`,
      }}
    >
      {props.children}
    </div>
  )
}
