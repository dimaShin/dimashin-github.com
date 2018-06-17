import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post, PostService} from '../../../shared/services/api/post.service';
import {Observable} from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {map} from 'rxjs/internal/operators';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  animations: [
    trigger('cardState', [
      state('void', style({
        opacity: 0,
      })),
      state('*', style({
        opacity: 1,
      })),
      transition('void => *', animate('100ms ease-in'))
    ])
  ]
})
export class FeedPageComponent implements OnInit, OnDestroy {

  public posts: Observable<Post[]>;
  public searchQuery = '';

  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.posts = this.postService.getPosts().pipe(
      map(this.getSortFn('id')),
    );
  }

  getSortFn(key: string) {
    return posts => posts.sort((postA, postB) => postA[key] - postB[key]);
  }

  handleLogout() {
    this.postService.clearCache();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.postService.stopStream();
  }

}
