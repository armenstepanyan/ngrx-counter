import { initialState, postsAdapter } from "@app/posts/state/posts.state"
import { createReducer, on } from "@ngrx/store"
import { addPostSuccess, updatePostSuccess, deletePostSuccess, loadPostsSuccess } from "./posts.actions"

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state)
  }),

  on(deletePostSuccess, (state, action) => {
    return postsAdapter.removeOne(action.id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  })
  )



export function postsReducer(state, action) {
  return _postsReducer(state, action)
}
