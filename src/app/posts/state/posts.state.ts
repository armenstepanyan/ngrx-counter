import { Post } from '@app/models/posts.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface PostsState extends EntityState<Post>{}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState();

