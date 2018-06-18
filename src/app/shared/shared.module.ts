import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {RouterModule} from '@angular/router';
import {NavigationButtonComponent} from './components/navigation-button/navigation-button.component';
import {AuthService} from './services/auth/auth.service';
import {PostService} from './services/api/post.service';
import {ErrorHandlerInterceptor} from './interceptors/error-handler/error-handler.interceptor';
import {TechnicalErrorDialogComponent} from './components/technical-error-dialog/technical-error-dialog.component';

@NgModule({
  declarations: [
    NavigationButtonComponent,
    TechnicalErrorDialogComponent,
  ],
  entryComponents: [TechnicalErrorDialogComponent],
  exports: [NavigationButtonComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
})
export class SharedModule { }
