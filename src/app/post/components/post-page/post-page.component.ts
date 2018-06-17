import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post, PostService} from '../../../shared/services/api/post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  post: Post = null;
  post$: Subscription;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postService.getPostById(params.get('id')))
    ).subscribe(post => (this.post = post));
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }

}
