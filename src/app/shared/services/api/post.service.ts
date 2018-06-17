import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable, Observer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators';

export interface Post {
  id:  number;
  userId: number;
  title: string;
  body: string;
}

@Injectable()
export class PostService {

  constructor( private fetch: HttpClient) { }

  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private posts: Post[] = null;
  private currentLength = 1;
  private stream: Observer<Post[]> = null;
  private debounceTime = 1000;
  private debouncer$: Subscription = null;

  getPosts(): Observable<Post[]> {
    if (this.posts) {
      return this.streamPosts();
    }

    return this.fetch.get(`${this.baseUrl}/posts`)
      .pipe(
        tap(posts => this.cachePosts(posts)),
        switchMap(() => this.streamPosts()),
      );
  }

  cachePosts(posts) {
    this.posts = [...posts];
  }

  clearCache() {
    this.posts = null;
    this.currentLength = 1;
  }

  getPostById(id): Observable<any> {
    return this.fetch.get(`${this.baseUrl}/posts/${id}`);
  }

  streamPosts() {
    const debouncer = interval(this.debounceTime);

    return Observable.create(observer => {
      this.stream = observer;
      this.nextTick();

      this.debouncer$ = debouncer.subscribe(() => {
        if (this.currentLength < this.posts.length) {
          this.nextTick();
        } else {
          this.stopStream();
        }
      });
    });
  }

  stopStream() {
    if (this.stream) {
      this.stream.complete();
    }
    if (this.debouncer$) {
      this.debouncer$.unsubscribe();
    }
  }

  private nextTick() {
    const result = this.posts.slice(0, this.currentLength++);
    this.stream.next(result);
  }
}
