import { Component, OnInit } from '@angular/core';
import { Post } from '@app/models/posts.model';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPosts } from '@app/posts/state/posts.selector';
import { deletePost, loadPosts } from '../state/posts.actions';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Observable<Array<Post>>
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  deleteCurrentPost(id: string) {
    if (!confirm('Are you sure ?')) {
      return
    }

    this.store.dispatch(deletePost({ id }))
  }

}
