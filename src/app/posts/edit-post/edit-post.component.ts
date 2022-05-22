import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '@app/models/posts.model';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { getPostById } from '../state/posts.selector';
import { takeUntil, filter } from 'rxjs/operators';
import { updatePost } from '@app/posts/state/posts.actions';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;
  destroy$ = new Subject();

  constructor( private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
    this.store
    .select(getPostById)
    .pipe(
      filter((post) => !!post),
      takeUntil(this.destroy$)
      )
    .subscribe(post => {
      this.post = post;
      this.postForm.patchValue({
        title: post.title,
        description: post.description
      })
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [ Validators.required ]),
      description: new FormControl(null, [ Validators.required  ]),
    });
  }


  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };


    this.store.dispatch(updatePost({ post }));
    // navigation should happen in effects
    // this.router.navigate(['posts']);
  }



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
