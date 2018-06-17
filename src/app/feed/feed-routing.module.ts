import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedPageComponent} from './components/feed-page/feed-page.component';

const routes: Routes = [{
  path: '',
  component: FeedPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
