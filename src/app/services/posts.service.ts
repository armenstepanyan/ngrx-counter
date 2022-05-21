import { Post } from '@app/models/posts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url = 'https://ngrx-counter-4dde3-default-rtdb.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.url)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    const { title, description } = post;
    return this.http.post<{ name: string }>(this.url, { title, description });
  }

  updatePost(post: Post) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(this.url, postData);
  }

  deletePost(id: string) {
    return this.http.delete(`https://ngrx-counter-4dde3-default-rtdb.firebaseio.com/posts/${id}.json`);
  }


}

