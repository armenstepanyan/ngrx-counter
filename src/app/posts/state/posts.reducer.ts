import { initialState } from "@app/posts/state/posts.state"
import { createReducer, on } from "@ngrx/store"
import { addPost, updatePost, deletePost } from "./posts.actions"

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    const post = {
      ...action.post,
      id: (state.posts.length + 1).toString()
    }
    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),
  on(updatePost, (state, action) => {
    const updatedPosts = state.posts.map(post => {
      return post.id === action.post.id ? action.post : post
    });

    return {
      ...state,
      posts: updatedPosts
    }
  }),

  on(deletePost, (state, action) => {
    const updatedPosts = state.posts.filter(post => post.id !== action.id);

    return {
      ...state,
      posts: updatedPosts
    }
  })
  )



export function postsReducer(state, action) {
  return _postsReducer(state, action)
}
