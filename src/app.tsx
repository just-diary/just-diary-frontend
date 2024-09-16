import { Router, useBeforeLeave, useIsRouting } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'

import { watch } from 'solid-uses'
import Nav from '~/parts/Nav'
import GmScroll from './components/GmScroll'

import LoadingPage from './parts/LoadingPage'
import { useThemeState } from './states/theme-state'
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
  const [state, actions] = useThemeState()

  watch(() => state.hue, () => {
    actions.setTheme()
  })

  watch(() => state.isDark, () => {
    actions.setDark()
  })

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
          <GmScroll height="100vh">
            <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
          </GmScroll>
        </>
      )}
    >
      <NewFileRoutes />
    </Router>
  )
}
