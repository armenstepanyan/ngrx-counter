import { counterReducer } from "@app/counter/state/counter.reducer";
import { CounterState } from "@app/counter/state/counter.state";
import { postsReducer } from "@app/posts/state/posts.reducer";
import { PostsState } from "@app/posts/state/posts.state";

export interface AppState {
  counter: CounterState,
  posts: PostsState
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer
}
