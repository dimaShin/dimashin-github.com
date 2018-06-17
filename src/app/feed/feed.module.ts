import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import {FeedPageComponent} from './components/feed-page/feed-page.component';
import {FormsModule} from '@angular/forms';
import {PostFilterPipe} from './pipes/post-filter/post-filter.pipe';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeedRoutingModule,
    FormsModule,
  ],
  declarations: [FeedPageComponent, PostFilterPipe],
})
export class FeedModule { }
