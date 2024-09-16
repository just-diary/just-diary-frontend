import { createMemo } from 'solid-js'
import { GmCheckbox } from '../GmCheckbox'
import { getCols, normalizeMapper, type TableMapper } from './mapper-utils'

export function TableColsControl(props: {
  mapper: TableMapper
  setMapper: (mapper: TableMapper) => void
}) {
  const cols = createMemo(() => getCols(props.mapper))
  const showCols = createMemo(() => {
    return cols().filter(v => !v.hide).map(v => v.label)
  })

  return (
    <GmCheckbox
      options={cols().map(v => v.label)}
      value={showCols()}
      onChange={(v) => {
        if (v.every(v => showCols().includes(v)) && v.length === showCols().length) {
          return
        }
        const newMapper = normalizeMapper(props.mapper)
        cols().forEach((col) => {
          col.keys.forEach((key) => {
            newMapper[key].hide = !v.includes(col.label)
          })
        })
        props.setMapper(newMapper)
      }}
    />
  )
}
