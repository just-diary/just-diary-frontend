import { defineGlobalStore } from 'solid-uses'

const appState = defineGlobalStore('app-state', {
  state: () => ({
    isNavOpen: true,
    title: '航大势能 MES',
  }),
  persist: 'localStorage',
})

function useAppState() {
  return appState
}

export default useAppState
