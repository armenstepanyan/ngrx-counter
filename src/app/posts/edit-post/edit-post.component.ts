import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '@app/models/posts.model';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { getPostById } from '../state/posts.selector';
import { switchMap, takeUntil } from 'rxjs/operators';
import { updatePost } from '../state/posts.actions';

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

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.store.select(getPostById, { id })
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.post = data;
       this.createForm();
    })

  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [ Validators.required ]),
      description: new FormControl(this.post.description, [ Validators.required  ]),
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
    this.router.navigate(['posts']);
  }



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
