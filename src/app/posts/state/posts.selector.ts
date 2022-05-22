import { Post } from "@app/models/posts.model";
import { RouterStateUrl } from "@app/store/router/custom-serializer";
import { getCurrentRoute } from "@app/store/router/router.selector";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => state.posts);

export const getPostById = createSelector(getPosts, getCurrentRoute, (posts, route: RouterStateUrl) => {
  return posts ? posts.find((post) => post.id === route.params['id']) : null;
});
