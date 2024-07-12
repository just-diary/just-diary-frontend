import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import Nav from '~/components/Nav'

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <div class="ml-60px p-1">
            <Suspense>{props.children}</Suspense>
          </div>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
