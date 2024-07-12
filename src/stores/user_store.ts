import { createGlobalState } from "solid-uses";

const userStore = createGlobalState(()=>({
  accessToken: '',
  refreshToken: '',
}))
