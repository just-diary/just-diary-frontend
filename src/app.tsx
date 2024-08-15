import { Router, useBeforeLeave, useIsRouting } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'

import GmScroll from './components/GmScroll'
import LoadingPage from './parts/LoadingPage'
import Nav from '~/parts/Nav'

import 'virtual:uno.css'
import '~/style/app.css'

function RouteWrapper(props: {
  children: any
}) {
  const isRouting = useIsRouting()

  const [leave, setLeave] = createSignal(false)

  let ref!: HTMLDivElement

  useBeforeLeave((e) => {
    if (!e.defaultPrevented) {
      e.preventDefault()
    }
    ref.onanimationend = () => {
      e.retry(true)
      setLeave(false)
    }

    setLeave(true)
  })

  return (

    <div
      class="ml-60px p-1 transition"
      ref={ref}
      classList={{
        'page-leave': leave(),
        'page-enter': !leave(),
      }}
    >
      <Show when={!isRouting()}>
        {props.children}
      </Show>
    </div>

  )
}

export default function App() {
  const NewFileRoutes = () => FileRoutes().map((route) => {
    return {
      ...route,
      component: (props: any) => {
        return (
          <RouteWrapper>
            <route.component {...props} />
          </RouteWrapper>
        )
      },
    }
  })
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <GmScroll height="100vh" autoHide>
            <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
          </GmScroll>
        </>
      )}
    >
      <NewFileRoutes />
    </Router>
  )
}
