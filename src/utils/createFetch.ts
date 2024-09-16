import { createSignal } from "solid-js";

export function createFetch<T>(fetcher: ()=>Promise<T>){
  const [data, setData] = createSignal<T>()
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal<Error>()
  fetcher().then((res)=>{
    setData(res as any)
    setLoading(false)
  }).catch((err)=>{
    setError(err)
    setLoading(false)
  })

  const refetch = ()=>{
    setLoading(true)
    fetcher().then((res)=>{
      setData(res as any)
      setLoading(false)
    }).catch((err)=>{
      setError(err)
      setLoading(false)
    })
  }

  return [data, {refetch}] as const
}
