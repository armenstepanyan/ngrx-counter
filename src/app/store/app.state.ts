import { AuthReducer, AuthState, AUTH_STATE_NAME } from "@app/auth/state";
import { SharedReducer, SharedState, SHARED_STATE_NAME } from "./shared";

export interface AppState {
  [AUTH_STATE_NAME]: AuthState,
  [SHARED_STATE_NAME]: SharedState
}

export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer
}
