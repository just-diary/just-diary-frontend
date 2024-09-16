import { children, JSX, Suspense } from 'solid-js'

export function GmIgnoreSuspense(props: { children: JSX.Element }) {
  const child = children(() => props.children)
  return <Suspense fallback={child()}>{child()}</Suspense>
}
