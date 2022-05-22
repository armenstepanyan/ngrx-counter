import { AuthReducer, AuthState, AUTH_STATE_NAME } from "@app/auth/state";
import { routerReducer, RouterState } from "@ngrx/router-store";
import { SharedReducer, SharedState, SHARED_STATE_NAME } from "./shared";

export interface AppState {
  [AUTH_STATE_NAME]: AuthState,
  [SHARED_STATE_NAME]: SharedState,
  router: RouterState
}

export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer,
  // Install Router Store for dispatching Route Actions
  router: routerReducer
}
