import { DatePicker, dayjs } from 'jige-ui'
import { For } from 'solid-js'

// month: 1-12
function numberToChinese(num: number) {
  const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return chinese[num - 1]
}

export function GmDatePicker(props: {
  value?: string
  onChange?: (value: ReturnType<typeof dayjs>) => void
}) {
  return (
    <DatePicker {...props}>
      <DatePicker.Trigger>
        { v => (
          <div class="p-2 b b-border rounded-md hover:b-hl transition cursor-pointer">
            {v?.format('YYYY-MM-DD') || '请选择日期'}
          </div>
        )}
      </DatePicker.Trigger>
      <DatePicker.Content zindex={2020} class="bg-second rounded-md shadow  p-1 px-2 w-[245px]  m-2">
        <div class="flex justify-between">
          <DatePicker.ToolYear class="text-center p-1 px-2 hover:bg-hover transition rounded cursor-pointer">
            {year => <span>{year}</span>}
          </DatePicker.ToolYear>
          <DatePicker.ToolMonth class="text-center p-1 px-2 hover:bg-hover transition rounded cursor-pointer">
            {month => (
              <span>
                {numberToChinese(month + 1)}
                月
              </span>
            )}
          </DatePicker.ToolMonth>
        </div>

        <DatePicker.DayPanel class="grid gap-1 grid-cols-7 text-center h-[230px] content-evenly">
          {(days, ctx) => {
            return (
              <>
                <For each={['日', '一', '二', '三', '四', '五', '六']}>
                  {day => (
                    <div class="text-xs c-text-2">{day}</div>
                  )}
                </For>
                <For each={days}>
                  {(day) => {
                    const [state, actions] = ctx
                    const isToday = day.isSame(dayjs(), 'day')
                    const isSelected = day.isSame(state.selectDate, 'day')
                    const isThisMonth = day.isSame(dayjs().month(state.currMonth).year(state.currYear), 'month')
                    return (
                      <div
                        onClick={
                          () => {
                            actions.setSelectDate(day)
                            actions.setOpen(false)
                          }
                        }
                        classList={{
                          'p-1 rounded-full text-sm cursor-pointer flex-center': true,
                          'hover:bg-hover': !isSelected,
                          'bg-hl c-white': isSelected,
                          'b b-dashed b-text-2': isToday && !isSelected,
                          'op-60': !isThisMonth,
                        }}
                      >
                        <span>
                          {day.date()}
                        </span>
                      </div>
                    )
                  }}
                </For>
              </>
            )
          }}
        </DatePicker.DayPanel>
        <DatePicker.MonthPanel class="grid gap-2 grid-cols-3 text-center h-[230px] content-evenly">
          {(ctx) => {
            return (
              <For each={[...Array.from({ length: 12 }).keys()]}>
                {month => (
                  <div
                    class="p-2 b b-border hover:bg-hover rounded font-size-sm"
                    onClick={
                      () => {
                        ctx[1].setCurrMonth(month)
                      }
                    }
                  >
                    {numberToChinese(month + 1)}
                    月
                  </div>
                )}
              </For>
            )
          }}
        </DatePicker.MonthPanel>
        <DatePicker.YearPanel class="grid gap-2 grid-cols-3 text-center h-[230px] content-evenly">
          {(years, ctx) => {
            return (
              <For each={years}>
                {year => (
                  <div
                    class="p-2 b b-border hover:bg-hover rounded text-sm"
                    onClick={
                      () => {
                        ctx[1].setCurrYear(year)
                      }
                    }
                  >
                    {year}
                  </div>
                )}
              </For>
            )
          }}
        </DatePicker.YearPanel>
      </DatePicker.Content>
    </DatePicker>
  )
}
