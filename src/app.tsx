import { BeforeLeaveEventArgs, Router, useBeforeLeave } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense, createUniqueId } from 'solid-js'

import GmScroll from './components/GmScroll'
import LoadingPage from './parts/LoadingPage'
import Nav from '~/components/Nav'

import '~/style/app.css'

function RouteWrapper(props: {
  children: any
}) {
  const id = createUniqueId()
  const [isProcessing, setIsProcessing] = createSignal(false)
  const [status, setStatus] = createSignal('entering')
  let ref!: HTMLDivElement

  useBeforeLeave((e: BeforeLeaveEventArgs) => {
    if (!e.defaultPrevented) {
      // preventDefault to block immediately and prompt user async
      e.preventDefault()
      setStatus('exiting')
      ref.onanimationend = () => {
        setStatus('exited')
        setIsProcessing(true)
        e.retry(true)

        ref.onanimationend = null
      }
    }
  })

  return (
    <div
      data-id={id}
      class="ml-60px p-1 transition ani-route"
      data-status={status()}
      ref={ref}
      onAnimationEnd={() => {
        if (status().endsWith('ing') && !isProcessing()) {
          setStatus(status().replace('ing', 'ed'))
        }
      }}
    >
      <Show when={isProcessing()} fallback={props.children}>
        <LoadingPage />
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
            <div class="ml-60px p-1">
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
