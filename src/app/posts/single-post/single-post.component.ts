import { Component, OnInit } from '@angular/core';
import { Post } from '@app/models/posts.model';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Observable<Post>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.post = this.store.select(getPostById);
  }

}
