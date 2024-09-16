import { createComponentState } from "solid-uses";

const context = createComponentState({
  state: ()=>({
    gutters: 0,
  })
})


export default context
