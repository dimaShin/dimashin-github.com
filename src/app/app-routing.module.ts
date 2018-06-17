import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthService} from './shared/services/auth/auth.service';
import {environment} from '../environments/environment';

/**
* Maybe in this particular case lazy loading is not needed.
* It's even possible that the performance will be even worse.
* But I've decided to lazy load all of them just to show possibility
* and based on a very simple question:
* "is it possible to reach this route with page reload?"
* if the answer is "yes" - it should be lazy
*
* 404 route was moved to the lazy load just because 99%
* of users will never need it
* */

const routes: Routes = [
  {
    path: environment.authRoutePath,
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [AuthService],
  },
  {
    path: environment.baseRoutePath,
    loadChildren: './feed/feed.module#FeedModule',
    canActivate: [AuthService],
  },
  {
    path: 'post/:id',
    loadChildren: './post/post.module#PostModule',
    canActivate: [AuthService],
  },
  {
    path: '',
    redirectTo: environment.baseRoutePath,
    pathMatch: 'full'
  },
  {
    path: '404',
    pathMatch: 'full',
    loadChildren: './not-found/not-found.module#NotFoundModule',
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
