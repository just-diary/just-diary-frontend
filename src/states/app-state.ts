import { createGlobalState, watch } from "solid-uses";

const document = isServer ? null : window.document;
const darkMode = document?.body.classList.contains("dark");

const appState = createGlobalState(()=>({
  isDark: darkMode || false,
}), {setIsDark(v:boolean){
  document?.body.classList.toggle('dark',v)
  this.actions.setState('isDark',v)
}})

const useAppState = () => {
  return appState
}

export default useAppState
