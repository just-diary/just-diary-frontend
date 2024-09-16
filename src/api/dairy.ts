import { http } from "~/utils/request";

export interface ResDairy {
  date: string
  content: string
  created_at: string
  updated_at: string
}

export interface ResDairies {
  data: ResDairy[]
  total: number
}
export function getDairies(params:{
  pn?: number,
  ps?: number,
}) {
  return http.get<ResDairies>('/dairy', {params})
}


export function getDiary(date: string) {
  return http.get<ResDairy>(`/dairy/${date}`)
}
