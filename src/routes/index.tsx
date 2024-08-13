export default function Home() {
  return (

    <main class="text-center mx-auto  p-4">
      <div class="p-3">
        <For each={[...Array(100).keys()]}>
          {i => (
            <div>
              {i}
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
          )}
        </For>
      </div>
    </main>

  )
}
