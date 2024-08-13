import { Router, useIsRouting } from '@solidjs/router'
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

  return (
    <div
      class="ml-60px p-1 transition"
    >
      <Show when={!isRouting()}>
        {props.children}
      </Show>
    </div>
  )
}

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <GmScroll height="100vh">
            <RouteWrapper>
              <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
            </RouteWrapper>
          </GmScroll>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
