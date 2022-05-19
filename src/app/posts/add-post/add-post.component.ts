import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Post } from '@app/models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,

      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
    });
  }


  onAddPost() {
    this.postForm.markAllAsTouched();
    if (!this.postForm.valid) {
      return;
    }

    console.log(this.postForm.value);
    const { title, description } = this.postForm.value;
    const post: Post = {
      id: '',
      title,
      description,
    }

    this.store.dispatch(addPost({ post }))

  }


}
