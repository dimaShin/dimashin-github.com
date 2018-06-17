import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import {SharedModule} from '../shared/shared.module';
import {NotFoundComponent} from './components/not-found-page/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NotFoundRoutingModule,
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
