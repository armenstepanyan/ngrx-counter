import { Post } from '@app/models/posts.model';

export interface PostsState {
  posts: Array<Post> | null
}

export const initialState: PostsState = {
  posts: null
}
