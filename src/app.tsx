import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import GmScroll from './components/GmScroll'
import Nav from '~/components/Nav'

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <GmScroll height="100vh">
            <div class="ml-60px p-1 bg-main">
              <Suspense>{props.children}</Suspense>
            </div>
          </GmScroll>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
