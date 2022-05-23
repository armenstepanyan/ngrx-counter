import { RouterStateUrl } from '@app/store/router/custom-serializer';
import { getCurrentRoute } from '@app/store/router/router.selector';
import { postsAdapter, PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const POSTS_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);
export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);
