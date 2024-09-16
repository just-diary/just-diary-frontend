import { Select } from 'jige-ui'

export interface SelectOption {
  label: string
  value: string
}

export default function GmSelect(props: {
  options: string[]
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <Select {...props}>
      <Select.Trigger>
        {value => (
          <button class="p-1 min-w-100px b b-border bg-second rounded-md hover:b-hl transition flex items-center" role="button" type="button">
            <span class="flex-1">{value || 'Select'}</span>
            <i class="i-ri-arrow-down-s-line" />
          </button>
        )}
      </Select.Trigger>
      <Select.Content zindex={2020} class="bg-second rounded-md py-1 drop-shadow c-text-2">
        <Select.Option>
          {opt => <div class="p-2 min-w-85px flex items-center justify-center hover:bg-gray-2 transition w-full cursor-pointer">{opt}</div>}
        </Select.Option>
        <Select.Arrow size={10} class="bg-second" />
      </Select.Content>
    </Select>
  )
}
