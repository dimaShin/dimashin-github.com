import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import {PostPageComponent} from './components/post-page/post-page.component';
import {PlaceholderPipe} from './pipes/placeholder/placeholder.pipe';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule
  ],
  declarations: [ PostPageComponent, PlaceholderPipe]
})
export class PostModule { }
