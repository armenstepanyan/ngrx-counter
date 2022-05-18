import { Post } from '@app/models/posts.model';

export interface PostsState {
  posts: Array<Post>
}

export const initialState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'title 1',
      description: 'description 1'
    }
  ]
}