import { SharedReducer, SharedState, SHARED_STATE_NAME } from "./shared";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer
}
