import { initialState } from "@app/posts/state/posts.state"
import { createReducer } from "@ngrx/store"

const _postsReducer = createReducer(initialState)



export function postsReducer(state, action) {
  return _postsReducer(state, action)
}
