import { Select, Switcher, TextField, createForm } from 'jige-ui'

export default function About() {
  const Form = createForm({
    checked: true,
    select: 'apple',
    input: 'input',
  })
  return (
    <main class="text-center mx-auto p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        About Page
      </h1>
      <Form.Provider class="bg-gray-2 rounded-md shadow border p-2 flex-col flex gap-2">
        <TextField name="input">
          <TextField.Input class="p-1 rounded-md border-black border " />
        </TextField>
        <Switcher name="checked">
          <Switcher.Control class="bg-amber relative w-40px h-20px  rounded-20px cursor-pointer data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue">
            <Switcher.Thumb class="left-1px absolute bg-black w-20px h-20px rounded-full data-checked:translate-x-[calc(100%-1px)] transition" />
          </Switcher.Control>
        </Switcher>
        <Select name="select" options={['apple', 'food', 'air']}>
          <Select.Trigger>
            {value => (
              <button class="p-1 min-w-100px b-gray border rounded-md hover:b-black transition flex items-center">
                <span class="flex-1">{value || 'Select some'}</span>
                <i class="i-ri-arrow-down-s-line" />
              </button>
            )}
          </Select.Trigger>
          <Select.Content class="bg-main rounded-md py-1 ani-float drop-shadow">
            <Select.Option>
              {opt => <div class="p-2 min-w-85px flex items-center justify-center hover:bg-gray-2 transition w-full cursor-pointer">{opt}</div>}
            </Select.Option>
            <Select.Arrow size={10} />
          </Select.Content>
        </Select>

        <div>
          {JSON.stringify(Form.state)}
        </div>
      </Form.Provider>
    </main>
  )
}
