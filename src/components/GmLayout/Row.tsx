import { JSX, mergeProps } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'

export function Row(props: {
  children: JSX.Element
  gutter?: number
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'top' | 'middle' | 'bottom'
}) {
  const realProps = mergeProps({
    gutter: 0,
    justify: 'evenly',
    align: 'top',
  }, props)

  const Context = context.initial()
  const [state, actions] = Context.value

  watch(() => props.gutter, () => {
    actions.setGutters(props.gutter || 0)
  })

  return (
    <Context.Provider>
      <div class="w-full overflow-hidden">
        <div
          class="flex flex-wrap relative"
          classList={{
            'justify-center': realProps.justify === 'center',
            'justify-start': realProps.justify === 'start',
            'justify-end': realProps.justify === 'end',
            'justify-between': realProps.justify === 'between',
            'justify-around': realProps.justify === 'around',
            'justify-evenly': realProps.justify === 'evenly',
            'items-start': realProps.align === 'top',
            'items-center': realProps.align === 'middle',
            'items-end': realProps.align === 'bottom',
          }}
          style={
            {
              'margin-left': `-${state.gutters / 2}px`,
              'margin-right': `-${state.gutters / 2}px`,
              'width': `calc(100% + ${state.gutters}px)`,
            }
          }
        >
          {props.children}
        </div>
      </div>
    </Context.Provider>
  )
}
