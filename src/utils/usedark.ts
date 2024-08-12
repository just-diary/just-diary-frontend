import { createGlobalState } from "solid-uses";
import { clientOnly } from "@solidjs/start";

const context = createGlobalState(()=>({
  dark: false,
}))

const useDark = () => {
  const isDark = document.body.classList.contains('dark')
  const [dark, {setDark}] = context
  setDark(isDark)
  return [dark, setDark]
}
export default useDark
